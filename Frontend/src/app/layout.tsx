import "./globals.css";

export const metadata = {
  title: {
    default: "Bharat Yatra Travels | Premium Luxury Travel in India",
    template: "%s | Bharat Yatra Travels",
  },
  description: "Experience the best of India with Bharat Yatra Travels. Luxury packages, corporate travel, and custom itineraries. Trusted by 10,000+ travellers.",
  keywords: ["travel india", "luxury tours india", "bharat yatra travels", "tour packages", "india tourism"],
  authors: [{ name: "Bharat Yatra Travels" }],
  openGraph: {
    title: "Bharat Yatra Travels",
    description: "Premium Luxury Travel in India",
    url: "https://bharatyatratravels.com",
    siteName: "Bharat Yatra Travels",
    locale: "en_IN",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }} className="antialiased bg-slate-50 text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
