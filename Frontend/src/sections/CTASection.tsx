"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      id="cta"
    >
      {/* Dual overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/85 to-blue-800/75" />

      {/* Decorative circle blur */}
      <div className="absolute -top-20 -right-20 w-64 sm:w-80 h-64 sm:h-80 bg-amber-400/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 sm:w-96 h-72 sm:h-96 bg-blue-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Badge */}
          <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 sm:mb-7 backdrop-blur-sm">
            Plan Your Journey Today
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-5 leading-tight tracking-tight">
            Ready to Explore India?
          </h2>
          <p className="text-blue-200/90 text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Get in touch with our travel experts for a customised package
            tailored to your budget and preferences.
          </p>

          {/* Buttons — stack on mobile */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              href="/booking"
              id="cta-book-btn"
              className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/30 hover:-translate-y-0.5 active:translate-y-0 group"
            >
              Book a Package
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="https://wa.me/9958847804"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp-btn"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/30 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              id="cta-contact-btn"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base border border-white/20 transition-all duration-300 backdrop-blur-sm"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Link>
          </div>

          {/* Trust signals — wrap cleanly on mobile */}
          <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-blue-300/70 text-xs font-medium">
            <span>✓ No booking fee</span>
            <span className="text-blue-700 hidden sm:inline">•</span>
            <span>✓ Free cancellation within 48hrs</span>
            <span className="text-blue-700 hidden sm:inline">•</span>
            <span>✓ 24/7 travel support</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
