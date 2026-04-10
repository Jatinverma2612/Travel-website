"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { packages } from "@/data/dummy";
import { IndianRupee, ArrowRight, Clock } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function FeaturedPackages() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50/70" id="packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
              Our Offerings
            </span>
            <span className="block w-10 h-0.5 bg-gradient-to-r from-blue-600 to-amber-400 rounded-full mt-2 mb-3" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Featured Travel Packages
            </h2>
            <p className="mt-3 text-gray-500 text-sm sm:text-[15px] max-w-xl leading-relaxed">
              All-inclusive curated packages with hotels, transfers, guides, and
              more — so you travel completely stress-free.
            </p>
          </div>
          <Link
            href="/packages"
            className="group inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:text-blue-700 whitespace-nowrap transition-colors shrink-0"
          >
            See all packages
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Cards Grid — 1 col mobile, 2 col tablet, 4 col desktop */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={item}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-blue-900/10 transition-shadow duration-400 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 sm:h-48 overflow-hidden shrink-0">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Duration badge */}
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-sm">
                  <Clock className="h-3 w-3" />
                  {pkg.duration}
                </span>
                {/* Gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 text-[15px] leading-snug mb-2 line-clamp-2">
                  {pkg.title}
                </h3>
                <p className="text-[13px] text-gray-400 mb-5 line-clamp-2 leading-relaxed flex-1">
                  {pkg.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                      From
                    </p>
                    <div className="flex items-center gap-0.5 text-blue-700 font-extrabold text-lg leading-none">
                      <IndianRupee className="h-4 w-4" />
                      <span>{pkg.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link
                    href={`/packages/${pkg.id}`}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all duration-200 hover:shadow-md hover:shadow-blue-600/30 group/btn"
                  >
                    View Details
                    <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
