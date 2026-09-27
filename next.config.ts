import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work/phoe-wa",
        destination: "/work",
        permanent: false,
      },
      {
        source: "/work/beauty-bank",
        destination: "/work",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
