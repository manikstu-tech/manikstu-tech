import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, ImageOff, PackageOpen, Pencil, Plus, Search } from "lucide-react";
import { Alert, buttonClass, formatPrice, PageHeader, StatusBadge } from "@/components/admin/AdminUi";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import { requireAdmin } from "@/lib/admin/auth";
import { getProductCategories, listProducts, type ProductFilters } from "@/lib/admin/products";
import { togglePublishAction } from "./actions";

export const metadata: Metadata = { title: "Products" };

type Search = ProductFilters & { saved?: string; deleted?: string };

const field =
  "h-11 rounded-xl border border-[#ECE7DC] bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-4 focus:ring-manikstu-green/10";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const [user, sp] = await Promise.all([requireAdmin(), searchParams]);
  const filters: ProductFilters = { search: sp.search, category: sp.category, status: sp.status, page: sp.page };
  const [{ data: products, meta }, categories] = await Promise.all([listProducts(filters), getProductCategories()]);
  const canDelete = user.role === "developer";
  const filtered = Boolean(sp.search || sp.category || sp.status);

  const pageHref = (page: number) => {
    const qs = new URLSearchParams();
    for (const [key, value] of Object.entries({ ...filters, page: String(page) })) if (value) qs.set(key, value);
    return `/admin/products?${qs}`;
  };
  const from = meta.total === 0 ? 0 : (meta.current_page - 1) * meta.per_page + 1;
  const to = Math.min(meta.current_page * meta.per_page, meta.total);

  return (
    <>
      <PageHeader
        title="Products"
        subtitle="Manage your product catalog"
        actions={
          <Link href="/admin/products/new" className={buttonClass.primary}>
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        }
      />

      {sp.saved && <Alert tone="success">Product saved.</Alert>}
      {sp.deleted && <Alert tone="success">Product deleted.</Alert>}

      <form method="get" className="mb-5 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-grey" />
          <input name="search" defaultValue={sp.search} placeholder="Search name or SKU…" className={`${field} w-full pl-10`} />
        </div>
        <select name="category" defaultValue={sp.category ?? ""} className={field} aria-label="Category">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={sp.status ?? ""} className={field} aria-label="Status">
          <option value="">All status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="featured">Featured</option>
        </select>
        <button type="submit" className={buttonClass.light}>
          Filter
        </button>
        {filtered && (
          <Link href="/admin/products" className="text-sm font-medium text-grey hover:text-manikstu-green">
            Clear
          </Link>
        )}
      </form>

      <div className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="bg-[#FBF8F1] text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A6B4E]">
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-[#F4F1EA] hover:bg-[#FBF9F4]">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image_url} alt="" className="h-11 w-11 shrink-0 rounded-lg border border-[#ECE7DC] object-cover" />
                      ) : (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#ECE7DC] bg-[#FBF8F1] text-[#B9A98A]">
                          <ImageOff className="h-4 w-4" />
                        </span>
                      )}
                      <div className="min-w-0">
                        <Link href={`/admin/products/${p.id}`} className="font-semibold text-charcoal hover:text-manikstu-leaf hover:underline">
                          {p.name}
                        </Link>
                        {p.is_featured && <p className="text-xs font-medium text-manikstu-gold">Featured</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-grey">{p.category?.name ?? "—"}</td>
                  <td className="px-5 py-3.5 font-medium">{formatPrice(p.price)}</td>
                  <td className="px-5 py-3.5">
                    <form action={togglePublishAction.bind(null, p.id)}>
                      <button type="submit" title={`Click to ${p.is_active ? "unpublish" : "publish"}`} className="transition hover:brightness-95">
                        <StatusBadge active={p.is_active} />
                      </button>
                    </form>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      <Link href={`/admin/products/${p.id}`} className={buttonClass.icon} title="View" aria-label={`View ${p.name}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link href={`/admin/products/${p.id}/edit`} className={buttonClass.icon} title="Edit" aria-label={`Edit ${p.name}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                      {canDelete && <DeleteProductButton id={p.id} name={p.name} />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="px-5 py-16 text-center">
            <PackageOpen className="mx-auto h-12 w-12 text-manikstu-green/50" strokeWidth={1.5} />
            <h3 className="mt-3 text-xl font-bold">{filtered ? "No products match these filters" : "No products yet"}</h3>
            <p className="mt-1 text-sm text-grey">{filtered ? "Try a different search or clear the filters." : "Add your first product to get started."}</p>
          </div>
        )}

        {meta.total > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#F4F1EA] px-5 py-3.5 text-sm text-grey sm:flex-row">
            <p>
              Showing <span className="font-semibold text-charcoal">{from}</span>–<span className="font-semibold text-charcoal">{to}</span> of{" "}
              <span className="font-semibold text-charcoal">{meta.total}</span>
            </p>
            {meta.last_page > 1 && (
              <div className="flex items-center gap-1.5">
                {meta.current_page > 1 ? (
                  <Link href={pageHref(meta.current_page - 1)} className={buttonClass.icon} aria-label="Previous page">
                    <ChevronLeft className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className={`${buttonClass.icon} pointer-events-none opacity-40`}>
                    <ChevronLeft className="h-4 w-4" />
                  </span>
                )}
                <span className="px-2">
                  Page {meta.current_page} of {meta.last_page}
                </span>
                {meta.current_page < meta.last_page ? (
                  <Link href={pageHref(meta.current_page + 1)} className={buttonClass.icon} aria-label="Next page">
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className={`${buttonClass.icon} pointer-events-none opacity-40`}>
                    <ChevronRight className="h-4 w-4" />
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
