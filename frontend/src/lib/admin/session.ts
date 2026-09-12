import "server-only";
import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "./constants";

/** Matches the 7-day expiry Laravel puts on admin tokens. */
const MAX_AGE = 60 * 60 * 24 * 7;

export async function getAdminToken(): Promise<string | undefined> {
  return (await cookies()).get(ADMIN_COOKIE)?.value;
}

export async function setAdminToken(token: string): Promise<void> {
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: MAX_AGE,
  });
}

export async function clearAdminToken(): Promise<void> {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
}
