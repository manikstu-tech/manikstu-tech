import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";
import { Card, Pill } from "@/components/admin/AdminUi";
import InternalNotes from "@/components/telecalling/InternalNotes";
import { KV, ORDER_TONES, rupees, Stepper } from "@/components/telecalling/TcUi";
import { AdminApiError } from "@/lib/admin/api";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcItem, type TcOrder } from "@/lib/admin/telecalling";

export const metadata: Metadata = { title: "Order" };

type Detail = TcOrder & { steps: string[]; current: number };

const LOGISTICS_PHONE = "+919123456789";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [, { id }] = await Promise.all([requireTelecaller(), params]);
  const order = await getTcItem<Detail>("orders", id).catch((e) => {
    if (e instanceof AdminApiError && e.status === 404) notFound();
    throw e;
  });
  const tracking = `ML-${(order.id.replace(/\D+/g, "") + "0000000000").slice(0, 10)}`;

  return (
    <>
      <Link href="/admin/telecalling/orders" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-grey hover:text-manikstu-green">
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </Link>
      <div className="mb-6">
        <h1 className="flex flex-wrap items-center gap-3 text-3xl font-bold text-[#2D5016]">
          {order.id} <Pill tone={ORDER_TONES[order.status] ?? "grey"}>{order.status}</Pill>
        </h1>
        <p className="mt-1 text-sm text-grey">Placed on {order.date}</p>
      </div>

      <Card title="Delivery Journey">
        <Stepper steps={order.steps} current={order.current} note={order.date.split(",")[0]} />
      </Card>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-3">
        <Card title="Farmer Details">
          <p className="text-sm font-semibold">{order.farmer}</p>
          <a href={`tel:${order.phone}`} className="mt-1 block text-sm text-manikstu-leaf hover:underline">{order.phone}</a>
          <p className="mt-1 text-sm text-grey">{order.location}</p>
        </Card>
        <Card title="Order Details">
          <KV label="Product">{order.product}</KV>
          <KV label="Quantity">{order.qty}</KV>
          <KV label="Seller">{order.seller}</KV>
          <KV label="Amount">{rupees(order.amount)}</KV>
          <KV label="Payment">{order.payment}</KV>
        </Card>
        <Card title="Logistics">
          <p className="text-sm font-semibold">Manikstu Logistics</p>
          <a href={`tel:${LOGISTICS_PHONE}`} className="mt-1 block text-sm text-manikstu-leaf hover:underline">+91 91234 56789</a>
          <KV label="Tracking ID"><span className="font-mono">{tracking}</span></KV>
          <a href={`tel:${LOGISTICS_PHONE}`} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#E8E2D6] bg-white px-4 py-2.5 text-sm font-semibold hover:border-manikstu-green hover:text-manikstu-leaf">
            <Phone className="h-4 w-4" /> Contact Partner
          </a>
        </Card>
      </div>

      <Card title="Internal Notes" className="mt-5">
        <InternalNotes />
      </Card>
    </>
  );
}
