import { ArrowLeft, CheckCircle, PackageSearch, MapPin, Clock, Users } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dubai Tour Packages | Bharat Yatra Travels",
  description: "Discover the futuristic city of Dubai. Shop at the world's largest malls, witness the Burj Khalifa, and enjoy thrilling premium desert safaris.",
};

const highlights = [
  "Burj Khalifa At The Top — 124th Floor Access",
  "Premium Desert Safari with BBQ Dinner & Belly Dance",
  "Dubai Marina Luxury Dhow Cruise",
  "Palm Jumeirah & Atlantis The Palm Visit",
  "Dubai Mall & Gold Souk Shopping Experience",
];

const dummyPackages = [
  { title: "Dubai Classic Tour", duration: "4 Nights / 5 Days", price: "44,999" },
  { title: "Dubai Luxury Escape", duration: "5 Nights / 6 Days", price: "64,999" },
  { title: "Dubai & Abu Dhabi Combo", duration: "6 Nights / 7 Days", price: "72,999" },
  { title: "Dubai Family Special", duration: "5 Nights / 6 Days", price: "52,999" },
];

export default function DubaiPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-[66px]">
      <div
        className="relative h-[60vh] flex items-center overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1920')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-slate-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <span className="inline-block text-amber-400 text-xs font-black uppercase tracking-widest mb-4 border border-amber-400/30 bg-amber-400/10 px-3 py-1 rounded-full">International Tour</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight max-w-3xl">
            Dubai Luxury Escapes
          </h1>
          <p className="text-slate-200 text-lg max-w-2xl leading-relaxed">
            Skyscrapers, gold souks, and desert safaris — Dubai is where luxury meets adventure.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <Link href="/packages" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-10 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to All Packages
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Experience Overview</h2>
              <p className="text-slate-600 leading-[1.9] text-[15px]">
                Discover the futuristic city of Dubai where towering glass skyscrapers meet ancient Bedouin traditions. 
                Shop at the world&apos;s largest malls, witness the breathtaking Burj Khalifa from the 124th floor, enjoy 
                thrilling premium desert safaris with live entertainment, and cruise the glittering Dubai Marina on a lavish 
                dhow dinner cruise. Our Dubai packages ensure you experience every iconic highlight in total comfort.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-50">
                {[{ icon: Clock, label: "Duration", val: "4–7 Days" }, { icon: Users, label: "Group Size", val: "2–15 Pax" }, { icon: MapPin, label: "Highlights", val: "Dubai, UAE" }].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="text-center">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{label}</p>
                    <p className="font-bold text-gray-900 text-sm mt-0.5">{val}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Key Highlights</h2>
              <div className="space-y-3.5">
                {highlights.map((hl, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span className="text-slate-700 font-medium text-[14px]">{hl}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Dubai Holiday Packages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dummyPackages.map((pkg, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-full">{pkg.duration}</span>
                    <h3 className="font-extrabold text-gray-900 text-[16px] mt-3 mb-4">{pkg.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-blue-600">₹{pkg.price}<span className="text-xs text-slate-400 font-medium">/person</span></span>
                      <Link href="/contact" className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-xl transition-colors">Enquire</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-900/10 text-center relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500 rounded-full blur-[40px]" />
              <PackageSearch className="w-10 h-10 mx-auto mb-4 text-blue-200 relative z-10" />
              <h3 className="text-xl font-bold mb-2 relative z-10">Plan Your Dubai Trip</h3>
              <p className="text-blue-100 text-sm mb-6 relative z-10">Tailor-made Dubai luxury itineraries for couples & families.</p>
              <Link href="/contact" className="block w-full bg-white text-blue-600 font-bold py-3.5 rounded-xl shadow-md hover:shadow-xl transition-all relative z-10 text-sm">
                Request Custom Itinerary
              </Link>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
              <p className="text-sm font-bold text-gray-900 mb-1">📞 Talk to an Expert</p>
              <p className="text-slate-400 text-xs mb-4">Available Mon–Sat, 9am–7pm</p>
              <a href="tel:+919958847804" className="block font-black text-blue-600 text-lg hover:underline">+91 9958847804</a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
