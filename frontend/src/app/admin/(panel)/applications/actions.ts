"use server";

import { revalidatePath } from "next/cache";
import { adminFetch } from "@/lib/admin/api";

export async function updateApplicationStatus(id: number, status: string): Promise<void> {
  await adminFetch(`/applications/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  revalidatePath("/admin/applications");
  revalidatePath("/admin/hr");
}
