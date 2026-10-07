import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, FileText, Plus, ChevronRight, Inbox, ArrowUpRight, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/AdminUi";
import { requireAdmin } from "@/lib/admin/auth";
import { listSection } from "@/lib/admin/sections-api";

export const metadata: Metadata = { title: "HR Dashboard" };

type AppItem = {
  id: number;
  name: string;
  email: string;
  status: string;
  job_title: string | null;
  created_at: string | null;
};

const STATUS_STYLE: Record<string, string> = {
  new: "bg-manikstu-gold/15 text-[#8A6414]",
  shortlisted: "bg-[#5B8DEF]/12 text-[#3E6FD0]",
  interview: "bg-[#7C5CB0]/12 text-[#6A4C9C]",
  hired: "bg-manikstu-green/12 text-manikstu-leaf",
  rejected: "bg-manikstu-red/10 text-manikstu-red",
};

async function count(key: string): Promise<number | null> {
  try {
    const res = await listSection(key, {});
    return res.meta?.total ?? res.data.length;
  } catch {
    return null;
  }
}

async function getApplications(): Promise<{ total: number | null; recent: AppItem[] }> {
  try {
    const res = await listSection("applications", {});
    const data = (res.data ?? []) as unknown as AppItem[];
    return { total: res.meta?.total ?? data.length, recent: data.slice(0, 5) };
  } catch {
    return { total: null, recent: [] };
  }
}

function fmtDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function StatTile({ label, value, hint, icon: Icon, href }: { label: string; value: string; hint: string; icon: LucideIcon; href: string }) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-manikstu-green/10 text-manikstu-leaf">
          <Icon className="h-[22px] w-[22px]" />
        </span>
        <ChevronRight className="h-4 w-4 text-grey transition group-hover:translate-x-0.5 group-hover:text-manikstu-green" />
      </div>
      <p className="mt-4 font-heading text-4xl font-bold lining-nums tabular-nums text-charcoal">{value}</p>
      <p className="mt-1 text-sm font-medium text-grey">{label}</p>
      <p className="mt-0.5 text-xs text-grey/70">{hint}</p>
    </Link>
  );
}

function ActionRow({ label, description, icon: Icon, href }: { label: string; description: string; icon: LucideIcon; href: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-manikstu-green/15 bg-manikstu-green/[0.05] px-3.5 py-2.5 transition hover:bg-manikstu-green/[0.09]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-manikstu-green/12 text-manikstu-green">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-charcoal">{label}</span>
        <span className="block truncate text-xs text-grey">{description}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-grey transition group-hover:translate-x-0.5 group-hover:text-manikstu-green" />
    </Link>
  );
}

export default async function HrDashboardPage() {
  const user = await requireAdmin();
  const [jobs, apps] = await Promise.all([count("careers"), getApplications()]);
  const n = (v: number | null) => (v === null ? "—" : v.toLocaleString("en-IN"));

  return (
    <div>
      <PageHeader
        title="HR Dashboard"
        subtitle={`Welcome, ${user.name.split(" ")[0]}. Manage hiring and your team here.`}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatTile label="Job Openings" value={n(jobs)} hint="Posted on the website" icon={Briefcase} href="/admin/careers" />
        <StatTile label="Applications" value={n(apps.total)} hint="Candidates applied" icon={Inbox} href="/admin/applications" />
      </div>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
        {/* Recent applications */}
        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-charcoal">Recent Applications</h2>
            <Link href="/admin/applications" className="inline-flex items-center gap-1 text-sm font-semibold text-manikstu-green hover:underline">
              View all <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {apps.recent.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
                <Inbox className="h-6 w-6" />
              </span>
              <p className="text-sm font-semibold text-charcoal">No applications yet</p>
              <p className="max-w-sm text-xs text-grey">
                When candidates apply through a job&apos;s Apply form on the website, they appear here with their CV.
              </p>
            </div>
          ) : (
            <ul className="mt-1 divide-y divide-[#F4F1EA]">
              {apps.recent.map((a) => (
                <li key={a.id}>
                  <Link href="/admin/applications" className="flex items-center gap-3 py-3 transition hover:opacity-80">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10 text-sm font-semibold text-manikstu-leaf">
                      {a.name?.charAt(0).toUpperCase() || "?"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-charcoal">{a.name}</span>
                      <span className="block truncate text-xs text-grey">{a.job_title ?? a.email}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2.5">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${STATUS_STYLE[a.status] ?? "bg-light-grey text-charcoal"}`}>
                        {a.status}
                      </span>
                      <span className="whitespace-nowrap text-xs text-grey">{fmtDate(a.created_at)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Quick actions */}
        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-gradient-to-br from-white to-[#FBF7EF] p-5 shadow-sm">
          <h2 className="font-heading text-lg font-bold text-charcoal">Quick Actions</h2>
          <div className="mt-4 grid gap-2.5">
            <ActionRow label="Post a Job" description="Create a new opening" icon={Plus} href="/admin/careers/new" />
            <ActionRow label="Manage Jobs" description="Edit or close openings" icon={Briefcase} href="/admin/careers" />
            <ActionRow label="View Applications" description="Review candidates & CVs" icon={Inbox} href="/admin/applications" />
            <ActionRow label="Website Careers Page" description="See what candidates see" icon={FileText} href="/careers" />
          </div>
        </section>
      </div>
    </div>
  );
}
