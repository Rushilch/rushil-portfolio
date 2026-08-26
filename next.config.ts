import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/rushil-portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;