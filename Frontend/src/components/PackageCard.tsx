"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PackageCardProps {
  title: string;
  duration: string;
  price: string;
}

export default function PackageCard({ title, duration, price }: PackageCardProps) {
  return (
    <div className="group bg-slate-50/80 rounded-[2rem] p-8 border border-slate-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 opacity-50" />
      
      {/* Duration Badge */}
      <span className="relative z-10 inline-block text-[11px] font-black text-blue-600 uppercase tracking-widest bg-blue-100/50 px-3 py-1.5 rounded-full border border-blue-200/50 mb-5">
        {duration}
      </span>
      
      {/* Title */}
      <h3 className="relative z-10 font-black text-slate-900 text-xl mb-8 group-hover:text-blue-600 transition-colors leading-tight min-h-[3rem]">
        {title}
      </h3>
      
      {/* Footer / Price & Button */}
      <div className="relative z-10 flex items-center justify-between pt-6 border-t border-slate-200/50">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Starting From</span>
          <span className="text-2xl font-black text-slate-900">
            ₹{price}<span className="text-[13px] text-slate-400 font-medium ml-1 tracking-normal italic">/person</span>
          </span>
        </div>
        
        <Link 
          href="/contact" 
          className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-6 py-3.5 rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-blue-600/30 hover:scale-[1.05] active:scale-[0.97]"
        >
          Enquire <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
