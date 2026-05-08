import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle, PackageSearch, MapPin, Clock, Users, Phone, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import PackageHero from "@/sections/PackageHero";
import PackageCard from "@/components/PackageCard";
import { categoryService } from "@/services/category.service";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let category: any = null;
  try {
    category = await categoryService.getBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch category for metadata:", error);
  }

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} Packages`,
    description: category.description || `Explore our hand-picked ${category.name} packages. Luxury journeys, adventure trips, and cultural experiences.`,
    keywords: [category.name, "tour packages", "india tours"],
    alternates: {
      canonical: `https://www.bharatyatravels.com/packages/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let category: any = null;
  try {
    category = await categoryService.getBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch category:", error);
  }

  if (!category) {
    // Fallback: If slug is numeric, maybe it's an old package link? 
    // But we are focusing on categories here.
    return notFound();
  }

  const highlights = Array.isArray(category.highlights) ? category.highlights : [];
  const keyHighlights = Array.isArray(category.keyHighlights) ? category.keyHighlights : [];
  const packages = Array.isArray(category.packages) ? category.packages : [];

  return (
    <div className="min-h-screen bg-slate-50">
      <PackageHero 
        title={category.name}
        description={category.description || "Discover our hand-picked tour packages for this destination."}
        image={category.bannerImage || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1920"}
        badge={`${category.type === 'domestic' ? 'Domestic' : 'International'} Tour`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/packages" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-12 transition-all duration-300 hover:-translate-x-1 group text-sm">
          <ArrowLeft className="w-4 h-4 group-hover:scale-110" /> Back to All Packages
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Destination Highlights</h2>
              <p className="text-slate-600 leading-[2] text-[16px] font-medium">
                {category.description || "Explore the beauty of this region with our carefully crafted itineraries. We ensure a seamless experience from start to finish."}
              </p>
              <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-slate-100">
                {[{ icon: MapPin, label: "Destinations", val: "Handpicked" }, { icon: ShieldCheck, label: "Safety", val: "Verified" }, { icon: Star, label: "Quality", val: "Premium" }].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="text-center group">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">{label}</p>
                    <p className="font-bold text-slate-900 text-sm mt-1">{val}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Dynamic Highlights */}
            {highlights.length > 0 && (
              <section className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100">
                <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Key Experience Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {highlights.map((hl: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-all duration-200">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center shrink-0 border border-blue-100">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-slate-700 font-semibold text-[15px]">{hl}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Packages */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Popular Packages</h2>
                <div className="h-px bg-slate-200 flex-1 mx-8 hidden sm:block" />
              </div>
              
              {packages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {packages.map((pkg: any) => (
                    <PackageCard 
                      key={pkg.id} 
                      title={pkg.title} 
                      duration={pkg.duration} 
                      price={String(pkg.price)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 text-center rounded-[2.5rem] border border-dashed border-slate-200">
                  <PackageSearch className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium italic">No packages have been assigned to this category yet.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-900/20 text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />
              <PackageSearch className="w-14 h-14 mx-auto mb-6 text-blue-400 relative z-10 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-black mb-3 relative z-10 tracking-tight">Customized Itinerary?</h3>
              <p className="text-slate-400 text-[15px] mb-8 relative z-10 leading-relaxed font-medium">We can design a custom trip to {category.name} just for you.</p>
              <Link href="/contact" className="block w-full bg-white text-slate-900 font-black py-4 rounded-2xl shadow-xl hover:bg-blue-50 hover:scale-[1.03] transition-all duration-300 relative z-10">
                Talk to Us
              </Link>
            </div>
            
            {/* Key Features from Category */}
            {keyHighlights.length > 0 && (
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                <h4 className="text-lg font-black text-slate-900 mb-6 px-2">Why Choose Us?</h4>
                <div className="space-y-4">
                  {keyHighlights.map((kh: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-2">
                       <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                       <span className="text-[13px] text-slate-600 font-bold leading-relaxed">{kh}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white text-center shadow-xl shadow-blue-600/20">
              <Phone className="w-10 h-10 mx-auto mb-4 opacity-50" />
              <p className="text-xs font-black uppercase tracking-widest mb-1">Call for Booking</p>
              <a href="tel:+919958847804" className="text-xl font-black block">+91 9958847804</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
