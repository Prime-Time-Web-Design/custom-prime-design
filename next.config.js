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
};

module.exports = nextConfig;