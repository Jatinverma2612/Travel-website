"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Camera,
  MapPin,
  Compass,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

/* ---------- FLOATING ELEMENTS ---------- */

const floatingElements = [
  {
    icon: <Plane className="w-10 h-10" />,
    x: "5%",
    y: "80%",
    duration: 18,
  },
  {
    icon: <Camera className="w-9 h-9" />,
    x: "85%",
    y: "20%",
    duration: 10,
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    x: "10%",
    y: "30%",
    duration: 12,
  },
  {
    icon: <Compass className="w-7 h-7" />,
    x: "70%",
    y: "70%",
    duration: 14,
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    x: "50%",
    y: "10%",
    duration: 8,
  },
];

/* ---------- COMPONENT ---------- */

export default function AdventureSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#071426] px-6 py-24">

      {/* ---------- BACKGROUND ---------- */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#071426] via-[#0b1c34] to-[#071426]" />
      </div>

      {/* ---------- FLOATING STICKERS ---------- */}
      <div className="absolute inset-0 z-10 pointer-events-none">

        {/* Plane flying across */}
        <motion.div
          initial={{ x: "-10%", y: "80%" }}
          animate={{ x: "110%", y: "20%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute text-yellow-400/70"
        >
          <Plane className="w-12 h-12" />
        </motion.div>

        {/* Other floating icons */}
        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/40"
            style={{ left: el.x, top: el.y }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.7, 0.3],
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
      <div className="relative z-20 container mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>

          <p className="text-yellow-400 text-sm tracking-widest mb-4 uppercase">
            Are you ready to explore?
          </p>

          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Discover Hidden Adventures
            <span className="block text-yellow-400">
              Beyond The Usual Routes
            </span>
          </h1>

          <p className="text-slate-400 text-lg mb-8 max-w-lg">
            Experience India like never before — from secret mountain trails to
            vibrant cultural streets. Every journey is designed to feel unique,
            immersive, and unforgettable.
          </p>

          {/* NEW PREMIUM CTA (NO OLD BUTTONS) */}
          <div className="flex gap-4">

            <div className="px-7 py-4 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 hover:bg-yellow-400 hover:text-black transition cursor-pointer backdrop-blur-md">
              Start Exploring →
            </div>

            <div className="px-7 py-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition cursor-pointer backdrop-blur-md">
              View Experiences
            </div>

          </div>
        </div>

        {/* RIGHT GRID */}
        <div className="grid grid-cols-2 gap-6">

          {/* CARD 1 */}
          <div className="relative h-[380px] rounded-3xl overflow-hidden border border-white/10 group">
            <Image
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
              alt=""
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
          </div>

          {/* CARD 2 */}
          <div className="relative h-[180px] rounded-3xl overflow-hidden border border-white/10 group">
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt=""
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
          </div>

          {/* CARD 3 */}
          <div className="relative h-[180px] rounded-3xl overflow-hidden border border-white/10 group">
            <Image
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff"
              alt=""
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
          </div>

        </div>
      </div>

      {/* ---------- BOTTOM FADE ---------- */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#071426] to-transparent" />
    </section>
  );
}