import { notFound } from "next/navigation";
import Link from "next/link";
import {
  IndianRupee,
  Clock,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Star,
  MessageCircle,
  Users,
  Car,
  Tag,
  Calendar,
} from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/utils";

interface TimelineDay {
  day: string;
  title: string;
  description: string;
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let pkgData: any = null;
  try {
    const res = await axiosInstance.get(`/packages/${id}`);
    pkgData = res.data?.data || res.data;
  } catch (error) {
    console.error("Failed to fetch package:", error);
  }

  if (!pkgData) notFound();

  const pkg = {
    ...pkgData,
    price: pkgData.price ?? 0,
    image:
      pkgData.image_url ||
      pkgData.image ||
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1920",
    timeline: Array.isArray(pkgData.timeline) ? pkgData.timeline : [],
    inclusions: Array.isArray(pkgData.inclusions) ? pkgData.inclusions : [],
    exclusions: Array.isArray(pkgData.exclusions) ? pkgData.exclusions : [],
    groupSize: pkgData.groupSize || null,
    transport: pkgData.transport || null,
    tourType: pkgData.tourType || null,
    location: pkgData.location || "Multiple Locations",
    tagline: pkgData.tagline || "All-inclusive Premium",
    rating: pkgData.rating || 5.0,
  };

  const infoStats = [
    { label: "Duration", val: pkg.duration || "N/A", Icon: Clock },
    { label: "Group Size", val: pkg.groupSize || "N/A", Icon: Users },
    { label: "Transport", val: pkg.transport || "N/A", Icon: Car },
    { label: "Tour Type", val: pkg.tourType || "N/A", Icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Banner Section */}
      <div className="relative h-[65vh] flex items-end overflow-hidden">
        <Image
          src={getOptimizedImageUrl(pkg.image, 1920)}
          alt={pkg.title}
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
        <div className="absolute inset-0 bg-blue-900/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-all group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />{" "}
            Back to Explorations
          </Link>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {pkg.duration && (
                <span className="bg-amber-400 text-amber-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                  {pkg.duration}
                </span>
              )}
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={`banner-star-${s}`} className={`h-3 w-3 ${s <= Math.round(pkg.rating) ? 'fill-amber-400' : 'text-white/30'}`} />
                ))}
                <span className="ml-1 text-white opacity-80">({Number(pkg.rating).toFixed(1)} Rating)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
              {pkg.title}
            </h1>

            <div className="flex items-center gap-4 text-blue-100/80 text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{pkg.location}</span>
              </div>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>{pkg.tagline}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-12">

          {/* Overview Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Experience Overview
              </h2>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <p className="text-gray-600 leading-[1.8] text-[15px]">
                {pkg.description}
              </p>

              {/* Dynamic Info Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-10 border-t border-slate-50">
                {infoStats.map((stat) => {
                  const Icon = stat.Icon;
                  return (
                    <div key={stat.label}>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Icon className="h-3.5 w-3.5 text-blue-500" />
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          {stat.label}
                        </p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">{stat.val}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Timeline Section — only render if timeline has entries */}
          {pkg.timeline.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Your Journey Timeline
                </h2>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="space-y-0">
                  {pkg.timeline.map((day: TimelineDay, i: number) => (
                    <div key={`timeline-day-${i}`} className="flex gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className="relative z-10 w-10 h-10 bg-blue-50 border-2 border-blue-200 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 shrink-0">
                          {i + 1}
                        </div>
                        {i < pkg.timeline.length - 1 && (
                          <div className="w-[2px] flex-1 bg-slate-100 group-hover:bg-blue-100 transition-colors my-1 min-h-[24px]" />
                        )}
                      </div>
                      <div className="pb-10 pt-1 flex-1">
                        <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-0.5">
                          {day.day}
                        </p>
                        <h4 className="font-bold text-gray-900 mb-2">{day.title}</h4>
                        <p className="text-gray-500 text-[14px] leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        {/* Inclusions Section — renders only if admin added items */}
          {Array.isArray(pkg.inclusions) && pkg.inclusions.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Inclusions
                </h2>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {pkg.inclusions.map((item: string, i: number) => (
                    <div key={`inclusion-${i}`} className="flex items-center gap-3 py-1">
                      <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-[14px] text-gray-600 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Exclusions Section — renders only if admin added items */}
          {Array.isArray(pkg.exclusions) && pkg.exclusions.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                  Exclusions
                </h2>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {pkg.exclusions.map((item: string, i: number) => (
                    <div key={`exclusion-${i}`} className="flex items-center gap-3 py-1">
                      <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                        <XCircle className="h-3 w-3 text-red-500" />
                      </div>
                      <span className="text-[14px] text-gray-600 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Booking Widget */}
        <aside className="relative">
          <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100 p-8 sticky top-28">
            <div className="mb-8 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5 text-center">
                Special Package Rate
              </p>
              <div className="flex items-center justify-center gap-1.5 text-blue-700 font-extrabold text-4xl mb-1">
                <IndianRupee className="h-8 w-8" />
                {Number(pkg.price).toLocaleString("en-IN")}
              </div>
              <p className="text-gray-400 text-[11px] text-center font-medium">
                per adult (twin sharing basis)
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between text-sm py-2 border-b border-slate-50">
                <span className="text-gray-400">Duration</span>
                <span className="font-bold text-gray-900 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-blue-600" />
                  {pkg.duration || "N/A"}
                </span>
              </div>
              {pkg.groupSize && (
                <div className="flex items-center justify-between text-sm py-2 border-b border-slate-50">
                  <span className="text-gray-400">Group Size</span>
                  <span className="font-bold text-gray-900">{pkg.groupSize}</span>
                </div>
              )}
              {pkg.tourType && (
                <div className="flex items-center justify-between text-sm py-2 border-b border-slate-50">
                  <span className="text-gray-400">Tour Type</span>
                  <span className="font-bold text-gray-900">{pkg.tourType}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm py-2 border-b border-slate-50">
                <span className="text-gray-400">Availability</span>
                <span className="font-bold text-green-600">Available</span>
              </div>
              <div className="flex items-center justify-between text-sm py-2">
                <span className="text-gray-400">Tax Status</span>
                <span className="font-bold text-gray-900 italic">Incl. all taxes</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href={`/booking?packageId=${pkg.id}&packageTitle=${encodeURIComponent(pkg.title)}`}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-center block transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                Instant Book Now
              </Link>
              <a
                href="https://wa.me/919958847804"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl text-center transition-all shadow-lg shadow-green-500/20 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-5 w-5" />
                Chat with Expert
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>Secure Booking Guaranteed</span>
              </div>
              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                Experience hassle-free booking with Bharat Yatra. No hidden charges.
                24/7 dedicated travel manager for all your needs.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
