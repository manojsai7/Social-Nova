import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.181.9'],
  images: {
    domains: ['images.unsplash.com'], // Add other domains as needed
  },
};

export default nextConfig;
