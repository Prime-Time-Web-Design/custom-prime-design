/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    config.module.rules.push({
      test: /\.js\.map$/,
      use: ["source-map-loader"],
      enforce: "pre",
    });
    return config;
  },
  productionBrowserSourceMaps: true,
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV === 'development',
    // Add more configuration options for images to improve loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp'],
  },
  // Font optimization should be at the top level
  optimizeFonts: true,
  // Add experimental flag to minimize flickering with React 18
  experimental: {
    // Reduces client-side rendering flickering
    scrollRestoration: true,
  }
};

module.exports = nextConfig;