"use client";

import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* 
          We remove top padding on the home page so the Hero can 
          naturally flow behind the fixed transparent navbar.
      */}
      <main className={`flex-grow ${isHomePage ? "pt-0" : "pt-20 sm:pt-24"}`}>
        {children}
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
