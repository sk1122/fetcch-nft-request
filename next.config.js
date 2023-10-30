/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tokens.1inch.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "tokens-data.1inch.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
