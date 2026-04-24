"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Award, Users, Globe, Smile } from "lucide-react";

const teamMembers = [
  {
    name: "Arjun Sharma",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    bio: "15+ years in the travel industry with a passion for creating unforgettable journeys.",
  },
  {
    name: "Priya Mehta",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b977?auto=format&fit=crop&q=80&w=400",
    bio: "Ensures every trip runs flawlessly from planning to execution with sharp attention to detail.",
  },
  {
    name: "Rohan Verma",
    role: "Experience Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    bio: "Curates immersive experiences that go beyond typical tourism, finding the soul of India.",
  },
];

const stats = [
  { icon: Award, label: "Years Experience", value: "15+" },
  { icon: Users, label: "Happy Travellers", value: "10K+" },
  { icon: Globe, label: "Destinations", value: "50+" },
  { icon: Smile, label: "Review Rating", value: "4.9/5" },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div
        className="relative py-32 text-white overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-[2px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-amber-400 text-amber-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              Since 2009
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-5 sm:mb-6 tracking-tight">
              Our Journey &amp; Passion
            </h1>
            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full mb-5 sm:mb-6" />
            <p className="text-blue-100 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed opacity-90">
              Crafting stories, building connections, and making memories across the Indian subcontinent.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-3">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
                A Legacy of Trust Built on a <span className="text-blue-600">Soulful Passion</span> for India
              </h2>
              <div className="space-y-6 text-gray-500 leading-relaxed text-[15px]">
                <p>
                  Bharat Yatra Travels was founded in 2009 by Arjun Sharma with a
                  single mission: to make the rich tapestry of India accessible and
                  memorable for every traveller — corporate or leisure.
                </p>
                <p>
                  What started as a small boutique travel agency in New Delhi has
                  grown into one of India&apos;s most trusted travel companies, serving
                  over 10,000 satisfied clients across 50+ destinations.
                </p>
                <p className="font-medium text-gray-700 italic border-l-4 border-blue-600 pl-6 py-2 bg-blue-50/50 rounded-r-2xl">
                  &ldquo;We believe that travel is not just about visiting places — it&apos;s
                  about experiencing stories, cultures, and connections that stay
                  with you forever.&rdquo;
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 h-[320px] sm:h-[420px] lg:h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800"
                  alt="Travel Story"
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              {/* Playful floating element */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Top Rated</h4>
                    <p className="text-xs text-gray-500">TripAdvisor Choice &apos;25</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <s.icon className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="text-3xl font-extrabold text-gray-900 mb-1">{s.value}</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-3">Our Foundation</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Mission, Vision & Core Values</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                color: "bg-blue-600",
                desc: "To deliver perfectly curated travel experiences that combine affordability, safety, and cultural richness — making India's treasures accessible to everyone.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                color: "bg-amber-500",
                desc: "To be India's most trusted and innovative travel company, connecting travellers with authentic experiences while promoting responsible tourism.",
              },
              {
                icon: Heart,
                title: "Our Values",
                color: "bg-red-500",
                desc: "Integrity, Excellence, and Customer-First thinking. We treat every traveller as family, ensuring every journey exceeds expectations.",
              },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 text-center hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${v.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-black/10`}>
                  <v.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-extrabold text-gray-900 text-xl mb-4">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-[14px] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-16">
            <span className="text-blue-600 text-xs font-bold uppercase tracking-widest block mb-3">
              The Experts Behind
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Meet Our Strategic Leaders
            </h2>
            <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full mt-4" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {teamMembers.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-slate-100"
              >
                <div className="relative h-[260px] sm:h-[320px] overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="p-8 text-left bg-white relative z-10 transition-transform duration-500 group-hover:-translate-y-4">
                  <h3 className="font-extrabold text-gray-900 text-xl group-hover:text-blue-600 transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-4">
                    {m.role}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {m.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Brand Commitment */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Want to create your own travel story?</h2>
            <p className="text-blue-100 text-lg mb-10">Join 10,000+ happy travellers who have seen India through our eyes. Let&apos;s plan your next big adventure.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a href="/packages" className="w-full sm:w-auto bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl shadow-xl hover:bg-slate-50 transition-all text-center">Browse All Tours</a>
                <a href="/contact" className="w-full sm:w-auto bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl border border-blue-500 hover:bg-blue-800 transition-all text-center">Schedule a Call</a>
            </div>
        </div>
      </section>
    </div>
  );
}
