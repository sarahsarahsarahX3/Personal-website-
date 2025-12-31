import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: "https",
        hostname: "content.probeautycentral.saloncentric.com",
      },
      {
        protocol: "https",
        hostname: "media.saloncentric.com",
      },
    ],
  },
};

export default nextConfig;
