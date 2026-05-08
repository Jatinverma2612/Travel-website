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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Bharat Yatra Travels",
              "url": "https://www.bharatyatravels.com",
              "logo": "https://www.bharatyatravels.com/logo.png",
              "description": "Experience the best of India with Bharat Yatra Travels. Luxury packages, corporate travel, and custom itineraries.",
              "telephone": "+91 9958847804",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "PLOT NO, B, FLAT, 3, NO. SF 89, Shalimar Garden Extension II",
                "addressLocality": "Sahibabad, Ghaziabad",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "201005",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://www.facebook.com/BharatYatraTravels/",
                "https://www.instagram.com/bharatyatratravelsbyt/?hl=en",
                "https://www.linkedin.com/in/arvind-verma-795401252/"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
