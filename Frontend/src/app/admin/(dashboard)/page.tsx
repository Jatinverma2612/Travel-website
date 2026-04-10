"use client";
import { useState, useEffect } from "react";
import {
  Package,
  BookOpen,
  PlusCircle,
  MessageSquare,
  TrendingUp,
  Search,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Bell,
  User,
  Settings,
  Phone,
  Tag
} from "lucide-react";

export default function AdminDashboard() {
  const [packages, setPackages] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const headers = { "Authorization": `Bearer ${token}` };

    fetch("http://localhost:5000/api/packages")
      .then(res => res.json())
      .then(data => Array.isArray(data) && setPackages(data))
      .catch(console.error);

    fetch("http://localhost:5000/api/bookings", { headers })
      .then(res => res.json())
      .then(data => Array.isArray(data) && setBookings(data))
      .catch(console.error);

    fetch("http://localhost:5000/api/enquiries", { headers })
      .then(res => res.json())
      .then(data => Array.isArray(data) && setEnquiries(data))
      .catch(console.error);
  }, []);

  const overviewCards = [
    {
      label: "Total Packages",
      value: packages.length,
      icon: Package,
      color: "bg-blue-600 shadow-blue-600/30",
      change: "+2 this month",
      trending: true
    },
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: BookOpen,
      color: "bg-amber-500 shadow-amber-500/30",
      change: "+12 this month",
      trending: true
    },
    {
      label: "Enquiries",
      value: enquiries.length,
      icon: MessageSquare,
      color: "bg-emerald-500 shadow-emerald-500/30",
      change: "+8 this week",
      trending: true
    },
    {
      label: "Revenue",
      value: "Live calculating..",
      icon: TrendingUp,
      color: "bg-indigo-600 shadow-indigo-600/30",
      change: "+15% vs last month",
      trending: true
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-slate-50/30 min-h-screen">
      {/* Dynamic Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Overview Dashboard</h1>
          <p className="text-slate-400 text-sm font-medium">Monitoring Bharat Yaatra&apos;s real-time activities.</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Quick search..." 
                    className="pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-slate-200 rounded-2xl text-[13px] font-medium focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all w-44 sm:w-64 shadow-sm"
                />
            </div>
            <button className="relative p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                <Bell className="h-4 w-4 text-slate-600" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white" />
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                <Settings className="h-4 w-4 text-slate-600" />
            </button>
        </div>
      </header>

      {/* Overview Cards Container */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
        {overviewCards.map((card) => (
          <div
            key={card.label}
            className="group relative bg-white rounded-[32px] p-8 border border-slate-100/80 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-8">
              <div
                className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}
              >
                <card.icon className="h-7 w-7 text-white" />
              </div>
              <span className="text-[10px] text-emerald-600 font-black bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
                <TrendingUp className="h-3 w-3" />
                {card.change}
              </span>
            </div>
            <p className="text-4xl font-black text-slate-900 mb-1 tracking-tight">
              {card.value}
            </p>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 lg:gap-10">
        
        {/* Recent Bookings Section (60% width) */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-100/80 p-10 shadow-sm">
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Live Trip Bookings</h2>
                <p className="text-xs text-slate-400 font-medium">Showing latest confirmations from the booking portal.</p>
              </div>
              <a
                href="/admin/bookings"
                className="group inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-black px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-inner"
              >
                History Logs <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="space-y-6">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="group flex items-center justify-between p-4 hover:bg-slate-50 rounded-[28px] transition-all duration-300 border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-sm font-black text-blue-600 shadow-sm">
                      {b.name.charAt(0)}
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-black text-slate-900">
                        {b.name}
                      </p>
                      <p className="text-[11px] text-slate-400 font-bold mt-1 line-clamp-1">{b.package?.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border transition-all ${
                        b.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {b.status === "confirmed" ? (
                        <CheckCircle className="h-3.5 w-3.5" />
                      ) : (
                        <Clock className="h-3.5 w-3.5" />
                      )}
                      {b.status}
                    </span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 opacity-50 tracking-widest">{new Date(b.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Enquiries Feed (40% width) */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[40px] border border-slate-100/80 p-10 shadow-sm">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Enquiries</h2>
                        <p className="text-xs text-slate-400 font-medium tracking-tight">Fresh incoming customer leads.</p>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] hover:bg-slate-800 shadow-xl shadow-slate-950/20">
                        <PlusCircle className="h-4 w-4" />
                    </button>
                </div>
                <div className="space-y-8">
                  {enquiries.map((e) => (
                    <div
                      key={e.id}
                      className="group/item flex items-start gap-4 p-4 hover:bg-indigo-50/30 rounded-[28px] transition-all border border-transparent hover:border-indigo-100"
                    >
                      <div className="w-10 h-10 bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 shadow-sm group-hover/item:bg-white transition-colors uppercase">
                        {e.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-black text-slate-900 truncate pr-2">
                            {e.name}
                            </p>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">New</span>
                        </div>
                        <p className="text-[11px] text-indigo-600 font-bold tracking-tight mb-1 opacity-70">{e.email}</p>
                        {(e.phone || e.subject) && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {e.phone && (
                              <span className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                                <Phone className="h-3 w-3" />{e.phone}
                              </span>
                            )}
                            {e.subject && (
                              <span className="flex items-center gap-1 text-[10px] text-blue-600 font-bold">
                                <Tag className="h-3 w-3" />{e.subject}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="bg-white/50 p-3 rounded-2xl border border-slate-50 group-hover/item:bg-white transition-colors">
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic line-clamp-3">
                            &ldquo;{e.message}&rdquo;
                            </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 pt-6 border-t border-slate-50 text-center">
                    <a href="/admin/enquiries" className="text-[11px] text-indigo-600 font-black uppercase tracking-widest hover:underline px-4 py-2 bg-indigo-50 rounded-xl transition-all">Analyze All Enquiries</a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
