import Link from "next/link";

import { MapPin, Phone, Mail, ArrowRight, MessageCircle } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Read Our Blog" },
];

const services = [
  { href: "/holiday-packages", label: "Holiday Packages" },
  { href: "/corporate-booking", label: "Corporate Booking" },
  { href: "/honeymoon-tours", label: "Honeymoon Tours" },
  { href: "/custom-itineraries", label: "Custom Itineraries" },
  { href: "/travel-insurance", label: "Travel Insurance" },
];

export function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-16 sm:pt-20 pb-8 overflow-hidden border-t border-white/5">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-8 flex flex-col items-start text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-6 group transition-transform hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-500/40 transition-all duration-300">
                <MapPin className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-extrabold text-white text-xl tracking-tight leading-none">
                  Bharat Yatra
                </p>
                <p className="text-blue-500 text-[11px] font-bold tracking-widest uppercase mt-1.5">
                  Travels
                </p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-8 font-medium">
              India&apos;s trusted travel partner since 2009. Curating premium
              holiday packages, expert guides, and crafting unforgettable
              experiences across the subcontinent.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                {
                  label: "Facebook",
                  href: "https://www.facebook.com/BharatYatraTravels/",
                  icon: (
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  ),
                  color: "hover:text-blue-500 hover:border-blue-500/40",
                },
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/bharatyatratravelsbyt/?hl=en",
                  icon: (
                    <>
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </>
                  ),
                  color: "hover:text-pink-500 hover:border-pink-500/40",
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/arvind-verma-795401252/",
                  icon: (
                    <>
                      <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-12h4v2" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </>
                  ),
                  color: "hover:text-blue-400 hover:border-blue-400/40",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-white/10 shadow-lg`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
              <a
                href="https://wa.me/919958847804"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-green-400 hover:border-green-500/40 transition-all duration-300 hover:scale-110 hover:bg-white/10 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-all duration-300"
                  >
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blue-400" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-blue-400 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors shrink-0" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {s.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="space-y-5">
              <a
                href="https://www.google.com/maps?q=Bharat+Yatra+Travels+Shalimar+Garden+Ghaziabad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/40 transition-all duration-300">
                  <MapPin className="h-4 w-4" />
                </div>

                <div className="mt-0.5 flex-1 text-left">
                  <span className="text-sm font-medium text-slate-400 leading-relaxed block group-hover:text-slate-200 transition-colors duration-300">
                    PLOT NO, B, FLAT, 3, NO. SF 89, Shalimar Garden Extension
                    II, <br />
                    Sahibabad, Ghaziabad, Uttar Pradesh 201005
                  </span>
                </div>
              </a>
              <li className="flex items-center gap-4 group ">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/40 transition-all duration-300">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex-1 text-left flex flex-col">
                  <a
                    href="tel:+919958847804"
                    className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    +91 9958847804
                  </a>
                  <a
                    href="tel:+917703909312"
                    className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    +91 7703909312
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/40 transition-all duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex-1 text-left">
                  <a
                    href="mailto:info@bharatyatratravels.com"
                    className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors duration-300 break-all"
                  >
                    info@bharatyatratravels.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm font-medium text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} Bharat Yatra Travels. All rights
            reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3">
            <Link
              href="/privacy-policy"
              className="text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-400 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-400 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              className="text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-400 transition-colors duration-300"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
