"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { motion } from "framer-motion";
import {
  Package,
  BookOpen,
  PlusCircle,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Phone,
  Tag,
  Activity,
} from "lucide-react";
import Link from "next/link";

interface PackageData {
  id: string | number;
  title: string;
}

interface BookingData {
  id: string | number;
  name: string;
  status: string;
  package?: PackageData;
}

interface EnquiryData {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function AdminDashboard() {
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryData[]>([]);

  useEffect(() => {
    axiosInstance.get('/packages')
      .then(res => Array.isArray(res.data) && setPackages(res.data))
      .catch(console.error);

    axiosInstance.get('/bookings')
      .then(res => Array.isArray(res.data) && setBookings(res.data))
      .catch(console.error);

    axiosInstance.get('/enquiries')
      .then(res => Array.isArray(res.data) && setEnquiries(res.data))
      .catch(console.error);
  }, []);

  const overviewCards = [
    {
      label: "Packages",
      value: packages.length,
      icon: Package,
      gradient: "from-blue-500 to-blue-700",
      shadow: "shadow-blue-500/20",
      bg: "bg-blue-50",
      text: "text-blue-600",
      change: "+2 this month",
      link: "/admin/packages",
    },
    {
      label: "Bookings",
      value: bookings.length,
      icon: BookOpen,
      gradient: "from-amber-400 to-orange-500",
      shadow: "shadow-amber-500/20",
      bg: "bg-amber-50",
      text: "text-amber-600",
      change: "+12 this month",
      link: "/admin/bookings",
    },
    {
      label: "Enquiries",
      value: enquiries.length,
      icon: MessageSquare,
      gradient: "from-emerald-400 to-teal-600",
      shadow: "shadow-emerald-500/20",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      change: "+8 this week",
      link: "/admin/enquiries",
    },
    {
      label: "Confirmed",
      value: bookings.filter(b => b.status === "confirmed").length,
      icon: Activity,
      gradient: "from-violet-500 to-purple-700",
      shadow: "shadow-violet-500/20",
      bg: "bg-violet-50",
      text: "text-violet-600",
      change: "All time",
      link: "/admin/bookings",
    },
  ];

  return (
    <div className="p-5 sm:p-8 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Live</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening at Bharat Yatra.</p>
      </motion.div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {overviewCards.map((card, i) => (
          <motion.div
            key={card.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <Link
              href={card.link}
              className="group relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4 block"
            >
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg ${card.shadow} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className="h-5 w-5 text-white" />
                </div>
                <span className={`text-[10px] font-bold ${card.text} ${card.bg} px-2.5 py-1 rounded-full`}>
                  {card.change}
                </span>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{card.value}</p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mt-0.5">{card.label}</p>
              </div>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${card.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="xl:col-span-3"
        >
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">Recent Bookings</h2>
                <p className="text-xs text-slate-400 mt-0.5">Latest trip booking activity</p>
              </div>
              <Link
                href="/admin/bookings"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200"
              >
                View All <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-50">
              {bookings.length === 0 ? (
                <div className="py-12 text-center text-slate-300 text-sm">No bookings yet</div>
              ) : bookings.slice(0, 6).map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  className="group flex items-center justify-between px-6 py-4 hover:bg-slate-50/80 transition-colors duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-sm font-black text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shrink-0">
                      {b.name?.charAt(0) || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{b.name}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[160px]">{b.package?.title || "—"}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      b.status === "confirmed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}>
                      {b.status === "confirmed" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      <span className="capitalize">{b.status}</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Enquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="xl:col-span-2"
        >
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden h-full">
            <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">Enquiries</h2>
                <p className="text-xs text-slate-400 mt-0.5">Incoming customer leads</p>
              </div>
              <Link
                href="/admin/packages/add"
                className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-blue-600 transition-colors duration-200 shadow-sm"
              >
                <PlusCircle className="h-4 w-4" />
              </Link>
            </div>

            <div className="divide-y divide-slate-50 overflow-y-auto max-h-[420px]">
              {enquiries.length === 0 ? (
                <div className="py-12 text-center text-slate-300 text-sm">No enquiries yet</div>
              ) : enquiries.slice(0, 8).map((e, i) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 + i * 0.05 }}
                  className="group flex items-start gap-3 px-6 py-4 hover:bg-indigo-50/40 transition-colors duration-150"
                >
                  <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-xs font-black shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200 uppercase">
                    {e.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-800 truncate">{e.name}</p>
                      <span className="text-[9px] bg-blue-100 text-blue-600 font-bold px-2 py-0.5 rounded-full ml-2 shrink-0">New</span>
                    </div>
                    <p className="text-[11px] text-indigo-500 font-medium truncate mt-0.5">{e.email}</p>
                    {(e.phone || e.subject) && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {e.phone && (
                          <span className="flex items-center gap-1 text-[10px] text-slate-500">
                            <Phone className="h-2.5 w-2.5" />{e.phone}
                          </span>
                        )}
                        {e.subject && (
                          <span className="flex items-center gap-1 text-[10px] text-blue-500 font-semibold">
                            <Tag className="h-2.5 w-2.5" />{e.subject}
                          </span>
                        )}
                      </div>
                    )}
                    <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 italic leading-relaxed">
                      &ldquo;{e.message}&rdquo;
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="px-6 py-4 border-t border-slate-50">
              <Link
                href="/admin/enquiries"
                className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                View all enquiries <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { label: "Add Package", href: "/admin/packages/add", icon: PlusCircle, color: "hover:bg-blue-600 hover:border-blue-600" },
          { label: "View Bookings", href: "/admin/bookings", icon: BookOpen, color: "hover:bg-amber-500 hover:border-amber-500" },
          { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare, color: "hover:bg-emerald-500 hover:border-emerald-500" },
          { label: "Gallery", href: "/admin/gallery", icon: TrendingUp, color: "hover:bg-violet-600 hover:border-violet-600" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`group flex items-center gap-2.5 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md ${action.color}`}
          >
            <action.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
            {action.label}
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
