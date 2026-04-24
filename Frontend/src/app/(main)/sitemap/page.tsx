import Link from "next/link";
import React from "react";

export default function SitemapPage() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Sitemap</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          <ul className="space-y-4">
            {links.slice(0, 4).map(link => (
              <li key={link.path}>
                <Link href={link.path} className="text-blue-600 hover:underline font-medium">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-4">
            {links.slice(4).map(link => (
              <li key={link.path}>
                <Link href={link.path} className="text-blue-600 hover:underline font-medium">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
