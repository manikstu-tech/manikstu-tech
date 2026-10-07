import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, FileText, Plus, ChevronRight, Inbox, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/AdminUi";
import { requireAdmin } from "@/lib/admin/auth";
import { listSection } from "@/lib/admin/sections-api";

export const metadata: Metadata = { title: "HR Dashboard" };

async function count(key: string): Promise<number | null> {
  try {
    const res = await listSection(key, {});
    return res.meta?.total ?? res.data.length;
  } catch {
    return null;
  }
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
  const jobs = await count("careers");
  const n = (v: number | null) => (v === null ? "—" : v.toLocaleString("en-IN"));

  return (
    <div>
      <PageHeader
        title="HR Dashboard"
        subtitle={`Welcome, ${user.name.split(" ")[0]}. Manage hiring and your team here.`}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <StatTile label="Job Openings" value={n(jobs)} hint="Posted on the website" icon={Briefcase} href="/admin/careers" />
        <StatTile label="Applications" value="0" hint="Awaiting review" icon={Inbox} href="/admin/applications" />
      </div>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
        {/* Applications — placeholder until the CV-upload feature ships */}
        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-charcoal">Applications</h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
              <Inbox className="h-6 w-6" />
            </span>
            <p className="text-sm font-semibold text-charcoal">Candidate applications will appear here</p>
            <p className="max-w-sm text-xs text-grey">
              Once the website apply form with CV upload is switched on, every applicant and their CV lands in this inbox.
            </p>
          </div>
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
