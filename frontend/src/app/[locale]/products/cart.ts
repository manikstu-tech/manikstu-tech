// Client-side shopping cart shared between the products listing and the
// product detail page. Persists to localStorage so state survives navigation
// and reloads. Kept intentionally tiny — no reducer / no context — so both
// pages can use it directly without extra plumbing.

const KEY = "manikstu.cart";
const EVENT = "manikstu:cart";
const DRAWER_EVENT = "manikstu:cart:drawer";

export type CartMap = Record<number, number>;

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
    // Coerce to Record<number, number>
    const out: CartMap = {};
    for (const [k, v] of Object.entries(parsed)) {
      const id = Number(k);
      const qty = Number(v);
      if (Number.isFinite(id) && Number.isFinite(qty) && qty > 0) out[id] = qty;
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
    // Notify same-window listeners (storage event only fires cross-window)
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
  } catch {
    // ignore quota / privacy errors
  }
}

export function addToCart(productId: number, qty = 1): CartMap {
  const cur = readCart();
  const next: CartMap = { ...cur, [productId]: (cur[productId] ?? 0) + qty };
  writeCart(next);
  return next;
}

export function setQty(productId: number, qty: number): CartMap {
  const cur = readCart();
  const next: CartMap = { ...cur };
  if (qty <= 0) delete next[productId];
  else next[productId] = qty;
  writeCart(next);
  return next;
}

export function removeFromCart(productId: number): CartMap {
  const cur = readCart();
  const next: CartMap = { ...cur };
  delete next[productId];
  writeCart(next);
  return next;
}

export function clearCart(): CartMap {
  writeCart({});
  return {};
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

