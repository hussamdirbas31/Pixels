import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pixabay.com', 'cdn.pixabay.com'],
  },
};

export default nextConfig;
