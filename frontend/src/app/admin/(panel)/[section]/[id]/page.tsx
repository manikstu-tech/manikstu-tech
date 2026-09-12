import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Mail, Pencil, Phone } from "lucide-react";
import { Alert, buttonClass, Card, formatDate, formatPrice, PageHeader, Pill } from "@/components/admin/AdminUi";
import DeleteRecordButton from "@/components/admin/DeleteRecordButton";
import { AdminApiError } from "@/lib/admin/api";
import { requireAdmin } from "@/lib/admin/auth";
import {
  ENQUIRY_STATUSES, ENQUIRY_TONES, ENQUIRY_TYPES, getSection, ORDER_STATUSES, ORDER_TONES, PAYMENT_STATUSES, PAYMENT_TONES,
} from "@/lib/admin/sections";
import { getRecord, type AdminRecord } from "@/lib/admin/sections-api";
import { deleteSectionAction } from "../../section-actions";

type Params = { params: Promise<{ section: string; id: string }>; searchParams: Promise<{ saved?: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: getSection((await params).section)?.singular ?? "Admin" };
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#F4F1EB] py-2.5 text-sm last:border-0">
      <span className="text-grey">{label}</span>
      <span className="text-right font-semibold text-charcoal">{children}</span>
    </div>
  );
}

type OrderItem = { id: number; name: string; sku: string | null; quantity: number; price: number; line_total: number };
type Customer = { id: number; name: string; email: string; phone: string | null } | null;

function OrderDetail({ order }: { order: AdminRecord }) {
  const items = (order.items as OrderItem[]) ?? [];
  const customer = order.customer as Customer;
  const status = String(order.status);
  const payment = String(order.payment_status);

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
      <Card title={`Items (${items.length})`}>
        {items.length === 0 ? (
          <p className="text-sm text-grey">This order has no line items.</p>
        ) : (
          <div className="-mx-5 -my-5 overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="bg-[#FBF8F1] text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A6B4E]">
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3 text-right">Qty</th>
                  <th className="px-5 py-3 text-right">Price</th>
                  <th className="px-5 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t border-[#F4F1EA]">
                    <td className="px-5 py-3">
                      <p className="font-semibold">{item.name}</p>
                      {item.sku && <p className="text-xs text-grey">SKU {item.sku}</p>}
                    </td>
                    <td className="px-5 py-3 text-right">{item.quantity}</td>
                    <td className="px-5 py-3 text-right">{formatPrice(item.price)}</td>
                    <td className="px-5 py-3 text-right font-semibold">{formatPrice(item.line_total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-5 flex justify-end border-t border-[#F0ECE2] pt-4 text-base">
          <span className="mr-4 text-grey">Order total</span>
          <span className="font-bold text-manikstu-leaf">{formatPrice(order.total as number)}</span>
        </div>
      </Card>

      <div className="space-y-5">
        <Card title="Status">
          <Row label="Order">
            <Pill tone={ORDER_TONES[status]}>{ORDER_STATUSES[status as keyof typeof ORDER_STATUSES] ?? status}</Pill>
          </Row>
          <Row label="Payment">
            <Pill tone={PAYMENT_TONES[payment]}>{PAYMENT_STATUSES[payment as keyof typeof PAYMENT_STATUSES] ?? payment}</Pill>
          </Row>
          <Row label="Method">{String(order.payment_method ?? "—")}</Row>
          <Row label="Placed">{formatDate(order.created_at)}</Row>
        </Card>
        <Card title="Customer">
          {customer ? (
            <div className="space-y-2 text-sm">
              <p className="font-semibold">{customer.name}</p>
              <a href={`mailto:${customer.email}`} className="flex items-center gap-2 text-manikstu-leaf hover:underline">
                <Mail className="h-4 w-4" />
                {customer.email}
              </a>
              {customer.phone && (
                <a href={`tel:${customer.phone}`} className="flex items-center gap-2 text-manikstu-leaf hover:underline">
                  <Phone className="h-4 w-4" />
                  {customer.phone}
                </a>
              )}
            </div>
          ) : (
            <p className="text-sm text-grey">No customer linked (guest order).</p>
          )}
        </Card>
        {Boolean(order.notes) && (
          <Card title="Notes">
            <p className="whitespace-pre-line text-sm text-[#3A3A3A]">{String(order.notes)}</p>
          </Card>
        )}
      </div>
    </div>
  );
}

function EnquiryDetail({ enquiry }: { enquiry: AdminRecord }) {
  const email = String(enquiry.email);
  const phone = enquiry.phone ? String(enquiry.phone) : null;
  return (
    <div className="grid items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
      <Card title="Message">
        <p className="whitespace-pre-line text-sm leading-relaxed text-[#3A3A3A]">{String(enquiry.message)}</p>
      </Card>
      <div className="space-y-5">
        <Card title="Contact">
          <div className="space-y-2.5 text-sm">
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-manikstu-leaf hover:underline">
              <Mail className="h-4 w-4" />
              {email}
            </a>
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-2 text-manikstu-leaf hover:underline">
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            )}
          </div>
          <a href={`mailto:${email}?subject=${encodeURIComponent("Re: your enquiry to Manikstu Agro")}`} className={`${buttonClass.primary} mt-4 w-full`}>
            Reply by email
          </a>
        </Card>
        <Card title="Details">
          <Row label="Type">
            <Pill>{ENQUIRY_TYPES[String(enquiry.type) as keyof typeof ENQUIRY_TYPES] ?? String(enquiry.type)}</Pill>
          </Row>
          <Row label="Status">
            <Pill tone={ENQUIRY_TONES[String(enquiry.status)]}>{ENQUIRY_STATUSES[String(enquiry.status) as keyof typeof ENQUIRY_STATUSES] ?? String(enquiry.status)}</Pill>
          </Row>
          <Row label="Received">{formatDate(enquiry.created_at)}</Row>
        </Card>
      </div>
    </div>
  );
}

export default async function RecordDetailPage({ params, searchParams }: Params) {
  const [{ section: key, id }, sp, user] = await Promise.all([params, searchParams, requireAdmin()]);
  const section = getSection(key);
  if (!section) notFound();
  if (!section.hasDetail) redirect(`/admin/${key}/${id}/edit`);

  const record = await getRecord(key, id).catch((e) => {
    if (e instanceof AdminApiError && e.status === 404) notFound();
    throw e;
  });
  const title = String(record[section.titleField] ?? `#${record.id}`);

  return (
    <>
      <PageHeader
        title={title}
        subtitle={section.singular}
        actions={
          <>
            <Link href={`/admin/${key}`} className={buttonClass.light}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            {user.role === "developer" && (
              <DeleteRecordButton name={title} variant="button" action={deleteSectionAction.bind(null, key, record.id)} />
            )}
            {section.canEdit !== false && (
              <Link href={`/admin/${key}/${record.id}/edit`} className={buttonClass.primary}>
                <Pencil className="h-4 w-4" />
                Edit {section.singular}
              </Link>
            )}
          </>
        }
      />
      {sp.saved && <Alert tone="success">{section.singular} saved.</Alert>}
      {key === "orders" ? <OrderDetail order={record} /> : <EnquiryDetail enquiry={record} />}
    </>
  );
}
