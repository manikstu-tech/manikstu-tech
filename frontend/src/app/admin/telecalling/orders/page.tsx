import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Pill } from "@/components/admin/AdminUi";
import { ORDER_TONES, rowClass, rupees, StatusChips, TableCard, tableClass, theadClass, ViewLink } from "@/components/telecalling/TcUi";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcList, type TcOrder } from "@/lib/admin/telecalling";

export const metadata: Metadata = { title: "Orders" };

const FILTERS = ["All", "In Transit", "Delivered", "Pending", "Issue Reported"];
const BASE = "/admin/telecalling/orders";

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const [, { status = "All" }] = await Promise.all([requireTelecaller(), searchParams]);
  const { data: orders, meta } = await getTcList<TcOrder>("orders", status);

  return (
    <>
      <PageHeader title="Orders" subtitle={`${meta?.total ?? orders.length} orders this month`} actions={<StatusChips base={BASE} options={FILTERS} active={status} />} />
      <TableCard>
        <table className={tableClass}>
          <thead>
            <tr className={theadClass}>
              {["Order ID", "Farmer", "Product", "Amount", "Status", "Date", ""].map((h) => (
                <th key={h} className="px-5 py-3.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className={rowClass}>
                <td className="px-5 py-3.5">
                  <Link href={`${BASE}/${o.id}`} className="font-semibold text-manikstu-gold hover:underline">{o.id}</Link>
                </td>
                <td className="px-5 py-3.5">{o.farmer}</td>
                <td className="px-5 py-3.5 text-grey">{o.product}</td>
                <td className="px-5 py-3.5 font-medium">{rupees(o.amount)}</td>
                <td className="px-5 py-3.5"><Pill tone={ORDER_TONES[o.status] ?? "grey"}>{o.status}</Pill></td>
                <td className="whitespace-nowrap px-5 py-3.5 text-grey">{o.date.split(",")[0]}</td>
                <td className="px-5 py-3.5 text-right"><ViewLink href={`${BASE}/${o.id}`} label={`View order ${o.id}`} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="px-5 py-12 text-center text-sm text-grey">No orders in this filter.</p>}
      </TableCard>
    </>
  );
}
