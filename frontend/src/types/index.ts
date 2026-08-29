// src/types/index.ts

// API response wrapper
export interface ApiResponse<T> {
  data: T;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Navigation
export interface NavigationMenuItem {
  id: number;
  label: string;
  url: string;
  parent_id: number | null;
  order: number;
  is_active: boolean;
  target: string;
}

// Footer
export interface FooterLink {
  id: number;
  group: string;
  label: string;
  url: string;
  order: number;
  is_active: boolean;
}

// Pages & Blocks
export interface Page {
  id: number;
  title: string;
  slug: string;
  meta_description: string | null;
  is_published: boolean;
  blocks: PageBlock[];
}

export interface PageBlock {
  id: number;
  page_id: number;
  type: string;
  title: string | null;
  content: string | null;
  image: string | null;
  settings: Record<string, any> | null;
  order: number;
  is_active: boolean;
}

// Blog
export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  type: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  featured_image: string | null;
  category_id: number | null;
  category: BlogCategory | null;
  is_featured: boolean;
  is_published: boolean;
  published_at: string | null;
}

// Gallery
export interface GalleryImage {
  id: number;
  image: string;
  caption: string;
  category_id: number | null;
  order: number;
  is_active: boolean;
}

// Press Releases
export interface PressRelease {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  category_id: number | null;
  is_published: boolean;
  published_at: string | null;
  category: BlogCategory | null;
}
