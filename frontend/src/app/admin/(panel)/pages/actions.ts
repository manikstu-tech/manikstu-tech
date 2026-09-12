"use server";

import { revalidatePath } from "next/cache";
import { AdminApiError } from "@/lib/admin/api";
import { toFormState } from "@/lib/admin/form-error";
import { createBlock, deleteBlock, reorderBlocks, savePage, updateBlock } from "@/lib/admin/pages";
import type { FormState } from "@/lib/admin/types";

// Laravel re-checks the admin token and role on every call below.

function refresh(pageId: number) {
  revalidatePath("/admin/pages");
  revalidatePath(`/admin/pages/${pageId}`);
}

export async function savePageAction(pageId: number, _prev: FormState, formData: FormData): Promise<FormState> {
  try {
    await savePage(pageId, formData);
  } catch (e) {
    return toFormState(e);
  }
  refresh(pageId);
  return { ok: true, message: "Page saved." };
}

/** Creates a block when blockId is null, otherwise updates it. */
export async function saveBlockAction(pageId: number, blockId: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  try {
    if (blockId) await updateBlock(blockId, formData);
    else await createBlock(pageId, formData);
  } catch (e) {
    return toFormState(e);
  }
  refresh(pageId);
  return { ok: true, message: blockId ? "Block saved." : "Block added." };
}

async function run(pageId: number, work: () => Promise<void>, forbidden: string): Promise<{ error?: string }> {
  try {
    await work();
  } catch (e) {
    if (e instanceof AdminApiError) return { error: e.status === 403 ? forbidden : e.message };
    throw e;
  }
  refresh(pageId);
  return {};
}

export async function reorderBlocksAction(pageId: number, ids: number[]): Promise<{ error?: string }> {
  return run(pageId, () => reorderBlocks(pageId, ids), "You don't have permission to reorder blocks.");
}

export async function deleteBlockAction(pageId: number, blockId: number): Promise<{ error?: string }> {
  return run(pageId, () => deleteBlock(blockId), "Only developers can delete blocks.");
}
