import "server-only";
import { adminFetch } from "./api";
import { SETTINGS_KEYS, type SectionDef } from "./sections";
import type { AdminCategory } from "./types";

export type AdminRecord = Record<string, unknown> & { id: number };

export interface ListMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  [extra: string]: unknown;
}

export interface SectionList {
  data: AdminRecord[];
  meta: ListMeta;
}

function query(params: Record<string, string | undefined>): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) if (value) qs.set(key, value);
  const q = qs.toString();
  return q ? `?${q}` : "";
}

export function listSection(key: string, params: Record<string, string | undefined>): Promise<SectionList> {
  return adminFetch<SectionList>(`/${key}${query(params)}`);
}

export async function getRecord(key: string, id: string): Promise<AdminRecord> {
  return (await adminFetch<{ data: AdminRecord }>(`/${key}/${encodeURIComponent(id)}`)).data;
}

export async function getCategoryOptions(type: string): Promise<AdminCategory[]> {
  return (await adminFetch<{ data: AdminCategory[] }>(`/categories/options?type=${encodeURIComponent(type)}`)).data;
}

const TRANSLATION_KEY = /^(title|excerpt|content)_[a-z]{2}$/;

/** Copy only the section's fields, dropping Next's internal $ACTION_ keys. */
function toApiFormData(section: SectionDef, input: FormData): FormData {
  const out = new FormData();
  for (const field of section.fields) {
    const type = field.type ?? "text";
    if (type === "toggle") {
      out.set(field.name, input.get(field.name) ? "1" : "0");
    } else if (type === "image") {
      const file = input.get(field.name);
      if (file instanceof File && file.size > 0) out.set(field.name, file);
      const existing = input.get(`${field.name}_existing`);
      out.set(`${field.name}_existing`, typeof existing === "string" ? existing : "");
    } else if (type === "password") {
      // Blank means "keep the current password".
      const value = input.get(field.name);
      if (typeof value === "string" && value) out.set(field.name, value);
    } else {
      const value = input.get(field.name);
      if (typeof value === "string") out.set(field.name, value);
    }
  }
  if (section.translations) {
    for (const [key, value] of input.entries()) {
      if (TRANSLATION_KEY.test(key) && typeof value === "string") out.set(key, value);
    }
  }
  return out;
}

export async function saveRecord(section: SectionDef, id: number | null, input: FormData): Promise<AdminRecord> {
  const { data } = await adminFetch<{ data: AdminRecord }>(id ? `/${section.key}/${id}` : `/${section.key}`, {
    method: "POST",
    body: toApiFormData(section, input),
  });
  return data;
}

export function deleteRecord(key: string, id: number): Promise<unknown> {
  return adminFetch(`/${key}/${id}`, { method: "DELETE" });
}

export interface DashboardData {
  date: string;
  stats: {
    products: number;
    orders: number;
    new_enquiries: number;
    revenue: number;
    blog_posts: number;
    team_members: number;
    customers: number;
    job_openings: number;
  };
  recent_enquiries: { id: number; name: string; email: string; type: string; status: string; created_at: string }[];
  recent_orders: { id: number; order_number: string; total: number; status: string; customer: string | null; created_at: string }[];
  recent_blog: { id: number; title: string; is_published: boolean; created_at: string }[];
}

export async function getDashboard(date?: string): Promise<DashboardData> {
  return (await adminFetch<{ data: DashboardData }>(`/dashboard${query({ date })}`)).data;
}

export interface MediaItem {
  id: number;
  name: string;
  type: "photo" | "video";
  file_name: string;
  mime_type: string;
  size: number;
  url: string;
  created_at: string;
}

export function listMedia(params: Record<string, string | undefined>): Promise<{ data: MediaItem[]; meta: ListMeta }> {
  return adminFetch(`/media${query(params)}`);
}

export async function uploadMedia(input: FormData): Promise<MediaItem> {
  const out = new FormData();
  for (const key of ["type", "title", "date"]) {
    const value = input.get(key);
    if (typeof value === "string") out.set(key, value);
  }
  const file = input.get("file");
  if (file instanceof File && file.size > 0) out.set("file", file);
  return (await adminFetch<{ data: MediaItem }>("/media", { method: "POST", body: out })).data;
}

export function deleteMedia(id: number): Promise<unknown> {
  return adminFetch(`/media/${id}`, { method: "DELETE" });
}

export async function getSettings(): Promise<Record<string, string | null>> {
  return (await adminFetch<{ data: Record<string, string | null> }>("/settings")).data;
}

export async function saveSettings(input: FormData): Promise<void> {
  const out = new FormData();
  for (const key of SETTINGS_KEYS) out.set(key, String(input.get(key) ?? ""));
  await adminFetch("/settings", { method: "POST", body: out });
}
