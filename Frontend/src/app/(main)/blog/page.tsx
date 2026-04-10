"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, User, ArrowRight, Tag, Calendar } from "lucide-react";

const posts = [
  {
    id: "top-10-places",
    title: "Top 10 Places to Visit in India in 2026",
    excerpt:
      "From the eternal beauty of the Taj Mahal to the serene backwaters of Kerala, discover India's most breathtaking destinations curated for the modern traveller.",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800",
    author: "Arjun Sharma",
    readTime: "5 min read",
    date: "March 15, 2026",
    tags: ["Travel Tips", "Destinations"],
  },
  {
    id: "budget-travel",
    title: "How to Travel India on a Budget Without Compromising Quality",
    excerpt:
      "Smart strategies, insider tips, and the best budget-friendly packages that still deliver premium experiences across the subcontinent.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800",
    author: "Priya Mehta",
    readTime: "7 min read",
    date: "March 8, 2026",
    tags: ["Budget Travel", "Tips"],
  },
  {
    id: "kerala-monsoon",
    title: "Kerala in Monsoon: Why the Rain Makes It Even More Beautiful",
    excerpt:
      "Discover why the monsoon season transforms Kerala into a lush, misty paradise perfect for nature lovers and soulful retreats.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c4701?auto=format&fit=crop&q=80&w=800",
    author: "Rohan Verma",
    readTime: "4 min read",
    date: "February 25, 2026",
    tags: ["Kerala", "Monsoon"],
  },
  {
    id: "corporate-travel",
    title: "Corporate Travel in India: What You Need to Know",
    excerpt:
      "A comprehensive guide for business travellers navigating India's major cities — from Delhi to Bangalore's tech hubs.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    author: "Arjun Sharma",
    readTime: "6 min read",
    date: "February 12, 2026",
    tags: ["Corporate", "Business Travel"],
  },
  {
    id: "kashmir-winter",
    title: "Kashmir in Winter: A Snowy Wonderland Experience",
    excerpt:
      "Everything you need to know about visiting Kashmir during the winter months — snowfall, skiing, and scenic landscapes.",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=800",
    author: "Priya Mehta",
    readTime: "5 min read",
    date: "January 30, 2026",
    tags: ["Kashmir", "Winter"],
  },
  {
    id: "goa-guide",
    title: "The Ultimate First-Time Visitor's Guide to Goa",
    excerpt:
      "North vs. South Goa, where to stay, what to eat, and how to make the most of your golden beach holiday.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
    author: "Rohan Verma",
    readTime: "8 min read",
    date: "January 15, 2026",
    tags: ["Goa", "Beaches"],
  },
];

export default function BlogPage() {
  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* Page Header */}
      <div
        className="relative py-32 text-white overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=80&w=1920')",
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
              Explore Stories
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              The Journey Journal
            </h1>
            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full mb-6" />
            <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed opacity-90">
              Expert travel tips, destination deep-dives, and insider knowledge from our seasoned explorers.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Header Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
              <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Must Read This Week</span>
              <div className="h-px bg-slate-200 flex-1" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-blue-900/5 border border-slate-100"
          >
            <div className="h-[400px] lg:h-auto overflow-hidden">
              <img
                src={posts[0].image}
                alt={posts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-6">
                {posts[0].tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                {posts[0].title}
              </h3>
              <p className="text-gray-500 leading-relaxed mb-8 text-lg font-medium opacity-80">
                {posts[0].excerpt}
              </p>
              
              <div className="flex items-center flex-wrap gap-6 text-[13px] text-gray-400 mb-10 pb-6 border-b border-slate-50">
                <div className="flex items-center gap-2 font-bold text-gray-900">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-black">AS</div>
                  {posts[0].author}
                </div>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {posts[0].readTime}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {posts[0].date}
                </span>
              </div>
              
              <Link
                href={`/blog/${posts[0].id}`}
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 w-fit hover:-translate-y-1"
              >
                Read Fully <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center gap-3 mb-12">
              <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Recent Publications</span>
              <div className="h-px bg-slate-200 flex-1" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.slice(1).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group flex flex-col bg-slate-50/50 rounded-[32px] overflow-hidden border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-100 transition-all duration-400"
              >
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      <div className="w-10 h-10 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                          <ArrowRight className="h-5 w-5" />
                      </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-blue-600 text-[10px] font-bold uppercase tracking-wider"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-xl mb-4 line-clamp-2 leading-tight min-h-[56px] group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[14px] text-gray-500 mb-8 line-clamp-2 leading-relaxed flex-1 opacity-80 font-medium">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                       <Clock className="h-3.5 w-3.5 text-blue-400" />
                       {post.readTime}
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-blue-600 font-black text-xs uppercase tracking-widest hover:text-blue-700 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter / Join Section */}
      <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <div className="bg-blue-950 rounded-[50px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
                  {/* Decorative blur */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -mr-16 -mt-16" />
                  
                  <div className="relative z-10">
                      <h3 className="text-3xl font-black mb-4">Wanna see India through our eyes?</h3>
                      <p className="text-blue-200/60 mb-10 max-w-sm mx-auto leading-relaxed">Join 5,000+ travellers who receive our weekly destination deep-dives and early access deals.</p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                          <input 
                              type="email" 
                              placeholder="Enter your email" 
                              className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 flex-1 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                          />
                          <button className="bg-amber-400 text-amber-950 font-black px-8 py-4 rounded-2xl hover:bg-amber-300 transition-all whitespace-nowrap">Count Me In</button>
                      </div>
                      <p className="text-[10px] text-white/30 mt-6 uppercase tracking-widest font-bold">No spam. Only high-quality travel stories.</p>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
}
