/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pixabay.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig