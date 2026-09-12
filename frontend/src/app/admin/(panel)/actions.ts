"use server";

import { redirect } from "next/navigation";
import { adminLogout } from "@/lib/admin/auth";

export async function logoutAction(): Promise<void> {
  await adminLogout();
  redirect("/admin/login");
}
