import type { Metadata } from "next";
import Link from "next/link";
import { Inbox, Briefcase, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/admin/AdminUi";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Applications" };

export default async function ApplicationsPage() {
  await requireAdmin();

  return (
    <div>
      <PageHeader
        title="Applications"
        subtitle="Candidates who applied to your job openings."
      />

      <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white p-5 shadow-sm">
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-manikstu-cream text-manikstu-green">
            <Inbox className="h-7 w-7" />
          </span>
          <h2 className="font-heading text-lg font-bold text-charcoal">No applications yet</h2>
          <p className="max-w-md text-sm text-grey">
            Once the website apply form with CV upload is switched on, every applicant and
            their CV will appear here, ready to review and download.
          </p>
          <Link
            href="/admin/careers"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-manikstu-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-manikstu-leaf"
          >
            <Briefcase className="h-4 w-4" /> Manage job openings <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
