import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Allow scroll restoration for Lenis
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
