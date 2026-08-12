import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

export default function Gallery() {
  const { id: eventId } = useParams();
=======
import { supabase } from "../supabase";

export default function Gallery({ eventId }) {
>>>>>>> master
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (eventId) fetchPhotos();
  }, [eventId]);

<<<<<<< HEAD
=======
  // Fetch photos from Supabase database
>>>>>>> master
  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .eq("event_id", eventId);

    if (error) console.error("Error fetching photos:", error);
    else setPhotos(data || []);
  };

<<<<<<< HEAD
=======
  // Upload photo handler
>>>>>>> master
  const handleUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${eventId}/${fileName}`;

<<<<<<< HEAD
=======
      // 1. Upload to Supabase Storage Bucket
>>>>>>> master
      const { error: uploadError } = await supabase.storage
        .from("event-photos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

<<<<<<< HEAD
=======
      // 2. Get Public URL
>>>>>>> master
      const { data: urlData } = supabase.storage
        .from("event-photos")
        .getPublicUrl(filePath);

<<<<<<< HEAD
=======
      // 3. Save reference in Database Table
>>>>>>> master
      const { error: dbError } = await supabase.from("photos").insert([
        {
          event_id: eventId,
          url: urlData.publicUrl,
          storage_path: filePath,
        },
      ]);

      if (dbError) throw dbError;

      fetchPhotos();
    } catch (err) {
<<<<<<< HEAD
      alert("Upload error: " + err.message);
=======
      alert("Error uploading photo: " + err.message);
>>>>>>> master
    } finally {
      setUploading(false);
    }
  };

<<<<<<< HEAD
=======
  // Delete photo handler
>>>>>>> master
  const handleDelete = async (photoId, storagePath) => {
    if (!window.confirm("Kya aap is photo ko delete karna chahte hain?")) return;

    try {
<<<<<<< HEAD
=======
      // 1. Delete from Storage
>>>>>>> master
      if (storagePath) {
        await supabase.storage.from("event-photos").remove([storagePath]);
      }

<<<<<<< HEAD
      const { error } = await supabase.from("photos").delete().eq("id", photoId);
      if (error) throw error;

      setPhotos(photos.filter((p) => p.id !== photoId));
      alert("Photo delete ho gayi!");
    } catch (err) {
      alert("Delete error: " + err.message);
=======
      // 2. Delete from Database
      const { error } = await supabase.from("photos").delete().eq("id", photoId);

      if (error) throw error;

      // Update state
      setPhotos(photos.filter((p) => p.id !== photoId));
      alert("Photo delete ho gayi!");
    } catch (err) {
      alert("Delete karne me error aaya: " + err.message);
>>>>>>> master
    }
  };

  return (
<<<<<<< HEAD
    <div className="max-w-6xl mx-auto p-6 text-white">
      <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold">📷 Photo Gallery</h1>
        <label className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg cursor-pointer transition shadow-lg">
          {uploading ? "Uploading..." : "📤 Upload Photos"}
=======
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Photo Gallery</h2>
        <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
          {uploading ? "Uploading..." : "Upload Photo"}
>>>>>>> master
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

<<<<<<< HEAD
      {photos.length === 0 ? (
        <p className="text-gray-400 text-center py-10">Abhi tak koi photo upload nahi hui hai.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group border border-gray-700 rounded-xl overflow-hidden shadow-xl bg-gray-800 p-2">
              <img
                src={photo.url}
                alt="Event Photo"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => handleDelete(photo.id, photo.storage_path)}
                className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-bold shadow transition flex items-center justify-center gap-1"
              >
                🗑️ Delete Photo
              </button>
            </div>
          ))}
        </div>
      )}
=======
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group border rounded-lg overflow-hidden shadow">
            <img
              src={photo.url}
              alt="Event Photo"
              className="w-full h-48 object-cover"
            />
            {/* Delete Button overlay */}
            <button
              onClick={() => handleDelete(photo.id, photo.storage_path)}
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-90 hover:opacity-100 hover:bg-red-700 transition"
              title="Delete Photo"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
>>>>>>> master
    </div>
  );
}