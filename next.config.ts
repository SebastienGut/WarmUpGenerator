import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.warmup-generator.com" }],
        destination: "https://warmup-generator.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
