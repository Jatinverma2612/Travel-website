import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bharat Yaatra Travels - Professional Travel Packages",
  description: "Explore India with Bharat Yaatra Travels. Premium corporate and family travel packages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {children}
        {/* Global toast notifications – light theme, top-right */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#1e293b",
              fontSize: "13px",
              fontWeight: "600",
              borderRadius: "14px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              border: "1px solid #f1f5f9",
              padding: "12px 16px",
            },
            success: { iconTheme: { primary: "#2563eb", secondary: "#fff" } },
            error:   { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
      </body>
    </html>
  );
}
