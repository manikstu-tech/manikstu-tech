import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";
import { Card, Pill } from "@/components/admin/AdminUi";
import InternalNotes from "@/components/telecalling/InternalNotes";
import { COMPLAINT_TONES, KV, PRIORITY_TONES, rupees, VSteps } from "@/components/telecalling/TcUi";
import { AdminApiError } from "@/lib/admin/api";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcItem, type ComplaintDetail } from "@/lib/admin/telecalling";

export const metadata: Metadata = { title: "Complaint" };

const outline = "inline-flex items-center gap-2 rounded-xl border border-[#E8E2D6] bg-white px-4 py-2.5 text-sm font-semibold hover:border-manikstu-green hover:text-manikstu-leaf";

export default async function ComplaintDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [, { id }] = await Promise.all([requireTelecaller(), params]);
  const c = await getTcItem<ComplaintDetail>("complaints", id).catch((e) => {
    if (e instanceof AdminApiError && e.status === 404) notFound();
    throw e;
  });
  const order = c.order_details;

  return (
    <>
      <Link href="/admin/telecalling/complaints" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-grey hover:text-manikstu-green">
        <ArrowLeft className="h-4 w-4" /> Back to Complaints
      </Link>
      <div className="mb-6">
        <h1 className="flex flex-wrap items-center gap-3 text-3xl font-bold text-[#2D5016]">
          {c.id} <Pill tone={COMPLAINT_TONES[c.status] ?? "grey"}>{c.status}</Pill> <Pill tone={PRIORITY_TONES[c.priority] ?? "grey"}>{c.priority} priority</Pill>
        </h1>
        <p className="mt-1 text-sm text-grey">{c.issue} · Reported {c.date}</p>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-3">
        <Card title="Farmer">
          <p className="text-sm font-semibold">{c.farmer?.name ?? "—"}</p>
          {c.farmer?.phone && <a href={`tel:${c.farmer.phone}`} className="mt-1 block text-sm text-manikstu-leaf hover:underline">{c.farmer.phone}</a>}
          <p className="mt-1 text-sm text-grey">{c.farmer?.location ?? "—"}</p>
        </Card>
        <Card title="Related Order">
          {order ? (
            <>
              <KV label="Order ID">
                <Link href={`/admin/telecalling/orders/${order.id}`} className="text-manikstu-gold hover:underline">{order.id}</Link>
              </KV>
              <KV label="Product">{order.product}</KV>
              <KV label="Seller">{order.seller}</KV>
              <KV label="Amount">{rupees(order.amount)}</KV>
            </>
          ) : (
            <p className="text-sm text-grey">{c.order}</p>
          )}
        </Card>
        <Card title="Farmer's Report">
          <p className="text-sm leading-relaxed text-[#3A3A3A]">{c.report}</p>
        </Card>
      </div>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-2">
        <Card title="Complaint Status">
          <VSteps items={c.status_steps} done={c.status_done} />
        </Card>
        <Card title="Investigation">
          <VSteps items={c.invest_steps} done={c.invest_done} />
        </Card>
      </div>

      <Card title="Internal Notes" className="mt-5">
        <InternalNotes />
      </Card>

      <div className="mt-5 flex flex-wrap gap-2">
        {c.farmer?.phone && <a href={`tel:${c.farmer.phone}`} className={outline}><Phone className="h-4 w-4" /> Call Farmer</a>}
        <a href="tel:+919123456780" className={outline}><Phone className="h-4 w-4" /> Contact Seller</a>
        <a href="tel:+919123456789" className={outline}><Phone className="h-4 w-4" /> Contact Logistics</a>
      </div>
    </>
  );
}
