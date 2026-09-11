import createNextIntlPlugin from 'next-intl/plugin';
// ponytail: @reticlehq/next loader conflicts with Next 16.3.4 webpack.
// SDK connect() still works without source mapping — skip for now.
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  // Next marks prerendered HTML `s-maxage=31536000`, which assumes the CDN is
  // purged on deploy. Hostinger's is not, so cached HTML outlived the hashed
  // CSS it points at and pages rendered unstyled. Make documents revalidate;
  // /_next/static keeps its immutable caching since those names are hashed.
  async headers() {
    return [
      {
        source: "/((?!_next/static|_next/image).*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=0, must-revalidate" },
        ],
      },
    ];
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
