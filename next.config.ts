import type { NextConfig } from 'next';

const basePath = process.env.GITHUB_PAGES_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
