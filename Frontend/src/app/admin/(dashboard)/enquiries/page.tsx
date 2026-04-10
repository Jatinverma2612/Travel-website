"use client";

import { useEffect, useState } from "react";
import { Mail, MessageSquare, Reply, Phone, Tag, CalendarClock } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers: any = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch("http://localhost:5000/api/enquiries", { headers });
        if (res.ok) {
          const data = await res.json();
          setEnquiries(data);
        } else {
          toast.error("Failed to load enquiries");
        }
      } catch (error) {
        toast.error("An error occurred loading enquiries");
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Enquiries</h1>
        <p className="text-gray-500 text-sm mt-1">
          Customer messages and enquiry requests.
        </p>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="text-gray-500">No enquiries found.</div>
      ) : (
        <div className="grid gap-4">
          {enquiries.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6 hover:border-blue-200 transition-colors shrink-0"
            >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-6 sm:gap-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0 uppercase">
                      {e.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{e.name}</h3>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-500 mt-1 mb-3">
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <Mail className="h-3.5 w-3.5" />
                          <span>{e.email}</span>
                        </div>
                        {e.phone && (
                          <div className="flex items-center gap-1.5 whitespace-nowrap">
                            <Phone className="h-3.5 w-3.5" />
                            <span>{e.phone}</span>
                          </div>
                        )}
                        {e.subject && (
                          <div className="flex items-center gap-1.5 font-medium text-blue-600">
                            <Tag className="h-3.5 w-3.5" />
                            <span>{e.subject}</span>
                          </div>
                        )}
                        {e.created_at && (
                          <div className="flex items-center gap-1.5">
                            <CalendarClock className="h-3.5 w-3.5" />
                            <span>{new Date(e.created_at).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 w-full max-w-2xl">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                          <p className="text-sm text-gray-700 leading-relaxed font-medium break-words">{e.message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => window.location.href = `mailto:${e.email}?subject=RE: ${e.subject || 'Enquiry'}`}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold text-xs bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-xl transition-colors shrink-0 w-full sm:w-auto"
                  >
                    <Reply className="h-3.5 w-3.5" />
                    Reply via Email
                  </button>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
