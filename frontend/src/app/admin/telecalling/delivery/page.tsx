import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Pill } from "@/components/admin/AdminUi";
import { ORDER_TONES, rowClass, TableCard, tableClass, theadClass, ViewLink } from "@/components/telecalling/TcUi";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcDelivery } from "@/lib/admin/telecalling";

export const metadata: Metadata = { title: "Delivery Tracking" };

export default async function DeliveryPage() {
  await requireTelecaller();
  const deliveries = await getTcDelivery();

  return (
    <>
      <PageHeader title="Delivery Tracking" subtitle={`${deliveries.length} deliveries currently active`} />
      <TableCard>
        <table className={tableClass}>
          <thead>
            <tr className={theadClass}>
              {["Order ID", "Farmer", "Location", "Product", "Status", "Expected", ""].map((h) => (
                <th key={h} className="px-5 py-3.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d) => (
              <tr key={d.id} className={rowClass}>
                <td className="px-5 py-3.5">
                  <Link href={`/admin/telecalling/orders/${d.id}`} className="font-semibold text-manikstu-gold hover:underline">{d.id}</Link>
                </td>
                <td className="px-5 py-3.5">{d.farmer}</td>
                <td className="px-5 py-3.5 text-grey">{d.location}</td>
                <td className="px-5 py-3.5 text-grey">{d.product}</td>
                <td className="px-5 py-3.5"><Pill tone={ORDER_TONES[d.status] ?? "grey"}>{d.status}</Pill></td>
                <td className="whitespace-nowrap px-5 py-3.5">{d.expected}</td>
                <td className="px-5 py-3.5 text-right"><ViewLink href={`/admin/telecalling/orders/${d.id}`} label={`View order ${d.id}`} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {deliveries.length === 0 && <p className="px-5 py-12 text-center text-sm text-grey">No active deliveries right now.</p>}
      </TableCard>
    </>
  );
}
