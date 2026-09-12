import type { Metadata } from "next";
import { ArrowDownLeft, ArrowUpRight, MessageSquare, Phone } from "lucide-react";
import { PageHeader } from "@/components/admin/AdminUi";
import ComingSoonButton from "@/components/telecalling/ComingSoonButton";
import { initials } from "@/components/telecalling/TcUi";
import { requireTelecaller } from "@/lib/admin/auth";
import { getTcCalls } from "@/lib/admin/telecalling";

export const metadata: Metadata = { title: "Telecalling" };

export default async function CallsPage() {
  await requireTelecaller();
  const { queue, recent } = await getTcCalls();

  return (
    <>
      <PageHeader title="Telecalling" subtitle="Your queue for today, and recent call history." />
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#F0ECE2] bg-[#FBFAF7] px-5 py-3.5">
            <h2 className="text-[15px] font-bold">Call Queue</h2>
            <span className="text-xs font-semibold text-grey">{queue.length} pending</span>
          </div>
          <ul className="divide-y divide-[#F4F1EA]">
            {queue.map((q) => (
              <li key={q.name + q.tag} className="flex items-start gap-3 px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 text-sm font-bold text-manikstu-leaf">{initials(q.name)}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{q.name}</p>
                  <p className="text-xs text-grey">{q.note}</p>
                  <p className="mt-1 text-[11px] text-[#9A9A8E]">
                    <span className="rounded bg-manikstu-gold/15 px-1.5 py-px font-semibold text-[#8A6414]">{q.tag}</span> · {q.due}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <a href={`tel:${q.phone}`} title="Call" aria-label={`Call ${q.name}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-manikstu-green text-white hover:bg-manikstu-leaf">
                    <Phone className="h-4 w-4" />
                  </a>
                  <ComingSoonButton message={`Messaging ${q.name} — coming soon`} title="Message" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ECE7DC] bg-white text-grey hover:text-manikstu-green">
                    <MessageSquare className="h-4 w-4" />
                  </ComingSoonButton>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
          <div className="border-b border-[#F0ECE2] bg-[#FBFAF7] px-5 py-3.5">
            <h2 className="text-[15px] font-bold">Recent Calls</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="bg-[#FBF8F1] text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A6B4E]">
                  {["Name", "Time", "Type", "Duration"].map((h) => (
                    <th key={h} className="px-5 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((r, i) => (
                  <tr key={i} className="border-t border-[#F4F1EA]">
                    <td className="px-5 py-3 font-semibold">{r.name}</td>
                    <td className="whitespace-nowrap px-5 py-3 text-grey">{r.time}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${r.type === "Incoming" ? "text-[#3E6FD0]" : "text-manikstu-leaf"}`}>
                        {r.type === "Incoming" ? <ArrowDownLeft className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
                        {r.type}
                      </span>
                    </td>
                    <td className="px-5 py-3">{r.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
