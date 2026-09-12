import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { AdminApiError, adminFetch, adminLoginRequest } from "./api";
import { clearAdminToken, getAdminToken, setAdminToken } from "./session";
import type { AdminUser } from "./types";

/** The signed-in staff member for this request, or null. Deduplicated per render. */
export const getCurrentAdmin = cache(async (): Promise<AdminUser | null> => {
  if (!(await getAdminToken())) return null;
  try {
    const { data } = await adminFetch<{ data: AdminUser }>("/me");
    return data;
  } catch (e) {
    if (e instanceof AdminApiError && e.status === 403) return null;
    throw e;
  }
});

/**
 * Admin-panel pages call this. Telecallers belong in their own panel, so they
 * are sent there, as the Blade `area` guard did. The proxy's cookie check is
 * only optimistic.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getCurrentAdmin();
  if (!user) redirect("/admin/session-expired");
  if (user.role === "telecaller") redirect("/admin/telecalling");
  return user;
}

/** Telecalling pages call this; everyone else goes to the admin dashboard. */
export async function requireTelecaller(): Promise<AdminUser> {
  const user = await getCurrentAdmin();
  if (!user) redirect("/admin/session-expired");
  if (user.role !== "telecaller") redirect("/admin/dashboard");
  return user;
}

export type LoginResult = { ok: true; role: string } | { ok: false; error: string };

export async function adminLogin(email: string, password: string): Promise<LoginResult> {
  let res: Response;
  try {
    res = await adminLoginRequest(email, password);
  } catch {
    return { ok: false, error: "Can't reach the server. Please try again in a moment." };
  }

  if (res.status === 429) {
    return { ok: false, error: "Too many attempts. Wait a minute and try again." };
  }

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, error: body.errors?.email?.[0] ?? body.message ?? "Login failed." };
  }

  const { token, user } = body as { token: string; user: AdminUser };
  await setAdminToken(token);
  return { ok: true, role: user.role };
}

export async function adminLogout(): Promise<void> {
  if (await getAdminToken()) {
    // Revoke on the server too, but never let that block signing out.
    await adminFetch("/logout", { method: "POST" }).catch(() => {});
  }
  await clearAdminToken();
}
