"use client";

import React, { useState } from "react";
import { AdminSidebar } from "./components/AdminSidebar";
import { Menu, Bell, Search, MapPin } from "lucide-react";
import { AuthGuard } from "./components/AuthGuard";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-slate-50">
        {/* Sidebar Component */}
        <AdminSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          
          {/* Admin Header */}
          <header className="h-16 shrink-0 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-50">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-600"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Search Bar - Desktop */}
              <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 w-64 text-slate-400 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/10 transition-all">
                <Search className="h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search dashboard..." 
                  className="bg-transparent border-none text-xs text-slate-600 focus:outline-none w-full"
                />
              </div>

              {/* Brand - Mobile */}
              <div className="lg:hidden flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white" />
                 </div>
                 <span className="font-black text-slate-900 text-sm tracking-tight">Bharat Yatra</span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              
              <div className="h-8 w-[1px] bg-slate-100 mx-1 hidden sm:block" />
              
              <div className="flex items-center gap-3 pl-1">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-slate-900 leading-tight">Admin User</p>
                  <p className="text-[10px] text-slate-400 font-medium">Access: Super</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-blue-600/20 ring-2 ring-white">
                  AD
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-slate-50/50">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
