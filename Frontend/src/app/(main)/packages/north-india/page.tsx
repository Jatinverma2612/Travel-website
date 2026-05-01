"use client";

import { ArrowLeft, ArrowRight, CheckCircle, PackageSearch, MapPin, Clock, Users, Phone } from "lucide-react";
import Link from "next/link";
import PackageHero from "@/sections/PackageHero";
import PackageCard from "@/components/PackageCard";

const highlights = [
  "Majestic Himalayan Views & Snow-Capped Peaks",
  "Historic Mughal Architecture & Red Fort",
  "Premium Guided Tours in Private AC Vehicles",
  "Shimla & Manali Hill Station Escapes",
  "Varanasi Ganga Aarti Cultural Experience",
];

const dummyPackages = [
  { title: "Delhi – Agra – Jaipur Classic", duration: "5 Nights / 6 Days", price: "24,999" },
  { title: "Kashmir Paradise Retreat", duration: "6 Nights / 7 Days", price: "39,999" },
  { title: "Manali Shimla Adventure", duration: "7 Nights / 8 Days", price: "32,999" },
  { title: "Varanasi Spiritual Journey", duration: "3 Nights / 4 Days", price: "15,999" },
];

export default function NorthIndiaPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <PackageHero 
        title="North India Tour Packages"
        description="From the snow-capped Himalayas to the golden deserts — discover India's heartland in style with our expertly curated north indian itineraries."
        image="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1920"
        badge="Domestic Tour"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/packages" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-all duration-300 hover:-translate-x-1 group text-sm">
          <ArrowLeft className="w-4 h-4 group-hover:scale-110" /> Back to All Packages
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Experience Overview</h2>
              <p className="text-slate-600 leading-[2] text-[16px] font-medium">
                Explore the beauty of North India with destinations like Delhi, Manali, Shimla, and Kashmir. 
                Experience the pristine Himalayas, culturally rich plains, and historic monuments all in one majestic journey. 
                Our expert team ensures seamless transitions between every destination, letting you immerse fully in each unique experience.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-slate-100">
                {[{ icon: Clock, label: "Duration", val: "4–9 Days" }, { icon: Users, label: "Group Size", val: "2–12 Pax" }, { icon: MapPin, label: "Highlights", val: "12+ Cities" }].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="text-center group">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">{label}</p>
                    <p className="font-bold text-slate-900 text-sm mt-1">{val}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Key Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-all duration-200">
                    <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center shrink-0 border border-green-100">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-slate-700 font-semibold text-[15px]">{hl}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Package Cards */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Popular Packages</h2>
                <div className="h-px bg-slate-200 flex-1 mx-8 hidden sm:block" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {dummyPackages.map((pkg, i) => (
                  <PackageCard 
                    key={i} 
                    title={pkg.title} 
                    duration={pkg.duration} 
                    price={pkg.price} 
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-900/20 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
              
              <PackageSearch className="w-14 h-14 mx-auto mb-6 text-blue-400 relative z-10 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-black mb-3 relative z-10 tracking-tight">Need a Custom Trip?</h3>
              <p className="text-slate-400 text-[15px] mb-8 relative z-10 leading-relaxed font-medium">Get a personalized North India itinerary tailored to your specific budget and preferences.</p>
              <Link href="/contact" className="block w-full bg-white text-slate-900 font-black py-4 rounded-2xl shadow-xl hover:bg-blue-50 hover:scale-[1.03] transition-all duration-300 relative z-10">
                Design My Journey
              </Link>
            </div>
            
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm text-center group hover:border-blue-200 transition-colors duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                <Phone className="w-6 h-6 text-blue-600 group-hover:text-white" />
              </div>
              <p className="text-sm font-black text-slate-900 mb-1 tracking-tight">Talk to an Expert</p>
              <p className="text-slate-400 text-xs mb-6 font-medium">Available Mon–Sat, 9am–7pm</p>
              <a href="tel:+919958847804" className="block font-black text-blue-600 text-xl hover:scale-105 transition-transform">+91 9958847804</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
