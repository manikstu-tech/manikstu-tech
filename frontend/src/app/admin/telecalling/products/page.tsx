import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { PageHeader } from "@/components/admin/AdminUi";
import { requireTelecaller } from "@/lib/admin/auth";

export const metadata: Metadata = { title: "Products" };

/** Not built in the Blade panel either; kept as the same placeholder. */
export default async function TelecallingProductsPage() {
  await requireTelecaller();

  return (
    <>
      <PageHeader title="Products" subtitle="This section is being prepared for the telecalling panel." />
      <div className="mx-auto max-w-lg rounded-2xl border border-[#ECE7DC] bg-white p-8 text-center shadow-sm">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-manikstu-gold/15 text-[#8A6414]">
          <Clock className="h-6 w-6" />
        </span>
        <h2 className="mt-4 text-xl font-bold">Products — Coming Soon</h2>
        <p className="mt-2 text-sm text-grey">This part of the telecalling workspace isn&apos;t built yet. Head back to your dashboard to work through today&apos;s leads and calls.</p>
        <Link href="/admin/telecalling" className="mt-5 inline-flex h-11 items-center rounded-xl bg-manikstu-green px-5 text-sm font-semibold text-white hover:bg-manikstu-leaf">
          ← Back to Dashboard
        </Link>
      </div>
    </>
  );
}
