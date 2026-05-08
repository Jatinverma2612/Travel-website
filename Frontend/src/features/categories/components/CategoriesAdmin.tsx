"use client";

import Link from "next/link";
import { PlusCircle, Edit, Trash2, Globe, Map, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { categoryService } from "@/services/category.service";

export const CategoriesAdmin = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    const toastId = toast(
      (t) => (
        <span className="flex flex-col sm:flex-row items-center gap-3">
          <span>Delete this category? This will not delete the packages.</span>
          <div className="flex gap-2">
            <button
              onClick={() => { toast.dismiss(t.id); doDelete(id); }}
              className="bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-slate-200 text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </span>
      ),
      { duration: 8000 }
    );
  };

  const doDelete = async (id: number) => {
    try {
      await categoryService.delete(id);
      toast.success("Category deleted successfully.");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="p-4 sm:p-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Manage Tour Categories
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {categories.length} categories available (Navbar will update automatically)
          </p>
        </div>
        <Link
          href="/admin/categories/add"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors w-full sm:w-auto"
        >
          <PlusCircle className="h-4 w-4" />
          Add Category
        </Link>
      </div>

      {/* Categories Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="text-left px-6 py-4 font-semibold text-gray-600 whitespace-nowrap">Category</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 whitespace-nowrap">Slug</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 whitespace-nowrap">Type</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 whitespace-nowrap">Packages</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-600" />
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400 italic">
                    No categories found. Add your first one!
                  </td>
                </tr>
              ) : categories.map((cat) => (
                <tr key={cat.id} className="border-b last:border-0 hover:bg-blue-50/30 transition-colors duration-150 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={cat.bannerImage || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800"}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 line-clamp-1">{cat.name}</p>
                        <p className="text-[10px] text-gray-400 line-clamp-1 max-w-[200px]">
                          {cat.description || 'No description'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                    /{cat.slug}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      cat.type === 'domestic' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-purple-50 text-purple-600 border border-purple-100'
                    }`}>
                      {cat.type === 'domestic' ? <Map className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                      {cat.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">
                    {cat.packages?.length || 0}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/categories/edit/${cat.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-slate-100">
          {loading ? (
            <div className="py-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
            </div>
          ) : categories.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm italic">
              No categories found.
            </div>
          ) : categories.map((cat) => (
            <div key={cat.id} className="p-4 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={cat.bannerImage || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800"}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 truncate">{cat.name}</h3>
                  <div className="flex items-center gap-2">
                     <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                      cat.type === 'domestic' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {cat.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">{cat.packages?.length || 0} packages</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/categories/edit/${cat.id}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(cat.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
