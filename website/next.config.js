/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, //fixes react-paginate layout break on production. https://github.com/AdeleD/react-paginate/issues/501#issuecomment-1756310128
  images: {
    domains: ["cloudflare-ipfs.com", "plus.unsplash.com", "143.198.79.250"],
  },
  /*webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias['components'] = path.join(__dirname, 'components');
    // Add any other aliases you need.

    return config;
  },*/
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/source",
        destination: "/redirect",
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;
