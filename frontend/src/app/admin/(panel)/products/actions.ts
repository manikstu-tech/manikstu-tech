"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AdminApiError } from "@/lib/admin/api";
import { deleteProduct, saveProduct, toggleProductPublish } from "@/lib/admin/products";
import type { FormState } from "@/lib/admin/types";

// Each call below goes through adminFetch, so Laravel re-checks the admin
// token and role on every action — the page-level check doesn't cover these.

export async function saveProductAction(id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  let savedId: number;
  try {
    savedId = (await saveProduct(id, formData)).id;
  } catch (e) {
    if (e instanceof AdminApiError) {
      return { message: e.status === 422 ? "Please fix the highlighted fields." : e.message, errors: e.errors };
    }
    throw e;
  }
  revalidatePath("/admin/products", "layout");
  redirect(`/admin/products/${savedId}?saved=1`);
}

export async function togglePublishAction(id: number): Promise<void> {
  await toggleProductPublish(id);
  revalidatePath("/admin/products", "layout");
}

export async function deleteProductAction(id: number): Promise<{ error?: string }> {
  try {
    await deleteProduct(id);
  } catch (e) {
    if (e instanceof AdminApiError) {
      return { error: e.status === 403 ? "Only developers can delete products." : e.message };
    }
    throw e;
  }
  revalidatePath("/admin/products", "layout");
  redirect("/admin/products?deleted=1");
}
