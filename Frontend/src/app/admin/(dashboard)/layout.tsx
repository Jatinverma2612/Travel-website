"use client";

import { useState } from "react";
import { AdminSidebar } from "./components/AdminSidebar";
import { AuthGuard } from "./components/AuthGuard";
import { Menu, MapPin } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Handles both mobile drawer and desktop fixed */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-40">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-sm tracking-tight text-nowrap">Dashboard</span>
          </Link>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1">
          <AuthGuard>{children}</AuthGuard>
        </main>
      </div>
    </div>
  );
}
