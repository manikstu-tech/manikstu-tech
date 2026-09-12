import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/admin/constants";

/**
 * Clears a dead admin token. Pages can't set cookies while rendering, so
 * adminFetch redirects here on a 401 and this sends the user to login.
 */
export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/admin/login?expired=1", request.url));
  response.cookies.delete({ name: ADMIN_COOKIE, path: "/admin" });
  return response;
}
