"use client";

import { motion } from "framer-motion";

interface PackageHeroProps {
  title: string;
  description: string;
  image: string;
  badge?: string;
}

export default function PackageHero({ title, description, image, badge = "Tour Package" }: PackageHeroProps) {
  return (
    <div className="relative h-[65vh] min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image with Parallax-like feel */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url('${image}')`, 
          backgroundSize: "cover", 
          backgroundPosition: "center 40%" 
        }}
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 z-1 bg-slate-900/40" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block text-amber-400 text-[11px] font-black uppercase tracking-[0.2em] mb-5 border border-amber-400/30 bg-amber-400/10 px-4 py-2 rounded-full backdrop-blur-md"
          >
            {badge}
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[1.05] drop-shadow-2xl">
            {title}
          </h1>
          
          <p className="text-slate-200 text-lg md:text-xl max-w-2xl leading-relaxed drop-shadow-lg font-medium">
            {description}
          </p>
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent z-10" />
    </div>
  );
}
