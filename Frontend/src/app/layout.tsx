import "./globals.css";

export const metadata = {
  applicationName: "Bharat Yatra Travels",
  metadataBase: new URL("https://www.bharatyatravels.com"),
  title: {
    default: "Bharat Yatra Travels | Premium Luxury Travel in India",
    template: "%s | Bharat Yatra Travels",
  },
  description: "Experience the best of India with Bharat Yatra Travels. Luxury packages, corporate travel, and custom itineraries. Trusted by 10,000+ travellers.",
  keywords: ["travel india", "luxury tours india", "bharat yatra travels", "tour packages", "india tourism"],
  authors: [{ name: "Bharat Yatra Travels" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  openGraph: {
    title: "Bharat Yatra Travels",
    description: "Premium Luxury Travel in India",
    url: "https://www.bharatyatravels.com",
    siteName: "Bharat Yatra Travels",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.bharatyatravels.com/logo.png",
        width: 800,
        height: 600,
        alt: "Bharat Yatra Travels Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Yatra Travels",
    description: "Premium Luxury Travel in India",
    images: ["https://www.bharatyatravels.com/logo.png"],
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
              "@type": "WebSite",
              "name": "Bharat Yatra Travels",
              "alternateName": "Bharat Yatra",
              "url": "https://www.bharatyatravels.com"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "name": "Bharat Yatra Travels",
              "url": "https://www.bharatyatravels.com",
              "logo": "https://www.bharatyatravels.com/logo.png",
              "image": "https://www.bharatyatravels.com/logo.png",
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
