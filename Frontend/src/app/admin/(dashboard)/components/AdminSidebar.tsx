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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/packages", label: "Manage Packages", icon: Package },
  { href: "/admin/packages/add", label: "Create Package", icon: PlusCircle },
  { href: "/admin/bookings", label: "Trip Bookings", icon: BookOpen },
  { href: "/admin/enquiries", label: "Customer Enquiries", icon: MessageSquare },
  { href: "/admin/users", label: "User Access", icon: Users },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  const SidebarContent = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-400 border-r border-slate-900 overflow-y-auto">
      {/* Brand Section */}
      <div className="px-8 py-8 sm:py-10 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="font-black text-white text-base tracking-tight">Bharat Yaatra</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Admin Control</p>
          </div>
        </Link>
        {/* Close button for mobile */}
        <button 
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-slate-900 rounded-xl transition-colors text-slate-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-1.5">
        <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 mt-2">Main Menu</p>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
              className={`group/nav flex items-center justify-between px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300 ${
                active
                  ? "bg-blue-600/10 text-blue-400 shadow-sm"
                  : "hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`h-4 w-4 transition-colors ${active ? "text-blue-400" : "group-hover/nav:text-slate-200"}`} />
                {item.label}
              </div>
              {active && <div className="w-1 h-4 bg-blue-600 rounded-full" />}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout Section */}
      <div className="p-4">
        <div className="bg-slate-900/50 rounded-3xl p-4 border border-slate-900">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-slate-300">AD</div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-white">Bharat Yaatra</p>
              <p className="text-[10px] text-slate-500">Super Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[12px] font-black bg-slate-800 text-slate-300 hover:bg-red-900/40 hover:text-red-400 hover:border-red-900 transition-all w-full border border-slate-700 shadow-sm"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 h-screen sticky top-0 flex-col shrink-0 border-r border-slate-900">
        {SidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] z-[101] lg:hidden"
            >
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
