import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Gallery() {
  const { eventId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const loadPhotos = async () => {
    if (!eventId) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      return;
    }

    // Check that the logged-in user owns this event
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("id")
      .eq("id", eventId)
      .eq("user_id", user.id)
      .single();

    if (eventError || !event) {
      console.error("Event access error:", eventError);
      alert("You are not authorized to view this event.");
      return;
    }

    setAuthorized(true);

    // Load photos from private bucket
    const { data, error } = await supabase.storage
      .from("event-photos")
      .list(eventId, {
        limit: 100,
        sortBy: {
          column: "created_at",
          order: "desc",
        },
      });

    if (error) {
      console.error("Error loading photos:", error);
      return;
    }

    const photoUrls = [];

    for (const file of data || []) {
      if (file.name === ".emptyFolderPlaceholder") continue;

      const filePath = `${eventId}/${file.name}`;

      const { data: signedData, error: signedError } =
        await supabase.storage
          .from("event-photos")
          .createSignedUrl(filePath, 3600);

      if (signedError) {
        console.error("Signed URL error:", signedError);
        continue;
      }

      photoUrls.push({
        id: file.id || file.name,
        name: file.name,
        url: signedData.signedUrl,
      });
    }

    setPhotos(photoUrls);
  };

  useEffect(() => {
    loadPhotos();
  }, [eventId]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length || !eventId) return;

    setUploading(true);

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${eventId}/${fileName}`;

      const { error } = await supabase.storage
        .from("event-photos")
        .upload(filePath, file);

      if (error) {
        console.error("Upload error:", error);
        alert(`Upload failed: ${error.message}`);
        continue;
      }
    }

    await loadPhotos();

    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (fileName) => {
    if (!eventId || !fileName) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this photo?"
    );

    if (!confirmDelete) return;

    const filePath = `${eventId}/${fileName}`;

    const { error } = await supabase.storage
      .from("event-photos")
      .remove([filePath]);

    if (error) {
      console.error("Delete error:", error);
      alert(`Delete failed: ${error.message}`);
      return;
    }

    setPhotos((previousPhotos) =>
      previousPhotos.filter((photo) => photo.name !== fileName)
    );
  };

  if (!authorized) {
    return (
      <main className="gallery-page">
        <section className="gallery-header">
          <p>Checking event access...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="gallery-page">
      <section className="gallery-header">
        <p className="hero-badge">📸 Event Gallery</p>

        <h1>Photo Gallery</h1>

        <p>
          Upload your event photos and preview them in your gallery.
        </p>

        <label className="upload-btn">
          📤 {uploading ? "Uploading..." : "Upload Photos"}

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            hidden
            disabled={uploading}
          />
        </label>
      </section>

      <section className="gallery-grid">
        {photos.length === 0 ? (
          <div className="card empty-gallery">
            <h2>📷 No Photos Yet</h2>

            <p>Upload some photos to start your gallery.</p>
          </div>
        ) : (
          photos.map((photo) => (
            <div className="photo-card" key={photo.id}>
              <img src={photo.url} alt={photo.name} />

              <button
                className=""
                onClick={() => handleDelete(photo.name)}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default Gallery;