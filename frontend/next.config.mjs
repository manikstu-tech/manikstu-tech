/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "manikstu.com" },
      { protocol: "https", hostname: "api.manikstu.com" },
    ],
  },
};

export default nextConfig;
