import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Pill } from "@/components/admin/AdminUi";
import { COMPLAINT_TONES, PRIORITY_TONES, rowClass, StatusChips, TableCard, tableClass, theadClass, ViewLink } from "@/components/telecalling/TcUi";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcList, type Complaint } from "@/lib/admin/telecalling";

export const metadata: Metadata = { title: "Complaints" };

const FILTERS = ["All", "Open", "In Progress", "Resolved"];
const BASE = "/admin/telecalling/complaints";
const PRIORITY_TEXT = { red: "text-manikstu-red", amber: "text-amber-700", green: "text-manikstu-leaf" } as const;

export default async function ComplaintsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const [, { status = "All" }] = await Promise.all([requireTelecaller(), searchParams]);
  const { data: complaints, meta } = await getTcList<Complaint>("complaints", status);

  return (
    <>
      <PageHeader title="Complaints" subtitle={`${meta?.open ?? 0} open, ${meta?.total ?? complaints.length} total`} actions={<StatusChips base={BASE} options={FILTERS} active={status} />} />
      <TableCard>
        <table className={tableClass}>
          <thead>
            <tr className={theadClass}>
              {["Complaint ID", "Farmer", "Related Order", "Issue", "Priority", "Status", ""].map((h) => (
                <th key={h} className="px-5 py-3.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => {
              const tone = PRIORITY_TONES[c.priority];
              return (
                <tr key={c.id} className={rowClass}>
                  <td className="px-5 py-3.5">
                    <Link href={`${BASE}/${c.id}`} className="font-semibold text-manikstu-red hover:underline">{c.id}</Link>
                  </td>
                  <td className="px-5 py-3.5">{c.farmer}</td>
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/telecalling/orders/${c.order}`} className="font-semibold text-manikstu-gold hover:underline">{c.order}</Link>
                  </td>
                  <td className="px-5 py-3.5 text-grey">{c.issue}</td>
                  <td className={`px-5 py-3.5 font-semibold ${tone && tone in PRIORITY_TEXT ? PRIORITY_TEXT[tone as keyof typeof PRIORITY_TEXT] : "text-grey"}`}>{c.priority}</td>
                  <td className="px-5 py-3.5"><Pill tone={COMPLAINT_TONES[c.status] ?? "grey"}>{c.status}</Pill></td>
                  <td className="px-5 py-3.5 text-right"><ViewLink href={`${BASE}/${c.id}`} label={`View complaint ${c.id}`} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {complaints.length === 0 && <p className="px-5 py-12 text-center text-sm text-grey">No complaints in this filter.</p>}
      </TableCard>
    </>
  );
}
