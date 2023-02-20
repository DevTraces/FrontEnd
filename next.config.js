/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "arterest.s3.ap-northeast-2.amazonaws.com"
      }
    ]
  }
};

module.exports = nextConfig;
