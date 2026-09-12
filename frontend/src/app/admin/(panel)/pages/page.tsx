import type { Metadata } from "next";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { buttonClass, formatDate, PageHeader, StatusBadge } from "@/components/admin/AdminUi";
import { requireAdmin } from "@/lib/admin/auth";
import { listPages } from "@/lib/admin/pages";

export const metadata: Metadata = { title: "Pages" };

export default async function PagesPage() {
  await requireAdmin();
  const pages = await listPages();

  return (
    <>
      <PageHeader title="Pages" subtitle="Page titles, SEO descriptions and the content blocks each page shows" />
      <div className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-[#FBF8F1] text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A6B4E]">
                <th className="px-5 py-3.5">Page</th>
                <th className="px-5 py-3.5">Path</th>
                <th className="px-5 py-3.5">Blocks</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Updated</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr key={p.id} className="border-t border-[#F4F1EA] hover:bg-[#FBF9F4]">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/pages/${p.id}`} className="font-semibold text-charcoal hover:text-manikstu-leaf hover:underline">{p.title}</Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <code className="rounded bg-[#F0ECE2] px-2 py-0.5 text-xs">{p.slug === "home" ? "/" : `/${p.slug}`}</code>
                  </td>
                  <td className="px-5 py-3.5">{p.blocks_count}</td>
                  <td className="px-5 py-3.5"><StatusBadge active={p.is_published} /></td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-grey">{formatDate(p.updated_at)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end">
                      <Link href={`/admin/pages/${p.id}`} className={buttonClass.icon} title="Edit" aria-label={`Edit ${p.title}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pages.length === 0 && <p className="px-5 py-12 text-center text-sm text-grey">No pages yet.</p>}
      </div>
    </>
  );
}
