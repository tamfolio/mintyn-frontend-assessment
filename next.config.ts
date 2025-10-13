import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://mint-frontend-test.onrender.com/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;