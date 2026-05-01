"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, Phone, Menu, X, ArrowRight, MessageCircle, ChevronDown, ChevronRight, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/car-rental", label: "Car Rental" },
  { href: "/packages", label: "Packages" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/blog", label: "Blog" },
];

const packagesDropdown = [
  {
    label: "Domestic Tours",
    href: "/packages?type=domestic",
    sub: [
      { label: "North India", href: "/packages/north-india" },
      { label: "South India", href: "/packages/south-india" },
      { label: "Rajasthan", href: "/packages/rajasthan" },
      { label: "Golden Triangle", href: "/packages/golden-triangle" },
    ]
  },
  {
    label: "International Tours",
    href: "/packages?type=international",
    sub: [
      { label: "Bali", href: "/packages/bali" },
      { label: "Dubai", href: "/packages/dubai" },
      { label: "Thailand", href: "/packages/thailand" },
    ]
  }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPkgOpen, setIsPkgOpen] = useState(false);
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const [mobileLevel2Open, setMobileLevel2Open] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) setOpen(false);
    setMobilePackagesOpen(false);
    setMobileLevel2Open(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg shadow-blue-900/5 border-b border-slate-200/50"
          : "bg-white/70 backdrop-blur-[2px] border-b border-white/30"
      }`}
    >
      {/* ── Top Info Bar ── */}
      <div
        className={`w-full bg-slate-900 hidden sm:flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
        style={{ height: scrolled ? 0 : "2.25rem" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center h-9">
          <div className="flex items-center gap-6 text-[11px] font-semibold text-slate-400 tracking-wide">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-400" /> Ghaziabad Uttar Pradesh, India</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-400"/> <a href="mailto:bharatyatra@outlook.com">bharatyatra@outlook.com</a></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400"><Phone className="w-3.5 h-3.5 text-amber-400" /> <a href="tel:+919958847804">+91 9958847804</a></span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400"><Phone className="w-3.5 h-3.5 text-amber-400" /> <a href="tel:+917703910988">+91 7703910988</a></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[64px] sm:h-[70px] items-center justify-between gap-6">

          {/* ── Brand ── */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 transition-transform duration-300 hover:scale-[1.02]">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
              <div className="absolute inset-0 rounded-xl bg-blue-600 group-hover:bg-blue-700 transition-colors duration-300 shadow-lg shadow-blue-600/30" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 to-transparent" />
              <MapPin className="absolute inset-0 m-auto h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>

            <div className="leading-none">
              <span className="font-extrabold text-[16px] sm:text-[18px] text-slate-900 tracking-tight block leading-none">
                Bharat Yatra
              </span>
              <span className="text-blue-600 text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase block mt-1">
                Travels
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              const linkHref = (pathname === "/" && l.href === "/car-rental") ? "#car-rental" : l.href;

              if (l.href === "/packages") {
                return (
                  <div 
                    key={l.href} 
                    className="relative group/pkg px-1 h-[70px] flex items-center"
                    onMouseEnter={() => setIsPkgOpen(true)}
                    onMouseLeave={() => setIsPkgOpen(false)}
                  >
                    <Link
                      href={linkHref}
                      className={`relative text-[14px] font-bold px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-1.5 ${
                        active ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                      }`}
                    >
                      {l.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isPkgOpen ? "rotate-180" : ""}`} />
                      <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full transition-transform duration-300 origin-left ${active || isPkgOpen ? 'scale-x-100' : 'scale-x-0 group-hover/pkg:scale-x-100'}`} />
                    </Link>

                    {/* Mega Dropdown */}
                    <AnimatePresence>
                      {isPkgOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-[68px] left-1/2 -translate-x-1/2 pt-2 z-[60]"
                        >
                          <div className="w-[500px] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200/50 p-6 grid grid-cols-2 gap-8 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent pointer-events-none" />
                            
                            {packagesDropdown.map((d1) => (
                              <div key={d1.label} className="relative z-10">
                                <Link 
                                  href={d1.href} 
                                  className="flex items-center justify-between text-[13px] font-black text-blue-600 uppercase tracking-widest mb-4 px-2"
                                >
                                  {d1.label}
                                  <ArrowRight className="h-3 w-3" />
                                </Link>
                                <div className="space-y-1">
                                  {d1.sub.map((d2) => (
                                    <Link 
                                      key={d2.label} 
                                      href={d2.href} 
                                      className="group/item flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200"
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-blue-500 group-hover/item:scale-150 transition-all duration-300" />
                                      <span className="text-[14px] font-semibold text-slate-600 group-hover/item:text-blue-600 group-hover/item:translate-x-1 transition-all">
                                        {d2.label}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={l.href} 
                  href={linkHref}
                  className={`relative text-[14px] font-bold px-4 py-2 rounded-xl transition-all duration-300 group flex items-center ${
                    active
                      ? "text-blue-600"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  <span className="relative z-10">{l.label}</span>
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full transition-transform duration-300 origin-left ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* <a
              href="tel:+919958847804"
              className="group flex items-center gap-2 text-[13px] text-slate-500 hover:text-blue-600 font-medium transition-all duration-250 px-3.5 py-2 rounded-xl hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Phone className="h-3 w-3 text-blue-600" />
              </span>
              <span>+91 9958847804</span>
            </a> */}

            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.05] active:scale-[0.97] transition-all duration-250"
            >
              Book Now
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* ── Mobile controls ── */}
          <div className="lg:hidden flex items-center gap-1.5">
            <a
              href="https://wa.me/919958847804"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 hover:scale-[1.08] active:scale-[0.95] transition-all duration-200"
              aria-label="WhatsApp us"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <button
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-blue-600 hover:scale-[1.08] active:scale-[0.95] transition-all duration-200"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {open && (
        <div className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-lg border-t border-slate-100 shadow-xl shadow-blue-900/8">
          <div className="px-4 pt-4 pb-6">
            <div className="space-y-1 mb-4">
              {navLinks.map((l) => {
                const active = pathname === l.href;
                const linkHref = (pathname === "/" && l.href === "/car-rental") ? "#car-rental" : l.href;

                if (l.href === "/packages") {
                  return (
                    <div key={l.href} className="bg-transparent rounded-xl overflow-hidden">
                      <button
                        onClick={() => setMobilePackagesOpen(!mobilePackagesOpen)}
                        className={`w-full flex items-center justify-between text-sm font-semibold px-4 py-3 transition-all duration-200 rounded-xl ${
                          active || mobilePackagesOpen ? "text-blue-600 bg-blue-50 border border-blue-100/50" : "text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-transparent"
                        }`}
                      >
                        <span>{l.label}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobilePackagesOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      {mobilePackagesOpen && (
                        <div className="overflow-hidden bg-slate-50/50 rounded-b-xl">
                          <div className="px-3 pt-2 pb-3 space-y-1.5 mt-1 border-t border-slate-100">
                            {packagesDropdown.map(d1 => (
                              <div key={d1.label} className="rounded-lg overflow-hidden border border-slate-100 bg-white shadow-sm">
                                 <button
                                   onClick={() => setMobileLevel2Open(mobileLevel2Open === d1.label ? null : d1.label)}
                                   className="w-full flex items-center justify-between px-3 py-2.5 text-[13px] font-bold text-slate-700 bg-white hover:text-blue-600 transition-colors"
                                 >
                                   <span>{d1.label}</span>
                                   <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${mobileLevel2Open === d1.label ? "rotate-180 text-blue-600" : ""}`} />
                                 </button>
                                 {mobileLevel2Open === d1.label && (
                                   <div className="overflow-hidden bg-slate-50">
                                     <div className="py-2 px-4 space-y-1 mb-2 mt-1 mx-3 border-l-2 border-blue-200">
                                       {d1.sub.map(d2 => (
                                         <Link
                                           key={d2.label}
                                           href={d2.href}
                                           onClick={() => setOpen(false)}
                                           className="block py-2 text-[12.5px] text-slate-500 hover:text-blue-600 font-bold transition-colors"
                                         >
                                           {d2.label}
                                         </Link>
                                       ))}
                                     </div>
                                   </div>
                                 )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={l.href}
                    href={linkHref}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between text-sm font-semibold px-4 py-3 rounded-xl transition-all duration-200 ${
                      active
                        ? "text-blue-600 bg-blue-50 border border-blue-100"
                        : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{l.label}</span>
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="h-px bg-slate-100 mb-4" />

            <div className="space-y-2.5">
              <Link
                href="/booking"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-3.5 rounded-xl shadow-md shadow-blue-600/20 w-full transition-colors duration-200 group"
              >
                Book a Package Now
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/919958847804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-green-50 text-green-700 text-sm font-semibold py-3 rounded-xl hover:bg-green-100 transition-colors duration-200 border border-green-100"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href="tel:+919958847804"
                  className="flex items-center justify-center gap-1.5 bg-slate-50 text-slate-700 text-sm font-semibold py-3 rounded-xl hover:bg-slate-100 transition-colors duration-200 border border-slate-200"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>
              </div>
            </div>

            <p className="text-center text-[11px] text-slate-400 font-medium mt-4">
              ✓ Trusted by 10,000+ Travellers Since 2009
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
