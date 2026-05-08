"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axiosInstance";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/enquiries`, form);
      setSubmitted(true);
      toast.success("Message sent successfully");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      // toast error handled by interceptor
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Message Received!
        </h3>
        <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto">
          Thank you for reaching out. One of our destination experts will contact you within working hours.
        </p>
        <button 
            onClick={() => setSubmitted(false)}
            className="text-blue-600 font-bold hover:underline"
        >
            Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
          Send Us a Message
        </h2>
        <p className="text-gray-400 text-sm">Fields marked with * are required to help us serve you better.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
            placeholder="Your Name"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
            placeholder="+91 00000 00000"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
            Purpose of Contact
          </label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) =>
              setForm({ ...form, subject: e.target.value })
            }
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
            placeholder="Package enquiry, Custom itinerary..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
          Specific Details *
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none font-medium"
          placeholder="Tell us more about your group size, travel dates, and preferred destinations..."
        />
      </div>

      <button
        type="submit"
        className="group w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-1"
      >
        <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        Send My Enquiry
      </button>
      
      <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed font-medium pb-2">
          By submitting this form, you agree to our privacy policy. One of our experts will contact you for a no-obligation consultation.
      </p>
    </form>
  );
}
