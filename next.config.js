/** @type {import('next').NextConfig} */
const nextConfig = {
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