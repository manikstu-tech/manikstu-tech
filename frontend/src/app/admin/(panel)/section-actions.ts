"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AdminApiError } from "@/lib/admin/api";
import { toFormState } from "@/lib/admin/form-error";
import { getSection } from "@/lib/admin/sections";
import { deleteMedia, deleteRecord, saveRecord, saveSettings, uploadMedia } from "@/lib/admin/sections-api";
import type { FormState } from "@/lib/admin/types";

// Every call goes through adminFetch, so Laravel re-checks the admin token and
// role on each action. `key` is also checked against the known sections.

function sectionOrThrow(key: string) {
  const section = getSection(key);
  if (!section) throw new Error(`Unknown admin section: ${key}`);
  return section;
}

export async function saveSectionAction(key: string, id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  const section = sectionOrThrow(key);
  let savedId: number;
  try {
    savedId = (await saveRecord(section, id, formData)).id;
  } catch (e) {
    return toFormState(e);
  }
  revalidatePath(`/admin/${key}`, "layout");
  revalidatePath("/admin/dashboard");
  redirect(section.hasDetail ? `/admin/${key}/${savedId}?saved=1` : `/admin/${key}?saved=1`);
}

export async function deleteSectionAction(key: string, id: number): Promise<{ error?: string }> {
  sectionOrThrow(key);
  try {
    await deleteRecord(key, id);
  } catch (e) {
    if (e instanceof AdminApiError) return { error: e.status === 403 ? "Only developers can delete." : e.message };
    throw e;
  }
  revalidatePath(`/admin/${key}`, "layout");
  revalidatePath("/admin/dashboard");
  redirect(`/admin/${key}?deleted=1`);
}

export async function uploadMediaAction(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    await uploadMedia(formData);
  } catch (e) {
    return toFormState(e);
  }
  revalidatePath("/admin/media");
  return { ok: true, message: "Uploaded." };
}

export async function deleteMediaAction(id: number): Promise<{ error?: string }> {
  try {
    await deleteMedia(id);
  } catch (e) {
    if (e instanceof AdminApiError) return { error: e.status === 403 ? "Only developers can delete." : e.message };
    throw e;
  }
  revalidatePath("/admin/media");
  return {};
}

export async function saveSettingsAction(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    await saveSettings(formData);
  } catch (e) {
    return toFormState(e);
  }
  revalidatePath("/admin/settings");
  return { ok: true, message: "Settings saved." };
}
