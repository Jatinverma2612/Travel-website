"use client";

import { useState, useEffect, use } from "react";
import { ArrowLeft, Save, Loader2, Upload } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";
import { packageService } from "@/services/package.service";

export default function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    duration: "",
    description: "",
    image_url: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const data = await packageService.getById(id);
        if (!data) {
          notFound();
          return;
        }
        setForm({
          title: data.title || "",
          price: String(data.price || ""),
          duration: data.duration || "",
          description: data.description || "",
          image_url: data.image_url || data.image || "",
        });
        if (data.image_url) setImagePreview(data.image_url);
      } catch (error) {
        toast.error("Failed to fetch package details.");
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchPackage();
  }, [id]);

  const update = (f: string, v: string) => setForm({ ...form, [f]: v });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.price || !form.duration || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("duration", form.duration);
      formData.append("description", form.description);

      if (imageFile) {
        formData.append("image_file", imageFile);
      } else if (form.image_url) {
        formData.append("image_url", form.image_url);
      }

      await packageService.update(id, formData);

      toast.success("Package updated successfully!");
      setSaved(true);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as any).response?.data?.message 
        : "Failed to update package";
      toast.error(errorMessage || "Failed to update package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/packages" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Edit Package</h1>
          <p className="text-gray-500 text-sm">Update the details for this travel package.</p>
        </div>
      </div>

      <div className="max-w-3xl">
        {loadingInitial ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : saved ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Save className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Changes Saved!</h2>
            <p className="text-gray-500 mb-8">The package details have been updated successfully.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button onClick={() => setSaved(false)} className="bg-white border border-slate-200 text-slate-700 font-bold px-8 py-3 rounded-xl transition-all hover:bg-slate-50">
                Continue Editing
              </button>
              <Link href="/admin/packages" className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl transition-all hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                Back to List
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[24px] sm:rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Package Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={form.duration}
                  onChange={(e) => update("duration", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            {/* Image Upload UI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Package Image</label>
              <div 
                onClick={() => document.getElementById('imageInput')?.click()}
                className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer overflow-hidden min-h-[200px] flex flex-col items-center justify-center"
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Preview" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-24 h-24 rounded-xl overflow-hidden mb-3 shadow-lg ring-4 ring-white">
                        <img src={imagePreview} className="w-full h-full object-cover" alt="Selected" />
                      </div>
                      <p className="text-sm font-bold text-gray-900">{imageFile ? imageFile.name : 'Current Image'}</p>
                      <button className="mt-2 text-xs text-blue-600 font-bold hover:underline" onClick={(e) => { e.stopPropagation(); document.getElementById('imageInput')?.click(); }}>
                        Change Image
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-400 mb-2">Drag & drop an image, or click to upload</p>
                    <p className="text-xs text-gray-300">PNG, JPG, WebP up to 10MB</p>
                  </>
                )}
                <input 
                  id="imageInput"
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden" 
                />
              </div>
              <p className="text-xs text-gray-400 mt-4">Or update via image URL:</p>
              <input
                type="url"
                value={form.image_url}
                onChange={(e) => update("image_url", e.target.value)}
                className="mt-2 w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link href="/admin/packages" className="flex-1 border border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors text-center">
                Cancel
              </Link>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/20"
              >
                {loading ? (
                   <div className="flex items-center gap-2">
                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     Saving...
                   </div>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
