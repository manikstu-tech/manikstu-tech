import type { NextConfig } from "next"

// The live site builds on Hostinger shared hosting, which reports 64 CPUs but caps the processes and threads one account may
// start. Left alone, the build starts a worker per CPU and Tailwind's CSS engine a thread per CPU, and both die with EAGAIN.
// Two of each is plenty for this site. (The build script also uses webpack: Turbopack needs native bindings built for
// glibc 2.29, and that server has 2.28.)
process.env.RAYON_NUM_THREADS ??= "2"

const nextConfig: NextConfig = {
  experimental: { cpus: 2 },
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
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          // Only on the live site: a local http:// server must not tell the browser to insist on https
          ...(process.env.NODE_ENV === "production" ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }] : []),
        ],
      },
      // The admin can rewrite every page, so it never runs inside another site's frame, is never cached and never indexed
      ...["/admin", "/api/admin/:path*"].map((source) => ({
        source,
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      })),
    ]
  },
  // Pages of the previous site (Nov 2026 rebuild) that no longer exist: send visitors and search engines to the nearest page
  async redirects() {
    const moved: [string, string][] = [
      ["/en", "/"],
      ["/en/:path*", "/:path*"],
      ["/about", "/teams"],
      ["/blog", "/blogs"],
      ["/blog/:slug", "/blogs/:slug"],
      ["/services", "/#solutions"],
      ["/training", "/#solutions"],
      ["/collaborate", "/join"],
      ["/complaint", "/contact"],
      ["/help", "/contact"],
      ["/payment", "/cart"],
      ["/payment/:path*", "/cart"],
      ["/admin/:path+", "/admin"],
    ]
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }))
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
