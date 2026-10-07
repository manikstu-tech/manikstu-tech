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
 * Admin-panel pages call this. The proxy's cookie check is only optimistic;
 * Laravel checks the token and role on every request, so it stays the real
 * auth boundary.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getCurrentAdmin();
  if (!user) redirect("/admin/session-expired");
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

  // Telecalling moved to the CRM and its panel here is gone, but Laravel's
  // EnsureAdminArea still refuses telecallers — so letting one in would land
  // them on a dashboard where every request 403s. Stop here and say where to go.
  if (user.role === "telecaller") {
    return {
      ok: false,
      error: "Telecalling now runs in the Manikstu CRM. Please sign in there instead.",
    };
  }

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
