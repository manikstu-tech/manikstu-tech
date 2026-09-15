import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight, Calendar, ChevronRight, Contact, FileText, MessageSquare, Newspaper, Package,
  PenSquare, Plus, Settings, ShoppingCart, type LucideIcon,
} from "lucide-react";
import { GoatSolidIcon } from "@/components/icons/BenefitIcons";
import { PageHeader } from "@/components/admin/AdminUi";
import { requireAdmin } from "@/lib/admin/auth";
import { getDashboard } from "@/lib/admin/sections-api";

export const metadata: Metadata = { title: "Dashboard" };

/** ₹ in compact Indian units: 5,20,000 → ₹5.2L, 2,10,00,000 → ₹2.1Cr. */
function compactINR(n: number): string {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(1).replace(/\.0$/, "")}Cr`;
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(1).replace(/\.0$/, "")}L`;
  if (n >= 1_000) return `₹${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return `₹${n.toLocaleString("en-IN")}`;
}

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

/* ---- decorative card watermarks (faint, brand-green line art) ---- */
const wmClass = "pointer-events-none absolute -bottom-2 -right-1 text-manikstu-green opacity-[0.07]";

function PlantWatermark() {
  return (
    <svg viewBox="0 0 100 100" className={`${wmClass} h-24 w-24`} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <path d="M50 92V44" />
      <path d="M50 62c-15 0-25-9-25-24 15 0 25 9 25 24Z" />
      <path d="M50 52c13 0 23-8 23-21-13 0-23 8-23 21Z" />
    </svg>
  );
}
function ChartWatermark() {
  return (
    <svg viewBox="0 0 100 100" className={`${wmClass} h-24 w-24`} fill="currentColor">
      <rect x="16" y="60" width="14" height="28" rx="2" />
      <rect x="38" y="46" width="14" height="42" rx="2" />
      <rect x="60" y="30" width="14" height="58" rx="2" />
      <rect x="82" y="16" width="14" height="72" rx="2" />
    </svg>
  );
}
function GoatWatermark() {
  return <GoatSolidIcon className={`${wmClass} h-28 w-28`} />;
}

/* ---- stat card ---- */
type PillTone = "green" | "gold";
function StatCard({
  label, value, icon: Icon, href, watermark, accent, hint, hintTone = "green", up,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  href: string;
  watermark: ReactNode;
  accent?: boolean;
  hint: string;
  hintTone?: PillTone;
  up?: boolean;
}) {
  const hintStyle = hintTone === "gold" ? "bg-manikstu-gold/15 text-[#8A6414]" : "bg-manikstu-green/10 text-manikstu-leaf";
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        accent ? "border-manikstu-gold/60" : "border-[#ECE7DC]"
      }`}
    >
      {watermark}
      <div className="relative flex items-start justify-between gap-2">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-manikstu-green/10 text-manikstu-leaf">
          <Icon className="h-[22px] w-[22px]" />
        </span>
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${hintStyle}`}>
          {up && <ArrowUpRight className="h-3 w-3" />}
          {hint}
        </span>
      </div>
      <p className="relative mt-4 font-heading text-4xl font-bold lining-nums tabular-nums text-charcoal">{value}</p>
      <p className="relative mt-1 text-sm font-medium text-grey">{label}</p>
    </Link>
  );
}

/* ---- activity feed ---- */
type ActivityTone = "green" | "gold" | "blue" | "red";
const ACTIVITY_STYLE: Record<ActivityTone, { icon: string; dot: string }> = {
  green: { icon: "bg-manikstu-green/10 text-manikstu-leaf", dot: "bg-manikstu-green" },
  gold: { icon: "bg-manikstu-gold/15 text-[#8A6414]", dot: "bg-manikstu-gold" },
  blue: { icon: "bg-[#5B8DEF]/10 text-[#3E6FD0]", dot: "bg-[#5B8DEF]" },
  red: { icon: "bg-manikstu-red/10 text-manikstu-red", dot: "bg-manikstu-red" },
};

type Activity = { id: string; icon: LucideIcon; tone: ActivityTone; title: string; subtitle: string; href: string; at: string };

function ActivityRow({ item }: { item: Activity }) {
  const s = ACTIVITY_STYLE[item.tone];
  const Icon = item.icon;
  return (
    <Link href={item.href} className="flex items-center gap-3 py-3 transition hover:opacity-80">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${s.icon}`}>
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-charcoal">{item.title}</span>
        <span className="block truncate text-xs text-grey">{item.subtitle}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2 whitespace-nowrap text-xs text-grey">
        {timeAgo(item.at)}
        <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      </span>
    </Link>
  );
}

/* ---- quick actions ---- */
function ActionRow({ label, icon: Icon, href }: { label: string; icon: LucideIcon; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-[#ECE7DC] bg-white px-4 py-3 transition hover:border-manikstu-green/40 hover:bg-manikstu-green/[0.03]"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-leaf">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="flex-1 text-sm font-semibold text-charcoal">{label}</span>
      <ChevronRight className="h-4 w-4 text-grey transition group-hover:translate-x-0.5 group-hover:text-manikstu-green" />
    </Link>
  );
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const [user, sp] = await Promise.all([requireAdmin(), searchParams]);
  const data = await getDashboard(sp.date);
  const { stats } = data;
  const today = new Date().toISOString().slice(0, 10);
  const isDeveloper = user.role === "developer";
  const n = (v: number) => v.toLocaleString("en-IN");

  // Build a live activity feed from the recent records the dashboard returns.
  const activity: Activity[] = [
    ...data.recent_enquiries.map((e) => ({
      id: `enquiry-${e.id}`,
      icon: MessageSquare,
      tone: "green" as ActivityTone,
      title: `New enquiry received from ${e.name}`,
      subtitle: e.email,
      href: `/admin/enquiries/${e.id}`,
      at: e.created_at,
    })),
    ...data.recent_orders.map((o) => ({
      id: `order-${o.id}`,
      icon: ShoppingCart,
      tone: "gold" as ActivityTone,
      title: `Order ${o.order_number} · ${o.status}`,
      subtitle: `Customer: ${o.customer ?? "Guest"}`,
      href: `/admin/orders/${o.id}`,
      at: o.created_at,
    })),
    ...data.recent_blog.map((b) => ({
      id: `blog-${b.id}`,
      icon: FileText,
      tone: "blue" as ActivityTone,
      title: b.is_published ? "New blog post published" : "New blog post drafted",
      subtitle: `“${b.title}”`,
      href: `/admin/blog/${b.id}/edit`,
      at: b.created_at,
    })),
  ]
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
          <form method="get" className="flex items-center gap-2 rounded-full border border-[#E8E2D6] bg-white px-3.5 py-1.5 shadow-sm">
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

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Products" value={n(stats.products)} icon={Package} href="/admin/products" watermark={<PlantWatermark />} hint="In catalogue" />
        <StatCard label="Total Orders" value={n(stats.orders)} icon={ShoppingCart} href="/admin/orders" watermark={<GoatWatermark />} hint="All-time" />
        <StatCard label="Active Enquiries" value={n(stats.new_enquiries)} icon={MessageSquare} href="/admin/enquiries?status=new" watermark={<PlantWatermark />} accent hint={`${n(stats.new_enquiries)} pending`} hintTone="gold" />
        <StatCard label="Total Revenue" value={compactINR(stats.revenue)} icon={Contact} href="/admin/orders?payment_status=paid" watermark={<ChartWatermark />} hint="Paid" up />
      </div>

      {/* Activity + Quick actions */}
      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-charcoal">Recent Activity</h2>
            <Link href="/admin/enquiries" className="inline-flex items-center gap-1 text-sm font-semibold text-manikstu-green hover:underline">
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

        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white p-5 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-charcoal">Quick Actions</h2>
          <div className="mt-3 grid gap-2.5">
            <ActionRow label="Add New Product" icon={Plus} href="/admin/products/new" />
            <ActionRow label="Create Blog Post" icon={PenSquare} href="/admin/blog/new" />
            <ActionRow label="View All Enquiries" icon={MessageSquare} href="/admin/enquiries" />
            {isDeveloper ? (
              <ActionRow label="Manage Settings" icon={Settings} href="/admin/settings" />
            ) : (
              <ActionRow label="Manage Orders" icon={ShoppingCart} href="/admin/orders" />
            )}
          </div>
        </section>
      </div>

      {/* Footer artwork + copyright */}
      <footer className="relative mt-10 pt-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-repeat-x bg-bottom opacity-[0.06]"
          style={{ backgroundImage: "url('/patterns/village-scene.png')", backgroundSize: "auto 100%" }}
        />
        <p className="relative pb-6 text-center text-xs font-medium text-grey">
          &copy; 2026 Manikstu Agro Private Limited. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
