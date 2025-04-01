/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["*"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', 
      },
    ],
  },
}

module.exports = nextConfig
