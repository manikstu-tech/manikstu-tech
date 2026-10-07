import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight, Calendar, ChevronRight, FileText, Image as ImageIcon,
  PenSquare, Settings, Users, Zap, type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/admin/AdminUi";
import { requireAdmin } from "@/lib/admin/auth";
import { getDashboard } from "@/lib/admin/sections-api";

export const metadata: Metadata = { title: "Dashboard" };

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const s = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min${m === 1 ? "" : "s"} ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.round(h / 24);
  return `${d} day${d === 1 ? "" : "s"} ago`;
}

/* ---- activity feed ---- */
type Activity = { id: string; icon: LucideIcon; title: string; subtitle: string; href: string; at: string };

function ActivityRow({ item }: { item: Activity }) {
  const Icon = item.icon;
  return (
    <Link href={item.href} className="flex items-center gap-3 py-3 transition hover:opacity-80">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5B8DEF]/10 text-[#3E6FD0]">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-charcoal">{item.title}</span>
        <span className="block truncate text-xs text-grey">{item.subtitle}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2 whitespace-nowrap text-xs text-grey">
        {timeAgo(item.at)}
        <span className="h-2 w-2 rounded-full bg-[#5B8DEF]" />
      </span>
    </Link>
  );
}

/* ---- quick actions ---- */
type ActionTone = "green" | "amber" | "blue" | "purple";
const ACTION_TONES: Record<ActionTone, { tile: string; row: string; chevron: string }> = {
  green: { tile: "bg-manikstu-green/12 text-manikstu-green", row: "border-manikstu-green/15 bg-manikstu-green/[0.05] hover:bg-manikstu-green/[0.09]", chevron: "group-hover:text-manikstu-green" },
  amber: { tile: "bg-[#E8912A]/15 text-[#C77A16]", row: "border-[#E8912A]/20 bg-[#E8912A]/[0.06] hover:bg-[#E8912A]/[0.11]", chevron: "group-hover:text-[#C77A16]" },
  blue: { tile: "bg-[#5B8DEF]/14 text-[#3E6FD0]", row: "border-[#5B8DEF]/20 bg-[#5B8DEF]/[0.06] hover:bg-[#5B8DEF]/[0.11]", chevron: "group-hover:text-[#3E6FD0]" },
  purple: { tile: "bg-[#7C5CB0]/14 text-[#7C5CB0]", row: "border-[#7C5CB0]/20 bg-[#7C5CB0]/[0.06] hover:bg-[#7C5CB0]/[0.11]", chevron: "group-hover:text-[#7C5CB0]" },
};

function ActionRow({ label, description, icon: Icon, href, tone }: { label: string; description: string; icon: LucideIcon; href: string; tone: ActionTone }) {
  const t = ACTION_TONES[tone];
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition ${t.row}`}
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${t.tile}`}>
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-charcoal">{label}</span>
        <span className="block truncate text-xs text-grey">{description}</span>
      </span>
      <ChevronRight className={`h-4 w-4 shrink-0 text-grey transition group-hover:translate-x-0.5 ${t.chevron}`} />
    </Link>
  );
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const [user, sp] = await Promise.all([requireAdmin(), searchParams]);
  const data = await getDashboard(sp.date);
  const today = new Date().toISOString().slice(0, 10);
  const isDeveloper = user.role === "developer";

  // Recent activity, built from the blog posts the dashboard returns.
  const activity: Activity[] = data.recent_blog
    .map((b) => ({
      id: `blog-${b.id}`,
      icon: FileText,
      title: b.is_published ? "Blog post published" : "Blog post drafted",
      subtitle: `“${b.title}”`,
      href: `/admin/blog/${b.id}/edit`,
      at: b.created_at,
    }))
    .filter((a) => a.at)
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 6);

  return (
    <div className="relative">
      <PageHeader
        title="Dashboard"
        subtitle={
          data.date === today
            ? `Welcome back, ${user.name.split(" ")[0]}. Here's what's happening today.`
            : `Figures as of ${new Date(`${data.date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.`
        }
        actions={
          <form method="get" className="flex shrink-0 items-center gap-2 rounded-full border border-[#E8E2D6] bg-white px-3.5 py-1.5 shadow-sm">
            <Calendar className="h-4 w-4 shrink-0 text-manikstu-green" />
            <input
              type="date"
              name="date"
              defaultValue={data.date}
              max={today}
              aria-label="Show figures as of"
              className="border-0 bg-transparent p-0 text-sm font-semibold text-charcoal outline-none [color-scheme:light]"
            />
            <button type="submit" className="flex h-6 w-6 items-center justify-center rounded-full text-grey transition hover:bg-manikstu-cream hover:text-manikstu-green" aria-label="Apply date">
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>
        }
      />

      {/* Activity + Quick actions */}
      <div className="grid items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-charcoal">Recent Activity</h2>
            <Link href="/admin/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-manikstu-green hover:underline">
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          {activity.length === 0 ? (
            <p className="py-10 text-center text-sm text-grey">No recent activity yet.</p>
          ) : (
            <ul className="mt-1 divide-y divide-[#F4F1EA]">
              {activity.map((item) => (
                <li key={item.id}>
                  <ActivityRow item={item} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-gradient-to-br from-white to-[#FBF7EF] p-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-manikstu-green/12">
              <Zap className="h-[18px] w-[18px] fill-manikstu-green text-manikstu-green" />
            </span>
            <h2 className="font-heading text-lg font-bold text-charcoal">Quick Actions</h2>
          </div>
          <div className="mt-4 grid gap-2.5">
            <ActionRow tone="green" label="Create Blog Post" description="Write and publish a blog" icon={PenSquare} href="/admin/blog/new" />
            <ActionRow tone="amber" label="Edit Pages" description="Update website page content" icon={FileText} href="/admin/pages" />
            <ActionRow tone="blue" label="Manage Media" description="Upload and organise media" icon={ImageIcon} href="/admin/media" />
            {isDeveloper ? (
              <ActionRow tone="purple" label="Manage Settings" description="Configure your preferences" icon={Settings} href="/admin/settings" />
            ) : (
              <ActionRow tone="purple" label="Team Members" description="People on the About page" icon={Users} href="/admin/team" />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
