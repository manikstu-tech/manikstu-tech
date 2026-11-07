import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  // A phone opens the dev site by this computer's network address or through an ngrok tunnel. Without this, Next.js blocks
  // its own scripts for that address, the page never becomes interactive, and menus, previews and every button stop working.
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    ...Array.from({ length: 16 }, (_, i) => `172.${16 + i}.*.*`),
    "*.local",
    // ngrok tunnels, including the region form such as abc.us.ngrok.io
    "**.ngrok-free.app",
    "**.ngrok-free.dev",
    "**.ngrok.app",
    "**.ngrok.dev",
    "**.ngrok.io",
    "**.ngrok.pizza",
  ],
  // The dev-only route badge sits over the phone menu button at the top right, so keep it in a corner with nothing under it
  devIndicators: { position: "bottom-left" },
  // The service worker must never be served from a cache, or an update could not reach visitors who already have it
  // Do not tell every visitor which framework this is
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }] },
      // Safe on every page. X-Frame-Options and a Content-Security-Policy are left out on purpose: the preview runs inside
      // Figma Make's frame, and a policy needs a reviewed list of everything the site loads (Razorpay, maps, video).
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ]
  },
  // Product photos live on manikstu.com; next/image serves them resized, as WebP or AVIF
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "manikstu.com", pathname: "/products/**" },
      // Preview pictures of the press stories on the Resources page
      { protocol: "https", hostname: "www.orissapost.com", pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "img-cdn.krishijagran.com", pathname: "/99237/**" },
      { protocol: "https", hostname: "millercenterglobal.org", pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "imgs.etvbharat.com", pathname: "/etvbharat/prod-images/**" },
      { protocol: "https", hostname: "cms.patrika.com", pathname: "/wp-content/uploads/**" },
    ],
  },
}

export default nextConfig
