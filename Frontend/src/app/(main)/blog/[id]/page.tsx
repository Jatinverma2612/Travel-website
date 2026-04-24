"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

// Using the same blog data
const posts = [
  {
    id: "top-10-places",
    title: "Top 10 Places to Visit in India in 2026",
    excerpt: "From the eternal beauty of the Taj Mahal to the serene backwaters of Kerala, discover India's most breathtaking destinations curated for the modern traveller.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1920",
    author: "Arjun Sharma",
    readTime: "5 min read",
    date: "March 15, 2026",
    tags: ["Travel Tips", "Destinations"],
    content: "India is a vast subcontinent, offering an array of diverse landscapes... \n\nFrom the towering peaks of the Himalayas to the sun-kissed beaches of Goa, the country hosts a stunning variety of destinations.\n\n1. Taj Mahal, Agra - A testament to eternal love.\n2. Backwaters, Kerala - A serene and tranquil experience on traditional houseboats.\n3. Jaipur, Rajasthan - The Pink City showcasing royal heritage.\n4. Varanasi - The spiritual heart of India.\n\nWhether you're seeking adventure, spirituality, or a quiet retreat, India has something for every modern traveller.",
  },
  {
    id: "budget-travel",
    title: "How to Travel India on a Budget Without Compromising Quality",
    excerpt: "Smart strategies, insider tips, and the best budget-friendly packages that still deliver premium experiences across the subcontinent.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1920",
    author: "Priya Mehta",
    readTime: "7 min read",
    date: "March 8, 2026",
    tags: ["Budget Travel", "Tips"],
    content: "Travelling on a budget doesn't mean you have to stay in run-down hostels or skip major attractions.\n\nHere are some top tips:\n- Book Trains in Advance: The Indian Railway network is fantastic and affordable if booked early.\n- Eat Local: Street food in cities like Delhi and Mumbai is not only cheap but incredibly delicious. Just look for stalls with high turnover.\n- Travel Off-Season: Destinations like Rajasthan and Goa are much cheaper during their respective off-seasons.\n\nWith smart planning, you can experience premium India on a tight budget.",
  },
  {
    id: "kerala-monsoon",
    title: "Kerala in Monsoon: Why the Rain Makes It Even More Beautiful",
    excerpt: "Discover why the monsoon season transforms Kerala into a lush, misty paradise perfect for nature lovers and soulful retreats.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c4701?auto=format&fit=crop&q=80&w=1920",
    author: "Rohan Verma",
    readTime: "4 min read",
    date: "February 25, 2026",
    tags: ["Kerala", "Monsoon"],
    content: "When the monsoon hits Kerala, the entire state turns into a vibrant shade of green. \n\nMany tourists avoid the rains, but experienced travellers know this is the best time for Ayurvedic treatments, as the pores of the body open up in the humid climate.\n\nWatching the rain fall over the emerald backwaters from the deck of a houseboat is an unmatched experience. Don't let the rain stop you!",
  },
  {
    id: "corporate-travel",
    title: "Corporate Travel in India: What You Need to Know",
    excerpt: "A comprehensive guide for business travellers navigating India's major cities — from Delhi to Bangalore's tech hubs.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920",
    author: "Arjun Sharma",
    readTime: "6 min read",
    date: "February 12, 2026",
    tags: ["Corporate", "Business Travel"],
    content: "Business travel in India is booming, with cities like Bangalore, Hyderabad, and Pune leading the charge.\n\nFor a seamless corporate trip:\n- Use reliable taxi apps like Uber and Ola.\n- Book accommodations near your meeting locations, as traffic can be unpredictable.\n- Ensure your corporate packages include high-speed Wi-Fi and 24/7 support.\n\nWe provide tailored MICE (Meetings, Incentives, Conferences, and Exhibitions) services for teams of all sizes.",
  },
  {
    id: "kashmir-winter",
    title: "Kashmir in Winter: A Snowy Wonderland Experience",
    excerpt: "Everything you need to know about visiting Kashmir during the winter months — snowfall, skiing, and scenic landscapes.",
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=1920",
    author: "Priya Mehta",
    readTime: "5 min read",
    date: "January 30, 2026",
    tags: ["Kashmir", "Winter"],
    content: "Kashmir in winter is nothing short of magical. The entire valley gets blanketed in pristine white snow.\n\nGulmarg becomes a hub for winter sports enthusiasts, offering some of the best skiing slopes in Asia. \n\nMake sure to pack heavy woolens, try the local 'Kehwa' tea to keep warm, and enjoy a Shikara ride on the partially frozen Dal Lake.",
  },
  {
    id: "goa-guide",
    title: "The Ultimate First-Time Visitor's Guide to Goa",
    excerpt: "North vs. South Goa, where to stay, what to eat, and how to make the most of your golden beach holiday.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1920",
    author: "Rohan Verma",
    readTime: "8 min read",
    date: "January 15, 2026",
    tags: ["Goa", "Beaches"],
    content: "Goa is deeply divided into two distinct vibes: the party-centric North and the tranquil South.\n\nIf it's your first time, spend a few days in the North (Baga, Anjuna) to experience the legendary nightlife and flea markets. Then, head down South (Palolem, Agonda) to unwind on pristine, quiet beaches.\n\nDon't forget to try the local Goan fish curry and rent a scooter to explore the winding coastal roads.",
  },
];

export default function BlogDetailPage() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 gap-4 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Blog Not Found</h1>
        <p className="text-gray-500 text-lg max-w-md">The article you are looking for doesn't exist or has been removed.</p>
        <Link 
          href="/blog" 
          className="mt-6 px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all"
        >
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 pb-24">
      {/* Article Header & Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full bg-slate-900">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold mb-6 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to all articles
            </Link>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-amber-400 text-amber-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
                <span className="flex items-center gap-2 font-bold text-white">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    {post.author.charAt(0)}
                  </div>
                  {post.author}
                </span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-lg text-gray-700 leading-relaxed font-medium">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl shadow-blue-900/5 -mt-32 relative z-10 border border-slate-100"
        >
          {/* Introductory Excerpt */}
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-10 leading-snug">
            {post.excerpt}
          </p>
          
          {/* Main Body */}
          <div className="space-y-6 whitespace-pre-wrap text-gray-600">
            {post.content}
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-100 text-center">
            <h3 className="text-xl font-black text-gray-900 mb-6">Inspired to take a trip?</h3>
            <Link 
              href="/booking" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
            >
              Plan Your Journey Now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
