import Link from "next/link";
import type { ReactNode } from "react";
import { Check, Eye } from "lucide-react";
import type { Tone } from "@/lib/admin/sections";

// Status colours carried over from the Blade telecalling panel.
export const ORDER_TONES: Record<string, Tone> = { "In Transit": "blue", "Issue Reported": "red", Delivered: "green", Pending: "amber", Confirmed: "purple" };
export const COMPLAINT_TONES: Record<string, Tone> = { Open: "red", "In Progress": "amber", Resolved: "green" };
export const PRIORITY_TONES: Record<string, Tone> = { High: "red", Medium: "amber", Low: "green" };
export const FRANCHISE_TONES: Record<string, Tone> = { New: "purple", Contacted: "blue", Qualified: "green", "Site Visit": "amber", Approved: "green" };
export const LEAD_TONES: Record<string, Tone> = { new: "green", contacted: "amber", converted: "blue", closed: "grey" };
export const ACTIVE_TONES: Record<string, Tone> = { Active: "green", Inactive: "amber" };

export const tableClass = "w-full min-w-[680px] text-sm";
export const theadClass = "bg-[#FBF8F1] text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A6B4E]";
export const rowClass = "border-t border-[#F4F1EA] hover:bg-[#FBF9F4]";

export function TableCard({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function ViewLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} title="View" aria-label={label} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#ECE7DC] bg-white text-grey hover:border-manikstu-green/30 hover:text-manikstu-green">
      <Eye className="h-4 w-4" />
    </Link>
  );
}

export function StatusChips({ base, options, active }: { base: string; options: string[]; active: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Link
          key={o}
          href={o === "All" ? base : `${base}?status=${encodeURIComponent(o)}`}
          aria-current={active === o ? "true" : undefined}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
            active === o ? "border-manikstu-green bg-manikstu-green text-white" : "border-[#E8E2D6] bg-white text-grey hover:border-manikstu-green/40 hover:text-manikstu-green"
          }`}
        >
          {o}
        </Link>
      ))}
    </div>
  );
}

/** Horizontal journey (order delivery). */
export function Stepper({ steps, current, note }: { steps: string[]; current: number; note?: string }) {
  return (
    <div className="overflow-x-auto">
      <ol className="flex min-w-[640px] items-start">
        {steps.map((step, i) => {
          const n = i + 1;
          const done = n < current;
          const isCurrent = n === current;
          return (
            <li key={step} className="relative flex flex-1 flex-col items-center text-center">
              {i > 0 && <span className={`absolute right-1/2 top-4 h-0.5 w-full ${n <= current ? "bg-manikstu-green" : "bg-[#E5DFD2]"}`} aria-hidden />}
              <span
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  done ? "border-manikstu-green bg-manikstu-green text-white" : isCurrent ? "border-manikstu-green bg-white text-manikstu-leaf" : "border-[#E5DFD2] bg-white text-grey"
                }`}
              >
                {done ? <Check className="h-4 w-4" strokeWidth={3} /> : n}
              </span>
              <span className={`mt-2 px-1 text-[11.5px] leading-tight ${isCurrent ? "font-bold text-manikstu-leaf" : "text-grey"}`}>{step}</span>
              {n <= current && note && <span className="mt-0.5 text-[10.5px] text-[#9A9A8E]">{note}</span>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Vertical progress list (complaint status, lead journey). */
export function VSteps({ items, done }: { items: { label: string; note: string }[]; done: number }) {
  return (
    <ol>
      {items.map((item, i) => {
        const isDone = i + 1 <= done;
        return (
          <li key={item.label} className="relative flex gap-3 pb-5 last:pb-0">
            {i < items.length - 1 && <span className={`absolute left-[11px] top-6 h-full w-0.5 ${isDone ? "bg-manikstu-green/60" : "bg-[#E5DFD2]"}`} aria-hidden />}
            <span className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${isDone ? "border-manikstu-green bg-manikstu-green text-white" : "border-[#E5DFD2] bg-white"}`}>
              {isDone && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
            </span>
            <div>
              <p className={`text-sm ${isDone ? "font-semibold text-charcoal" : "text-grey"}`}>{item.label}</p>
              <p className="text-xs text-[#9A9A8E]">{item.note}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function Donut({ segments, total, caption }: { segments: { label: string; count: number; color: string; pct?: number }[]; total: number; caption: string }) {
  let acc = 0;
  const denominator = Math.max(1, total);
  const stops = segments
    .filter((s) => s.count > 0)
    .map((s) => {
      const share = s.pct ?? (s.count / denominator) * 100;
      const stop = `${s.color} ${acc}% ${acc + share}%`;
      acc += share;
      return stop;
    });
  const background = stops.length ? `conic-gradient(${stops.join(", ")})` : "#EDE9E1";

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative h-40 w-40 shrink-0 rounded-full" style={{ background }}>
        <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
          <span className="font-heading text-3xl font-bold lining-nums">{total}</span>
          <span className="text-[11px] text-grey">{caption}</span>
        </div>
      </div>
      <ul className="w-full space-y-2.5">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
            <span className="flex-1 text-grey">{s.label}</span>
            <span className="font-semibold">{s.count}</span>
            <span className="w-12 text-right text-xs text-[#9A9A8E]">({s.pct ?? (total ? Math.round((s.count / total) * 100) : 0)}%)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function KV({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 py-1.5 text-sm">
      <span className="w-32 shrink-0 text-grey">{label}</span>
      <span className="font-semibold text-charcoal">{children}</span>
    </div>
  );
}

export function initials(name: string): string {
  const clean = name.replace(/\(.*?\)/g, "").trim();
  return clean.split(/\s+/).slice(0, 2).map((w) => w.charAt(0)).join("").toUpperCase() || "L";
}

export const digits = (phone: string) => phone.replace(/\D+/g, "");

export const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const titleCase = (value?: string | null) => (value ? value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "—");

export function timeAgo(iso: string): string {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  const units: [number, string][] = [[31536000, "year"], [2592000, "month"], [604800, "week"], [86400, "day"], [3600, "hour"], [60, "minute"]];
  for (const [size, unit] of units) {
    const n = Math.floor(seconds / size);
    if (n >= 1) return `${n} ${unit}${n > 1 ? "s" : ""} ago`;
  }
  return "just now";
}
