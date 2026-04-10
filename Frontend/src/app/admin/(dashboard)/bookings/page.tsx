"use client";
import { useState, useEffect } from "react";
import { CheckCircle, Clock, XCircle, Loader2, Eye } from "lucide-react";

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  Confirmed: {
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
  },
  Pending: {
    color: "bg-yellow-100 text-yellow-700",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  Cancelled: {
    color: "bg-red-100 text-red-600",
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
};

export default function AdminBookingsPage() {
  const [bookingsList, setBookingsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/bookings", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setBookingsList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">
          All customer bookings and their current status.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Bookings", value: bookingsList.length, color: "text-blue-600" },
          { label: "Confirmed", value: bookingsList.filter(b => b.status === "confirmed").length, color: "text-green-600" },
          { label: "Pending", value: bookingsList.filter(b => b.status === "pending").length, color: "text-yellow-600" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 text-center flex flex-row sm:flex-col items-center sm:justify-center justify-between"
          >
            <p className="text-sm text-gray-500 order-2 sm:order-2">{s.label}</p>
            <p className={`text-2xl sm:text-3xl font-extrabold order-1 sm:order-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Bookings Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Booking ID</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Customer Name</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Package</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Travel Date</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Status</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-600" />
                  </td>
                </tr>
              ) : bookingsList.length === 0 ? (
                 <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 italic">No bookings found.</td>
                </tr>
              ) : bookingsList.map((b) => {
                const formattedStatus = b.status?.charAt(0).toUpperCase() + b.status?.slice(1) || "Pending";
                const sc = statusConfig[formattedStatus] || statusConfig["Pending"];
                return (
                  <tr key={b.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">#BY-{b.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          {b.name?.charAt(0) || "U"}
                        </div>
                        <span className="font-medium text-gray-900 truncate max-w-[120px]" title={b.name}>{b.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-[180px]">
                      <p className="truncate" title={b.package?.title}>{b.package?.title || "Unknown Package"}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{new Date(b.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full ${sc.color}`}>
                        {sc.icon}
                        {formattedStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-slate-100">
           {loading ? (
            <div className="py-12 text-center text-blue-600">
              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            </div>
          ) : bookingsList.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm italic">
              No bookings found.
            </div>
          ) : bookingsList.map((b) => {
             const formattedStatus = b.status?.charAt(0).toUpperCase() + b.status?.slice(1) || "Pending";
             const sc = statusConfig[formattedStatus] || statusConfig["Pending"];
             return (
               <div key={b.id} className="p-4 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                        {b.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{b.name}</p>
                        <p className="text-[10px] font-mono text-slate-400">#BY-{b.id}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${sc.color}`}>
                      {sc.icon}
                      {formattedStatus}
                    </span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-slate-400">Package:</span>
                       <span className="font-semibold text-slate-700 truncate max-w-[150px]">{b.package?.title || "Unknown"}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                       <span className="text-slate-400">Travel Date:</span>
                       <span className="font-semibold text-slate-700">{new Date(b.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button className="w-full bg-blue-50 text-blue-600 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2">
                    <Eye className="h-3.5 w-3.5" />
                    View Details
                  </button>
               </div>
             )
          })}
        </div>
      </div>
    </div>
  );
}
