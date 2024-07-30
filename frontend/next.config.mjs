/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Disable caching
    config.cache = false;
    return config;
  },
};

export default nextConfig;
