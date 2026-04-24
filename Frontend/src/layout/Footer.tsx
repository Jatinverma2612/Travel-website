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
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.7)] pt-16 sm:pt-20 pb-8 relative overflow-hidden">
      {/* Subtle top glare divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700/60 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-8 flex flex-col items-start text-left">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group transition-transform hover:scale-[1.02]">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-500/40 transition-colors">
                <MapPin className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="font-extrabold text-slate-100 text-xl tracking-tight leading-none">
                  Bharat Yatra
                </p>
                <p className="text-blue-500 text-[11px] font-bold tracking-widest uppercase mt-1">
                  Travels
                </p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-8 font-medium">
              India&apos;s trusted travel partner since 2009. Curating premium holiday packages, expert guides, and crafting unforgettable experiences.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-800 hover:border-blue-500/30 transition-all duration-300 hover:scale-105 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:bg-slate-800 hover:border-pink-500/30 transition-all duration-300 hover:scale-105 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:bg-slate-800 hover:border-sky-500/30 transition-all duration-300 hover:scale-105 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="https://wa.me/9958847804" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-green-400 hover:bg-slate-800 hover:border-green-500/30 transition-all duration-300 hover:scale-105 shadow-sm">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-slate-100 mb-6 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-blue-400 transition-all duration-300"
                  >
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blue-400" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-slate-100 mb-6 text-sm uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s.href}>
                  <Link 
                    href={s.href} 
                    className="group flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-blue-400 transition-all duration-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-blue-400 transition-colors shrink-0" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">{s.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-slate-100 mb-6 text-sm uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-300 group-hover:scale-105">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="mt-1 flex-1">
                  <span className="text-sm font-medium text-slate-400 leading-relaxed block group-hover:text-slate-200 transition-colors duration-300">
                    123 Travel Avenue, <br />
                    Connaught Place,<br />
                    New Delhi — 110001
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-300 group-hover:scale-105">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <a
                    href="tel:+919958847804"
                    className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors duration-300 block"
                  >
                    +91 9958847804
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all duration-300 group-hover:scale-105">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <a
                    href="mailto:info@bharatyaatra.com"
                    className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors duration-300 break-all block"
                  >
                    info@bharatyaatra.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm font-medium text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} Bharat Yatra Travels. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3">
            <Link href="/privacy-policy" className="text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-400 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-xs sm:text-sm font-medium text-slate-500 hover:text-blue-400 transition-colors duration-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
