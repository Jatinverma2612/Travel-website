"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { MapPin } from "lucide-react";

const destinations = [
  {
    name: "Rajasthan",
    tagline: "Land of Kings",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Kerala",
    tagline: "God's Own Country",
    image: "https://images.unsplash.com/photo-1589983846997-04788035bc83?q=80&w=1074&auto=format&fit=crop",
  },
  {
    name: "Kashmir",
    tagline: "Heaven on Earth",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Goa",
    tagline: "Pearl of the Orient",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Varanasi",
    tagline: "Spiritual Heart of India",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Andaman",
    tagline: "Tropic Paradise",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.48, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function DestinationsSection() {
  return (
    <section className="py-20 sm:py-28 bg-white" id="destinations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
            Where to Go
          </span>
          <span className="block w-10 h-0.5 bg-gradient-to-r from-blue-600 to-amber-400 rounded-full mt-2 mb-4 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Popular Destinations
          </h2>
          <p className="mt-4 text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed">
            Handpicked destinations across India — each with its own story,
            culture, and unmatched beauty.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5"
        >
          {destinations.map((d) => (
            <motion.div
              key={d.name}
              variants={item}
              whileHover={{ scale: 1.02, transition: { duration: 0.22, ease: "easeOut" } }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-gray-900/20 transition-shadow duration-400"
            >
              {/* Image */}
              <img
                src={d.image}
                alt={d.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.09]"
              />

              {/* Permanent dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-900/20 to-transparent" />

              {/* Blue tint on hover */}
              <div className="absolute inset-0 bg-blue-700/15 opacity-0 group-hover:opacity-100 transition-opacity duration-350" />

              {/* Glass label chip */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 glass-dark text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  <MapPin className="h-2.5 w-2.5 text-amber-300" />
                  India
                </span>
              </div>

              {/* Text — slides up on hover */}
              <div className="dest-label absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-extrabold text-sm sm:text-base md:text-lg leading-tight drop-shadow-md">
                  {d.name}
                </p>
                <p className="text-amber-300 text-xs font-semibold mt-0.5 tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {d.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.48 }}
          className="text-center mt-12 sm:mt-14"
        >
          <Link
            href="/packages"
            className="btn-ghost inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3.5 rounded-xl group"
          >
            View All Packages
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
