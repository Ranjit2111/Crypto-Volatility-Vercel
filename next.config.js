/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure external image domains
  images: {
    domains: ['cryptoicons.org', 'placehold.co', '3.110.28.235'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '3.110.28.235',
        port: '8000',
      },
    ],
    unoptimized: true, // Allow direct loading of external images
  },
  
  // Allow requests to the AWS backend (mixed content)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://* http://*; font-src 'self' data:; connect-src 'self' http://3.110.28.235:8000 ws:;`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 