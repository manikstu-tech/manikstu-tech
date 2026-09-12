import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MessageCircle, Pencil, Phone, Plus } from "lucide-react";
import { Card, Pill } from "@/components/admin/AdminUi";
import ComingSoonButton from "@/components/telecalling/ComingSoonButton";
import { digits, FRANCHISE_TONES, VSteps } from "@/components/telecalling/TcUi";
import { AdminApiError } from "@/lib/admin/api";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcItem, type FranchiseLead } from "@/lib/admin/telecalling";

export const metadata: Metadata = { title: "Franchise Lead" };

type Detail = FranchiseLead & { steps: string[]; done: number };

const quick = "flex flex-col items-center justify-center gap-2 rounded-xl border border-[#ECE7DC] bg-white p-4 text-sm font-semibold text-charcoal transition hover:border-manikstu-green/40 hover:text-manikstu-green";

export default async function FranchiseLeadPage({ params }: { params: Promise<{ id: string }> }) {
  const [, { id }] = await Promise.all([requireTelecaller(), params]);
  const lead = await getTcItem<Detail>("franchise", id).catch((e) => {
    if (e instanceof AdminApiError && e.status === 404) notFound();
    throw e;
  });

  const info: [string, React.ReactNode][] = [
    ["Mobile", <a key="m" href={`tel:${lead.mobile}`} className="text-manikstu-leaf hover:underline">{lead.mobile}</a>],
    ["Location", lead.location],
    ["Investment Range", lead.investment],
    ["Land Available", lead.land],
    ["Experience", lead.experience],
    ["Desired Farm Size", lead.farmSize],
    ["Lead Source", lead.source],
    ["Assigned To", lead.assigned],
  ];

  return (
    <>
      <Link href="/admin/telecalling/franchise" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-grey hover:text-manikstu-green">
        <ArrowLeft className="h-4 w-4" /> Back to Leads
      </Link>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex flex-wrap items-center gap-3 text-3xl font-bold text-[#2D5016]">
            {lead.name} <Pill tone={FRANCHISE_TONES[lead.status] ?? "grey"}>{lead.status}</Pill>
          </h1>
          <p className="mt-1 text-sm text-grey">Lead ID: {lead.id} · Enquiry on {lead.date}</p>
        </div>
        <ComingSoonButton message="Edit lead — coming soon" title="Edit lead" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#ECE7DC] bg-white text-grey hover:text-manikstu-green">
          <Pencil className="h-4 w-4" />
        </ComingSoonButton>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[1.5fr_1fr]">
        <Card title="Lead Information">
          <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {info.map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-grey">{k}</dt>
                <dd className="mt-0.5 text-sm font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
        <Card title="Next Action">
          <div className="rounded-xl bg-manikstu-green/5 p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-manikstu-leaf">
              <CalendarDays className="h-4 w-4" /> {lead.next.title}
            </p>
            <p className="mt-1 text-sm text-grey">
              {lead.next.date}
              <br />
              Location: {lead.next.location}
            </p>
            <ComingSoonButton message="Reschedule — coming soon" className="mt-3 rounded-lg border border-manikstu-green/40 bg-white px-3 py-1.5 text-xs font-semibold text-manikstu-leaf">
              View / Reschedule
            </ComingSoonButton>
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-grey">Notes</p>
          <p className="mt-1 text-sm leading-relaxed text-[#3A3A3A]">{lead.notes}</p>
        </Card>
      </div>

      <Card title="Lead Journey" className="mt-5">
        <VSteps items={lead.steps.map((label, i) => ({ label, note: i + 1 <= lead.done ? lead.date : "Pending" }))} done={lead.done} />
      </Card>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.5fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
          <h2 className="border-b border-[#F0ECE2] bg-[#FBFAF7] px-5 py-3.5 text-[15px] font-bold">Call History</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="bg-[#FBF8F1] text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A6B4E]">
                  {["Date & Time", "By", "Activity", "Remarks"].map((h) => (
                    <th key={h} className="px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lead.calls.map((c, i) => (
                  <tr key={i} className="border-t border-[#F4F1EA]">
                    <td className="whitespace-nowrap px-5 py-3 text-grey">{c.time}</td>
                    <td className="px-5 py-3">{c.by}</td>
                    <td className="px-5 py-3 font-semibold">{c.activity}</td>
                    <td className="px-5 py-3 text-grey">{c.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <Card title="Quick Actions">
          <div className="grid grid-cols-2 gap-3">
            <a href={`tel:${lead.mobile}`} className={quick}><Phone className="h-5 w-5" /> Call Lead</a>
            <a href={`https://wa.me/${digits(lead.mobile)}`} target="_blank" rel="noopener noreferrer" className={quick}><MessageCircle className="h-5 w-5" /> WhatsApp</a>
            <ComingSoonButton message="Schedule visit — coming soon" className={quick}><CalendarDays className="h-5 w-5" /> Schedule Visit</ComingSoonButton>
            <ComingSoonButton message="Add follow-up — coming soon" className={quick}><Plus className="h-5 w-5" /> Add Follow-up</ComingSoonButton>
          </div>
        </Card>
      </div>
    </>
  );
}
