/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: __dirname,
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig