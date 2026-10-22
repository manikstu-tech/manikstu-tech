// Single source of truth for the shopping cart across the whole site.
// Stores a full line-item snapshot keyed by product SLUG (stable across the
// API and the baked-in fallback catalogue), so every surface, product
// listing, View Details, checkout, renders the exact same cart without
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
  /** Units in stock when last added; the cart never holds more. Absent when stock is not tracked. */
  maxQty?: number;
}

/** Whether a cart line is already at the most that can be bought. */
export function atMaxQty(line: Pick<CartLine, "qty" | "maxQty">): boolean {
  return line.maxQty !== undefined && line.qty >= line.maxQty;
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
  /** Units in stock (from the API). Absent or null: not tracked, no limit. */
  stock?: number | null;
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
        maxQty: typeof line.maxQty === "number" && Number.isFinite(line.maxQty) ? line.maxQty : undefined,
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

/**
 * Add (or increment) a product in the cart. Deduplicates by slug. When the product's stock is known the line is
 * capped at it, and an out-of-stock product is not added at all.
 */
export function addToCart(product: CartProduct, qty = 1): CartMap {
  const cur = readCart();
  const existing = cur[product.slug];
  const maxQty = typeof product.stock === "number" ? Math.max(0, product.stock) : existing?.maxQty;
  const wanted = (existing?.qty ?? 0) + qty;
  const capped = maxQty === undefined ? wanted : Math.min(wanted, maxQty);
  if (capped <= 0) return cur;
  const next: CartMap = {
    ...cur,
    [product.slug]: {
      slug: product.slug,
      name: product.name,
      price: Number(product.price) || 0,
      image: product.image,
      size: product.size,
      qty: capped,
      maxQty,
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
    const max = next[slug].maxQty;
    next[slug] = { ...next[slug], qty: max === undefined ? qty : Math.min(qty, max) };
  }
  writeCart(next);
  return next;
}

/** Stock turned out lower than the cart holds: cap the line at it from now on (0 removes it). */
export function limitToStock(slug: string, stock: number): CartMap {
  const cur = readCart();
  if (!cur[slug]) return cur;
  const next: CartMap = { ...cur };
  const max = Math.max(0, stock);
  if (max === 0) {
    delete next[slug];
  } else {
    next[slug] = { ...next[slug], maxQty: max, qty: Math.min(next[slug].qty, max) };
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
