import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "./ToastProvider";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bharat Yatra Travels - Professional Travel Packages",
  description: "Explore India with Bharat Yatra Travels. Premium corporate and family travel packages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
