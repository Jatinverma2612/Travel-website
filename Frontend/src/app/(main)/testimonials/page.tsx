"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote, Award, Users, ThumbsUp, Medal, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";
import { getAllReviews, type Review } from "@/lib/reviews";

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", rating: 5, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post(`/reviews`, formData);

      const newReview = res.data;
      setReviews([newReview, ...reviews]);
      toast.success("Review submitted successfully!");
      setFormData({ name: "", rating: 5, message: "" });
      setShowForm(false);
    } catch (error: unknown) {
      // Handled by interceptor, or fallback toast
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-24">
      {/* Page Header */}
      <div
        className="relative py-32 text-white overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blue-950/85 backdrop-blur-[1px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-amber-400 text-amber-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              Voice of Travellers
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Verified Customer Stories
            </h1>
            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full mb-6" />
            <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed opacity-90">
              See what our community has to say about their soulful journeys through India.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Trust Metrics Section */}
      <section className="relative -mt-10 mb-14 sm:mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
            {[
              { value: "4.9/5", label: "Global Rating", icon: Star, color: "bg-amber-100 text-amber-600" },
              { value: "10K+", label: "Happy Souls", icon: Users, color: "bg-blue-100 text-blue-600" },
              { value: "98%", label: "Satisfaction", icon: ThumbsUp, color: "bg-green-100 text-green-600" },
              { value: "15+", label: "Legacy Years", icon: Medal, color: "bg-indigo-100 text-indigo-600" },
            ].map((s, i) => (
              <motion.div 
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5 text-center border border-slate-100 flex flex-col items-center justify-center"
              >
                <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-4`}>
                    <s.icon className="h-5 w-5" />
                </div>
                <p className="text-2xl md:text-3xl font-black text-gray-900 mb-1 leading-tight tracking-tight">
                  {s.value}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Reviews Grid */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {loading ? (
              <div className="col-span-full py-20 text-center text-gray-500 font-medium">
                Loading stories...
              </div>
            ) : reviews.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-500 font-medium">
                No reviews yet. Be the first to share your experience!
              </div>
            ) : reviews.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="group relative bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-slate-100/80 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-100 transition-all duration-400 flex flex-col"
              >
                {/* Visual Accent */}
                <div className="absolute top-10 right-8 text-slate-50 group-hover:text-blue-50 transition-colors">
                  <Quote className="h-12 w-12 fill-current" />
                </div>

                {/* Rating Stars */}
                <div className="flex gap-1 mb-6 relative z-10">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`h-4 w-4 ${
                        j < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-100 text-slate-100"
                      }`}
                    />
                  ))}
                </div>

                {/* Body Text */}
                <p className="text-gray-600 leading-[1.8] mb-10 text-[15px] font-medium relative z-10 flex-1 break-words">
                  &ldquo;{t.message}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-8 border-t border-slate-50">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-black text-sm shadow-inner shrink-0 uppercase">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900 text-[15px] tracking-tight leading-none mb-1.5">
                      {t.name}
                    </p>
                    <p className="text-[11px] text-blue-600/60 font-bold uppercase tracking-wider leading-none">
                      {t.created_at ? new Date(t.created_at).toLocaleDateString() : t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center"
      >
        <div className="bg-blue-600 rounded-[40px] p-8 md:p-12 text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative z-10"
              >
                <h3 className="text-2xl md:text-3xl font-black mb-4">Wanna share your journey?</h3>
                <p className="text-blue-100/70 mb-8 max-w-lg mx-auto leading-relaxed">Join thousands of travellers and share your review to help others find their perfect Bharat Yatra.</p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="bg-white text-blue-600 font-black px-10 py-5 rounded-2xl shadow-xl hover:bg-slate-50 transition-all hover:-translate-y-1"
                >
                  Write a Review
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[32px] p-8 text-left max-w-2xl mx-auto relative z-10 shadow-2xl"
              >
                <button 
                  onClick={() => setShowForm(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
                <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Share Your Experience</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest px-1 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                      placeholder="e.g. Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest px-1 mb-2">
                      Rating *
                    </label>
                    <div className="flex gap-2 px-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star className={`h-8 w-8 ${formData.rating >= star ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest px-1 mb-2">
                      Your Review *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium resize-none"
                      placeholder="Tell us about your trip..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
                  >
                    {isSubmitting ? "Submitting..." : (
                      <>
                        <Send className="h-5 w-5" />
                        Submit Review
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
