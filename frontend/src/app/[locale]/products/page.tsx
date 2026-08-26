"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/api";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: { name: string } | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("Products");

  useEffect(() => {
    getProducts(1, 50)
      .then((res) => {
        if (res.data?.length) setProducts(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHero background={null}>
          <div>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-manikstu-green">
              {t("pill")}
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 max-w-lg text-grey">
              {t("heroDesc")}
            </p>
          </div>
          <div className="flex items-center justify-center rounded-2xl bg-manikstu-cream p-8">
            <ShoppingBag className="h-24 w-24 text-manikstu-green/30" />
          </div>
        </PageHero>

        <section className="section-padding bg-white">
          <div className="mx-auto max-w-6xl">
            {loading ? (
              <div className="py-12 text-center text-grey">{t("loading")}</div>
            ) : products.length === 0 ? (
              <div className="py-12 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-manikstu-green/30" />
                <p className="mt-4 text-grey">{t("comingSoon")}</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-manikstu-green hover:text-manikstu-red transition-colors"
                >
                  {t("contactEnquiry")} <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group rounded-2xl border border-light-grey bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex h-40 items-center justify-center rounded-xl bg-manikstu-cream">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <ShoppingBag className="h-10 w-10 text-manikstu-green/30" />
                      )}
                    </div>
                    <div className="mt-4">
                      {product.category && (
                        <p className="text-xs font-semibold uppercase tracking-wider text-manikstu-green">
                          {product.category.name}
                        </p>
                      )}
                      <h2 className="mt-1 font-heading text-lg font-bold text-charcoal group-hover:text-manikstu-green transition-colors">
                        {product.name}
                      </h2>
                      <p className="mt-2 text-sm text-grey line-clamp-2">
                        {product.description}
                      </p>
                      <p className="mt-3 text-lg font-bold text-manikstu-green">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}