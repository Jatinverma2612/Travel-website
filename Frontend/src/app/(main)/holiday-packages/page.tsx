"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function HolidayPackagesPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        <div className="bg-white p-12 rounded-[40px] shadow-xl shadow-blue-900/5 border border-slate-100">
           <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-6">Holiday Packages</h1>
           <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
             Explore our premium all-inclusive holiday packages. This page will be populated with a wide variety of curated tours covering flights, hotels, and local sightseeing very soon!
           </p>
        </div>
      </div>
    </div>
  );
}
