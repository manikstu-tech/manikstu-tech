import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "manikstu.com" },
      { protocol: "https", hostname: "api.manikstu.com" },
    ],
  },
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
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
