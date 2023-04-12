/** @type {import('next').NextConfig} */
/* const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig; */

module.exports = {
  // ...
  // Stellen Sie sicher, dass die öffentlichen Dateien bereitgestellt werden
  // (mehr dazu hier: https://nextjs.org/docs/basic-features/static-file-serving)
  reactStrictMode: true,
  publicRuntimeConfig: {
    staticFolder: "/public",
  },
  compiler: {
    styledComponents: true,
  },
};
