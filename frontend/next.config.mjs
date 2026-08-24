import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "manikstu.com" },
      { protocol: "https", hostname: "api.manikstu.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/get-in-touch",
        destination: "/en/contact",
        permanent: true,
      },
      {
        source: "/:locale/get-in-touch",
        destination: "/:locale/contact",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
