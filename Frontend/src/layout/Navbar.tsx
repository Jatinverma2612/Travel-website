"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, Phone, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu whenever route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md shadow-blue-900/5 border-b border-slate-100"
          : "bg-white/98 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[64px] sm:h-[68px] items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="font-extrabold text-base sm:text-lg text-gray-900 tracking-tight block leading-none">
                Bharat Yaatra
              </span>
              <span className="text-blue-600 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase">
                Travels
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-1 items-center">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm font-medium transition-colors px-3 py-2 rounded-lg group ${
                  pathname === l.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {l.label}
                <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919958847804"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="font-medium">+91 9958847804</span>
            </a>
            <Link
              href="/booking"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile: Phone + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="tel:+919958847804"
              className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              className="p-2 rounded-lg text-gray-500 hover:bg-slate-100 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden absolute left-0 right-0 top-full bg-white border-t border-slate-100 shadow-xl shadow-blue-900/10 z-50"
          >
            <div className="px-4 pt-3 pb-6 space-y-1">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={l.href}
                    className={`flex items-center text-sm font-medium px-4 py-3 rounded-xl transition-colors ${
                      pathname === l.href
                        ? "text-blue-600 bg-blue-50 font-semibold"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
                <Link
                  href="/booking"
                  className="flex items-center justify-center bg-blue-600 text-white text-sm font-bold px-4 py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 w-full"
                >
                  Book a Package Now
                </Link>
                <a
                  href="https://wa.me/919958847804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-4 py-3 rounded-xl hover:bg-green-100 transition-colors w-full border border-green-100"
                >
                  <Phone className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
