import { getAdminToken } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production" ? "https://api.manikstu.com/api" : "http://127.0.0.1:8001/api")
).replace(/\/+$/, "");

/**
 * Streams an applicant's CV through the admin's session. The browser hits this
 * same-origin route (cookie attached); the server forwards the download to the
 * Laravel API with the bearer token, so the CV is never exposed publicly.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = await getAdminToken();
  if (!token) return new Response("Unauthorized", { status: 401 });
  if (!/^\d+$/.test(id)) return new Response("Not found", { status: 404 });

  const res = await fetch(`${API_URL}/admin/applications/${id}/resume`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok || !res.body) {
    return new Response("Could not fetch the CV.", { status: res.status || 502 });
  }

  const headers = new Headers();
  headers.set("Content-Type", res.headers.get("content-type") || "application/octet-stream");
  const disposition = res.headers.get("content-disposition");
  if (disposition) headers.set("Content-Disposition", disposition);
  const length = res.headers.get("content-length");
  if (length) headers.set("Content-Length", length);

  return new Response(res.body, { status: 200, headers });
}
