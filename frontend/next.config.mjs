/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set output to 'export' for static HTML export
  output: "export",
  
  // Add trailing slashes to URLs
  trailingSlash: true,
  
  // Custom Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Disable caching for builds
    config.cache = false;
    return config;
  },
};

export default nextConfig;
