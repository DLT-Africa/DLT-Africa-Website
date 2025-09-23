/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Temporarily disabled to fix SSR issues

  env: {
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://dlt-backend.vercel.app/api/v1",
  },

  trailingSlash: true,

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
