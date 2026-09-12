import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/AdminUi";
import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/admin/auth";
import { getProductCategories } from "@/lib/admin/products";
import { saveProductAction } from "../actions";

export const metadata: Metadata = { title: "Add Product" };

export default async function NewProductPage() {
  await requireAdmin();
  const categories = (await getProductCategories()).filter((c) => c.is_active);

  return (
    <>
      <PageHeader title="Add Product" subtitle="Create a product that will appear on the website" />
      <ProductForm categories={categories} action={saveProductAction.bind(null, null)} />
    </>
  );
}
