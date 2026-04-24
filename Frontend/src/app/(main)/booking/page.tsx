"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";

export default function BookingPage() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");
  const packageTitle = searchParams.get("packageTitle");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    package_id: packageId || "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axiosInstance.get(`/api/packages`);
        setPackages(res.data);
      } catch (error) {
        console.error("Failed to load packages");
      }
    };
    fetchPackages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.package_id) {
      toast.error("Please select a package");
      return;
    }

    try {
      await axiosInstance.post(`/api/bookings`, form);

      setSubmitted(true);
      toast.success("Message sent successfully");
    } catch (error) {
      // toast error handled by interceptor
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl sm:rounded-[40px] shadow-sm border border-slate-100 p-6 sm:p-10 md:p-12">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Request Received!
              </h1>
              <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto">
                Our team will contact you shortly to confirm your itinerary and proceed with the booking.
              </p>
              <button
                onClick={() => window.location.href = "/packages"}
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
              >
                Browse more packages <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="mb-10 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                  Request to Book
                </h1>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  Provide your details and we will seamlessly handle the rest. No payment required right now.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Selected Package *
                  </label>
                  <select
                    required
                    value={form.package_id}
                    onChange={(e) => setForm({ ...form, package_id: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-900"
                  >
                    <option value="" disabled>Select a destiny...</option>
                    {packageTitle && !packages.find(p => p.id.toString() === form.package_id) && (
                       <option value={form.package_id}>{packageTitle}</option>
                    )}
                    {packages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
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
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    placeholder="+91 00000 00000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    Additional Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none font-medium"
                    placeholder="Dietary requirements, special celebrations, or travel dates..."
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center transition-all hover:-translate-y-1"
                >
                  Confirm Booking Request
                </button>
              </div>

              <div className="pt-4 flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Secure & Private</span>
                </div>
                <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                  Your information is safely processed. A representative will contact you to finalize the payment and dates.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
