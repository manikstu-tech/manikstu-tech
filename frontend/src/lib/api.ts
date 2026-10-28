// src/lib/api.ts
import type { ApiResponse, NavigationMenuItem, FooterLink, Page, BlogPost, GalleryImage, PressRelease, MediaItem, Partner, TeamMember } from '@/types';

export const API_BASE_URL =
  typeof window !== 'undefined'
    ? '/api/backend'
    : (process.env.NEXT_PUBLIC_API_URL ||
       (process.env.NODE_ENV === 'production' ? 'https://api.manikstu.com/api' : 'http://127.0.0.1:8001/api'));

// Generic fetch helper
async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Public API (no auth)
export const getSettings = () => apiFetch<ApiResponse<Record<string, string>>>('/settings');
export const getNavigation = () => apiFetch<ApiResponse<NavigationMenuItem[]>>('/navigation');
export const getFooter = () => apiFetch<ApiResponse<Record<string, FooterLink[]>>>('/footer');
export const getPage = (slug: string) => apiFetch<ApiResponse<Page>>(`/pages/${slug}`);
export const getBlogPosts = (page = 1) => apiFetch<ApiResponse<BlogPost[]>>(`/blog?page=${page}`);
export const getGallery = (page = 1) => apiFetch<ApiResponse<GalleryImage[]>>(`/gallery?page=${page}`);
export const getMedia = (type?: 'photo' | 'video') =>
  apiFetch<ApiResponse<MediaItem[]>>(`/media${type ? `?type=${type}` : ''}`);
export const getPressReleases = (page = 1) => apiFetch<ApiResponse<PressRelease[]>>(`/press?page=${page}`);

// Job Openings
export const getJobOpenings = () => apiFetch<ApiResponse<any[]>>('/careers');

// Partners
export const getPartners = () => apiFetch<ApiResponse<Partner[]>>('/partners');

// Team
export const getTeamMembers = () => apiFetch<ApiResponse<TeamMember[]>>('/team');

// Newsletter
export const subscribeNewsletter = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error('Failed to subscribe');
  return response.json();
};

// Orders (website checkout posts the full order with delivery details)
export interface OrderItemInput {
  productId: number;
  quantity: number;
}

export interface OrderInput {
  items: OrderItemInput[];
  customer_name?: string;
  phone?: string;
  email?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  notes?: string;
  /** 'online': paid through Cashfree before the order reaches the team. Default: pay later. */
  payment_method?: 'cod' | 'online';
}

/** The order asked for more of a product than is left. `product.stock` is how many there are (0 = out of stock). */
export class InsufficientStockError extends Error {
  constructor(public product: { slug: string; name: string; stock: number }, message: string) {
    super(message);
    this.name = 'InsufficientStockError';
  }
}

export const placeOrder = async (payload: OrderInput) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    if (response.status === 422 && body?.code === 'insufficient_stock' && body.product) {
      throw new InsufficientStockError(body.product, body.message ?? 'Not enough stock');
    }
    throw new Error('Failed to place order');
  }
  return response.json() as Promise<{ data: { order_number: string } }>;
};

export interface TrackedOrder {
  order_number: string;
  status: string;
  payment_status: string;
  total: number;
  placed_at: string | null;
  items: { product_name: string; quantity: number; price: number }[];
}

/**
 * Track an order. Checkout is open to guests, so there is no account to
 * authenticate against: the backend wants the phone or email the order was
 * placed with alongside the order number.
 */
export const trackOrder = async (orderNumber: string, contact: string) => {
  const response = await fetch(
    `${API_BASE_URL}/orders/${encodeURIComponent(orderNumber)}/track`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact }),
    },
  );
  if (!response.ok) throw new Error('No order found with those details.');
  return (await response.json()) as { data: TrackedOrder };
};

// Complaints. Routed differently from an enquiry: an enquiry is a sales lead,
// a complaint is a customer already let down, so it opens a ticket the
// telecalling head triages.
export interface ComplaintInput {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  order_number?: string;
  category?: string;
  description: string;
}

export const submitComplaint = async (payload: ComplaintInput) => {
  const response = await fetch(`${API_BASE_URL}/complaints`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Failed to submit complaint');
  return response.json();
};

// Products
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Product data carries live stock, so it is never taken from the HTTP cache, and a busy backend (429 rate limit, 5xx)
 * or a dropped connection is waited out and retried rather than given up on: giving up would leave the page on the
 * baked-in catalogue, which knows nothing about stock. A real answer such as 404 is not retried.
 */
async function fetchProductJson(url: string, failure: string, attempts = 4) {
  let delay = 1000;
  for (let attempt = 1; ; attempt++) {
    let response: Response | null = null;
    try {
      response = await fetch(url, { cache: 'no-store' });
    } catch {
      if (attempt >= attempts) throw new Error(failure);
    }
    if (response) {
      if (response.ok) return response.json();
      const retryable = response.status === 429 || response.status >= 500;
      if (!retryable || attempt >= attempts) throw new Error(failure);
      const retryAfter = Number(response.headers.get('Retry-After'));
      if (Number.isFinite(retryAfter) && retryAfter > 0) delay = Math.max(delay, retryAfter * 1000);
    }
    await sleep(Math.min(delay, 15000));
    delay *= 2;
  }
}

export const getProducts = (page = 1, limit = 10) =>
  fetchProductJson(`${API_BASE_URL}/products?page=${page}&limit=${limit}`, 'Failed to fetch products');

export const getProductBySlug = (slug: string) =>
  fetchProductJson(`${API_BASE_URL}/products/${slug}`, 'Failed to fetch product');

// Contact
export const submitContact = async (formData: any) => {
  const response = await fetch(`${API_BASE_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error('Failed to submit contact form');
  return response.json();
};

// Job application. Sent as multipart (includes the CV file), so no manual
// Content-Type — the browser sets the boundary itself.
export const submitJobApplication = async (jobId: number | string, data: FormData) => {
  const response = await fetch(`${API_BASE_URL}/careers/${encodeURIComponent(String(jobId))}/apply`, {
    method: 'POST',
    body: data,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const firstError = body?.errors ? (Object.values(body.errors).flat()[0] as string | undefined) : undefined;
    throw new Error(firstError || body?.message || 'Something went wrong. Please try again.');
  }
  return body;
};
