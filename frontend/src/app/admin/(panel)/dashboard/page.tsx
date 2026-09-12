import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase, Contact, IndianRupee, MessageSquare, Newspaper, Package, Plus, Settings, ShoppingCart, Users, type LucideIcon,
} from "lucide-react";
import { buttonClass, Card, fieldClass, formatDate, formatPrice, PageHeader, Pill, StatusBadge } from "@/components/admin/AdminUi";
import { requireAdmin } from "@/lib/admin/auth";
import { ENQUIRY_STATUSES, ENQUIRY_TONES, ORDER_STATUSES, ORDER_TONES } from "@/lib/admin/sections";
import { getDashboard } from "@/lib/admin/sections-api";

export const metadata: Metadata = { title: "Dashboard" };

function Stat({ label, value, icon: Icon, href, highlight }: { label: string; value: string; icon: LucideIcon; href: string; highlight?: boolean }) {
  return (
    <Link
      href={href}
      className={`group rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${highlight ? "border-manikstu-gold/50" : "border-[#ECE7DC]"}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-grey">{label}</span>
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${highlight ? "bg-manikstu-gold/15 text-[#8A6414]" : "bg-manikstu-green/10 text-manikstu-leaf"}`}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>
      {/* lining-nums: Playfair's default old-style figures make 0 look like "o" */}
      <p className="mt-3 font-heading text-3xl font-bold lining-nums tabular-nums text-charcoal">{value}</p>
    </Link>
  );
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const [user, sp] = await Promise.all([requireAdmin(), searchParams]);
  const data = await getDashboard(sp.date);
  const { stats } = data;
  const today = new Date().toISOString().slice(0, 10);
  const n = (v: number) => v.toLocaleString("en-IN");

  return (
    <>
      <PageHeader
        title={`Welcome, ${user.name.split(" ")[0]}`}
        subtitle={data.date === today ? "Here's how things stand today." : `Figures as of ${formatDate(data.date)}.`}
        actions={
          <form method="get" className="flex items-center gap-2">
            <input type="date" name="date" defaultValue={data.date} max={today} className={fieldClass} aria-label="Show figures as of" />
            <button type="submit" className={buttonClass.light}>
              Go
            </button>
          </form>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="New Enquiries" value={n(stats.new_enquiries)} icon={MessageSquare} href="/admin/enquiries?status=new" highlight={stats.new_enquiries > 0} />
        <Stat label="Orders" value={n(stats.orders)} icon={ShoppingCart} href="/admin/orders" />
        <Stat label="Revenue (paid)" value={formatPrice(stats.revenue)} icon={IndianRupee} href="/admin/orders?payment_status=paid" />
        <Stat label="Customers" value={n(stats.customers)} icon={Contact} href="/admin/customers" />
        <Stat label="Products" value={n(stats.products)} icon={Package} href="/admin/products" />
        <Stat label="Blog Posts" value={n(stats.blog_posts)} icon={Newspaper} href="/admin/blog" />
        <Stat label="Team Members" value={n(stats.team_members)} icon={Users} href="/admin/team" />
        <Stat label="Open Jobs" value={n(stats.job_openings)} icon={Briefcase} href="/admin/careers" />
      </div>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Card title="Recent Enquiries">
          {data.recent_enquiries.length === 0 ? (
            <p className="text-sm text-grey">No enquiries yet.</p>
          ) : (
            <ul className="-my-2 divide-y divide-[#F4F1EA]">
              {data.recent_enquiries.map((e) => (
                <li key={e.id}>
                  <Link href={`/admin/enquiries/${e.id}`} className="flex items-center justify-between gap-3 py-2.5 hover:text-manikstu-leaf">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold">{e.name}</span>
                      <span className="block truncate text-xs text-grey">
                        {e.email} · {formatDate(e.created_at)}
                      </span>
                    </span>
                    <Pill tone={ENQUIRY_TONES[e.status]}>{ENQUIRY_STATUSES[e.status as keyof typeof ENQUIRY_STATUSES] ?? e.status}</Pill>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="space-y-5">
          <Card title="Quick Actions">
            <div className="grid gap-2">
              <Link href="/admin/products/new" className={buttonClass.light}>
                <Plus className="h-4 w-4" /> Add Product
              </Link>
              <Link href="/admin/blog/new" className={buttonClass.light}>
                <Plus className="h-4 w-4" /> New Blog Post
              </Link>
              <Link href="/admin/media" className={buttonClass.light}>
                <Plus className="h-4 w-4" /> Upload Photo or Video
              </Link>
              {user.role === "developer" && (
                <Link href="/admin/settings" className={buttonClass.light}>
                  <Settings className="h-4 w-4" /> Site Settings
                </Link>
              )}
            </div>
          </Card>

          <Card title="Recent Orders">
            {data.recent_orders.length === 0 ? (
              <p className="text-sm text-grey">No orders yet.</p>
            ) : (
              <ul className="-my-2 divide-y divide-[#F4F1EA]">
                {data.recent_orders.map((o) => (
                  <li key={o.id}>
                    <Link href={`/admin/orders/${o.id}`} className="flex items-center justify-between gap-3 py-2.5 text-sm hover:text-manikstu-leaf">
                      <span className="min-w-0">
                        <span className="block font-semibold">{o.order_number}</span>
                        <span className="block truncate text-xs text-grey">{o.customer ?? "Guest"}</span>
                      </span>
                      <span className="text-right">
                        <span className="block font-semibold">{formatPrice(o.total)}</span>
                        <Pill tone={ORDER_TONES[o.status]}>{ORDER_STATUSES[o.status as keyof typeof ORDER_STATUSES] ?? o.status}</Pill>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="Latest Blog Posts">
            {data.recent_blog.length === 0 ? (
              <p className="text-sm text-grey">No posts yet.</p>
            ) : (
              <ul className="-my-2 divide-y divide-[#F4F1EA]">
                {data.recent_blog.map((b) => (
                  <li key={b.id}>
                    <Link href={`/admin/blog/${b.id}/edit`} className="flex items-center justify-between gap-3 py-2.5 text-sm hover:text-manikstu-leaf">
                      <span className="min-w-0 truncate font-semibold">{b.title}</span>
                      <StatusBadge active={b.is_published} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
