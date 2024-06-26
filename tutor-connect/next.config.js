// next.config.js
require('dotenv').config();

module.exports = {
    images: {
      domains: ['mdbootstrap.com'],
    }, env: {
    MAPS_API_KEY: process.env.MAPS_API_KEY,
  },  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  }
  //    async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination:"http://localhost:4000/:path*"
  //     }
  //   ]
  // }
  };