"use client";

import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="p-3 bg-white border border-slate-200 text-slate-600 rounded-full shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all active:scale-95"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/919958847804"
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 bg-green-500 text-white rounded-full shadow-xl hover:shadow-2xl hover:bg-green-600 transition-all active:scale-95"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Call CTA */}
      <a
        href="tel:+919958847804"
        className="p-4 bg-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:bg-blue-700 transition-all active:scale-95"
        aria-label="Call us"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
