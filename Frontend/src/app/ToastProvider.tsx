"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
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
        error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
      }}
    />
  );
}
