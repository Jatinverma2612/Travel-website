"use client";

import { useState } from "react";
import { packages } from "@/data/dummy";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

export default function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const pkg = packages.find((p) => p.id === id);
  if (!pkg) notFound();

  const [form, setForm] = useState({
    title: pkg.title,
    price: String(pkg.price),
    duration: pkg.duration,
    description: pkg.description,
    image: pkg.image,
  });
  const [saved, setSaved] = useState(false);

  const update = (f: string, v: string) => setForm({ ...form, [f]: v });

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/packages" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Edit Package</h1>
          <p className="text-gray-500 text-sm">Editing: {pkg.title}</p>
        </div>
      </div>

      <div className="max-w-3xl">
        {saved ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Changes Saved!</h2>
            <p className="text-gray-500 mb-4">Package updated successfully.</p>
            <Link href="/admin/packages" className="text-blue-600 font-medium hover:underline">
              View All Packages →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[24px] sm:rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
            {/* Preview */}
            {form.image && (
              <div className="rounded-2xl overflow-hidden h-48">
                <img src={form.image} alt={form.title} className="w-full h-full object-cover" />
              </div>
            )}

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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => update("image", e.target.value)}
                  className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link href="/admin/packages" className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-colors text-center">
                Cancel
              </Link>
              <button
                onClick={() => setSaved(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
