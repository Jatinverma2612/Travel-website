"use client";

import { useState } from "react";
import { ArrowLeft, Save, Plus, Trash2, Upload, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { categoryService } from "@/services/category.service";

const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
const labelCls = "block text-sm font-semibold text-gray-700 mb-2";

export default function AddCategoryPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    type: "domestic",
    description: "",
  });
  const [highlights, setHighlights] = useState<string[]>([]);
  const [keyHighlights, setKeyHighlights] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (f: string, v: string) => {
    if (f === 'name' && !form.slug) {
      setForm(prev => ({ ...prev, [f]: v, slug: v.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '') }));
    } else {
      setForm(prev => ({ ...prev, [f]: v }));
    }
  };

  const addHighlight = () => setHighlights(prev => [...prev, ""]);
  const removeHighlight = (i: number) => setHighlights(prev => prev.filter((_, idx) => idx !== i));
  const updateHighlight = (i: number, v: string) => setHighlights(prev => prev.map((h, idx) => idx === i ? v : h));

  const addKeyHighlight = () => setKeyHighlights(prev => [...prev, ""]);
  const removeKeyHighlight = (i: number) => setKeyHighlights(prev => prev.filter((_, idx) => idx !== i));
  const updateKeyHighlight = (i: number, v: string) => setKeyHighlights(prev => prev.map((h, idx) => idx === i ? v : h));

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
    if (!form.name || !form.slug) {
      toast.error("Name and Slug are required.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("type", form.type);
      formData.append("description", form.description);
      formData.append("highlights", JSON.stringify(highlights.filter(Boolean)));
      formData.append("keyHighlights", JSON.stringify(keyHighlights.filter(Boolean)));
      if (imageFile) formData.append("banner_file", imageFile);

      await categoryService.create(formData);
      toast.success("Category created successfully!");
      setSaved(true);
    } catch (err) {
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  if (saved) {
    return (
      <div className="p-8 max-w-2xl mx-auto text-center mt-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Category Created!</h2>
        <p className="text-gray-500 mb-10">The new tour category is now live and will appear in the Navbar.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/admin/categories" className="bg-slate-100 text-slate-700 font-bold px-8 py-4 rounded-2xl hover:bg-slate-200 transition-all">Back to List</Link>
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all">Add Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/categories" className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
          <ArrowLeft className="h-5 w-5 text-gray-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Add Category</h1>
          <p className="text-gray-500 text-sm">Create a new tour grouping for the navbar and category pages.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Details */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={labelCls}>Category Name *</label>
                <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} placeholder="e.g. North India Packages" />
              </div>
              <div>
                <label className={labelCls}>Slug * (URL friendly)</label>
                <input type="text" value={form.slug} onChange={(e) => update("slug", e.target.value)} className={inputCls} placeholder="north-india" />
              </div>
              <div>
                <label className={labelCls}>Category Type *</label>
                <select value={form.type} onChange={(e) => update("type", e.target.value)} className={inputCls}>
                  <option value="domestic">Domestic (India)</option>
                  <option value="international">International</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Description</label>
                <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className={`${inputCls} resize-none`} placeholder="Short intro for the category page..." />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100">
             <div className="flex items-center justify-between mb-6 border-b pb-4">
                <h2 className="text-lg font-bold text-gray-800">Dynamic Highlights</h2>
                <button onClick={addHighlight} className="bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-xl text-xs hover:bg-blue-100 transition-colors flex items-center gap-2">
                  <Plus className="h-3.5 w-3.5" /> Add Highlight
                </button>
             </div>
             <div className="space-y-4">
                {highlights.map((h, i) => (
                  <div key={i} className="flex gap-3">
                    <input type="text" value={h} onChange={(e) => updateHighlight(i, e.target.value)} className={inputCls} placeholder="e.g. Luxury Private Transfers" />
                    <button onClick={() => removeHighlight(i)} className="p-3 text-red-400 hover:text-red-600 bg-red-50 rounded-xl transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                {highlights.length === 0 && <p className="text-sm text-gray-400 italic text-center py-4">No highlights added yet.</p>}
             </div>
          </div>

          {/* Key Highlights */}
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100">
             <div className="flex items-center justify-between mb-6 border-b pb-4">
                <h2 className="text-lg font-bold text-gray-800">Key Features</h2>
                <button onClick={addKeyHighlight} className="bg-amber-50 text-amber-600 font-bold px-4 py-2 rounded-xl text-xs hover:bg-amber-100 transition-colors flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" /> Add Key Feature
                </button>
             </div>
             <div className="space-y-4">
                {keyHighlights.map((h, i) => (
                  <div key={i} className="flex gap-3">
                    <input type="text" value={h} onChange={(e) => updateKeyHighlight(i, e.target.value)} className={inputCls} placeholder="e.g. 24/7 Support Guaranteed" />
                    <button onClick={() => removeKeyHighlight(i)} className="p-3 text-red-400 hover:text-red-600 bg-red-50 rounded-xl transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                {keyHighlights.length === 0 && <p className="text-sm text-gray-400 italic text-center py-4">No key features added yet.</p>}
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           {/* Banner Image */}
           <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-sm border border-slate-100">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-4 mb-6">Banner Image</h2>
              <div 
                onClick={() => document.getElementById('banner-file')?.click()}
                className="relative aspect-video rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 cursor-pointer transition-all overflow-hidden flex flex-col items-center justify-center p-4"
              >
                {imagePreview ? (
                  <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-slate-300 mb-2" />
                    <p className="text-xs text-slate-400 font-medium">Click to upload banner</p>
                  </>
                )}
                <input type="file" id="banner-file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
              <p className="text-[10px] text-slate-400 mt-4 leading-relaxed italic">
                * This image will appear at the top of the category page. Suggested size: 1920x600px.
              </p>
           </div>

           {/* Save Action */}
           <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
              <button 
                onClick={handleSave} 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="h-5 w-5" />}
                {loading ? "Creating..." : "Save Category"}
              </button>
              <Link href="/admin/categories" className="block w-full text-center mt-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                Cancel & Go Back
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
