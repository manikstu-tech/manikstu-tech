// src/lib/api.ts
import type { ApiResponse, Setting, NavigationMenuItem, FooterLink, Page, BlogPost, Testimonial, ImpactStat, GalleryImage, Partner, PressRelease } from '@/types';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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
export const getBlogPost = (slug: string) => apiFetch<ApiResponse<BlogPost>>(`/blog/${slug}`);
// Testimonials, Stats, Gallery, Partners, Press
export const getTestimonials = () => apiFetch<ApiResponse<Testimonial[]>>('/testimonials');
export const getStats = () => apiFetch<ApiResponse<ImpactStat[]>>('/stats');
export const getGallery = (page = 1) => apiFetch<ApiResponse<GalleryImage[]>>(`/gallery?page=${page}`);
export const getPartners = () => apiFetch<ApiResponse<Partner[]>>('/partners');
export const getPressReleases = (page = 1) => apiFetch<ApiResponse<PressRelease[]>>(`/press?page=${page}`);

// Job Openings
export const getJobOpenings = () => apiFetch<ApiResponse<any[]>>('/careers');
export const getJobOpening = async (id: string) => {
  const res = await apiFetch<ApiResponse<any[]>>('/careers');
  const job = res.data?.find((j: any) => String(j.id) === id);
  return job || null;
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
