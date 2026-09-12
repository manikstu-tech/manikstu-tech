import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Pill } from "@/components/admin/AdminUi";
import { FRANCHISE_TONES, rowClass, StatusChips, TableCard, tableClass, theadClass, ViewLink } from "@/components/telecalling/TcUi";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcList, type FranchiseLead } from "@/lib/admin/telecalling";

export const metadata: Metadata = { title: "Franchise Leads" };

const FILTERS = ["All", "New", "Contacted", "Qualified", "Site Visit", "Approved"];
const BASE = "/admin/telecalling/franchise";

export default async function FranchisePage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const [, { status = "All" }] = await Promise.all([requireTelecaller(), searchParams]);
  const { data: leads, meta } = await getTcList<FranchiseLead>("franchise", status);

  return (
    <>
      <PageHeader title="Franchise Leads" subtitle={`${meta?.total ?? leads.length} leads in the pipeline`} actions={<StatusChips base={BASE} options={FILTERS} active={status} />} />
      <TableCard>
        <table className={tableClass}>
          <thead>
            <tr className={theadClass}>
              {["Lead ID", "Name", "Location", "Investment", "Status", "Date", ""].map((h) => (
                <th key={h} className="px-5 py-3.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className={rowClass}>
                <td className="px-5 py-3.5">
                  <Link href={`${BASE}/${l.id}`} className="font-semibold text-[#7C5CB0] hover:underline">{l.id}</Link>
                </td>
                <td className="px-5 py-3.5 font-semibold">{l.name}</td>
                <td className="px-5 py-3.5 text-grey">{l.location}</td>
                <td className="px-5 py-3.5">{l.investment}</td>
                <td className="px-5 py-3.5"><Pill tone={FRANCHISE_TONES[l.status] ?? "grey"}>{l.status}</Pill></td>
                <td className="whitespace-nowrap px-5 py-3.5 text-grey">{l.date}</td>
                <td className="px-5 py-3.5 text-right"><ViewLink href={`${BASE}/${l.id}`} label={`View lead ${l.id}`} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && <p className="px-5 py-12 text-center text-sm text-grey">No leads in this filter.</p>}
      </TableCard>
    </>
  );
}
