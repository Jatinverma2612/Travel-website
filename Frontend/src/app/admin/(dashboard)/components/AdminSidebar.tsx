"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  BookOpen,
  MessageSquare,
  Users,
  MapPin,
  LogOut,
  X,
  Image as ImageIcon,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, group: "main" },
  { href: "/admin/packages", label: "Manage Packages", icon: Package, group: "main" },
  { href: "/admin/packages/add", label: "Create Package", icon: PlusCircle, group: "main" },
  { href: "/admin/bookings", label: "Trip Bookings", icon: BookOpen, group: "main" },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare, group: "main" },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon, group: "main" },
  { href: "/admin/users", label: "User Access", icon: Users, group: "settings" },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.push("/admin/login");
    }
  };

  const SidebarContent = (
    <div className="flex flex-col h-full bg-[#0f1117] text-slate-400 overflow-y-auto">
      {/* Brand Section */}
      <div className="px-6 py-7 flex items-center justify-between border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 group-hover:scale-105 transition-all duration-300">
            <MapPin className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-black text-white text-sm tracking-tight">Bharat Yatra</p>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Admin Portal</p>
          </div>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 hover:bg-white/5 rounded-lg transition-colors text-slate-500 hover:text-slate-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="px-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] mb-3 mt-1">Main Menu</p>
        {navItems.filter(i => i.group === "main").map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
              className={`group/nav relative flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                active
                  ? "bg-blue-600/15 text-blue-400"
                  : "hover:bg-white/5 hover:text-slate-200 text-slate-500"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-500 rounded-r-full" />
              )}
              <div className="flex items-center gap-2.5">
                <item.icon className={`h-4 w-4 transition-colors ${active ? "text-blue-400" : "text-slate-600 group-hover/nav:text-slate-300"}`} />
                {item.label}
              </div>
              {active && <ChevronRight className="h-3.5 w-3.5 text-blue-500" />}
            </Link>
          );
        })}

        <p className="px-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.25em] mb-3 mt-5">Settings</p>
        {navItems.filter(i => i.group === "settings").map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
              className={`group/nav relative flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                active
                  ? "bg-blue-600/15 text-blue-400"
                  : "hover:bg-white/5 hover:text-slate-200 text-slate-500"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-500 rounded-r-full" />
              )}
              <div className="flex items-center gap-2.5">
                <item.icon className={`h-4 w-4 transition-colors ${active ? "text-blue-400" : "text-slate-600 group-hover/nav:text-slate-300"}`} />
                {item.label}
              </div>
              {active && <ChevronRight className="h-3.5 w-3.5 text-blue-500" />}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout Section */}
      <div className="p-3 border-t border-white/5">
        <div className="bg-white/[0.03] rounded-2xl p-3 border border-white/5">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-black text-white shadow-lg">
              AD
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-white">Bharat Yatra</p>
              <p className="text-[10px] text-slate-500">Super Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="group/logout flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[12px] font-bold bg-transparent text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all w-full border border-white/5 hover:border-red-500/20"
          >
            <LogOut className="h-3.5 w-3.5 group-hover/logout:rotate-12 transition-transform" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 h-screen sticky top-0 flex-col shrink-0 border-r border-white/5">
        {SidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 left-0 bottom-0 w-64 z-[101] lg:hidden"
            >
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
