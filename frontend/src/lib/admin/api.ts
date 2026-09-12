import "server-only";
import { redirect } from "next/navigation";
import { getAdminToken } from "./session";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? "https://api.manikstu.com/api" : "http://localhost:8000/api")
).replace(/\/+$/, "");

export class AdminApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly errors: Record<string, string[]> = {},
  ) {
    super(message);
    this.name = "AdminApiError";
  }
}

type Options = Omit<RequestInit, "headers"> & {
  /** Use this token instead of the cookie (e.g. right after login). */
  token?: string;
  headers?: Record<string, string>;
};

/**
 * Call the Laravel admin API as the signed-in user. Laravel checks the token
 * and role on every request, so it is the real auth boundary. A dead token
 * sends the user to /admin/session-expired, which clears the cookie.
 */
export async function adminFetch<T>(path: string, { token, headers, ...init }: Options = {}): Promise<T> {
  const auth = token ?? (await getAdminToken());
  if (!auth) redirect("/admin/login");

  const res = await fetch(`${API_URL}/admin${path}`, {
    ...init,
    headers: { Accept: "application/json", Authorization: `Bearer ${auth}`, ...headers },
    cache: "no-store",
  });

  if (res.status === 401) redirect("/admin/session-expired");
  if (res.status === 204) return undefined as T;

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new AdminApiError(res.status, body.message || `Request failed (${res.status})`, body.errors ?? {});
  }
  return body as T;
}

export function adminLoginRequest(email: string, password: string): Promise<Response> {
  return fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
}
