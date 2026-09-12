import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Pencil, Star } from "lucide-react";
import { Alert, buttonClass, Card, formatPrice, PageHeader, StatusBadge } from "@/components/admin/AdminUi";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import ProductGallery from "@/components/admin/ProductGallery";
import { AdminApiError } from "@/lib/admin/api";
import { requireAdmin } from "@/lib/admin/auth";
import { getProduct } from "@/lib/admin/products";
import { togglePublishAction } from "../actions";

export const metadata: Metadata = { title: "Product" };

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#F4F1EB] py-2.5 text-sm last:border-0">
      <span className="text-grey">{label}</span>
      <span className="text-right font-semibold text-charcoal">{children}</span>
    </div>
  );
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const [{ id }, sp, user] = await Promise.all([params, searchParams, requireAdmin()]);
  const product = await getProduct(id).catch((e) => {
    if (e instanceof AdminApiError && e.status === 404) notFound();
    throw e;
  });
  const rating = product.rating ?? 0;

  return (
    <>
      <PageHeader
        title={product.name}
        subtitle={
          <span className="flex flex-wrap items-center gap-2">
            <StatusBadge active={product.is_active} />
            {product.is_featured && (
              <span className="rounded-full bg-manikstu-gold/15 px-2.5 py-1 text-xs font-semibold text-[#8A6414]">Featured</span>
            )}
            <code className="rounded bg-[#F0ECE2] px-2 py-0.5 text-xs">{product.slug}</code>
            {product.sku && <code className="rounded bg-[#F0ECE2] px-2 py-0.5 text-xs">SKU {product.sku}</code>}
          </span>
        }
        actions={
          <>
            <Link href="/admin/products" className={buttonClass.light}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <form action={togglePublishAction.bind(null, product.id)}>
              <button type="submit" className={buttonClass.light}>
                {product.is_active ? "Unpublish" : "Publish"}
              </button>
            </form>
            {user.role === "developer" && <DeleteProductButton id={product.id} name={product.name} variant="button" />}
            <Link href={`/admin/products/${product.id}/edit`} className={buttonClass.primary}>
              <Pencil className="h-4 w-4" />
              Edit Product
            </Link>
          </>
        }
      />

      {sp.saved && <Alert tone="success">Product saved.</Alert>}

      <div className="grid items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          <Card>
            <ProductGallery images={product.images} name={product.name} size={product.size} />
          </Card>

          {product.description && (
            <Card title="Short Description">
              <p className="whitespace-pre-line text-sm leading-relaxed text-[#3A3A3A]">{product.description}</p>
            </Card>
          )}
          {product.long_description && (
            <Card title="Full Description">
              <p className="whitespace-pre-line text-sm leading-relaxed text-[#3A3A3A]">{product.long_description}</p>
            </Card>
          )}
          {product.highlights.length > 0 && (
            <Card title="Highlights">
              <ul className="space-y-2.5">
                {product.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5 text-sm text-[#3A3A3A]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-manikstu-green" strokeWidth={2.5} />
                    {h}
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {product.specifications.length > 0 && (
            <Card title="Specifications">
              <table className="w-full text-sm">
                <tbody>
                  {product.specifications.map((s) => (
                    <tr key={s.label} className="border-b border-[#F2EFEA] last:border-0">
                      <td className="w-[45%] py-2.5 pr-3 font-medium text-grey">{s.label}</td>
                      <td className="py-2.5 text-[#3A3A3A]">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
          {product.recommended_for.length > 0 && (
            <Card title="Recommended For">
              <ul className="list-disc space-y-2 pl-5 text-sm text-[#3A3A3A]">
                {product.recommended_for.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </Card>
          )}
          {(product.ingredients || product.usage_instructions || product.storage_instructions) && (
            <Card title="Usage & Handling">
              <div className="space-y-4">
                {(
                  [
                    ["Composition / Ingredients", product.ingredients],
                    ["Usage / Dosage", product.usage_instructions],
                    ["Storage & Handling", product.storage_instructions],
                  ] as const
                ).map(([label, text]) =>
                  text ? (
                    <div key={label}>
                      <h4 className="mb-1 text-xs font-bold uppercase tracking-wide text-grey">{label}</h4>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-[#3A3A3A]">{text}</p>
                    </div>
                  ) : null,
                )}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-5">
          <Card title="Overview">
            <Row label="Price">
              <span className="text-base text-manikstu-leaf">{formatPrice(product.price)}</span>
            </Row>
            {product.size && <Row label="Size / Unit">{product.size}</Row>}
            <Row label="Category">{product.category?.name ?? "—"}</Row>
            <Row label="SKU">{product.sku ?? "—"}</Row>
            <Row label="Stock">
              {product.stock_quantity}{" "}
              <span className={`text-xs ${product.stock_quantity > 0 ? "text-manikstu-green" : "text-manikstu-red"}`}>
                {product.stock_quantity > 0 ? "In stock" : "Out of stock"}
              </span>
            </Row>
            <Row label="Featured">{product.is_featured ? "Yes" : "No"}</Row>
            <Row label="Order">{product.order}</Row>
          </Card>

          <Card title="Ratings">
            <div className="flex items-center gap-3">
              <span className="font-heading text-3xl font-extrabold lining-nums">{rating ? rating.toFixed(1) : "—"}</span>
              <span className="flex gap-0.5" aria-label={`${rating} out of 5`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-[18px] w-[18px] ${i <= Math.round(rating) ? "fill-[#E0A82E] text-[#E0A82E]" : "fill-[#E5DCC8] text-[#E5DCC8]"}`}
                  />
                ))}
              </span>
            </div>
            <p className="mt-2 text-xs text-grey">{product.rating_count.toLocaleString("en-IN")} ratings</p>
          </Card>

          {product.translations && product.translations.length > 0 && (
            <Card title={`Translations (${product.translations.length})`}>
              {product.translations.map((t) => (
                <Row key={t.locale} label={t.locale.toUpperCase()}>
                  {t.name || "—"}
                </Row>
              ))}
            </Card>
          )}

          <Card title="On the Website">
            <p className="mb-2 text-sm text-[#3A3A3A]">Public product page path:</p>
            <code className="block break-all rounded-lg bg-[#F0ECE2] px-3 py-2 text-xs text-manikstu-leaf">/products/{product.slug}</code>
            <p className="mt-2.5 text-xs text-grey">
              Visible on the website only while <strong>Published</strong>.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
