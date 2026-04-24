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
      {/* Multi-layer dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/92 via-blue-900/85 to-blue-800/75" />

      {/* Decorative blurs */}
      <div className="absolute -top-20 -right-20 w-72 sm:w-96 h-72 sm:h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 sm:w-[28rem] h-80 sm:h-[28rem] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Badge */}
          <span className="inline-block glass-dark text-amber-300 text-xs font-bold px-5 py-1.5 rounded-full uppercase tracking-widest mb-6 sm:mb-7 border border-amber-400/20">
            Plan Your Journey Today
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            Ready to Explore India?
          </h2>
          <p className="text-blue-200/85 text-base sm:text-lg mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Get in touch with our travel experts for a customised package
            tailored to your budget and preferences.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              href="/booking"
              id="cta-book-btn"
              className="btn-primary glow-gold inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base group"
            >
              Book a Package
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://wa.me/9958847804"
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp-btn"
              className="btn-primary inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              id="cta-contact-btn"
              className="btn-ghost inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base border border-white/20 backdrop-blur-sm"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </Link>
          </div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-blue-300/70 text-xs font-medium"
          >
            <span>✓ No booking fee</span>
            <span className="text-blue-700 hidden sm:inline">•</span>
            <span>✓ Free cancellation within 48hrs</span>
            <span className="text-blue-700 hidden sm:inline">•</span>
            <span>✓ 24/7 travel support</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
