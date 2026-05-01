"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote, Send, Loader2, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";

import { getAllReviews, type Review } from "@/lib/reviews";
export function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [submittingContact, setSubmittingContact] = useState(false);

  const fetchReviews = async () => {
    try {
      const data = await getAllReviews();
      setReviews(data.slice(0, 3)); // Only show top 3 on homepage
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.message.trim() || !contactForm.email.trim()) {
      toast.error("Name, Email, and details are required!");
      return;
    }
    setSubmittingContact(true);
    try {
      await axiosInstance.post(`/enquiries`, contactForm);
      toast.success("Message sent successfully!");
      setContactSubmitted(true);
      setContactForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: unknown) {
      toast.error("Something went wrong. Try again.");
    } finally {
      setSubmittingContact(false);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
            What Clients Say
          </span>
          <span className="block w-10 h-0.5 bg-gradient-to-r from-blue-600 to-amber-400 rounded-full mt-2 mb-4 mx-auto" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Customer Testimonials
          </h2>
          <p className="mt-4 text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed">
            Real stories from real travellers who trusted Bharat Yatra Travels
            with their precious journeys.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm animate-pulse h-56"
                />
              ))
            : reviews.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/6 hover:border-blue-100/80 transition-all duration-300 cursor-default flex flex-col"
                >
                  {/* Quote icon */}
                  <div className="absolute top-5 right-6 text-blue-50">
                    <Quote className="h-10 w-10 fill-blue-50 text-blue-100" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${j < t.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-gray-600 text-[14.5px] leading-[1.8] mb-6 relative z-10 flex-1 break-words">
                    &ldquo;{t.message || t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-extrabold text-sm shadow-sm shrink-0 uppercase">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm leading-tight">{t.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {t.role || (t.created_at ? new Date(t.created_at).toLocaleDateString() : "Verified Traveller")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="mt-20 max-w-3xl mx-auto rounded-3xl bg-white p-8 sm:p-10 border border-slate-100 shadow-xl shadow-blue-900/5 relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

          {contactSubmitted ? (
            <div className="relative z-10 text-center py-12">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Message Received!</h3>
              <p className="text-gray-500 mb-8 text-lg">One of our destination experts will contact you during assigned working hours.</p>
              <button onClick={() => setContactSubmitted(false)} className="text-blue-600 font-bold hover:underline">
                Send another enquiry
              </button>
            </div>
          ) : (
            <>
              <div className="relative z-10 text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Got Questions? Reach Out</h3>
                <p className="text-sm text-gray-500">Contact our experts directly to plan your perfect getaway.</p>
              </div>

              <form onSubmit={handleContactSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-sm font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-sm font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-sm font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Purpose of Contact</label>
                    <input
                      type="text"
                      placeholder="Package enquiry..."
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-sm font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">Message Details *</label>
                  <textarea
                    required
                    placeholder="Tell us about your trip..."
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-sm font-medium text-gray-800 placeholder:text-gray-400 placeholder:font-normal resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingContact}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                >
                  {submittingContact ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
