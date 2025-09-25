import type { NextConfig } from "next";

const basePath = process.env.NEXT_BASE_PATH ?? undefined;

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath ? `/${basePath}` : undefined,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
