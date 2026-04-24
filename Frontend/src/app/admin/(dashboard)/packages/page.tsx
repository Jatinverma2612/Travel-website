"use client";

import Link from "next/link";
import { PlusCircle, Edit, Trash2, IndianRupee, Clock, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPackages = () => {
    axiosInstance.get("/api/packages")
      .then(res => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id: number) => {
    const toastId = toast(
      (t) => (
        <span className="flex flex-col sm:flex-row items-center gap-3">
          <span>Delete this package?</span>
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
      await axiosInstance.delete(`/api/packages/${id}`);
      toast.success("Package deleted successfully.");
      fetchPackages();
    } catch (err) {
      // Error is handled by axios interceptor
    }
  };

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Manage Packages
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {packages.length} packages listed
          </p>
        </div>
        <Link
          href="/admin/packages/add"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors w-full sm:w-auto"
        >
          <PlusCircle className="h-4 w-4" />
          Add Package
        </Link>
      </div>

      {/* Packages Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="text-left px-6 py-4 font-semibold text-gray-600 whitespace-nowrap">Package</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 whitespace-nowrap">Duration</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600 whitespace-nowrap">Price</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-600" />
                  </td>
                </tr>
              ) : packages.map((pkg) => (
                <tr key={pkg.id} className="border-b last:border-0 hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={pkg.image_url || pkg.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800"}
                          alt={pkg.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 line-clamp-1">{pkg.title}</p>
                        <p className="text-[10px] text-gray-400 line-clamp-1 max-w-[200px]">
                          {pkg.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {pkg.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-0.5 font-bold text-blue-700">
                      <IndianRupee className="h-3.5 w-3.5" />
                      {pkg.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/packages/edit/${pkg.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(pkg.id)}
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

        {/* Mobile Grid View */}
        <div className="md:hidden divide-y divide-slate-100">
          {loading ? (
            <div className="py-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
            </div>
          ) : packages.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm italic">
              No packages found.
            </div>
          ) : packages.map((pkg) => (
            <div key={pkg.id} className="p-4 flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img
                    src={pkg.image_url || pkg.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800"}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 truncate">{pkg.title}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="h-3 w-3" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-0.5 text-blue-700 font-bold text-xs">
                      <IndianRupee className="h-3 w-3" />
                      {pkg.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/packages/edit/${pkg.id}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  <Edit className="h-3.5 w-3.5" />
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(pkg.id)}
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
    </div>
  );
}
