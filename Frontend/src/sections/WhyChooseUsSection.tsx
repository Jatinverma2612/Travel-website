"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";
import Link from "next/link";
import AnimatedCounter from "@/components/AnimatedCounter";

const features = [
  {
    title: "Trusted travel service",
    desc: "Over 15 years of experience delivering premium and safe travel experiences across India.",
  },
  {
    title: "Affordable packages",
    desc: "Unbeatable prices and curated itineraries tailored to your budget and preferences.",
  },
  {
    title: "24/7 support",
    desc: "Our dedicated travel experts are always available round-the-clock during your journey.",
  },
  {
    title: "Experienced team",
    desc: "Collaborate with dedicated destination specialists who know India inside out.",
  },
];

const stats = [
  { value: 15, label: "Years Experience", suffix: "+" },
  { value: 10, label: "Happy Travellers", suffix: "K+" },
  { value: 50, label: "Destinations", suffix: "+" },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-2 lg:order-1"
          >
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-2">
              Our Value Guarantee
            </span>
            <span className="block w-12 h-0.5 bg-gradient-to-r from-blue-600 to-amber-400 rounded-full mb-6" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
              Why Choose Bharat Yatra Travels
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-10 max-w-lg">
              We go beyond just booking tickets and hotels. We craft unforgettable memories
              with absolute attention to detail, ensuring every part of your trip is flawless.
            </p>

            <div className="space-y-5 mb-10">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.45, ease: "easeOut" }}
                  className="flex gap-4 group cursor-default"
                >
                  <div className="shrink-0 mt-0.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:scale-110 transition-all duration-300 ease-out">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors duration-200" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[15px] mb-1 group-hover:text-blue-700 transition-colors duration-200">{feature.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-md">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats Strip */}
            <div className="flex flex-wrap gap-6 pt-8 border-t border-slate-100">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  className="text-left"
                >
                  <p className="text-2xl font-extrabold text-blue-600 leading-none">
                    <AnimatedCounter to={s.value} suffix={s.suffix} duration={1.5} />
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wide">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Layout */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="order-1 lg:order-2 relative"
          >
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] lg:aspect-square shadow-2xl shadow-blue-900/10 group">
              <img
                src="https://plus.unsplash.com/premium_photo-1676571232331-787a2c679aee?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Traveller looking at mountains"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </div>

            {/* Floating Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="absolute -bottom-6 -left-6 sm:-left-10 bg-white p-5 sm:p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 z-10"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                <Star className="h-5 w-5 text-amber-500 fill-amber-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Rated</p>
                <p className="font-bold text-gray-900 leading-tight text-sm">4.9/5 by 10,000+<br />Happy Travellers</p>
              </div>
            </motion.div>

            {/* Decorative blurs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl -z-10 opacity-60" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-100 rounded-full blur-3xl -z-10 opacity-60" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
