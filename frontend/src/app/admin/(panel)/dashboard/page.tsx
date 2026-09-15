import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight, Calendar, ChevronRight, FileText, MessageSquare,
  PenSquare, Plus, Settings, ShoppingCart, Zap, type LucideIcon,
} from "lucide-react";
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

/* ---- solid stat-card icons ---- */
type IconProps = { className?: string };
function BagCheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path fill="currentColor" d="M7 8V7a5 5 0 0 1 10 0v1h1.4a1.6 1.6 0 0 1 1.6 1.46l.86 9.9A2 2 0 0 1 20.33 21H3.67a2 2 0 0 1-1.99-2.18l.86-9.9A1.6 1.6 0 0 1 4.6 8H7Zm2 0h6V7a3 3 0 1 0-6 0v1Z" />
      <path d="m9 13.6 2 2 4-4.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M2.5 3a1 1 0 1 0 0 2h1.2l.42 1.9 1.66 7.4A2.2 2.2 0 0 0 7.95 17H18a1 1 0 1 0 0-2H8.15a.2.2 0 0 1-.2-.16L7.78 14l10.34-1.02a2 2 0 0 0 1.77-1.57l1.1-5.02A1 1 0 0 0 21 5.2H6.06l-.3-1.36A1.1 1.1 0 0 0 4.7 3H2.5Z" />
      <circle cx="9" cy="20" r="1.7" />
      <circle cx="17.5" cy="20" r="1.7" />
    </svg>
  );
}
function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path fill="currentColor" d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9.4L5 21v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path stroke="#fff" strokeWidth="2" strokeLinecap="round" d="M6.5 8.5h11M6.5 12h7" />
    </svg>
  );
}
function RupeeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 5h11M6.5 9h11M6.5 13h4.4a4 4 0 0 0 0-8M6.5 13 15 20" />
    </svg>
  );
}

/** Decorative sparkline wave along the bottom of a stat card. */
function Sparkline({ id, color }: { id: string; color: string }) {
  const line = "M0 34 C22 26 40 40 62 32 S104 18 132 30 S186 44 216 27 S270 12 300 24";
  return (
    <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 block h-10">
      <svg viewBox="0 0 300 48" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L300 48 L0 48 Z`} fill={`url(#${id})`} />
        <path d={line} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="absolute h-2 w-2 rounded-full ring-2 ring-white" style={{ right: "3px", bottom: "18px", backgroundColor: color }} />
    </span>
  );
}

/* ---- stat card ---- */
type Tone = "green" | "gold";
function StatCard({
  label, value, icon, iconTone = "green", href, waveId, waveColor, accent, hint, hintTone = "green", up,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  iconTone?: Tone;
  href: string;
  waveId: string;
  waveColor: string;
  accent?: boolean;
  hint: string;
  hintTone?: Tone;
  up?: boolean;
}) {
  const tile = iconTone === "gold" ? "bg-manikstu-gold/15 text-[#8A6414]" : "bg-manikstu-green/10 text-manikstu-leaf";
  const hintStyle = hintTone === "gold" ? "bg-manikstu-gold/15 text-[#8A6414]" : "bg-manikstu-green/10 text-manikstu-leaf";
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-2xl border bg-white p-5 pb-10 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        accent ? "border-manikstu-gold/60" : "border-[#ECE7DC]"
      }`}
    >
      <div className="relative flex items-start justify-between gap-2">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tile}`}>{icon}</span>
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${hintStyle}`}>
          {up && <ArrowUpRight className="h-3 w-3" />}
          {hint}
        </span>
      </div>
      <p className="relative mt-4 font-heading text-4xl font-bold lining-nums tabular-nums text-charcoal">{value}</p>
      <p className="relative mt-1 text-sm font-medium text-grey">{label}</p>
      <Sparkline id={waveId} color={waveColor} />
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

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Products" value={n(stats.products)} icon={<BagCheckIcon className="h-[22px] w-[22px]" />} href="/admin/products" waveId="wave-products" waveColor="#4A8C3F" hint="In catalogue" />
        <StatCard label="Total Orders" value={n(stats.orders)} icon={<CartIcon className="h-[22px] w-[22px]" />} href="/admin/orders" waveId="wave-orders" waveColor="#3A7030" hint="All-time" />
        <StatCard label="New Enquiries" value={n(stats.new_enquiries)} icon={<ChatIcon className="h-[22px] w-[22px]" />} iconTone="gold" href="/admin/enquiries?status=new" waveId="wave-enquiries" waveColor="#E08A2B" accent hint={`${n(stats.new_enquiries)} pending`} hintTone="gold" />
        <StatCard label="Total Revenue" value={compactINR(stats.revenue)} icon={<RupeeIcon className="h-[22px] w-[22px]" />} href="/admin/orders?payment_status=paid" waveId="wave-revenue" waveColor="#4A8C3F" hint="Paid" up />
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

        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-gradient-to-br from-white to-[#FBF7EF] p-5 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-manikstu-green/12">
              <Zap className="h-[18px] w-[18px] fill-manikstu-green text-manikstu-green" />
            </span>
            <h2 className="font-heading text-lg font-bold text-charcoal">Quick Actions</h2>
          </div>
          <div className="mt-4 grid gap-2.5">
            <ActionRow tone="green" label="Add New Product" description="Create a new product" icon={Plus} href="/admin/products/new" />
            <ActionRow tone="amber" label="Create Blog Post" description="Write and publish a blog" icon={PenSquare} href="/admin/blog/new" />
            <ActionRow tone="blue" label="View All Enquiries" description="Manage and reply enquiries" icon={MessageSquare} href="/admin/enquiries" />
            {isDeveloper ? (
              <ActionRow tone="purple" label="Manage Settings" description="Configure your preferences" icon={Settings} href="/admin/settings" />
            ) : (
              <ActionRow tone="purple" label="Manage Orders" description="View and update orders" icon={ShoppingCart} href="/admin/orders" />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
