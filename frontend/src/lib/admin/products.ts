import "server-only";
import { adminFetch } from "./api";
import type { AdminCategory, AdminProduct, Paginated } from "./types";

export interface ProductFilters {
  search?: string;
  category?: string;
  status?: string;
  page?: string;
}

export function listProducts(filters: ProductFilters): Promise<Paginated<AdminProduct>> {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) if (value) qs.set(key, value);
  const query = qs.toString();
  return adminFetch<Paginated<AdminProduct>>(`/products${query ? `?${query}` : ""}`);
}

export async function getProduct(id: string): Promise<AdminProduct> {
  return (await adminFetch<{ data: AdminProduct }>(`/products/${encodeURIComponent(id)}`)).data;
}

export async function getProductCategories(): Promise<AdminCategory[]> {
  return (await adminFetch<{ data: AdminCategory[] }>("/product-categories")).data;
}

export const IMAGE_SLOTS = ["main", "angle1", "angle2", "angle3"] as const;

const TEXT_FIELDS = [
  "name", "slug", "sku", "size", "description", "long_description", "price",
  "stock_quantity", "category_id", "usage_instructions", "storage_instructions",
  "ingredients", "rating", "rating_count", "order", "highlights", "recommended_for",
];

/** Copy only the fields Laravel expects, dropping Next's internal $ACTION_ keys. */
function toApiFormData(input: FormData): FormData {
  const out = new FormData();
  for (const key of TEXT_FIELDS) out.set(key, String(input.get(key) ?? ""));
  for (const key of ["is_active", "is_featured"]) out.set(key, input.get(key) ? "1" : "0");

  for (const [key, value] of input.entries()) {
    if (key.startsWith("specs[") && typeof value === "string") out.set(key, value);
  }

  for (const slot of IMAGE_SLOTS) {
    const existing = input.get(`existing_images[${slot}]`);
    if (typeof existing === "string" && existing) out.set(`existing_images[${slot}]`, existing);
    const file = input.get(`images[${slot}]`);
    if (file instanceof File && file.size > 0) out.set(`images[${slot}]`, file);
  }
  return out;
}

export async function saveProduct(id: number | null, input: FormData): Promise<AdminProduct> {
  const { data } = await adminFetch<{ data: AdminProduct }>(id ? `/products/${id}` : "/products", {
    method: "POST",
    body: toApiFormData(input),
  });
  return data;
}

export function toggleProductPublish(id: number): Promise<unknown> {
  return adminFetch(`/products/${id}/toggle-publish`, { method: "PUT" });
}

export function deleteProduct(id: number): Promise<unknown> {
  return adminFetch(`/products/${id}`, { method: "DELETE" });
}
