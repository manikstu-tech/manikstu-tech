import "server-only";
import type { SectionDef } from "@/lib/admin/sections";
import { getCategoryOptions } from "@/lib/admin/sections-api";
import type { AdminCategory } from "@/lib/admin/types";

/**
 * Options for a section's "category" fields: active categories, plus the
 * record's current one even if it was deactivated, so saving can't silently
 * clear it.
 */
export async function loadCategories(section: SectionDef, currentId?: unknown): Promise<Record<string, AdminCategory[]>> {
  const types = [...new Set(section.fields.filter((f) => f.type === "category" && f.categoryType).map((f) => f.categoryType!))];
  const lists = await Promise.all(types.map((t) => getCategoryOptions(t)));
  return Object.fromEntries(types.map((t, i) => [t, lists[i].filter((c) => c.is_active || c.id === currentId)]));
}
