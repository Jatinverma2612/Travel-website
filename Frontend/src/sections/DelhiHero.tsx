"use client";

import { motion } from "framer-motion";
import { Plane, Camera, MapPin, Compass, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* ---------- FLOATING ELEMENTS ---------- */

const floatingElements = [
  { icon: <Plane className="w-8 h-8 sm:w-10 sm:h-10" />, x: "5%", y: "80%", duration: 18 },
  { icon: <Camera className="w-7 h-7 sm:w-9 sm:h-9" />, x: "85%", y: "20%", duration: 10 },
  { icon: <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />, x: "10%", y: "30%", duration: 12 },
  { icon: <Compass className="w-5 h-5 sm:w-7 sm:h-7" />, x: "70%", y: "70%", duration: 14 },
  { icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />, x: "50%", y: "10%", duration: 8 },
];

/* ---------- COMPONENT ---------- */

export default function DelhiHero() {
  return (
    <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-[#071426] px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
      {/* ---------- BACKGROUND ---------- */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#071426] via-[#0b1c34]/90 to-[#071426]" />
      </div>

      {/* ---------- FLOATING STICKERS ---------- */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {/* Plane flying across */}
        <motion.div
          initial={{ x: "-10%", y: "80%" }}
          animate={{ x: "110%", y: "20%" }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute text-yellow-400/50 hidden sm:block"
        >
          <Plane className="w-10 h-10 lg:w-12 lg:h-12" />
        </motion.div>

        {/* Other floating icons */}
        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/30"
            style={{ left: el.x, top: el.y }}
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {el.icon}
          </motion.div>
        ))}
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="relative z-20 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <p className="text-yellow-400 text-[11px] sm:text-xs font-bold tracking-[0.2em] mb-4 sm:mb-5 uppercase">
            Are you ready to explore?
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5 tracking-tight">
            Discover Hidden Adventures
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 mt-1.5">
              Beyond The Usual Routes
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Experience India like never before — from secret mountain trails to vibrant cultural streets. Every journey is designed to feel unique, immersive, and unforgettable.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link 
              href="/packages"
              className="group w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-400 text-amber-950 font-bold hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
            >
              Start Exploring
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link 
              href="/testimonials"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-transparent border border-white/20 text-white font-semibold hover:bg-white hover:text-blue-950 transition-all duration-300 backdrop-blur-md flex items-center justify-center"
            >
              View Experiences
            </Link>
          </div>
        </motion.div>

        {/* RIGHT GRID */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-6 lg:mt-0"
        >
          {/* CARD 1 (Tall) */}
          <div className="relative h-[250px] sm:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
            <Image
              src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Mountain landscape"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </div>

          {/* CARD 2 & 3 (Stacked) */}
          <div className="flex-col gap-4 sm:gap-5 hidden sm:flex">
            <div className="relative h-[160px] lg:h-[190px] rounded-2xl overflow-hidden border border-white/10 group shadow-xl">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
              <Image
                src="https://images.unsplash.com/photo-1570168305673-42708ac64073?q=80&w=934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Beach destination"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="relative h-[160px] lg:h-[190px] rounded-2xl overflow-hidden border border-white/10 group shadow-xl">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
              <Image
                src="https://images.unsplash.com/photo-1590161185432-26bb6eb3714c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Cultural street"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ---------- BOTTOM FADE BLENDING INTO NEXT SECTION ---------- */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950 to-transparent pointer-events-none" />
    </section>
  );
}