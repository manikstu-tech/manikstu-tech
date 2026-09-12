import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eye, ImageOff, Inbox, Pencil, Plus, Search, Star } from "lucide-react";
import { Alert, buttonClass, fieldClass, Forbidden, formatDate, formatPrice, PageHeader, Pagination, Pill, StatusBadge } from "@/components/admin/AdminUi";
import DeleteRecordButton from "@/components/admin/DeleteRecordButton";
import { requireAdmin } from "@/lib/admin/auth";
import { getSection, type ColumnDef, type Option, type SectionDef } from "@/lib/admin/sections";
import { listSection, type AdminRecord, type ListMeta } from "@/lib/admin/sections-api";
import { deleteSectionAction } from "../section-actions";

type Params = { params: Promise<{ section: string }> };
type Search = Record<string, string | undefined>;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: getSection((await params).section)?.title ?? "Admin" };
}

function read(row: AdminRecord, path: string): unknown {
  return path.split(".").reduce<unknown>((value, key) => (value && typeof value === "object" ? (value as Record<string, unknown>)[key] : undefined), row);
}

function Cell({ row, column }: { row: AdminRecord; column: ColumnDef }) {
  const value = read(row, column.key);
  switch (column.type) {
    case "status":
      return <StatusBadge active={Boolean(value)} on={column.on} off={column.off} />;
    case "date":
      return <span className="whitespace-nowrap text-grey">{formatDate(value)}</span>;
    case "money":
      return <span className="font-medium">{formatPrice(typeof value === "number" ? value : null)}</span>;
    case "rating":
      return value ? (
        <span className="inline-flex items-center gap-1 font-medium">
          <Star className="h-4 w-4 fill-[#E0A82E] text-[#E0A82E]" />
          {String(value)}/5
        </span>
      ) : (
        <span className="text-grey">—</span>
      );
    case "image":
      return value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={String(value)} alt="" className="h-11 w-11 rounded-lg border border-[#ECE7DC] object-cover" />
      ) : (
        <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#ECE7DC] bg-[#FBF8F1] text-[#B9A98A]">
          <ImageOff className="h-4 w-4" />
        </span>
      );
    case "pill":
      return value ? <Pill tone={column.tones?.[String(value)] ?? "grey"}>{column.labels?.[String(value)] ?? String(value)}</Pill> : <span className="text-grey">—</span>;
    default:
      return value === null || value === undefined || value === "" ? <span className="text-grey">—</span> : <>{String(value)}</>;
  }
}

function filterOptions(options: Option[] | { meta: string }, meta: ListMeta): Option[] {
  if (Array.isArray(options)) return options;
  const list = meta[options.meta];
  return Array.isArray(list) ? list.map((v) => ({ value: String(v), label: String(v) })) : [];
}

function recordHref(section: SectionDef, id: number) {
  return section.hasDetail ? `/admin/${section.key}/${id}` : `/admin/${section.key}/${id}/edit`;
}

export default async function SectionListPage({ params, searchParams }: Params & { searchParams: Promise<Search> }) {
  const [{ section: key }, sp, user] = await Promise.all([params, searchParams, requireAdmin()]);
  const section = getSection(key);
  if (!section) notFound();
  if (section.developerOnly && user.role !== "developer") return <Forbidden title={section.title} />;

  const filters: Search = { search: sp.search, page: sp.page };
  for (const f of section.filters ?? []) filters[f.name] = sp[f.name];
  const { data: rows, meta } = await listSection(key, filters);

  const canDelete = user.role === "developer";
  const canEdit = section.canEdit !== false;
  const filtered = Object.entries(filters).some(([k, v]) => k !== "page" && v);
  const hrefFor = (page: number) => {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...filters, page: String(page) })) if (v) qs.set(k, v);
    return `/admin/${key}?${qs}`;
  };

  return (
    <>
      <PageHeader
        title={section.title}
        subtitle={section.subtitle}
        actions={
          section.canCreate !== false && (
            <Link href={`/admin/${key}/new`} className={buttonClass.primary}>
              <Plus className="h-4 w-4" />
              Add {section.singular}
            </Link>
          )
        }
      />

      {sp.saved && <Alert tone="success">{section.singular} saved.</Alert>}
      {sp.deleted && <Alert tone="success">{section.singular} deleted.</Alert>}

      <form method="get" className="mb-5 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grey" />
          <input name="search" defaultValue={sp.search} placeholder={section.searchPlaceholder ?? "Search…"} className={`${fieldClass} w-full pl-10`} />
        </div>
        {section.filters?.map((f) => (
          <select key={f.name} name={f.name} defaultValue={sp[f.name] ?? ""} className={fieldClass} aria-label={f.label}>
            <option value="">All {f.label.toLowerCase()}</option>
            {filterOptions(f.options, meta).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ))}
        <button type="submit" className={buttonClass.light}>
          Filter
        </button>
        {filtered && (
          <Link href={`/admin/${key}`} className="text-sm font-medium text-grey hover:text-manikstu-green">
            Clear
          </Link>
        )}
      </form>

      <div className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="bg-[#FBF8F1] text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A6B4E]">
                {section.columns.map((c) => (
                  <th key={c.key} className={`px-5 py-3.5 ${c.type === "image" ? "w-16" : ""}`}>
                    {c.label}
                  </th>
                ))}
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const title = String(read(row, section.titleField) ?? `#${row.id}`);
                return (
                  <tr key={row.id} className="border-t border-[#F4F1EA] hover:bg-[#FBF9F4]">
                    {section.columns.map((c) => (
                      <td key={c.key} className="px-5 py-3.5">
                        {c.link && (canEdit || section.hasDetail) ? (
                          <Link href={recordHref(section, row.id)} className="font-semibold text-charcoal hover:text-manikstu-leaf hover:underline">
                            <Cell row={row} column={c} />
                          </Link>
                        ) : (
                          <Cell row={row} column={c} />
                        )}
                      </td>
                    ))}
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1.5">
                        {section.hasDetail && (
                          <Link href={`/admin/${key}/${row.id}`} className={buttonClass.icon} title="View" aria-label={`View ${title}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        )}
                        {canEdit && (
                          <Link href={`/admin/${key}/${row.id}/edit`} className={buttonClass.icon} title="Edit" aria-label={`Edit ${title}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        )}
                        {canDelete && !(key === "users" && row.id === user.id) && (
                          <DeleteRecordButton name={title} action={deleteSectionAction.bind(null, key, row.id)} />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {rows.length === 0 && (
          <div className="px-5 py-16 text-center">
            <Inbox className="mx-auto h-12 w-12 text-manikstu-green/50" strokeWidth={1.5} />
            <h3 className="mt-3 text-xl font-bold">{filtered ? "Nothing matches these filters" : `No ${section.title.toLowerCase()} yet`}</h3>
            <p className="mt-1 text-sm text-grey">
              {filtered ? "Try a different search or clear the filters." : section.canCreate !== false ? `Add the first ${section.singular.toLowerCase()} to get started.` : "New entries will appear here."}
            </p>
          </div>
        )}

        <Pagination meta={meta} hrefFor={hrefFor} />
      </div>
    </>
  );
}
