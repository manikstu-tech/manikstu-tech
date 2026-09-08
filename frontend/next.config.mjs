import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
  // ponytail: redirects removed — output:'export' can't do runtime redirects.
  // Equivalent rewrite handled in .htaccess on Apache.
};

export default withNextIntl(nextConfig);
