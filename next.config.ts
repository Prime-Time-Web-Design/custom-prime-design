import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    // Add source map handling for Lucide React
    config.module.rules.push({
      test: /\.js\.map$/,
      use: ["source-map-loader"],
      enforce: "pre",
    });

    return config;
  },
  // Enable source maps in development
  productionBrowserSourceMaps: true,
};

export default nextConfig;
