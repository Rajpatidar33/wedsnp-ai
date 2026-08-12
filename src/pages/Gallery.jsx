import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Gallery({ eventId }) {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (eventId) fetchPhotos();
  }, [eventId]);

  // Fetch photos from Supabase database
  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .eq("event_id", eventId);

    if (error) console.error("Error fetching photos:", error);
    else setPhotos(data || []);
  };

  // Upload photo handler
  const handleUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${eventId}/${fileName}`;

      // 1. Upload to Supabase Storage Bucket
      const { error: uploadError } = await supabase.storage
        .from("event-photos")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: urlData } = supabase.storage
        .from("event-photos")
        .getPublicUrl(filePath);

      // 3. Save reference in Database Table
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
      alert("Error uploading photo: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Delete photo handler
  const handleDelete = async (photoId, storagePath) => {
    if (!window.confirm("Kya aap is photo ko delete karna chahte hain?")) return;

    try {
      // 1. Delete from Storage
      if (storagePath) {
        await supabase.storage.from("event-photos").remove([storagePath]);
      }

      // 2. Delete from Database
      const { error } = await supabase.from("photos").delete().eq("id", photoId);

      if (error) throw error;

      // Update state
      setPhotos(photos.filter((p) => p.id !== photoId));
      alert("Photo delete ho gayi!");
    } catch (err) {
      alert("Delete karne me error aaya: " + err.message);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Photo Gallery</h2>
        <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
          {uploading ? "Uploading..." : "Upload Photo"}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

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
    </div>
  );
}