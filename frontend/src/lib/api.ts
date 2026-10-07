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
}

export const placeOrder = async (payload: OrderInput) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Failed to place order');
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

// Products
export const getProducts = async (page = 1, limit = 10) => {
  const response = await fetch(`${API_BASE_URL}/products?page=${page}&limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const getProductBySlug = async (slug: string) => {
  const response = await fetch(`${API_BASE_URL}/products/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

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
