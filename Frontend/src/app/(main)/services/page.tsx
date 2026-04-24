import React from "react";

export default function ServicesPage() {
  const services = [
    { title: "Holiday Packages", desc: "Curated experiences across India and abroad." },
    { title: "Corporate Booking", desc: "Seamless travel management for businesses." },
    { title: "Custom Itineraries", desc: "Personalised trips planned to your exact preferences." },
    { title: "Honeymoon Tours", desc: "Romantic getaways to premium destinations." },
    { title: "Travel Insurance", desc: "Comprehensive coverage for stress-free travel." },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Our Services</h1>
        <div className="grid gap-6">
          {services.map(s => (
            <div key={s.title} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
              <h2 className="text-xl font-bold text-blue-600">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
