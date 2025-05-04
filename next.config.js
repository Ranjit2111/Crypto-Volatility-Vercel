/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable experimental features
  experimental: {
    turbo: false
  },
  // Configure external image domains
  images: {
    domains: ['cryptoicons.org', 'placehold.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  }
};

module.exports = nextConfig; 