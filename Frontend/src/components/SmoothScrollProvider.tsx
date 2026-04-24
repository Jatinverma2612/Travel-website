"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease-out
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Sync Lenis scroll position with Framer Motion's scroll engine
    function onScroll() {
      // Dispatch a synthetic scroll event so Framer Motion whileInView triggers properly
      window.dispatchEvent(new Event("scroll"));
    }
    lenis.on("scroll", onScroll);

    // RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose lenis globally so anchor links (#section) still work
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
