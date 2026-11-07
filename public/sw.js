// Manikstu service worker: shows a friendly offline page, keeps pages the visitor has opened, and keeps the site's own static
// files. Forms, orders and every /api call always go to the network.
const VERSION = "v1"
const PAGES = `pages-${VERSION}`
const ASSETS = `assets-${VERSION}`
const MAX_PAGES = 30
const STATIC = ["/_next/static/", "/icons/", "/manikstu/", "/projects/", "/partners/"]

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const assets = await caches.open(ASSETS)
      const res = await fetch("/offline", { cache: "reload" })
      // The offline page needs its own scripts and styles; read their addresses from its HTML so it renders with no network
      const html = await res.clone().text()
      const files = [...new Set(html.match(/\/_next\/static\/[^"'\s\)]+/g) ?? [])]
      await (await caches.open(PAGES)).put("/offline", res)
      await assets.addAll(["/icons/icon-192.png", ...files])
      await self.skipWaiting()
    })(),
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) if (key !== PAGES && key !== ASSETS) await caches.delete(key)
      await self.clients.claim()
    })(),
  )
})

async function trim(cache) {
  const keys = await cache.keys()
  // shortcut: drops the oldest saved pages first, not the least used; fine for a 30 page limit
  if (keys.length > MAX_PAGES) await cache.delete(keys[0])
}

self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== "GET" || url.origin !== location.origin || url.pathname.startsWith("/api/")) return

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          // Keep only good pages: errors and 404s must not be what a visitor sees offline
          if (res.ok) {
            const copy = res.clone()
            caches.open(PAGES).then((cache) => cache.put(request, copy).then(() => trim(cache)))
          }
          return res
        })
        .catch(async () => (await caches.match(request)) ?? (await caches.match("/offline"))),
    )
    return
  }

  if (STATIC.some((prefix) => url.pathname.startsWith(prefix))) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ??
          fetch(request).then((res) => {
            if (res.ok) {
              const copy = res.clone()
              caches.open(ASSETS).then((cache) => cache.put(request, copy))
            }
            return res
          }),
      ),
    )
  }
})
