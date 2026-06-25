import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Bharat Yatra Travels | Premium Luxury Travel in India",
  description: "Experience the best of India with Bharat Yatra Travels. Luxury packages, corporate travel, and custom itineraries.",
  keywords: "travel, india, luxury, tours",
  icons: {
    icon: "/favicon.ico",
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
      <body suppressHydrationWarning className="antialiased bg-slate-50 text-slate-900 min-h-screen">
        {children}
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
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
        <Script
          id="ld-agency"
          type="application/ld+json"
          strategy="afterInteractive"
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18065109162"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18065109162');
            gtag('config', 'AW-18065109162/PfEICJLvjsUcEKrhjqZD', {
              'phone_conversion_number': '09958847804'
            });
          `}
        </Script>
      </body>
    </html>
  );
}
