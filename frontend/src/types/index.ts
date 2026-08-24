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

// Settings
export interface Setting {
  key: string;
  value: string;
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

// Products
export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  images: string[];
}

export interface ProductResponse {
  data: Product[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Orders
export interface Order {
  id: number;
  order_number: string;
  total: number;
  status: string;
  payment_status: string;
}

// Forms
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  enquiryType: string;
  message: string;
}

export interface JoinHandsFormData {
  mobile: string;
  project: string;
  state: string;
}

export interface TrainingFormData {
  mobile: string;
  trainingType: string;
  state: string;
}

export interface OrderCreateData {
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  totalAmount: number;
}
