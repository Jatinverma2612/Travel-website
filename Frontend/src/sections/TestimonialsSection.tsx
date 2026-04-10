"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

// Fallback testimonials shown while loading or if no reviews exist yet
const fallbackTestimonials = [
  {
    id: "f1",
    name: "Priya Sharma",
    role: "Family Traveller",
    message: "Bharat Yaatra made our Rajasthan trip absolutely unforgettable. Every detail was perfectly handled and the local guides were phenomenal!",
    rating: 5,
  },
  {
    id: "f2",
    name: "Arjun Mehta",
    role: "Frequent Traveller",
    message: "From the Himalayan peaks to Kerala backwaters, Bharat Yaatra curates journeys that touch your soul. Highly recommend to anyone wanting to explore India.",
    rating: 5,
  },
  {
    id: "f3",
    name: "Kavita Nair",
    role: "Honeymoon Couple",
    message: "Our Goa honeymoon was magical. Every detail was perfectly arranged — from the private beach dinner to the luxury resort. Couldn't have asked for more!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/reviews");
        if (res.ok) {
          const data = await res.json();
          // Show only the 3 most recent reviews
          setReviews(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Use real reviews if available, otherwise show fallback
  const displayItems = reviews.length > 0 ? reviews : fallbackTestimonials;

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
            What Clients Say
          </span>
          <span className="block w-10 h-0.5 bg-gradient-to-r from-blue-600 to-amber-400 rounded-full mt-2 mb-3 mx-auto" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Customer Testimonials
          </h2>
          <p className="mt-4 text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed">
            Real stories from real travellers who trusted Bharat Yaatra Travels
            with their precious journeys.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm animate-pulse h-56"
                />
              ))
            : displayItems.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.13, duration: 0.55 }}
                  className="relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-blue-900/8 hover:border-blue-100 transition-all duration-300 cursor-default flex flex-col"
                >
                  {/* Quote icon */}
                  <div className="absolute top-5 right-6 text-blue-100">
                    <Quote className="h-10 w-10 fill-blue-50" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${
                          j < t.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-gray-600 text-[15px] leading-[1.75] mb-7 relative z-10 flex-1 break-words">
                    &ldquo;{t.message || t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-extrabold text-sm shadow-sm shrink-0 uppercase">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm leading-tight">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {t.role || (t.created_at ? new Date(t.created_at).toLocaleDateString() : "Verified Traveller")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
}
