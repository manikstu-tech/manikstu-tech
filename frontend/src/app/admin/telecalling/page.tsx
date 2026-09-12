import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, Phone, PhoneCall, UserPlus, XCircle, type LucideIcon } from "lucide-react";
import { Card, PageHeader, Pill } from "@/components/admin/AdminUi";
import { digits, Donut, initials, LEAD_TONES, rowClass, TableCard, tableClass, theadClass, timeAgo, titleCase } from "@/components/telecalling/TcUi";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcDashboard } from "@/lib/admin/telecalling";

export const metadata: Metadata = { title: "Telecalling Dashboard" };

const TINT: Record<string, string> = {
  green: "bg-manikstu-green/15 text-manikstu-leaf",
  gold: "bg-manikstu-gold/15 text-[#B4711A]",
  blue: "bg-[#5B8DEF]/15 text-[#3E6FD0]",
  grey: "bg-[#F0ECE2] text-grey",
};

export default async function TelecallingDashboard() {
  const user = await requireTelecaller();
  const { stats, queue, recent } = await getTcDashboard();

  const cards: [string, number, string, LucideIcon, string][] = [
    ["New Leads", stats.new, "green", UserPlus, "To call"],
    ["Contacted", stats.contacted, "gold", PhoneCall, "Awaiting follow-up"],
    ["Converted", stats.converted, "blue", CheckCircle2, "Became customers"],
    ["Closed", stats.closed, "grey", XCircle, "No further action"],
  ];

  return (
    <>
      <PageHeader title={`Welcome, ${user.name.split(" ")[0]}`} subtitle={`${stats.total} leads in total · ${stats.today} new today`} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value, tint, Icon, hint]) => (
          <div key={label} className="rounded-2xl border border-[#ECE7DC] bg-white p-5 shadow-sm">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${TINT[tint]}`}>
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-[13px] font-semibold text-grey">{label}</p>
            <p className="mt-1 font-heading text-3xl font-bold lining-nums tabular-nums">{value}</p>
            <p className="mt-1 text-xs text-[#9A9A8E]">{hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.4fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F0ECE2] bg-[#FBFAF7] px-5 py-3.5">
            <h2 className="text-[15px] font-bold">Call Queue</h2>
            <span className="text-xs font-semibold text-grey">{queue.length} new leads</span>
          </div>
          {queue.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-grey">No new leads to call. Nice work!</p>
          ) : (
            <ul className="divide-y divide-[#F4F1EA]">
              {queue.map((lead) => (
                <li key={lead.id} className="flex items-center gap-3 px-5 py-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 text-sm font-bold text-manikstu-leaf">{initials(lead.name)}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{lead.name}</p>
                    <p className="truncate text-xs text-grey">
                      {titleCase(lead.type)} · {timeAgo(lead.created_at)}
                    </p>
                  </div>
                  {lead.phone && (
                    <div className="flex gap-1.5">
                      <a href={`tel:${lead.phone}`} title="Call" aria-label={`Call ${lead.name}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-manikstu-green text-white hover:bg-manikstu-leaf">
                        <Phone className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://wa.me/${digits(lead.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp"
                        aria-label={`WhatsApp ${lead.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ECE7DC] bg-white text-grey hover:text-manikstu-green"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
        <Card title="Lead Status">
          <Donut
            total={stats.total}
            caption="Total leads"
            segments={[
              { label: "New", count: stats.new, color: "#4A8C3F" },
              { label: "Contacted", count: stats.contacted, color: "#D4A017" },
              { label: "Converted", count: stats.converted, color: "#5B8DEF" },
              { label: "Closed", count: stats.closed, color: "#B0A98E" },
            ]}
          />
        </Card>
      </div>

      <div className="mb-3 mt-8 flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Leads</h2>
        <Link href="/admin/telecalling/calls" className="text-sm font-semibold text-manikstu-green hover:underline">Call history →</Link>
      </div>
      <TableCard>
        <table className={tableClass}>
          <thead>
            <tr className={theadClass}>
              {["Name", "Phone", "Interest", "Message", "Status", "Received"].map((h) => (
                <th key={h} className="px-5 py-3.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map((lead) => (
              <tr key={lead.id} className={rowClass}>
                <td className="px-5 py-3.5 font-semibold">{lead.name}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  {lead.phone ? <a href={`tel:${lead.phone}`} className="hover:text-manikstu-green">{lead.phone}</a> : "—"}
                </td>
                <td className="px-5 py-3.5">{titleCase(lead.type)}</td>
                <td className="max-w-[260px] truncate px-5 py-3.5 text-grey" title={lead.message}>{lead.message}</td>
                <td className="px-5 py-3.5"><Pill tone={LEAD_TONES[lead.status] ?? "grey"}>{titleCase(lead.status)}</Pill></td>
                <td className="whitespace-nowrap px-5 py-3.5 text-grey">{timeAgo(lead.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {recent.length === 0 && <p className="px-5 py-12 text-center text-sm text-grey">No leads yet.</p>}
      </TableCard>
    </>
  );
}
