import type { Metadata } from "next";
import { BarChart3, ClipboardList, MessageSquare, Users, type LucideIcon } from "lucide-react";
import { Card, PageHeader } from "@/components/admin/AdminUi";
import { Donut, rupees } from "@/components/telecalling/TcUi";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcReports } from "@/lib/admin/telecalling";

export const metadata: Metadata = { title: "Reports" };

const ICONS: Record<string, LucideIcon> = { orders: ClipboardList, revenue: BarChart3, time: MessageSquare, franchise: Users };
const TINTS: Record<string, string> = {
  blue: "bg-[#5B8DEF]/15 text-[#3E6FD0]",
  green: "bg-manikstu-green/15 text-manikstu-leaf",
  gold: "bg-manikstu-gold/15 text-[#B4711A]",
  purple: "bg-[#7C5CB0]/15 text-[#7C5CB0]",
};

export default async function ReportsPage() {
  await requireTelecaller();
  const { kpis, ordersPerMonth, statusBreakdown, topProducts } = await getTcReports();
  const maxBar = Math.max(...ordersPerMonth.map((b) => b.value), 1);

  return (
    <>
      <PageHeader title="Reports" subtitle="Performance overview across orders, calls and franchise growth." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => {
          const Icon = ICONS[k.icon] ?? BarChart3;
          return (
            <div key={k.label} className="rounded-2xl border border-[#ECE7DC] bg-white p-5 shadow-sm">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${TINTS[k.tint] ?? "bg-[#F0ECE2] text-grey"}`}>
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-3 text-[13px] font-semibold text-grey">{k.label}</p>
              <p className="mt-1 font-heading text-2xl font-bold lining-nums">{k.value}</p>
              <p className={`mt-1 text-xs font-semibold ${k.up ? "text-manikstu-leaf" : "text-manikstu-red"}`}>{k.delta}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-2">
        <Card title="Orders per Month">
          <div className="flex h-56 items-end gap-3" role="img" aria-label="Orders per month bar chart">
            {ordersPerMonth.map((b) => (
              <div key={b.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-xs font-semibold text-grey">{b.value}</span>
                <div className="w-full max-w-[44px] rounded-t-lg bg-gradient-to-t from-manikstu-leaf to-manikstu-green" style={{ height: `${Math.round((b.value / maxBar) * 80)}%` }} title={`${b.value} orders`} />
                <span className="text-xs text-grey">{b.month}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Order Status Breakdown">
          <Donut segments={statusBreakdown.items} total={statusBreakdown.total} caption="This month" />
        </Card>
      </div>

      <section className="mt-5 overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
        <h2 className="border-b border-[#F0ECE2] bg-[#FBFAF7] px-5 py-3.5 text-[15px] font-bold">Top Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="bg-[#FBF8F1] text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A6B4E]">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3 text-right">Units Sold</th>
                <th className="px-5 py-3 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.product} className="border-t border-[#F4F1EA]">
                  <td className="px-5 py-3 font-semibold">{p.product}</td>
                  <td className="px-5 py-3 text-right">{p.units.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3 text-right">{rupees(p.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
