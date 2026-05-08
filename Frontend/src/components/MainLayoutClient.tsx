"use client";

import dynamic from "next/dynamic";
import { Footer } from "@/layout/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Suspense } from "react";

// Dynamically import Navbar with SSR disabled to prevent build-time context errors
const Navbar = dynamic(() => import("@/layout/Navbar").then(mod => mod.Navbar), {
  ssr: false,
  loading: () => <div className="h-20 bg-white/60 backdrop-blur-md border-b border-white/30" />
});

export default function MainLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
