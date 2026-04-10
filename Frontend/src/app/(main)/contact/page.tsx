"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Send, Clock, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success("Enquiry sent successfully!");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to send enquiry");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
          </motion.div>
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
                        detail: "123 Travel Avenue, Connaught Place, New Delhi — 110001",
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
                        detail: "info@bharatyaatra.com",
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
                      href="https://wa.me/919876543210"
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
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                      Message Received!
                    </h3>
                    <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto">
                      Thank you for reaching out. One of our destination experts will contact you within working hours.
                    </p>
                    <button 
                        onClick={() => setSubmitted(false)}
                        className="text-blue-600 font-bold hover:underline"
                    >
                        Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="mb-10">
                      <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        Send Us a Message
                      </h2>
                      <p className="text-gray-400 text-sm">Fields marked with * are required to help us serve you better.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                          placeholder="+91 00000 00000"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                          Purpose of Contact
                        </label>
                        <input
                          type="text"
                          value={form.subject}
                          onChange={(e) =>
                            setForm({ ...form, subject: e.target.value })
                          }
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                          placeholder="Package enquiry, Custom itinerary..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                        Specific Details *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none font-medium"
                        placeholder="Tell us more about your group size, travel dates, and preferred destinations..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="group w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-1"
                    >
                      <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      Send My Enquiry
                    </button>
                    
                    <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed font-medium pb-2">
                        By submitting this form, you agree to our privacy policy. One of our experts will contact you for a no-obligation consultation.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
