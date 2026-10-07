"use server";

import { redirect } from "next/navigation";
import { adminLogin } from "@/lib/admin/auth";
import type { LoginState } from "@/lib/admin/types";

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password.", email };

  const result = await adminLogin(email, password);
  if (!result.ok) return { error: result.error, email };

  // Separate panels: HR staff land in the HR workspace, everyone else in the admin panel.
  redirect(result.role === "hr" ? "/admin/hr" : "/admin/dashboard");
}
