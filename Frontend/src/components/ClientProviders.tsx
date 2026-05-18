"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

const AuthInitializer = dynamic(
  () => import("@/components/AuthInitializer"),
  { ssr: false }
);

const SmoothScrollProvider = dynamic(
  () => import("@/components/SmoothScrollProvider").then((mod) => mod.SmoothScrollProvider),
  { ssr: false }
);

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <>
          <AuthInitializer />
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#0f172a',
                borderRadius: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              },
            }}
          />
        </>
      )}
      <SmoothScrollProvider>
        {children}
      </SmoothScrollProvider>
    </>
  );
}
