import type { Metadata } from "next";
import Link from "next/link";
import { Inbox, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/admin/AdminUi";
import { requireAdmin } from "@/lib/admin/auth";
import { adminFetch } from "@/lib/admin/api";
import ApplicationsTable, { type Application } from "./ApplicationsTable";

export const metadata: Metadata = { title: "Applications" };

const FILTERS = [
  { key: "", label: "All" },
  { key: "new", label: "New" },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "interview", label: "Interview" },
  { key: "hired", label: "Hired" },
  { key: "rejected", label: "Rejected" },
];

async function getApplications(status?: string): Promise<{ data: Application[]; total: number }> {
  try {
    const qs = status ? `?status=${encodeURIComponent(status)}` : "";
    const res = await adminFetch<{ data: Application[]; meta?: { total?: number } }>(`/applications${qs}`);
    return { data: res.data ?? [], total: res.meta?.total ?? res.data?.length ?? 0 };
  } catch {
    return { data: [], total: 0 };
  }
}

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const { status } = await searchParams;
  const { data, total } = await getApplications(status);

  return (
    <div>
      <PageHeader title="Applications" subtitle="Candidates who applied to your job openings." />

      {/* Status filter */}
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = (status ?? "") === f.key;
          return (
            <Link
              key={f.key || "all"}
              href={f.key ? `/admin/applications?status=${f.key}` : "/admin/applications"}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                active
                  ? "border-manikstu-green bg-manikstu-green text-white"
                  : "border-light-grey bg-white text-grey hover:border-manikstu-green/40 hover:text-charcoal"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {data.length === 0 ? (
        <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white p-5 shadow-sm">
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
              <Inbox className="h-7 w-7" />
            </span>
            <h2 className="font-heading text-lg font-bold text-charcoal">
              {status ? `No ${status} applications` : "No applications yet"}
            </h2>
            <p className="max-w-md text-sm text-grey">
              {status
                ? "Try a different status filter."
                : "When candidates apply through a job's Apply form on the website, they'll appear here with their CV."}
            </p>
            <Link
              href="/admin/careers"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-manikstu-leaf"
            >
              <Briefcase className="h-4 w-4" /> Manage job openings
            </Link>
          </div>
        </section>
      ) : (
        <>
          <p className="mb-3 text-sm text-grey">
            {total} application{total === 1 ? "" : "s"}
          </p>
          <ApplicationsTable applications={data} />
        </>
      )}
    </div>
  );
}
