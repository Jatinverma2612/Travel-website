import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

const services = [
  "Holiday Packages",
  "Corporate Booking",
  "Custom Itineraries",
  "Honeymoon Tours",
  "Travel Insurance",
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-14 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid — 1 col on mobile, 2 on sm, 4 on lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 sm:mb-14">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-extrabold text-white text-lg leading-none">
                  Bharat Yaatra
                </p>
                <p className="text-blue-400 text-[11px] font-semibold tracking-widest uppercase">
                  Travels
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              India&apos;s trusted travel partner since 2009. Premium curated
              packages, expert guides, and unforgettable experiences.
            </p>
            {/* Social circles */}
            <div className="flex gap-2.5">
              {["FB", "TW", "IG", "LI"].map((s) => (
                <span
                  key={s}
                  className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-600 text-gray-400 hover:text-white flex items-center justify-center text-[11px] font-bold cursor-pointer transition-all duration-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-widest">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-1.5 text-sm text-gray-400">
                  <span className="w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-widest">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <span className="text-sm text-gray-400 leading-relaxed">
                  123 Travel Avenue, Connaught Place,
                  <br />
                  New Delhi — 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
                  <Phone className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <a
                  href="tel:+919958847804"
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  +91 9958847804
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
                  <Mail className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <a
                  href="mailto:info@bharatyaatra.com"
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors break-all"
                >
                  info@bharatyaatra.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} Bharat Yaatra Travels Pvt. Ltd. All
            rights reserved.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-5">
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
