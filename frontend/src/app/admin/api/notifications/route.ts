import { NextResponse } from "next/server";
import { getAdminToken } from "@/lib/admin/session";
import { getDashboard } from "@/lib/admin/sections-api";

export const dynamic = "force-dynamic";

export type NotificationType = "blog";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  subtitle: string;
  href: string;
  at: string; // ISO timestamp
}

/**
 * Live activity feed for the admin topbar bell. Built from the existing
 * /dashboard payload (recent blog posts) so it needs no new backend endpoint.
 * Polled by the client every ~30s.
 */
export async function GET() {
  // No session → empty feed (the next server navigation handles the redirect).
  if (!(await getAdminToken())) {
    return NextResponse.json({ items: [], serverTime: new Date().toISOString() });
  }

  try {
    const data = await getDashboard();

    const items: NotificationItem[] = [
      ...data.recent_blog.map((b) => ({
        id: `blog-${b.id}`,
        type: "blog" as const,
        title: `Blog post: ${b.title}`,
        subtitle: b.is_published ? "Published" : "Draft",
        href: `/admin/blog/${b.id}/edit`,
        at: b.created_at,
      })),
    ]
      .filter((i) => i.at)
      .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
      .slice(0, 15);

    return NextResponse.json({ items, serverTime: new Date().toISOString() });
  } catch {
    // Dead token / backend hiccup: fail soft so the bell just shows nothing.
    return NextResponse.json({ items: [], serverTime: new Date().toISOString() });
  }
}
