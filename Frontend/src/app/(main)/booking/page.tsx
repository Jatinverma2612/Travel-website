"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CalendarDays, User, Mail, Phone, ShieldCheck, CreditCard, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    packageId: "",
    travellers: "2",
    date: "",
    specialRequests: "",
  });
  const [packagesList, setPackagesList] = useState<any[]>([]);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    fetch(`${API_URL}/api/packages`)
      .then(res => res.json())
      .then(data => setPackagesList(data))
      .catch(err => console.error("Error fetching packages", err));
  }, []);

  const update = (field: string, val: string) =>
    setForm({ ...form, [field]: val });

  const handleBooking = async () => {
    setIsBooking(true);
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          package_id: parseInt(form.packageId),
          date: form.date,
        }),
      });

      if (res.ok) {
        toast.success("Booking confirmed! We'll contact you shortly.");
        setStep(4);
      } else {
        const data = await res.json();
        toast.error(data.message || "Booking failed. Please try again.");
      }
    } catch (err) {
      toast.error("Server connection failed. Please check your connection.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* Header Section */}
      <div className="bg-blue-900 py-16 sm:py-20 text-white overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800/50 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700/30 rounded-full blur-3xl -ml-10 -mb-10" />
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Start Your <span className="text-amber-400 font-black">Bharat</span> Yaatra
            </h1>
            <p className="text-blue-200 text-lg opacity-80 max-w-xl mx-auto">
              Secure your spot for an unforgettable experience in just a few clicks.
            </p>
          </motion.div>

          {/* Steps indicator Progress Bar */}
          <div className="max-w-md mx-auto mt-12 relative flex justify-between items-center px-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 transform ${
                    step >= s
                      ? "bg-amber-400 text-amber-950 scale-110 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                      : "bg-blue-800 text-blue-400 border border-blue-700 hover:border-blue-600"
                  }`}
                >
                  {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s ? "text-amber-400" : "text-blue-400/60"}`}>
                  {s === 1 ? "Trip Details" : s === 2 ? "Personal Info" : "Checkout"}
                </span>
              </div>
            ))}
            {/* Connecting Lines */}
            <div className="absolute top-5 left-8 right-8 h-[2px] bg-blue-800" />
            <motion.div 
               initial={{ width: "0%" }}
               animate={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
               className="absolute top-5 left-8 h-[2px] bg-amber-400"
            />
          </div>
        </div>
      </div>

      <section className="py-14 sm:py-20 relative -mt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[28px] sm:rounded-[40px] shadow-2xl shadow-blue-900/10 p-6 sm:p-8 md:p-14 border border-slate-100">
            {/* Step 1: Trip Details */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="border-l-4 border-blue-600 pl-6 mb-10">
                  <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    Tell us where we&apos;re going
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Select your preferred package and travel window.</p>
                </div>

                <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Choose Destination Package *
                      </label>
                      <div className="relative">
                        <select
                          value={form.packageId}
                          onChange={(e) => update("packageId", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Search for a journey...</option>
                          {packagesList.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.title} — From ₹{p.price.toLocaleString()}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                          Proposed Travel Date *
                        </label>
                        <div className="relative">
                          <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="date"
                            value={form.date}
                            onChange={(e) => update("date", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                          Group Size (Pax)
                        </label>
                        <select
                          value={form.travellers}
                          onChange={(e) => update("travellers", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "Traveller" : "Travellers"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                        Any specific preferences? (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={form.specialRequests}
                        onChange={(e) => update("specialRequests", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Dietary requirements, room types, or celebration plans..."
                      />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!form.packageId || !form.date}
                      className="group w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-1"
                    >
                      Continue to Details
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="text-center text-[10px] text-gray-400 mt-4 font-medium uppercase tracking-[0.2em]">Step 1 of 3 Complete</p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="border-l-4 border-blue-600 pl-6 mb-10">
                  <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    Passenger Contact Detail
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Provide information for the primary contact person.</p>
                </div>

                <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                        Full Name of Primary Traveller *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => update("email", e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                            WhatsApp / Mobile Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={(e) => update("phone", e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-gray-600 font-bold py-4 sm:py-5 rounded-2xl transition-all text-sm sm:text-base"
                  >
                    ← Modify Trip
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!form.name || !form.email || !form.phone}
                    className="group flex-[2] bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 sm:py-5 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-1 text-sm sm:text-base"
                  >
                    Proceed to Payment
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                <div className="border-l-4 border-blue-600 pl-6 mb-10">
                  <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    Final Checkout
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">Review your summary and make secure payment.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                    {/* Booking Summary */}
                    <div className="space-y-6">
                         <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100 space-y-4">
                          {(() => {
                            const pkg = packagesList.find((p) => p.id === parseInt(form.packageId));
                            const total = (pkg?.price || 0) * parseInt(form.travellers);
                            return (
                              <>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-slate-200 pb-3 mb-4">Journey Summary</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-400">Selected Package</span>
                                      <span className="font-bold text-gray-900">{pkg?.title}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-400">Travel Date</span>
                                      <span className="font-bold text-gray-900">{form.date}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-400">Group Size</span>
                                      <span className="font-bold text-gray-900">{form.travellers} Travellers</span>
                                    </div>
                                </div>
                                <div className="pt-6 mt-6 border-t border-blue-100 flex items-center justify-between">
                                  <div className="flex flex-col">
                                    <span className="text-xs font-bold text-blue-600 uppercase">Grand Total Amount</span>
                                    <span className="text-[10px] text-gray-400">Incl. of all applicable GST</span>
                                  </div>
                                  <span className="font-black text-blue-800 text-3xl">
                                    ₹{total.toLocaleString()}
                                  </span>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="space-y-6">
                         <h3 className="font-bold text-gray-900 flex items-center gap-2">
                           <CreditCard className="h-5 w-5 text-blue-600" />
                           Secure Payment
                         </h3>
                         <div className="space-y-4">
                           <div className="space-y-2">
                             <input
                               type="text"
                               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                               placeholder="Card Number"
                             />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                             <input
                               type="text"
                               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                               placeholder="MM / YY"
                             />
                             <input
                               type="text"
                               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                               placeholder="CVV"
                             />
                           </div>
                           <div className="flex items-center gap-2.5 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                             <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                             <span className="text-[10px] text-blue-600/70 font-medium">
                               Bank-grade 256-bit SSL encrypted. Payment details are not stored on our servers.
                             </span>
                           </div>
                         </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-10 mt-10 border-t border-slate-50">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-gray-600 font-bold py-5 rounded-2xl transition-all"
                  >
                    ← Edit Info
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="flex-[2] bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-amber-950 font-extrabold py-5 rounded-2xl shadow-xl shadow-amber-400/30 transition-all hover:-translate-y-1"
                  >
                    {isBooking ? "Processing..." : "Confirm Booking & Pay"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Success */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-green-50 rounded-[30px] flex items-center justify-center mx-auto mb-10 shadow-xl shadow-green-500/10">
                   <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                  Voyage Confirmed!
                </h2>
                <div className="inline-block bg-blue-50 border border-blue-100 rounded-2xl px-6 py-3 mb-8">
                    <p className="text-sm text-gray-500">
                      Booking Reference:{" "}
                      <span className="font-extrabold text-blue-600 tracking-wider">#BYT-{new Date().getFullYear()}-{Math.floor(Math.random() * 90000) + 10000}</span>
                    </p>
                </div>
                <p className="text-gray-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
                  We&apos;ve sent a digital receipt and itinerary to <span className="text-blue-600">{form.email}</span>. Your dedicated travel manager will call you shortly.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl shadow-green-500/20"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Contact Tour Manager
                    </a>
                    <a
                      href="/"
                      className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 border border-slate-200 font-bold px-10 py-5 rounded-2xl hover:bg-slate-50 transition-all font-bold"
                    >
                      Return to Home
                    </a>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      
      {/* Branding signals */}
      <div className="max-w-4xl mx-auto px-4 pb-16 sm:pb-24 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
         {[
           { label: "100% Refund", sub: "Cancellation Policy" },
           { label: "Secure Payment", sub: "Encrypted Transactions" },
           { label: "Instant Help", sub: "24/7 Dedicated Support" }
         ].map(sig => (
           <div key={sig.label}>
             <p className="font-bold text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">{sig.sub}</p>
             <p className="font-extrabold text-blue-900 text-base">{sig.label}</p>
           </div>
         ))}
      </div>
    </div>
  );
}
