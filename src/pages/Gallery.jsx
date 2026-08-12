import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Gallery() {
  const { eventId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);

  const loadPhotos = async () => {
    if (!eventId) return;

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

    const photoUrls = (data || [])
      .filter((file) => file.name !== ".emptyFolderPlaceholder")
      .map((file) => {
        const filePath = `${eventId}/${file.name}`;

        const { data: urlData } = supabase.storage
          .from("event-photos")
          .getPublicUrl(filePath);

        return {
          id: file.id || file.name,
          name: file.name,
          url: urlData.publicUrl,
        };
      });

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
            </div>
          ))
        )}
      </section>
    </main>
  );
}

export default Gallery;