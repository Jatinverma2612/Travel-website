"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
      }}
      id="hero"
    >
      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-blue-800/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 via-transparent to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="max-w-xl sm:max-w-2xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2 mb-5 sm:mb-7"
          >
            <span className="flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm">
              <MapPin className="h-3 w-3" />
              Trusted by 10,000+ Travellers
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-[4.5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-5 sm:mb-6"
          >
            Explore India
            <br />
            <span className="text-amber-400">Like Never Before</span>
          </motion.h1>

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-base sm:text-lg text-blue-100/90 mb-8 sm:mb-10 leading-[1.8] max-w-lg"
          >
            Premium, professionally curated travel experiences across India.
            From the misty valleys of Kashmir to the sun-kissed beaches of Goa
            — we handle everything so you can simply travel.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col xs:flex-row sm:flex-row gap-3"
          >
            <Link
              href="/packages"
              id="hero-explore-btn"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/30 hover:-translate-y-0.5 active:translate-y-0 group"
            >
              Explore Packages
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/contact"
              id="hero-contact-btn"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base border border-white/25 transition-all duration-300 backdrop-blur-sm"
            >
              Talk to an Expert
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-6 max-w-xs sm:max-w-sm"
          >
            {[
              { value: "50+", label: "Destinations" },
              { value: "10K+", label: "Happy Travellers" },
              { value: "15+", label: "Years Experience" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 leading-none mb-1">
                  {s.value}
                </p>
                <p className="text-[10px] sm:text-xs text-blue-200 font-medium leading-tight">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
