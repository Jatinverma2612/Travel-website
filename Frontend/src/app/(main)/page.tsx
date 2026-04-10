"use client";

import { motion } from "framer-motion";
import { HeroSection } from "@/sections/HeroSection";
import { DestinationsSection } from "@/sections/DestinationsSection";
import { FeaturedPackages } from "@/sections/FeaturedPackages";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { CTASection } from "@/sections/CTASection";
import { Shield, Clock, Headphones, Award } from "lucide-react";

const whyUs = [
  {
    icon: Shield,
    title: "100% Safe & Secure",
    desc: "All packages include travel insurance and verified accommodation.",
    color: "bg-blue-600",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Our travel experts are available round-the-clock during your trip.",
    color: "bg-indigo-600",
  },
  {
    icon: Award,
    title: "Award Winning",
    desc: "Recognised as India's top travel agency for 5 consecutive years.",
    color: "bg-amber-500",
  },
  {
    icon: Headphones,
    title: "Expert Guidance",
    desc: "Personalised itinerary planning by destination specialists.",
    color: "bg-teal-600",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Why Choose Us strip */}
      <section className="relative -mt-1 py-14 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.22 } }}
                className="flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 hover:shadow-md hover:shadow-blue-900/5 transition-all duration-300 cursor-default"
              >
                <div
                  className={`w-12 h-12 ${w.color} rounded-2xl flex items-center justify-center mb-4 shadow-sm`}
                >
                  <w.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5 leading-snug">
                  {w.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {w.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DestinationsSection />
      <FeaturedPackages />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
