import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ImageOff, Search } from "lucide-react";
import { buttonClass, fieldClass, formatBytes, formatDate, PageHeader, Pagination } from "@/components/admin/AdminUi";
import DeleteRecordButton from "@/components/admin/DeleteRecordButton";
import MediaUploader from "@/components/admin/MediaUploader";
import { requireAdmin } from "@/lib/admin/auth";
import { listMedia } from "@/lib/admin/sections-api";
import { deleteMediaAction, uploadMediaAction } from "../section-actions";

export const metadata: Metadata = { title: "Media Library" };

type Search = { search?: string; type?: string; sort?: string; page?: string };

export default async function MediaPage({ searchParams }: { searchParams: Promise<Search> }) {
  const [user, sp] = await Promise.all([requireAdmin(), searchParams]);
  const filters = { search: sp.search, type: sp.type, sort: sp.sort, page: sp.page };
  const { data: items, meta } = await listMedia(filters);
  const hrefFor = (page: number) => {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...filters, page: String(page) })) if (v) qs.set(k, v);
    return `/admin/media?${qs}`;
  };

  return (
    <>
      <PageHeader title="Media Library" subtitle="Photos and videos shown in the Media page gallery" />
      <MediaUploader action={uploadMediaAction} />

      <form method="get" className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grey" />
          <input name="search" defaultValue={sp.search} placeholder="Search by name…" className={`${fieldClass} w-full pl-10`} />
        </div>
        <select name="type" defaultValue={sp.type ?? ""} className={fieldClass} aria-label="Type">
          <option value="">Photos and videos</option>
          <option value="photo">Photos</option>
          <option value="video">Videos</option>
        </select>
        <select name="sort" defaultValue={sp.sort ?? ""} className={fieldClass} aria-label="Sort">
          <option value="">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <button type="submit" className={buttonClass.light}>
          Filter
        </button>
        {(sp.search || sp.type || sp.sort) && (
          <Link href="/admin/media" className="text-sm font-medium text-grey hover:text-manikstu-green">
            Clear
          </Link>
        )}
      </form>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-[#ECE7DC] bg-white px-5 py-16 text-center shadow-sm">
          <ImageOff className="mx-auto h-12 w-12 text-manikstu-green/50" strokeWidth={1.5} />
          <h3 className="mt-3 text-xl font-bold">No media yet</h3>
          <p className="mt-1 text-sm text-grey">Upload a photo or video above to get started.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
          <ul className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((m) => {
              const isVideo = m.mime_type.startsWith("video/");
              const isPdf = m.mime_type === "application/pdf";
              return (
                <li key={m.id} className="overflow-hidden rounded-xl border border-[#EDE9E1] bg-[#FBFAF7]">
                  <a href={m.url} target="_blank" rel="noreferrer" className="relative block aspect-video bg-charcoal/5">
                    {isVideo ? (
                      <video src={`${m.url}#t=0.5`} preload="metadata" muted className="h-full w-full bg-black object-cover" />
                    ) : isPdf ? (
                      <span className="flex h-full items-center justify-center text-grey">
                        <FileText className="h-10 w-10" />
                      </span>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.url} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
                    )}
                    <span className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase text-white ${isVideo ? "bg-[#3E6FD0]/90" : "bg-manikstu-green/90"}`}>
                      {isVideo ? "Video" : isPdf ? "PDF" : "Photo"}
                    </span>
                  </a>
                  <div className="flex items-start justify-between gap-2 p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold" title={m.name}>
                        {m.name}
                      </p>
                      <p className="text-xs text-grey">
                        {formatDate(m.created_at)} · {formatBytes(m.size)}
                      </p>
                    </div>
                    {user.role === "developer" && (
                      <DeleteRecordButton name={m.name} action={deleteMediaAction.bind(null, m.id)} note="The file is removed from the website too." />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <Pagination meta={meta} hrefFor={hrefFor} />
        </div>
      )}
    </>
  );
}
