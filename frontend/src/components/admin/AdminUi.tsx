import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import type { Tone } from "@/lib/admin/sections";

export const buttonClass = {
  primary:
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-manikstu-green to-manikstu-leaf px-5 text-sm font-semibold text-white shadow-md shadow-manikstu-leaf/20 transition hover:-translate-y-px disabled:cursor-wait disabled:opacity-70",
  light:
    "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E8E2D6] bg-white px-5 text-sm font-semibold text-grey transition hover:border-manikstu-green/40 hover:text-manikstu-green",
  icon:
    "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#ECE7DC] bg-white text-grey transition hover:border-manikstu-green/30 hover:bg-manikstu-green/5 hover:text-manikstu-green",
};

export const fieldClass =
  "h-11 rounded-xl border border-[#ECE7DC] bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-4 focus:ring-manikstu-green/10";

export function PageHeader({ title, subtitle, actions }: { title: ReactNode; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-3xl font-bold text-[#2D5016]">{title}</h1>
        <div className="my-2 flex items-center gap-2" aria-hidden>
          <span className="h-0.5 w-10 rounded bg-manikstu-gold/60" />
          <span className="h-1.5 w-1.5 rotate-45 bg-manikstu-gold" />
          <span className="h-0.5 w-5 rounded bg-manikstu-gold/30" />
        </div>
        {subtitle && <div className="text-sm text-grey">{subtitle}</div>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, children, className = "" }: { title?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm ${className}`}>
      {title && <h2 className="border-b border-[#F0ECE2] bg-[#FBFAF7] px-5 py-3.5 text-[15px] font-bold">{title}</h2>}
      <div className="p-5">{children}</div>
    </section>
  );
}

export function StatusBadge({ active, on = "Published", off = "Draft" }: { active: boolean; on?: string; off?: string }) {
  return <Pill tone={active ? "green" : "amber"}>{active ? on : off}</Pill>;
}

const TONES: Record<Tone, { pill: string; dot: string }> = {
  green: { pill: "bg-manikstu-green/10 text-manikstu-leaf", dot: "bg-manikstu-green" },
  amber: { pill: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
  red: { pill: "bg-manikstu-red/10 text-manikstu-red", dot: "bg-manikstu-red" },
  blue: { pill: "bg-[#5B8DEF]/10 text-[#3E6FD0]", dot: "bg-[#5B8DEF]" },
  purple: { pill: "bg-[#7C5CB0]/10 text-[#7C5CB0]", dot: "bg-[#7C5CB0]" },
  grey: { pill: "bg-[#F0ECE2] text-grey", dot: "bg-[#B0A98E]" },
};

export function Pill({ tone = "grey", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${TONES[tone].pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${TONES[tone].dot}`} />
      {children}
    </span>
  );
}

export function Alert({ tone, children }: { tone: "success" | "error"; children: ReactNode }) {
  const styles =
    tone === "success"
      ? "border-manikstu-green/20 bg-manikstu-green/5 text-manikstu-leaf"
      : "border-manikstu-red/20 bg-manikstu-red/5 text-manikstu-red";
  return (
    <div role={tone === "error" ? "alert" : "status"} className={`mb-5 rounded-xl border px-4 py-3 text-sm font-medium ${styles}`}>
      {children}
    </div>
  );
}

/** Shown instead of a developer-only section to other roles. */
export function Forbidden({ title }: { title: string }) {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-[#ECE7DC] bg-white p-8 text-center shadow-sm">
      <Lock className="mx-auto h-9 w-9 text-manikstu-gold" strokeWidth={1.5} />
      <h1 className="mt-3 text-xl font-bold">{title} is for developers</h1>
      <p className="mt-1.5 text-sm text-grey">Ask a developer on the team if you need a change here.</p>
    </div>
  );
}

export function Pagination({ meta, hrefFor }: { meta: { current_page: number; last_page: number; per_page: number; total: number }; hrefFor: (page: number) => string }) {
  if (meta.total === 0) return null;
  const from = (meta.current_page - 1) * meta.per_page + 1;
  const to = Math.min(meta.current_page * meta.per_page, meta.total);
  const arrow = (page: number, enabled: boolean, label: string, icon: ReactNode) =>
    enabled ? (
      <Link href={hrefFor(page)} className={buttonClass.icon} aria-label={label}>
        {icon}
      </Link>
    ) : (
      <span className={`${buttonClass.icon} pointer-events-none opacity-40`}>{icon}</span>
    );

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-[#F4F1EA] px-5 py-3.5 text-sm text-grey sm:flex-row">
      <p>
        Showing <span className="font-semibold text-charcoal">{from}</span>–<span className="font-semibold text-charcoal">{to}</span> of{" "}
        <span className="font-semibold text-charcoal">{meta.total}</span>
      </p>
      {meta.last_page > 1 && (
        <div className="flex items-center gap-1.5">
          {arrow(meta.current_page - 1, meta.current_page > 1, "Previous page", <ChevronLeft className="h-4 w-4" />)}
          <span className="px-2">
            Page {meta.current_page} of {meta.last_page}
          </span>
          {arrow(meta.current_page + 1, meta.current_page < meta.last_page, "Next page", <ChevronRight className="h-4 w-4" />)}
        </div>
      )}
    </div>
  );
}

export function formatPrice(price: number | null): string {
  return price === null ? "—" : `₹${price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatDate(value: unknown): string {
  if (typeof value !== "string" || !value) return "—";
  const date = new Date(value.length === 10 ? `${value}T00:00:00` : value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
