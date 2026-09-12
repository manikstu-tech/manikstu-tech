export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface ProductImage {
  /** Raw stored path, sent back as existing_images[slot] on update. */
  path: string;
  url: string | null;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface AdminProduct {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  size: string | null;
  description: string | null;
  long_description: string | null;
  price: number | null;
  stock_quantity: number;
  category_id: number | null;
  category: { id: number; name: string } | null;
  image_url: string | null;
  images: ProductImage[];
  highlights: string[];
  recommended_for: string[];
  specifications: ProductSpec[];
  usage_instructions: string | null;
  storage_instructions: string | null;
  ingredients: string | null;
  rating: number | null;
  rating_count: number;
  order: number;
  is_featured: boolean;
  is_active: boolean;
  translations?: { locale: string; name: string | null }[];
}

export interface AdminCategory {
  id: number;
  name: string;
  is_active: boolean;
}

export interface Paginated<T> {
  data: T[];
  meta: { current_page: number; last_page: number; per_page: number; total: number };
}

/** What form Server Actions return: only what the UI renders. */
export interface FormState {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface LoginState {
  error?: string;
  email?: string;
}
