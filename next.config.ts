import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

// Wrap your Next.js config with the bundle analyzer
const nextConfig: NextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})( {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
});

export default nextConfig;
