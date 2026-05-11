import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "api.bharatyatratravels.com" },
      { protocol: "http", hostname: "api.bharatyatratravels.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "http", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "**.bharatyatratravels.com" },
      { protocol: "http", hostname: "**.bharatyatratravels.com" },
      { protocol: "https", hostname: "bharatyatratravels.com" },
      { protocol: "http", hostname: "bharatyatratravels.com" },
      { protocol: "https", hostname: "**.pravatar.cc" },
      { protocol: "http", hostname: "**.pravatar.cc" },
      { protocol: "https", hostname: "pravatar.cc" },
      { protocol: "http", hostname: "pravatar.cc" },
      { protocol: "http", hostname: "localhost", port: "5000" },
      { protocol: "http", hostname: "127.0.0.1", port: "5000" },
    ],
  },
};

export default nextConfig;
