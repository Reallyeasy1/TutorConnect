// next.config.js
require('dotenv').config();

module.exports = {
    images: {
      domains: ['mdbootstrap.com'],
    }, env: {
    MAPS_API_KEY: process.env.MAPS_API_KEY,
  }, 
 eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  };