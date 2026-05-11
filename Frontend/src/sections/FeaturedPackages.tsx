"use client";
 
import { motion, Variants } from "framer-motion";
import { IndianRupee, ArrowRight, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, memo } from "react";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { getOptimizedImageUrl } from "@/lib/utils";
 
// Variants for parent container
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};
 
// Variants for each card
const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 70, 
      damping: 18 
    } 
  }
};
 
function PackageSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col h-full">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 flex-1">
        <Skeleton className="h-5 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />
        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
 
export const FeaturedPackages = memo(function FeaturedPackages() {
  const [packages, setPackages] = useState<{ id: number; title: string; price: number; duration: string; description: string; image_url?: string; image?: string }[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const controller = new AbortController();
    
    axiosInstance.get(`/packages?limit=4`, { signal: controller.signal })
      .then(res => {
        console.log("FeaturedPackages: Full API Response:", res.data);
        const data = res.data?.data || res.data;
        console.log("FeaturedPackages: Extracted Data:", data);
        const featured = Array.isArray(data) ? data.slice(0, 4) : [];
        console.log("FeaturedPackages: Packages Array:", featured);
        console.log("FeaturedPackages: Package Count:", featured.length);
        setPackages(featured);
      })
      .catch(err => {
        if (err.name !== 'AbortError' && err.code !== 'ERR_CANCELED') {
          console.error("Failed to fetch featured packages:", err);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  console.log("FINAL PACKAGES:", packages);
 
  return (
    <section className="py-20 sm:py-32 bg-slate-50/30" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
              Handpicked for you
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Trending <span className="text-blue-600">Travel</span> Packages
            </h2>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors group"
            >
              Explore all packages
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
 
        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-100 p-5 rounded-2xl">
                <PackageSkeleton />
              </div>
            ))
          ) : packages.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500">
              No featured packages found.
            </div>
          ) : (
            (Array.isArray(packages) ? packages : []).map((pkg, i) => (
              <motion.div
                key={pkg?.id ?? i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.01,
                  transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] } 
                }}
                className="bg-white rounded-2xl overflow-hidden group card-glass hover:shadow-2xl hover:shadow-blue-900/10 flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-44 sm:h-48 overflow-hidden shrink-0">
                  <Image
                    src={getOptimizedImageUrl(pkg?.image_url || pkg?.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800", 600)}
                    alt={pkg?.title || "Package"}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07] animate-smooth-fade"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Duration badge */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-sm z-10">
                    <Clock className="h-3 w-3" />
                    {pkg?.duration || "N/A"}
                  </span>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                    {pkg?.title || "Untitled Package"}
                  </h3>
                  <p className="text-[13px] text-gray-400 mb-5 line-clamp-2 leading-relaxed flex-1">
                    {pkg?.description || "No description available."}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5 font-medium">
                        From
                      </p>
                      <div className="flex items-center gap-0.5 text-blue-700 font-extrabold text-lg leading-none">
                        <IndianRupee className="h-4 w-4" />
                        <span>{Number(pkg?.price || 0).toLocaleString()}</span>
                      </div>
                    </div>
                    <Link
                      href={`/package/${pkg?.id || 1}`}
                      className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95 group/btn"
                    >
                      View Details
                      <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
 
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white px-8 py-5 rounded-3xl border border-slate-100 shadow-xl shadow-blue-900/5">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                  <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" fill className="object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
                +12k
              </div>
            </div>
            <p className="text-[14px] text-gray-600 font-medium">
              Join <span className="font-bold text-gray-900">12,000+ happy travellers</span> who booked with us this year!
            </p>
          </div>
        </motion.div>
 
      </div>
    </section>
  );
});
