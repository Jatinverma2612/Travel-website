"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Clock, Tag, ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/utils";

export function PackagesList({ initialPackages }: { initialPackages: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const packageArray = Array.isArray(initialPackages) ? initialPackages : [];

  const filteredPackages = packageArray.filter(pkg => 
    pkg?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-block bg-blue-100 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Our Curated Tours
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Discover Your Next Adventure
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-10">
            From the peaks of the Himalayas to the backwaters of Kerala, explore India's most stunning destinations with our premium hand-picked packages.
          </p>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search destinations, packages..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-medium"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-gray-700 px-6 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-colors shadow-sm">
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>
          </div>
        </motion.div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, i) => (
              <motion.div
                key={pkg?.id || i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col bg-slate-50/50 rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 relative"
              >
                <div className="h-64 overflow-hidden relative">
                  <Image 
                    src={getOptimizedImageUrl(pkg?.image_url || pkg?.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800", 800)} 
                    alt={pkg?.title || "Package"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 animate-smooth-fade"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl flex items-center gap-2 text-blue-600 font-black text-[10px] shadow-lg border border-white/20 tracking-widest uppercase">
                      <Tag className="h-3.5 w-3.5" />
                      {pkg?.tagline || "Premium Choice"}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      <Clock className="h-4 w-4 text-blue-500" />
                      {pkg?.duration || "N/A"}
                    </div>
                    <div className="text-xl font-black text-slate-900">
                      ₹{(pkg?.price || 0).toLocaleString()}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {pkg?.title || "Untitled Package"}
                  </h3>
                  
                  <p className="text-[14px] text-slate-500 mb-8 line-clamp-2 leading-relaxed font-medium flex-1">
                    {pkg?.description || "No description available."}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-auto pt-6 border-t border-slate-200/50">
                    <Link 
                      href={`/booking?packageId=${pkg?.id || 0}&packageTitle=${encodeURIComponent(pkg?.title || "")}`}
                      className="flex-1 bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl text-center text-sm shadow-xl shadow-slate-900/10 hover:shadow-blue-600/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Book Now
                    </Link>
                    <Link 
                      href={`/package/${pkg?.id || 0}`}
                      className="w-14 h-14 flex items-center justify-center border border-slate-200 rounded-2xl hover:bg-blue-50 transition-all duration-300 group/btn shadow-sm hover:border-blue-200"
                    >
                      <ArrowRight className="h-5 w-5 text-slate-400 group-hover/btn:text-blue-600 transition-colors" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[40px] border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-10 w-10 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No packages found</h2>
            <p className="text-gray-500 max-w-sm mx-auto mb-8">We couldn't find any packages matching your search criteria. Try a different term!</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
