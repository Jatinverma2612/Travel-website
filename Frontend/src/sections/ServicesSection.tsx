"use client";

import { motion } from "framer-motion";
import { Palmtree, HeartPulse, Building2, Map } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Palmtree,
    title: "Holiday Packages",
    desc: "All-inclusive curated tours covering flights, hotels, and local sightseeing for a completely stress-free getaway.",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    href: "/holiday-packages",
    accent: "border-blue-200 group-hover:border-blue-400/50",
  },
  {
    icon: HeartPulse,
    title: "Honeymoon Tours",
    desc: "Romantic, tailor-made getaways with special arrangements like candlelit dinners, couple spas, and privacy.",
    color: "from-rose-400 to-rose-500",
    bg: "bg-rose-50",
    iconColor: "text-rose-500",
    href: "/honeymoon-tours",
    accent: "border-rose-200 group-hover:border-rose-400/50",
  },
  {
    icon: Building2,
    title: "Corporate Booking",
    desc: "Seamless business travel management, MICE tours, team offsites, and bulk flight reservations at best rates.",
    color: "from-slate-700 to-slate-800",
    bg: "bg-slate-100",
    iconColor: "text-slate-700",
    href: "/corporate-booking",
    accent: "border-slate-200 group-hover:border-slate-400/50",
  },
  {
    icon: Map,
    title: "Custom Itineraries",
    desc: "Handcrafted journeys built perfectly around your interests, timeline, dietary needs, and budget preferences.",
    color: "from-amber-400 to-amber-500",
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
    href: "/custom-itineraries",
    accent: "border-amber-200 group-hover:border-amber-400/50",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 sm:mb-18"
        >
          <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">
            What We Do
          </span>
          <span className="block w-10 h-0.5 bg-gradient-to-r from-blue-600 to-amber-400 rounded-full mt-2 mb-4 mx-auto" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Our Premium Services
          </h2>
          <p className="mt-4 text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed">
            Everything you need for the perfect journey. Choose from our wide range of services curated just for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
              className={`group card-glass glow-blue rounded-2xl p-7 relative overflow-hidden flex flex-col items-start border ${service.accent}`}
            >
              {/* Top Gradient Line on Hover */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`} />

              {/* Icon */}
              <div className={`w-13 h-13 w-14 h-14 ${service.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out shadow-sm`}>
                <service.icon className={`h-6 w-6 ${service.iconColor}`} />
              </div>

              <h3 className="text-[17px] font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors duration-200">
                {service.title}
              </h3>

              <p className="text-gray-500 text-[13.5px] leading-relaxed flex-1 mb-5">
                {service.desc}
              </p>

              <Link
                href={service.href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors duration-200 group/link"
              >
                Learn more
                <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">→</span>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
