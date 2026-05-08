"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { ContactForm } from "@/features/enquiries/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* Page Header */}
      <div
        className="relative py-20 sm:py-32 text-white overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1423592707957-3b212afa6733?auto=format&fit=crop&q=80&w=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-[2px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <span className="inline-block bg-amber-400 text-amber-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Connect With Our Experts
            </h1>
            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full mb-6" />
            <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed opacity-90">
              Planning your dream India tour? Our travel specialists are ready to curate the perfect experience for you.
            </p>
          </div>
        </div>
      </div>

      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Left Column: Contact Sidebar */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">
                  Reach Us Directly
                </h2>
                <div className="space-y-4">
                    {[
                      {
                        icon: MapPin,
                        title: "Our Headquaters",
                        detail: "PLOT NO, B, FLAT, 3, NO. SF 89, Shalimar Garden Extension, II, Sahibabad, Ghaziabad, Uttar Pradesh 201005",
                        color: "bg-blue-100 text-blue-600"
                      },
                      {
                        icon: Phone,
                        title: "Call for Enquiry",
                        detail: "+91 9958847804",
                        color: "bg-amber-100 text-amber-600"
                      },
                      {
                        icon: Mail,
                        title: "Official Email",
                        detail: "info@bharatyatratravels.com",
                        color: "bg-indigo-100 text-indigo-600"
                      },
                    ].map((c) => (
                      <div
                        key={c.title}
                        className="group flex gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className={`w-12 h-12 ${c.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                          <c.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                            {c.title}
                          </p>
                          <p className="text-gray-700 text-[14px] font-medium leading-relaxed leading-snug">{c.detail}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Instant Chat */}
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Need Instant Help?</h3>
                    <p className="text-sm text-gray-500 mb-6">Our WhatsApp support is active 24/7 for urgent travel queries.</p>
                    <a
                      href="https://wa.me/919958847804"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-green-500/20 w-full"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Chat on WhatsApp
                    </a>
                </div>
                {/* Decoration */}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-green-50 rounded-full blur-2xl" />
              </div>

              {/* Availability */}
              <div className="bg-slate-900 rounded-3xl p-8 text-white relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <Clock className="h-5 w-5 text-amber-400" />
                    </div>
                    <h4 className="font-bold">Business Hours</h4>
                </div>
                <div className="space-y-4 text-sm text-gray-300">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                        <span className="opacity-60 font-medium">Mon — Sat</span>
                        <span className="font-bold text-white">9:00 AM — 7:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="opacity-60 font-medium">Sunday</span>
                        <span className="font-bold text-amber-400">10:00 AM — 4:00 PM</span>
                    </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[28px] sm:rounded-[40px] shadow-sm border border-slate-100 p-6 sm:p-8 md:p-12">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
