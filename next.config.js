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
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundle
  images: {
    domains: ["localhost", "via.placeholder.com"], // Allow local and placeholder images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Font optimization 
  optimizeFonts: true,
  // Compression
  compress: true,
  // Cache improvements
  httpAgentOptions: {
    keepAlive: true,
  },
  // Cache static assets
  staticPageGenerationTimeout: 120,
  // Enable SWC minification for better performance
  swcMinify: true,
};

// Export for ES modules
export default nextConfig;