"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { IndianRupee, ArrowRight, Clock, Loader2, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function FeaturedPackages() {
  const [packages, setPackages] = useState<{ id: number; title: string; price: number; duration: string; description: string; image_url?: string; image?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/packages`)
      .then((res) => {
        const featured = Array.isArray(res.data) ? res.data.slice(0, 4) : [];
        setPackages(featured);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch featured packages:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 sm:py-28 bg-slate-50/70" id="packages">
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        </div>
      </section>
    );
  }

  if (packages.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-slate-50/70" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
              Our Offerings
            </span>
            <span className="block w-10 h-0.5 bg-gradient-to-r from-blue-600 to-amber-400 rounded-full mt-2 mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Featured Travel Packages
            </h2>
            <p className="mt-3 text-gray-500 text-sm sm:text-[15px] max-w-xl leading-relaxed">
              All-inclusive curated packages with hotels, transfers, guides, and
              more — so you travel completely stress-free.
            </p>
          </div>
          <Link
            href="/packages"
            className="group inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:text-blue-700 whitespace-nowrap transition-all duration-200 hover:gap-2.5 shrink-0"
          >
            See all packages
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
              className="bg-white rounded-2xl overflow-hidden group card-glass hover:shadow-xl hover:shadow-blue-900/10 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 sm:h-48 overflow-hidden shrink-0">
                <img
                  src={pkg.image_url || pkg.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800"}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                {/* Duration badge */}
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-sm">
                  <Clock className="h-3 w-3" />
                  {pkg.duration}
                </span>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                  {pkg.title}
                </h3>
                <p className="text-[13px] text-gray-400 mb-5 line-clamp-2 leading-relaxed flex-1">
                  {pkg.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5 font-medium">
                      From
                    </p>
                    <div className="flex items-center gap-0.5 text-blue-700 font-extrabold text-lg leading-none">
                      <IndianRupee className="h-4 w-4" />
                      <span>{pkg.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link
                    href={`/packages/${pkg.id}`}
                    className="btn-primary inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl group/btn"
                  >
                    View Details
                    <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-600 font-semibold text-sm px-7 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
          >
            <MapPin className="h-4 w-4 text-blue-500" />
            Browse All Destinations
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
