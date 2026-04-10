"use client";

import { useState } from "react";
import { ArrowLeft, Upload, Save } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AddPackagePage() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    duration: "",
    description: "",
    image: "",
  });
  const [saved, setSaved] = useState(false);

  const [loading, setLoading] = useState(false);
  const update = (f: string, v: string) => setForm({ ...form, [f]: v });

  const handleSave = async () => {
    if (!form.title || !form.price || !form.duration || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Session expired. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: form.title,
          price: form.price,
          duration: form.duration,
          description: form.description,
          image_url: form.image
        })
      });

      if (res.ok) {
        toast.success("Package created successfully!");
        setSaved(true);
        setForm({ title: "", price: "", duration: "", description: "", image: "" });
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to add package. Please try again.");
      }
    } catch (error) {
      toast.error("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/packages"
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Add New Package</h1>
          <p className="text-gray-500 text-sm">Fill in the details to create a new travel package.</p>
        </div>
      </div>

      <div className="max-w-3xl">
        {saved ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Save className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Package Saved!</h2>
            <p className="text-gray-500 mb-4">The new package has been added successfully.</p>
            <Link href="/admin/packages" className="text-blue-600 font-medium hover:underline">
              View All Packages →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[24px] sm:rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Package Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Golden Triangle Tour"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="15000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                <input
                  type="text"
                  value={form.duration}
                  onChange={(e) => update("duration", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 5 Days / 4 Nights"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Describe the package highlights..."
                />
              </div>
            </div>

            {/* Image Upload UI */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Package Image</label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-400 mb-2">Drag & drop an image, or click to upload</p>
                <p className="text-xs text-gray-300">PNG, JPG, WebP up to 10MB</p>
                <button className="mt-4 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                  Choose File
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Or paste an image URL:</p>
              <input
                type="url"
                value={form.image}
                onChange={(e) => update("image", e.target.value)}
                className="mt-2 w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link
                href="/admin/packages"
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors text-center"
              >
                Cancel
              </Link>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Save className="h-4 w-4" />
                {loading ? "Saving..." : "Save Package"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
