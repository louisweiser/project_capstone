/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  publicRuntimeConfig: {
    staticFolder: "/public",
  },

  webpack(config, options) {
    return config;
  },
};

module.exports = nextConfig;
