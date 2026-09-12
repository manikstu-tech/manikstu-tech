"use server";

import { revalidatePath } from "next/cache";
import { toFormState } from "@/lib/admin/form-error";
import { markTcNotificationsRead, updateTcProfile } from "@/lib/admin/telecalling";
import type { FormState } from "@/lib/admin/types";

// Laravel's telecalling.area guard re-checks the token and role on each call.

export async function markNotificationsReadAction(): Promise<void> {
  await markTcNotificationsRead();
  revalidatePath("/admin/telecalling", "layout");
}

export async function updateProfileAction(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    await updateTcProfile(formData);
  } catch (e) {
    return toFormState(e);
  }
  revalidatePath("/admin/telecalling", "layout");
  return { ok: true, message: "Profile updated successfully." };
}
