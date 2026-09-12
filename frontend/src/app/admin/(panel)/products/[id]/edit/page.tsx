import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/AdminUi";
import ProductForm from "@/components/admin/ProductForm";
import { AdminApiError } from "@/lib/admin/api";
import { requireAdmin } from "@/lib/admin/auth";
import { getProduct, getProductCategories } from "@/lib/admin/products";
import { saveProductAction } from "../../actions";

export const metadata: Metadata = { title: "Edit Product" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [{ id }] = await Promise.all([params, requireAdmin()]);
  const [product, categories] = await Promise.all([
    getProduct(id).catch((e) => {
      if (e instanceof AdminApiError && e.status === 404) notFound();
      throw e;
    }),
    getProductCategories(),
  ]);

  // Active categories, plus the current one even if it was deactivated —
  // otherwise saving would silently clear the product's category.
  const options = categories.filter((c) => c.is_active || c.id === product.category_id);

  return (
    <>
      <PageHeader title="Edit Product" subtitle={product.name} />
      <ProductForm product={product} categories={options} action={saveProductAction.bind(null, product.id)} />
    </>
  );
}
