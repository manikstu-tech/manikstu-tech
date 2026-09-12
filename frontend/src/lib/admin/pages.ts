import "server-only";
import { adminFetch } from "./api";

export interface PageSummary {
  id: number;
  title: string;
  slug: string;
  is_published: boolean;
  blocks_count: number;
  updated_at: string;
}

export interface PageBlock {
  id: number;
  type: string;
  title: string | null;
  /** JSON text; the website parses it. */
  content: string | null;
  settings: unknown;
  order: number;
  is_active: boolean;
}

export interface PageDetail {
  id: number;
  title: string;
  slug: string;
  meta_description: string | null;
  is_published: boolean;
  translations: { locale: string; title: string; meta_description: string | null }[];
  blocks: PageBlock[];
}

export async function listPages(): Promise<PageSummary[]> {
  return (await adminFetch<{ data: PageSummary[] }>("/pages")).data;
}

export async function getPageDetail(id: string): Promise<PageDetail> {
  return (await adminFetch<{ data: PageDetail }>(`/pages/${encodeURIComponent(id)}`)).data;
}

const TRANSLATION_KEY = /^(title|meta_description)_[a-z]{2}$/;

export async function savePage(id: number, input: FormData): Promise<void> {
  const out = new FormData();
  out.set("title", String(input.get("title") ?? ""));
  out.set("meta_description", String(input.get("meta_description") ?? ""));
  out.set("is_published", input.get("is_published") ? "1" : "0");
  for (const [key, value] of input.entries()) {
    if (TRANSLATION_KEY.test(key) && typeof value === "string") out.set(key, value);
  }
  await adminFetch(`/pages/${id}`, { method: "POST", body: out });
}

function blockForm(input: FormData, withType: boolean): FormData {
  const out = new FormData();
  if (withType) out.set("type", String(input.get("type") ?? "").trim());
  out.set("title", String(input.get("title") ?? ""));
  out.set("content", String(input.get("content") ?? ""));
  out.set("is_active", input.get("is_active") ? "1" : "0");
  return out;
}

export async function createBlock(pageId: number, input: FormData): Promise<void> {
  await adminFetch(`/pages/${pageId}/blocks`, { method: "POST", body: blockForm(input, true) });
}

export async function updateBlock(blockId: number, input: FormData): Promise<void> {
  await adminFetch(`/blocks/${blockId}`, { method: "POST", body: blockForm(input, false) });
}

export async function reorderBlocks(pageId: number, ids: number[]): Promise<void> {
  await adminFetch(`/pages/${pageId}/blocks/reorder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order: ids }),
  });
}

export async function deleteBlock(blockId: number): Promise<void> {
  await adminFetch(`/blocks/${blockId}`, { method: "DELETE" });
}
