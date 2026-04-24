"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Trash2, Plus, RefreshCw, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axiosInstance";

interface GalleryImage {
  id: number;
  image_url: string;
  created_at: string;
}

export default function GalleryManagePage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<"url" | "file">("file");

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/gallery`);
      setImages(res.data);
    } catch (error) {
      // handled by interceptor or console log
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadType === "url" && !newImageUrl.trim()) return;
    if (uploadType === "file" && !imageFile) return;

    try {
      let submitData;

      if (uploadType === "file") {
        submitData = new FormData();
        submitData.append("image_file", imageFile as File);
      } else {
        submitData = { image_url: newImageUrl };
      }

      const res = await axiosInstance.post(`/api/gallery`, submitData, {
        headers: uploadType === "file" ? { 'Content-Type': 'multipart/form-data' } : undefined
      });

      const added = res.data;
      setImages([added, ...images]);
      setNewImageUrl("");
      setImageFile(null);
      setIsAdding(false);
      toast.success("Image added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      await axiosInstance.delete(`/api/gallery/${id}`);

      setImages(images.filter((img) => img.id !== id));
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <ImageIcon className="h-8 w-8 text-blue-600" />
            Manage Gallery
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Add or remove images from the Happy Customers section.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-sm"
        >
          {isAdding ? <RefreshCw className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          {isAdding ? "Cancel" : "Add Image"}
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddImage}
            className="mb-8"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex gap-4 mb-5 border-b border-slate-100 pb-0">
                <button
                  type="button"
                  onClick={() => setUploadType("file")}
                  className={`text-sm font-bold pb-3 px-1 transition-all ${uploadType === "file" ? "text-blue-600 border-b-2 border-blue-600 translate-y-[1px]" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setUploadType("url")}
                  className={`text-sm font-bold pb-3 px-1 transition-all ${uploadType === "url" ? "text-blue-600 border-b-2 border-blue-600 translate-y-[1px]" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Image URL
                </button>
              </div>

              {uploadType === "file" ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="flex-1 block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer border border-slate-200 rounded-xl"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shrink-0 shadow-sm"
                  >
                    Upload Image
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="url"
                    required
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shrink-0 shadow-sm"
                  >
                    Save URL
                  </button>
                </div>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
          <ImageIcon className="mx-auto h-12 w-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-900">No images available</h3>
          <p className="text-slate-500 mt-1">Get started by adding your first gallery image.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {images.map((img) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={img.id}
              className="group relative aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden shadow-sm border border-slate-200"
            >
              <img
                src={img.image_url}
                alt="Gallery Image"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img.id)}
                  className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-110 transition-all shadow-lg"
                  title="Delete image"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
