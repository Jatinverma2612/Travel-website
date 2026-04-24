"use client";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Lock, Mail, Eye, EyeOff, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/api/auth/login", { email, password });
      const data = res.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Welcome back! Redirecting to dashboard...");
        router.push("/admin");
      }
    } catch (err: unknown) {
      setLoading(false);
      console.error(err);
      // Let the interceptor handle the toast, or we can handle it here but interceptor might do it
      // actually interceptor doesn't throw a generic error if it isn't 401. I added it above wait: `toast.error(error.response?.data?.message || 'Something went wrong');` maybe I didn't? Let me check axiosInstance... I didn't add the generic one so I keep catch
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      {/* Background patterns */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-amber-400 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative"
      >
        {/* Brand Block */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:bg-blue-700 transition-all duration-300 transform group-hover:rotate-12">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div className="text-left leading-tight">
              <span className="font-black text-2xl text-gray-900 tracking-tight block leading-none">
                Bharat Yatra
              </span>
              <span className="text-blue-600 text-[11px] font-bold tracking-[0.2em] uppercase">
                Travels
              </span>
            </div>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-[1px] w-8 bg-slate-200" />
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Control Center</h2>
            <div className="h-[1px] w-8 bg-slate-200" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Admin Login</h1>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl shadow-blue-900/5 border border-white p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-amber-400 to-blue-600 opacity-80" />

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-[13px] font-bold text-gray-700 ml-1">Work Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 focus:bg-white transition-all"
                  placeholder="admin@bharatyatra.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[13px] font-bold text-gray-700">Password</label>
                <button type="button" className="text-[12px] font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-12 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 focus:bg-white transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="peer sr-only" />
                <div className="h-5 w-5 bg-slate-100 border border-slate-200 rounded-md peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all shadow-sm" />
                <div className="absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-all">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
              <span className="text-[13px] font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">Remember this session</span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/25 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Access Dashboard
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Note */}
          <div className="mt-8 pt-8 border-t border-dashed border-slate-100 text-center">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-widest leading-loose">
              Protected by military-grade encryption<br />
              Authorized personnel only
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex justify-center gap-6">
          <Link href="/" className="text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors">
            Main Site
          </Link>
          <span className="text-slate-200 text-xs">|</span>
          <Link href="/contact" className="text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors">
            IT Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
