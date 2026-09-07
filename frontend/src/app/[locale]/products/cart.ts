// Single source of truth for the shopping cart across the whole site.
// Stores a full line-item snapshot keyed by product SLUG (stable across the
// API and the baked-in fallback catalogue), so every surface — product
// listing, View Details, checkout — renders the exact same cart without
// re-matching ids against a separate product array.
// Persists to localStorage and broadcasts changes to same-tab and cross-tab
// listeners.

const KEY = "manikstu.cart";
const EVENT = "manikstu:cart";
const DRAWER_EVENT = "manikstu:cart:drawer";

export interface CartLine {
  slug: string;
  name: string;
  price: number;
  image?: string;
  size?: string;
  qty: number;
}

/** Cart keyed by product slug. */
export type CartMap = Record<string, CartLine>;

/** Minimal product shape needed to add a line to the cart. */
export interface CartProduct {
  slug: string;
  name: string;
  price?: number | string | null;
  image?: string;
  size?: string;
}

function isBrowser() {
  return typeof window !== "undefined";
}

export function readCart(): CartMap {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const out: CartMap = {};
    for (const [slug, v] of Object.entries(parsed)) {
      if (!slug || typeof v !== "object" || v === null) continue;
      const line = v as Partial<CartLine>;
      const qty = Number(line.qty);
      if (typeof line.name !== "string" || !Number.isFinite(qty) || qty <= 0) {
        continue; // discard incompatible / legacy entries
      }
      out[slug] = {
        slug,
        name: line.name,
        price: Number(line.price) || 0,
        image: typeof line.image === "string" ? line.image : undefined,
        size: typeof line.size === "string" ? line.size : undefined,
        qty,
      };
    }
    return out;
  } catch {
    return {};
  }
}

export function writeCart(next: CartMap) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  } catch {
    // ignore quota / privacy errors
  }
}

/** Add (or increment) a product in the cart. Deduplicates by slug. */
export function addToCart(product: CartProduct, qty = 1): CartMap {
  const cur = readCart();
  const existing = cur[product.slug];
  const next: CartMap = {
    ...cur,
    [product.slug]: {
      slug: product.slug,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.image,
      size: product.size,
      qty: (existing?.qty ?? 0) + qty,
    },
  };
  writeCart(next);
  return next;
}

export function setQty(slug: string, qty: number): CartMap {
  const cur = readCart();
  const next: CartMap = { ...cur };
  if (qty <= 0 || !next[slug]) {
    delete next[slug];
  } else {
    next[slug] = { ...next[slug], qty };
  }
  writeCart(next);
  return next;
}

export function removeFromCart(slug: string): CartMap {
  const cur = readCart();
  const next: CartMap = { ...cur };
  delete next[slug];
  writeCart(next);
  return next;
}

export function clearCart(): CartMap {
  writeCart({});
  return {};
}

/** Line items as an array, in insertion order. */
export function cartLines(cart: CartMap): CartLine[] {
  return Object.values(cart);
}

/** Total number of units across all lines. */
export function cartCount(cart: CartMap): number {
  return Object.values(cart).reduce((sum, l) => sum + l.qty, 0);
}

/** Sum of price × qty across all lines. */
export function cartTotal(cart: CartMap): number {
  return Object.values(cart).reduce((sum, l) => sum + l.price * l.qty, 0);
}

/** Subscribe to cart changes from THIS tab or another tab. */
export function subscribeCart(cb: (cart: CartMap) => void): () => void {
  if (!isBrowser()) return () => {};
  const onLocal = (e: Event) => {
    const detail = (e as CustomEvent<CartMap>).detail;
    if (detail && typeof detail === "object") cb(detail);
    else cb(readCart());
  };
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb(readCart());
  };
  window.addEventListener(EVENT, onLocal as EventListener);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onLocal as EventListener);
    window.removeEventListener("storage", onStorage);
  };
}

export function openCartDrawer() {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(DRAWER_EVENT, { detail: { open: true } }));
}

export function closeCartDrawer() {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(DRAWER_EVENT, { detail: { open: false } }));
}

export function subscribeCartDrawer(cb: (open: boolean) => void): () => void {
  if (!isBrowser()) return () => {};
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<{ open: boolean }>).detail;
    if (detail && typeof detail.open === "boolean") cb(detail.open);
  };
  window.addEventListener(DRAWER_EVENT, handler as EventListener);
  return () => {
    window.removeEventListener(DRAWER_EVENT, handler as EventListener);
  };
}
