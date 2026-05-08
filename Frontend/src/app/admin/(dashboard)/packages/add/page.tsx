"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Upload, Save, Plus, Trash2, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { packageService } from "@/services/package.service";
import { categoryService } from "@/services/category.service";

interface TimelineDay {
  day: string;
  title: string;
  description: string;
}

const inputCls =
  "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
const labelCls = "block text-sm font-semibold text-gray-700 mb-2";

export default function AddPackagePage() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    duration: "",
    description: "",
    image_url: "",
    groupSize: "",
    transport: "",
    tourType: "",
    location: "",
    tagline: "",
    rating: "5.0",
    categoryId: "",
  });
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);
  const [timeline, setTimeline] = useState<TimelineDay[]>([]);
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (f: string, v: string) => setForm((prev) => ({ ...prev, [f]: v }));

  // ── Timeline ──────────────────────────────────────────────────
  const addDay = () =>
    setTimeline((prev) => [...prev, { day: `Day ${prev.length + 1}`, title: "", description: "" }]);

  const removeDay = (i: number) =>
    setTimeline((prev) => prev.filter((_, idx) => idx !== i).map((d, idx) => ({ ...d, day: `Day ${idx + 1}` })));

  const updateDay = (i: number, field: keyof TimelineDay, value: string) =>
    setTimeline((prev) => prev.map((d, idx) => (idx === i ? { ...d, [field]: value } : d)));

  const moveDay = (i: number, dir: "up" | "down") =>
    setTimeline((prev) => {
      const arr = [...prev];
      const t = dir === "up" ? i - 1 : i + 1;
      if (t < 0 || t >= arr.length) return arr;
      [arr[i], arr[t]] = [arr[t], arr[i]];
      return arr.map((d, idx) => ({ ...d, day: `Day ${idx + 1}` }));
    });

  // ── Inclusions ────────────────────────────────────────────────
  const addInclusion = () => setInclusions((prev) => [...prev, ""]);
  const removeInclusion = (i: number) => setInclusions((prev) => prev.filter((_, idx) => idx !== i));
  const updateInclusion = (i: number, v: string) =>
    setInclusions((prev) => prev.map((item, idx) => (idx === i ? v : item)));

  // ── Exclusions ────────────────────────────────────────────────
  const addExclusion = () => setExclusions((prev) => [...prev, ""]);
  const removeExclusion = (i: number) => setExclusions((prev) => prev.filter((_, idx) => idx !== i));
  const updateExclusion = (i: number, v: string) =>
    setExclusions((prev) => prev.map((item, idx) => (idx === i ? v : item)));

  // ── Image ──────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ── Submit ────────────────────────────────────────────────────
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
      if (form.groupSize) formData.append("groupSize", form.groupSize);
      if (form.transport) formData.append("transport", form.transport);
      if (form.tourType) formData.append("tourType", form.tourType);
      if (form.location) formData.append("location", form.location);
      if (form.tagline) formData.append("tagline", form.tagline);
      if (form.rating) formData.append("rating", form.rating);
      if (form.categoryId) formData.append("categoryId", form.categoryId);
      if (timeline.length > 0) formData.append("timeline", JSON.stringify(timeline));
      if (inclusions.length > 0) formData.append("inclusions", JSON.stringify(inclusions.filter(Boolean)));
      if (exclusions.length > 0) formData.append("exclusions", JSON.stringify(exclusions.filter(Boolean)));
      if (imageFile) {
        formData.append("image_file", imageFile);
      } else if (form.image_url) {
        formData.append("image_url", form.image_url);
      }
      await packageService.create(formData);
      toast.success("Package created successfully!");
      setSaved(true);
      setForm({ title: "", price: "", duration: "", description: "", image_url: "", groupSize: "", transport: "", tourType: "", location: "", tagline: "", rating: "5.0", categoryId: "" });
      setTimeline([]);
      setInclusions([]);
      setExclusions([]);
      setImageFile(null);
      setImagePreview(null);
    } catch (error: unknown) {
      const msg = error instanceof Error && "response" in error ? (error as any).response?.data?.message : null;
      toast.error(msg || "Failed to create package");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/packages" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Add New Package</h1>
          <p className="text-gray-500 text-sm">Fill in all details to create a fully dynamic travel package.</p>
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setSaved(false)} className="bg-white border border-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-slate-50">
                Add Another
              </button>
              <Link href="/admin/packages" className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-blue-700 shadow-lg shadow-blue-600/20">
                View All Packages
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">

            {/* ── Basic Info ─────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
              <h2 className="text-base font-bold text-gray-800 border-b pb-3">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelCls}>Package Title *</label>
                  <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} className={inputCls} placeholder="e.g. Golden Triangle Tour" />
                </div>
                <div>
                  <label className={labelCls}>Price (₹) *</label>
                  <input type="number" value={form.price} onChange={(e) => update("price", e.target.value)} className={inputCls} placeholder="15000" />
                </div>
                <div>
                  <label className={labelCls}>Duration *</label>
                  <input type="text" value={form.duration} onChange={(e) => update("duration", e.target.value)} className={inputCls} placeholder="e.g. 5 Days / 4 Nights" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Description *</label>
                  <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} className={`${inputCls} resize-none`} placeholder="Describe the package highlights..." />
                </div>
              </div>
            </div>

            {/* ── Package Details ────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-6">
              <h2 className="text-base font-bold text-gray-800 border-b pb-3">Package Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className={labelCls}>Group Size</label>
                  <input type="text" value={form.groupSize} onChange={(e) => update("groupSize", e.target.value)} className={inputCls} placeholder="e.g. Up to 12" />
                </div>
                <div>
                  <label className={labelCls}>Transport</label>
                  <input type="text" value={form.transport} onChange={(e) => update("transport", e.target.value)} className={inputCls} placeholder="e.g. Private AC SUV" />
                </div>
                <div>
                  <label className={labelCls}>Tour Type</label>
                  <input type="text" value={form.tourType} onChange={(e) => update("tourType", e.target.value)} className={inputCls} placeholder="e.g. Luxury / Budget" />
                </div>
                <div>
                  <label className={labelCls}>Location Info</label>
                  <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)} className={inputCls} placeholder="e.g. Delhi - Agra - Jaipur" />
                </div>
                <div>
                  <label className={labelCls}>Badge/Tagline</label>
                  <input type="text" value={form.tagline} onChange={(e) => update("tagline", e.target.value)} className={inputCls} placeholder="e.g. Premium Choice" />
                </div>
                <div>
                  <label className={labelCls}>Rating (1-5)</label>
                  <input type="number" step="0.1" min="1" max="5" value={form.rating} onChange={(e) => update("rating", e.target.value)} className={inputCls} placeholder="5.0" />
                </div>
                <div>
                  <label className={labelCls}>Tour Category</label>
                  <select value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)} className={inputCls}>
                    <option value="">Select a Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name} ({cat.type})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ── Timeline Builder ───────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <div>
                  <h2 className="text-base font-bold text-gray-800">Journey Timeline</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Add day-by-day itinerary</p>
                </div>
                <button type="button" onClick={addDay} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm">
                  <Plus className="h-3.5 w-3.5" /> Add Day
                </button>
              </div>
              {timeline.length === 0 ? (
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center">
                  <p className="text-sm text-gray-400 mb-3">No days added yet.</p>
                  <button type="button" onClick={addDay} className="text-blue-600 text-sm font-bold hover:underline">+ Add your first day</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {timeline.map((day, i) => (
                    <div key={i} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex flex-col gap-0.5">
                          <button type="button" onClick={() => moveDay(i, "up")} disabled={i === 0} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs leading-none">▲</button>
                          <button type="button" onClick={() => moveDay(i, "down")} disabled={i === timeline.length - 1} className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs leading-none">▼</button>
                        </div>
                        <span className="flex-1 text-xs font-bold text-blue-600 uppercase tracking-widest">{day.day}</span>
                        <button type="button" onClick={() => removeDay(i)} className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <input type="text" value={day.title} onChange={(e) => updateDay(i, "title", e.target.value)} className={inputCls} placeholder={`Day ${i + 1} title (e.g. Arrival in Delhi)`} />
                        <textarea rows={2} value={day.description} onChange={(e) => updateDay(i, "description", e.target.value)} className={`${inputCls} resize-none`} placeholder="What happens on this day..." />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Inclusions ─────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <div>
                  <h2 className="text-base font-bold text-gray-800">Inclusions</h2>
                  <p className="text-xs text-gray-400 mt-0.5">What is included in this package</p>
                </div>
                <button type="button" onClick={addInclusion} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm">
                  <Plus className="h-3.5 w-3.5" /> Add Item
                </button>
              </div>
              {inclusions.length === 0 ? (
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
                  <p className="text-sm text-gray-400 mb-2">No inclusions added yet.</p>
                  <button type="button" onClick={addInclusion} className="text-green-600 text-sm font-bold hover:underline">+ Add first inclusion</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {inclusions.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateInclusion(i, e.target.value)}
                        className={inputCls}
                        placeholder="e.g. Luxury Hotel Stay (Twin Sharing)"
                      />
                      <button type="button" onClick={() => removeInclusion(i)} className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Exclusions ─────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <div>
                  <h2 className="text-base font-bold text-gray-800">Exclusions</h2>
                  <p className="text-xs text-gray-400 mt-0.5">What is NOT included in this package</p>
                </div>
                <button type="button" onClick={addExclusion} className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm">
                  <Plus className="h-3.5 w-3.5" /> Add Item
                </button>
              </div>
              {exclusions.length === 0 ? (
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center">
                  <p className="text-sm text-gray-400 mb-2">No exclusions added yet.</p>
                  <button type="button" onClick={addExclusion} className="text-red-500 text-sm font-bold hover:underline">+ Add first exclusion</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {exclusions.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateExclusion(i, e.target.value)}
                        className={inputCls}
                        placeholder="e.g. Airfare / Flight tickets"
                      />
                      <button type="button" onClick={() => removeExclusion(i)} className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Image ─────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
              <h2 className="text-base font-bold text-gray-800 border-b pb-3 mb-6">Package Image</h2>
              <div onClick={() => document.getElementById("imageInputAdd")?.click()} className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer overflow-hidden min-h-[200px] flex flex-col items-center justify-center">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="Preview" />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden mb-3 shadow-lg">
                        <img src={imagePreview} className="w-full h-full object-cover" alt="Selected" />
                      </div>
                      <p className="text-sm font-bold text-gray-900">{imageFile?.name}</p>
                      <button className="mt-2 text-xs text-red-500 font-bold hover:underline" onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); }}>Remove File</button>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-400 mb-2">Drag & drop an image, or click to upload</p>
                    <p className="text-xs text-gray-300">PNG, JPG, WebP up to 10MB</p>
                  </>
                )}
                <input id="imageInputAdd" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </div>
              <p className="text-xs text-gray-400 mt-4">Or paste an image URL:</p>
              <input type="url" value={form.image_url} onChange={(e) => update("image_url", e.target.value)} className={`mt-2 ${inputCls}`} placeholder="https://images.unsplash.com/..." />
            </div>

            {/* ── Actions ───────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/admin/packages" className="flex-1 border border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors text-center">Cancel</Link>
              <button onClick={handleSave} disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </div>
                ) : (
                  <><Save className="h-4 w-4" /> Save Package</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
