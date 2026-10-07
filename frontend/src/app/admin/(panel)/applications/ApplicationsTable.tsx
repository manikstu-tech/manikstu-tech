"use client";

import { useTransition, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { updateApplicationStatus } from "./actions";

export type Application = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  job_title: string | null;
  resume_name: string | null;
  created_at: string | null;
};

const STATUSES = ["new", "shortlisted", "interview", "hired", "rejected"] as const;

const STATUS_STYLE: Record<string, string> = {
  new: "bg-manikstu-gold/15 text-[#8A6414] border-manikstu-gold/40",
  shortlisted: "bg-[#5B8DEF]/12 text-[#3E6FD0] border-[#5B8DEF]/40",
  interview: "bg-[#7C5CB0]/12 text-[#6A4C9C] border-[#7C5CB0]/40",
  hired: "bg-manikstu-green/12 text-manikstu-leaf border-manikstu-green/40",
  rejected: "bg-manikstu-red/10 text-manikstu-red border-manikstu-red/30",
};

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function StatusSelect({ id, value }: { id: number; value: string }) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState(value);
  return (
    <span className="inline-flex items-center gap-2">
      <select
        value={status}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value;
          setStatus(next);
          startTransition(() => updateApplicationStatus(id, next));
        }}
        className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize outline-none transition focus:ring-2 focus:ring-manikstu-green/20 disabled:opacity-60 ${STATUS_STYLE[status] ?? "border-light-grey text-charcoal"}`}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s} className="capitalize">
            {s}
          </option>
        ))}
      </select>
      {pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-grey" />}
    </span>
  );
}

export default function ApplicationsTable({ applications }: { applications: Application[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-light-grey bg-manikstu-cream/40 text-xs uppercase tracking-wide text-grey">
              <th className="px-4 py-3 font-semibold">Applicant</th>
              <th className="px-4 py-3 font-semibold">Job</th>
              <th className="px-4 py-3 font-semibold">Applied</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">CV</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4F1EA]">
            {applications.map((a) => (
              <tr key={a.id} className="align-middle hover:bg-manikstu-cream/20">
                <td className="px-4 py-3">
                  <div className="font-semibold text-charcoal">{a.name}</div>
                  <div className="text-xs text-grey">{a.email}</div>
                  {a.phone && <div className="text-xs text-grey">{a.phone}</div>}
                </td>
                <td className="px-4 py-3 text-grey">{a.job_title ?? "—"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-grey">{fmtDate(a.created_at)}</td>
                <td className="px-4 py-3"><StatusSelect id={a.id} value={a.status} /></td>
                <td className="px-4 py-3">
                  <a
                    href={`/admin/api/applications/${a.id}/resume`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-manikstu-green/30 bg-manikstu-green/[0.06] px-3 py-1.5 text-xs font-semibold text-manikstu-green transition hover:bg-manikstu-green hover:text-white"
                    title={a.resume_name ?? "Download CV"}
                  >
                    <Download className="h-3.5 w-3.5" /> CV
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
