import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/project-odyssey' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/project-odyssey/' : '',
  // Ensure static optimization works properly
  distDir: 'out',
};

export default nextConfig;
