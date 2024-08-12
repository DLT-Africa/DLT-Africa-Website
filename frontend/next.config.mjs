/** @type {import('next').NextConfig} */
const nextConfig = {

  output: "export",


  trailingSlash: true,


  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    config.cache = false;
    return config;
  },
};

export default nextConfig;
