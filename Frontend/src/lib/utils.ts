import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOptimizedImageUrl(url: string, width: number = 800, quality: string = "auto") {
  if (!url || typeof url !== 'string') return "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800";
  
  // Handle old backend upload URLs (e.g., /uploads/image.jpg)
  if (url.startsWith('/uploads')) {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    url = `${apiBase.replace(/\/$/, "")}${url}`;
  }

  if (!url.includes("res.cloudinary.com")) return url;
  
  // Example Cloudinary URL: https://res.cloudinary.com/demo/image/upload/sample.jpg
  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;
  
  return `${parts[0]}/upload/w_${width},q_${quality},f_auto/${parts[1]}`;
}
