"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { addToCart as addToCartStore } from "../cart";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  Star,
  ThumbsUp,
  BadgeCheck,
  MessageCircleQuestion,
  X,
} from "lucide-react";
import { getProducts, getProductBySlug } from "@/lib/api";
import {
  trustFeatures,
  type Product,
  type Review,
  type Question,
} from "../data";

function StarRow({
  value,
  size = "sm",
  className = "",
}: {
  value: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dim =
    size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = value >= i;
        const half = !filled && value >= i - 0.5;
        return (
          <span key={i} className="relative inline-block">
            <Star
              className={`${dim} text-manikstu-gold/30`}
              strokeWidth={1.5}
            />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? "50%" : "100%" }}
              >
                <Star
                  className={`${dim} text-manikstu-gold`}
                  fill="currentColor"
                  strokeWidth={1.5}
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params?.slug ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeIdx, setActiveIdx] = useState(0);
  // Bumps whenever autoplay ticks or the user clicks a thumb, so the interval
  // restarts and the main <img> re-mounts (triggering the fade animation).
  const [autoplayNonce, setAutoplayNonce] = useState(0);

  const handleAddToCart = () => {
    if (!product) return;
    addToCartStore(product.id, qty);
    // Take the farmer to the cart on the listing page
    router.push("/products#cart");
  };

  // Write-a-review form state (client-only, no backend)
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [formRating, setFormRating] = useState(0);
  const [formHoverRating, setFormHoverRating] = useState(0);
  const [formName, setFormName] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");
  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [helpfulMarks, setHelpfulMarks] = useState<Record<number, boolean>>({});

  const toggleHelpful = (reviewId: number) =>
    setHelpfulMarks((m) => ({ ...m, [reviewId]: !m[reviewId] }));

  // Ask-a-Question modal state
  const [askOpen, setAskOpen] = useState(false);
  const [askName, setAskName] = useState("");
  const [askText, setAskText] = useState("");
  const [askSubmitted, setAskSubmitted] = useState(false);
  const [userQuestions, setUserQuestions] = useState<Question[]>([]);

  const closeAskModal = () => {
    setAskOpen(false);
    setAskSubmitted(false);
    setAskName("");
    setAskText("");
  };

  const submitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askName.trim() || !askText.trim()) return;
    const q: Question = {
      id: Date.now(),
      asker: askName.trim(),
      askedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      question: askText.trim(),
    };
    setUserQuestions((prev) => [q, ...prev]);
    setAskSubmitted(true);
    setAskName("");
    setAskText("");
    setTimeout(() => {
      closeAskModal();
    }, 1600);
  };

  useEffect(() => {
    if (!askOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAskModal();
    };
    document.addEventListener("keydown", onKey);
    // Lock scroll while modal open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [askOpen]);

  const resetForm = () => {
    setFormRating(0);
    setFormHoverRating(0);
    setFormName("");
    setFormLocation("");
    setFormTitle("");
    setFormBody("");
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRating || !formName.trim() || !formBody.trim()) return;
    const newReview = {
      id: Date.now(),
      author: formName.trim(),
      location: formLocation.trim() || undefined,
      rating: formRating,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      title: formTitle.trim() || undefined,
      body: formBody.trim(),
      verified: false,
      helpful: 0,
    };
    setUserReviews((prev) => [newReview, ...prev]);
    setSubmitted(true);
    resetForm();
    setTimeout(() => {
      setSubmitted(false);
      setReviewFormOpen(false);
    }, 1600);
  };

  // Fetch the product by slug (single source of truth: backend admin panel).
  // Also fetch the full listing so we can compute related products.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      slug
        ? getProductBySlug(slug).catch(() => null)
        : Promise.resolve(null),
      getProducts(1, 50).catch(() => null),
    ]).then(([detailRes, listRes]) => {
      if (cancelled) return;
      // Detail endpoint returns { data: {...} }, list returns { data: [...] }
      const detail: Product | null =
        detailRes && (detailRes.data as Product | undefined)
          ? (detailRes.data as Product)
          : null;
      const list: Product[] = Array.isArray(listRes?.data) ? listRes.data : [];
      setProduct(detail);
      setProducts(list);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const related = useMemo(
    () => products.filter((p) => p.slug !== slug).slice(0, 3),
    [products, slug]
  );

  // Effective gallery source for THIS product (memoized).
  const gallery = useMemo(() => {
    if (!product) return [] as string[];
    if (product.gallery && product.gallery.length > 0) return product.gallery;
    if (product.image) return [product.image];
    return [];
  }, [product]);

  // When the product changes, reset the active image to the first slide.
  useEffect(() => {
    setActiveIdx(0);
    setAutoplayNonce((n) => n + 1);
  }, [product]);

  // Autoplay: cycle every 3s. Restarts whenever autoplayNonce changes (product
  // change, manual thumb click, or a natural tick). Skipped when the user
  // prefers reduced motion or the gallery has ≤1 image.
  useEffect(() => {
    if (gallery.length <= 1) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % gallery.length);
      setAutoplayNonce((n) => n + 1);
    }, 3000);
    return () => window.clearInterval(id);
  }, [gallery.length, autoplayNonce]);

  const activeImage = gallery[activeIdx] ?? null;
  const goToImage = (idx: number) => {
    setActiveIdx(idx);
    // Restart autoplay from THIS image
    setAutoplayNonce((n) => n + 1);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main
          id="main-content"
          className="mx-auto max-w-3xl px-4 py-24 text-center text-grey sm:px-6 md:px-8"
        >
          Loading product…
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main
          id="main-content"
          className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 md:px-8"
        >
          <ShoppingBag className="mx-auto h-12 w-12 text-manikstu-green/30" />
          <h1 className="mt-4 font-heading text-2xl font-bold text-charcoal">
            Product not found
          </h1>
          <p className="mt-2 text-grey">
            The product you&apos;re looking for isn&apos;t available right now.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-manikstu-green px-5 py-2.5 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to products
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const lineTotal = Number(product.price) * qty;

  return (
    <>
      <Header />
      <main id="main-content" className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 md:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-grey dark:text-gray-300"
          >
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:text-manikstu-green">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/products" className="hover:text-manikstu-green">
                  Products
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-semibold text-charcoal dark:text-white line-clamp-1">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>

        {/* Detail */}
        <section className="mx-auto max-w-7xl px-4 pt-6 pb-14 sm:px-6 sm:pb-16 md:px-8 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Left — image + details */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-manikstu-gold/20 bg-manikstu-cream shadow-sm">
                {activeImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`${activeImage}-${activeIdx}`}
                    src={activeImage}
                    alt={product.name}
                    className="animate-gallery-fade absolute inset-0 h-full w-full object-contain p-8"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="h-24 w-24 text-manikstu-green/30" />
                  </div>
                )}

                {/* Slide indicator dots — visible only when >1 image */}
                {gallery.length > 1 && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
                    {gallery.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goToImage(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={
                          "h-1.5 rounded-full transition-all " +
                          (i === activeIdx
                            ? "w-6 bg-manikstu-green"
                            : "w-1.5 bg-manikstu-green/40 hover:bg-manikstu-green/70")
                        }
                      />
                    ))}
                  </div>
                )}
                {product.size && (
                  <span className="absolute bottom-4 left-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-charcoal shadow-sm">
                    {product.size}
                  </span>
                )}
              </div>

              {/* Image gallery thumbnails — click to swap the main image */}
              {(() => {
                // Always render 4 slots so the strip looks complete
                const slots = Array.from({ length: 4 }, (_, i) => gallery[i] ?? null);
                return (
                  <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
                    {slots.map((src, i) => {
                      const isActive = !!src && i === activeIdx;
                      const isPlaceholder = !src;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => !isPlaceholder && goToImage(i)}
                          disabled={isPlaceholder}
                          aria-label={`View image ${i + 1}`}
                          aria-pressed={isActive}
                          className={
                            "relative aspect-square overflow-hidden rounded-xl border bg-manikstu-cream/60 transition-all duration-300 " +
                            (isPlaceholder
                              ? "cursor-default border-light-grey/60 opacity-70 dark:border-gray-700"
                              : isActive
                              ? "border-manikstu-green ring-2 ring-manikstu-green/40 shadow-sm"
                              : "border-manikstu-gold/20 hover:border-manikstu-green/50 hover:shadow-sm")
                          }
                        >
                          {src ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={src}
                              alt=""
                              className={
                                "absolute inset-0 h-full w-full object-contain p-2 transition-opacity duration-300 " +
                                (isActive ? "opacity-100" : "opacity-90")
                              }
                            />
                          ) : (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <ShoppingBag className="h-5 w-5 text-manikstu-green/20" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Right — info */}
            <div>
              {product.category && (
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-manikstu-green">
                  {product.category.name}
                </p>
              )}
              <h1 className="mt-2 font-heading text-3xl font-bold leading-tight text-charcoal dark:text-white sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              {/* Rating strip (Flipkart-style: score chip + review count) */}
              {product.rating !== undefined && (() => {
                const baseC = product.ratingCount ?? 0;
                const stripCount = baseC + userReviews.length;
                const stripSumUsers = userReviews.reduce(
                  (s, r) => s + r.rating,
                  0
                );
                const stripRating =
                  stripCount > 0
                    ? ((product.rating ?? 0) * baseC + stripSumUsers) /
                      stripCount
                    : product.rating ?? 0;
                const reviewsShown =
                  (product.reviews ?? []).length +
                  userReviews.length;
                return (
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1 rounded-md bg-manikstu-green px-2 py-0.5 text-sm font-bold text-white">
                      {stripRating.toFixed(1)}
                      <Star className="h-3 w-3" fill="currentColor" strokeWidth={1.5} />
                    </span>
                    <StarRow value={stripRating} size="md" />
                    <a
                      href="#reviews"
                      className="text-sm font-semibold text-grey hover:text-manikstu-green transition-colors dark:text-gray-300"
                    >
                      {stripCount.toLocaleString("en-IN")} Ratings
                      {" & "}
                      {reviewsShown} Reviews
                    </a>
                  </div>
                );
              })()}

              <p className="mt-4 text-base leading-relaxed text-grey dark:text-gray-300">
                {product.longDescription ?? product.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3">
                <p className="font-heading text-3xl font-bold text-manikstu-green">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>
                {product.size && (
                  <span className="text-sm text-grey dark:text-gray-300">
                    per {product.size}
                  </span>
                )}
              </div>

              {/* Qty + Add to Cart + Buy Now */}
              <div className="mt-6 w-fit max-w-full">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="inline-flex items-center gap-1 rounded-full border border-manikstu-green/60 bg-white text-sm font-semibold text-manikstu-green dark:bg-gray-800">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-manikstu-green/10"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[1.5rem] text-center tabular-nums">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-manikstu-green/10"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex items-center gap-2 rounded-full bg-manikstu-green px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add {qty > 1 ? `${qty} ` : ""}to Cart
                  </button>
                </div>

                {/* Buy Now — matches the width of the row above */}
                <Link
                  href="/contact"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-manikstu-red px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-saura-red focus:outline-none focus:ring-2 focus:ring-manikstu-red focus:ring-offset-2"
                >
                  <ArrowRight className="h-4 w-4" />
                  Buy Now
                </Link>
              </div>

              {/* Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <div className="mt-8 rounded-2xl border border-light-grey/70 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal dark:text-white">
                    Why farmers choose it
                  </h2>
                  <ul className="mt-3 space-y-2.5">
                    {product.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-manikstu-green/10">
                          <Check className="h-3 w-3 text-manikstu-green" />
                        </span>
                        <span className="text-sm text-grey dark:text-gray-300">
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Trust badges — compact */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {trustFeatures.slice(0, 3).map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.title}
                      className="flex items-center gap-2 rounded-lg border border-light-grey/70 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-manikstu-green" />
                      <span className="text-[11px] font-semibold text-charcoal dark:text-white">
                        {f.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Product Specifications + Product Description */}
        {(product.specifications?.length ||
          product.longDescription ||
          product.highlights?.length ||
          product.usage ||
          product.storage ||
          product.ingredients ||
          product.recommendedFor?.length) && (
          <section
            aria-labelledby="product-details-heading"
            className="mx-auto max-w-7xl border-t border-light-grey/70 px-4 py-12 sm:px-6 md:px-8 dark:border-gray-700"
          >
            <h2 id="product-details-heading" className="sr-only">
              Product details
            </h2>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-stretch">
              {/* Left — Specifications */}
              {product.specifications && product.specifications.length > 0 ? (
                <div className="flex h-full flex-col">
                  <h3 className="font-heading text-lg font-bold text-manikstu-green">
                    Product Specifications
                  </h3>
                  <div className="mt-3 overflow-hidden rounded-lg border border-light-grey/80 dark:border-gray-700">
                    <table className="w-full border-collapse text-sm">
                      <tbody>
                        {product.specifications.map((s, i) => (
                          <tr
                            key={s.label}
                            className={
                              i > 0
                                ? "border-t border-light-grey/70 dark:border-gray-700"
                                : ""
                            }
                          >
                            <th
                              scope="row"
                              className="w-1/2 border-r border-light-grey/70 px-4 py-3 text-left font-normal text-charcoal dark:border-gray-700 dark:text-gray-200"
                            >
                              {s.label}
                            </th>
                            <td className="px-4 py-3 text-charcoal dark:text-gray-100">
                              {s.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {product.ingredients && (
                    <div className="mt-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-white">
                        Composition
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-grey dark:text-gray-300">
                        {product.ingredients}
                      </p>
                    </div>
                  )}

                  {product.storage && (
                    <div className="mt-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-white">
                        Storage &amp; handling
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-grey dark:text-gray-300">
                        {product.storage}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div />
              )}

              {/* Right — Product Description */}
              <div className="flex h-full flex-col rounded-2xl border border-light-grey/70 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="font-heading text-2xl font-bold text-manikstu-green">
                  Product Description
                </h3>

                {(product.longDescription || product.description) && (
                  <p className="mt-3 text-sm leading-relaxed text-charcoal dark:text-gray-200 sm:text-base">
                    {product.longDescription ?? product.description}
                  </p>
                )}

                {product.highlights && product.highlights.length > 0 && (
                  <>
                    <p className="mt-6 font-bold text-charcoal dark:text-white">
                      Key Features:
                    </p>
                    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-charcoal dark:text-gray-200 sm:text-base">
                      {product.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </>
                )}

                {product.recommendedFor && product.recommendedFor.length > 0 && (
                  <>
                    <p className="mt-6 font-bold text-charcoal dark:text-white">
                      Recommended For:
                    </p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-charcoal dark:text-gray-200 sm:text-base">
                      {product.recommendedFor.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </>
                )}

                {product.usage && (
                  <p className="mt-6 text-sm leading-relaxed text-charcoal dark:text-gray-200 sm:text-base">
                    <span className="font-bold">Dosage:</span> {product.usage}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Ratings, Reviews & Q&A */}
        {(() => {
          const baseReviews = product.reviews ?? [];
          const reviews = [...userReviews, ...baseReviews];
          const baseQuestions = product.questions ?? [];
          const questions = [...userQuestions, ...baseQuestions];

          // Live-update rating count, breakdown and average as reviews come in.
          const baseCount = product.ratingCount ?? 0;
          const baseBreakdown = product.ratingBreakdown ?? [0, 0, 0, 0, 0];
          const breakdown = [...baseBreakdown] as [
            number,
            number,
            number,
            number,
            number,
          ];
          for (const ur of userReviews) {
            const idx = 5 - Math.max(1, Math.min(5, Math.round(ur.rating)));
            breakdown[idx] += 1;
          }
          const totalRatings = baseCount + userReviews.length;
          // Weighted average: keep the base average * baseCount as prior mass, then add each user rating.
          const baseRating = product.rating ?? 0;
          const sumFromUsers = userReviews.reduce(
            (s, r) => s + r.rating,
            0
          );
          const liveRating =
            totalRatings > 0
              ? (baseRating * baseCount + sumFromUsers) / totalRatings
              : baseRating;
          return (
            <section
              id="reviews"
              className="mx-auto max-w-7xl scroll-mt-6 border-t border-light-grey/70 px-4 py-14 sm:px-6 md:px-8 dark:border-gray-700"
            >
              <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr]">
                {/* Left — summary card */}
                <aside>
                  <h2 className="font-heading text-2xl font-bold text-charcoal dark:text-white">
                    Ratings &amp; Reviews
                  </h2>

                  <div className="mt-4 rounded-2xl border border-light-grey/70 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading text-5xl font-bold text-charcoal dark:text-white">
                        {liveRating.toFixed(1)}
                      </span>
                      <Star
                        className="h-6 w-6 text-manikstu-gold"
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="mt-1 text-xs text-grey dark:text-gray-300">
                      Based on {totalRatings.toLocaleString("en-IN")} ratings
                      &amp; {reviews.length} reviews
                    </p>

                    {/* Distribution bars */}
                    <div className="mt-4 space-y-1.5">
                      {breakdown.map((count, i) => {
                        const stars = 5 - i;
                        const pct =
                          totalRatings > 0
                            ? Math.round((count / totalRatings) * 100)
                            : 0;
                        return (
                          <div
                            key={stars}
                            className="grid grid-cols-[2.5rem_1fr_3rem] items-center gap-2 text-xs"
                          >
                            <span className="inline-flex items-center gap-0.5 text-charcoal dark:text-gray-200">
                              {stars}
                              <Star
                                className="h-3 w-3 text-manikstu-gold"
                                fill="currentColor"
                                strokeWidth={1.5}
                              />
                            </span>
                            <div className="h-1.5 overflow-hidden rounded-full bg-light-grey/70 dark:bg-gray-700">
                              <div
                                className={
                                  stars >= 4
                                    ? "h-full bg-manikstu-green"
                                    : stars === 3
                                    ? "h-full bg-manikstu-gold"
                                    : "h-full bg-manikstu-red"
                                }
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-right tabular-nums text-grey dark:text-gray-300">
                              {count.toLocaleString("en-IN")}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setReviewFormOpen((v) => !v)}
                      aria-expanded={reviewFormOpen}
                      aria-controls="write-review-form"
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-manikstu-green px-4 py-2.5 text-sm font-semibold text-manikstu-green transition-colors hover:bg-manikstu-green hover:text-white focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-1"
                    >
                      <Star className="h-4 w-4" />
                      {reviewFormOpen ? "Cancel" : "Write a Review"}
                    </button>
                  </div>

                  {/* Write a Review form — expands under the summary card */}
                  {reviewFormOpen && (
                    <form
                      id="write-review-form"
                      onSubmit={submitReview}
                      className="mt-4 rounded-2xl border border-manikstu-gold/40 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
                    >
                      <h3 className="font-heading text-base font-bold text-charcoal dark:text-white">
                        Share your experience
                      </h3>
                      <p className="mt-1 text-xs text-grey dark:text-gray-300">
                        Help other farmers by rating and reviewing this product.
                      </p>

                      {/* Star picker */}
                      <div className="mt-4">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-gray-200">
                          Your rating <span className="text-manikstu-red">*</span>
                        </label>
                        <div
                          className="mt-2 flex items-center gap-1"
                          onMouseLeave={() => setFormHoverRating(0)}
                        >
                          {[1, 2, 3, 4, 5].map((i) => {
                            const active = (formHoverRating || formRating) >= i;
                            return (
                              <button
                                key={i}
                                type="button"
                                aria-label={`${i} star${i > 1 ? "s" : ""}`}
                                onMouseEnter={() => setFormHoverRating(i)}
                                onClick={() => setFormRating(i)}
                                className="rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-manikstu-green"
                              >
                                <Star
                                  className={`h-6 w-6 ${
                                    active
                                      ? "text-manikstu-gold"
                                      : "text-manikstu-gold/30"
                                  }`}
                                  fill={active ? "currentColor" : "none"}
                                  strokeWidth={1.5}
                                />
                              </button>
                            );
                          })}
                          {formRating > 0 && (
                            <span className="ml-2 text-xs font-semibold text-charcoal dark:text-white">
                              {formRating}.0
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Name */}
                      <div className="mt-4">
                        <label
                          htmlFor="review-name"
                          className="block text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-gray-200"
                        >
                          Your name <span className="text-manikstu-red">*</span>
                        </label>
                        <input
                          id="review-name"
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="e.g. Ramesh Pradhan"
                          className="mt-1 w-full rounded-lg border border-light-grey bg-white px-3 py-2 text-sm text-charcoal placeholder:text-grey/60 focus:border-manikstu-green focus:outline-none focus:ring-1 focus:ring-manikstu-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      {/* Location */}
                      <div className="mt-3">
                        <label
                          htmlFor="review-location"
                          className="block text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-gray-200"
                        >
                          Location <span className="text-grey">(optional)</span>
                        </label>
                        <input
                          id="review-location"
                          type="text"
                          value={formLocation}
                          onChange={(e) => setFormLocation(e.target.value)}
                          placeholder="e.g. Mayurbhanj, Odisha"
                          maxLength={80}
                          className="mt-1 w-full rounded-lg border border-light-grey bg-white px-3 py-2 text-sm text-charcoal placeholder:text-grey/60 focus:border-manikstu-green focus:outline-none focus:ring-1 focus:ring-manikstu-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      {/* Title */}
                      <div className="mt-3">
                        <label
                          htmlFor="review-title"
                          className="block text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-gray-200"
                        >
                          Headline <span className="text-grey">(optional)</span>
                        </label>
                        <input
                          id="review-title"
                          type="text"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder="Sum up your review in a line"
                          maxLength={80}
                          className="mt-1 w-full rounded-lg border border-light-grey bg-white px-3 py-2 text-sm text-charcoal placeholder:text-grey/60 focus:border-manikstu-green focus:outline-none focus:ring-1 focus:ring-manikstu-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      {/* Body */}
                      <div className="mt-3">
                        <label
                          htmlFor="review-body"
                          className="block text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-gray-200"
                        >
                          Your review <span className="text-manikstu-red">*</span>
                        </label>
                        <textarea
                          id="review-body"
                          required
                          rows={4}
                          value={formBody}
                          onChange={(e) => setFormBody(e.target.value)}
                          placeholder="Tell others what worked (or didn't) for you and your herd."
                          className="mt-1 w-full resize-y rounded-lg border border-light-grey bg-white px-3 py-2 text-sm text-charcoal placeholder:text-grey/60 focus:border-manikstu-green focus:outline-none focus:ring-1 focus:ring-manikstu-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                        <p className="mt-1 text-[10px] text-grey">
                          {formBody.length}/1000
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-3">
                        <button
                          type="submit"
                          disabled={
                            !formRating || !formName.trim() || !formBody.trim()
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-manikstu-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Check className="h-4 w-4" /> Submit Review
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setReviewFormOpen(false);
                            resetForm();
                          }}
                          className="text-xs font-semibold text-grey hover:text-manikstu-red transition-colors"
                        >
                          Cancel
                        </button>
                      </div>

                      {submitted && (
                        <p
                          role="status"
                          className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-manikstu-green/10 px-2.5 py-1.5 text-xs font-semibold text-manikstu-green"
                        >
                          <BadgeCheck className="h-3.5 w-3.5" />
                          Thanks! Your review has been posted.
                        </p>
                      )}
                    </form>
                  )}
                </aside>

                {/* Right — reviews list */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-heading text-lg font-bold text-charcoal dark:text-white">
                      Latest reviews
                    </h3>
                    <span className="text-xs text-grey dark:text-gray-300">
                      Sorted by most helpful
                    </span>
                  </div>

                  <ul className="mt-4 space-y-6">
                    {reviews.map((r) => (
                      <li
                        key={r.id}
                        className="rounded-2xl border border-light-grey/70 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-md bg-manikstu-green px-1.5 py-0.5 text-xs font-bold text-white">
                            {r.rating}
                            <Star
                              className="h-2.5 w-2.5"
                              fill="currentColor"
                              strokeWidth={1.5}
                            />
                          </span>
                          {r.title && (
                            <p className="font-heading text-sm font-bold text-charcoal dark:text-white">
                              {r.title}
                            </p>
                          )}
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-charcoal dark:text-gray-200">
                          {r.body}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-grey dark:text-gray-300">
                          <span className="font-semibold text-charcoal dark:text-white">
                            {r.author}
                          </span>
                          {r.location && (
                            <>
                              <span aria-hidden>·</span>
                              <span>{r.location}</span>
                            </>
                          )}
                          {r.verified && (
                            <span className="inline-flex items-center gap-1 text-manikstu-green">
                              <BadgeCheck className="h-3.5 w-3.5" />
                              Verified purchase
                            </span>
                          )}
                          <span aria-hidden>·</span>
                          <span>{r.date}</span>
                          <span aria-hidden className="ml-auto" />
                          {(() => {
                            const marked = !!helpfulMarks[r.id];
                            const count = (r.helpful ?? 0) + (marked ? 1 : 0);
                            return (
                              <button
                                type="button"
                                onClick={() => toggleHelpful(r.id)}
                                aria-pressed={marked}
                                aria-label={
                                  marked
                                    ? "Unmark as helpful"
                                    : "Mark as helpful"
                                }
                                className={
                                  "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 transition-colors " +
                                  (marked
                                    ? "border-manikstu-green bg-manikstu-green/10 text-manikstu-green"
                                    : "border-light-grey/70 hover:border-manikstu-green hover:text-manikstu-green dark:border-gray-600")
                                }
                              >
                                <ThumbsUp
                                  className="h-3 w-3"
                                  fill={marked ? "currentColor" : "none"}
                                  strokeWidth={1.5}
                                />
                                {marked ? "Marked helpful" : "Helpful"}
                                {count > 0 && (
                                  <span className="tabular-nums">
                                    {" "}
                                    ({count})
                                  </span>
                                )}
                              </button>
                            );
                          })()}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-manikstu-green hover:text-manikstu-leaf"
                  >
                    Show all {reviews.length} reviews{" "}
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {/* Q&A */}
                  <div className="mt-12">
                    <div className="flex items-end justify-between gap-3">
                      <h3 className="font-heading text-lg font-bold text-charcoal dark:text-white">
                        Questions &amp; Answers
                      </h3>
                      <button
                        type="button"
                        onClick={() => setAskOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-manikstu-green px-3 py-1.5 text-xs font-semibold text-manikstu-green hover:bg-manikstu-green hover:text-white transition-colors"
                      >
                        <MessageCircleQuestion className="h-3.5 w-3.5" />
                        Ask a Question
                      </button>
                    </div>

                    <ul className="mt-4 space-y-4">
                      {questions.map((q) => (
                        <li
                          key={q.id}
                          className="rounded-2xl border border-light-grey/70 bg-white p-5 dark:border-gray-700 dark:bg-gray-800"
                        >
                          <div className="flex items-start gap-2">
                            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-manikstu-cream text-[10px] font-bold text-manikstu-green">
                              Q
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-charcoal dark:text-white">
                                {q.question}
                              </p>
                              <p className="mt-1 text-[11px] text-grey dark:text-gray-300">
                                Asked by {q.asker} · {q.askedAt}
                              </p>
                            </div>
                          </div>

                          {q.answer && (
                            <div className="mt-3 flex items-start gap-2 rounded-xl bg-manikstu-cream/40 p-3 dark:bg-gray-700/50">
                              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-manikstu-green text-[10px] font-bold text-white">
                                A
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm leading-relaxed text-charcoal dark:text-gray-200">
                                  {q.answer}
                                </p>
                                <p className="mt-1 text-[11px] text-grey dark:text-gray-300">
                                  Answered by{" "}
                                  <span className="font-semibold text-manikstu-green">
                                    {q.answerer}
                                  </span>
                                  {q.answeredAt && ` · ${q.answeredAt}`}
                                </p>
                              </div>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-manikstu-green hover:text-manikstu-leaf"
                    >
                      See all questions <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })()}

        {/* Related products */}
        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-heading text-2xl font-bold text-charcoal dark:text-white sm:text-3xl">
                You may also like
              </h2>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-manikstu-green hover:text-manikstu-leaf"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="group flex items-start gap-3 rounded-2xl border border-manikstu-gold/20 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
                >
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-manikstu-cream">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.image}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <ShoppingBag className="h-6 w-6 text-manikstu-green/40" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-sm font-bold text-charcoal group-hover:text-manikstu-green transition-colors dark:text-white line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs text-grey dark:text-gray-300 line-clamp-2">
                      {p.description}
                    </p>
                    <p className="mt-2 text-sm font-bold text-manikstu-green">
                      ₹{Number(p.price).toLocaleString("en-IN")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Ask a Question modal */}
      {askOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ask-modal-title"
          className="fixed inset-0 z-[100] flex items-end justify-center px-4 py-4 sm:items-center sm:py-8"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={closeAskModal}
            className="absolute inset-0 h-full w-full cursor-default bg-black/50 backdrop-blur-sm"
          />

          {/* Card */}
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-manikstu-gold/30 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-start justify-between gap-3 border-b border-light-grey/70 px-5 py-4 dark:border-gray-700">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-manikstu-green/10">
                  <MessageCircleQuestion className="h-4 w-4 text-manikstu-green" />
                </span>
                <div>
                  <h3
                    id="ask-modal-title"
                    className="font-heading text-base font-bold text-charcoal dark:text-white"
                  >
                    Ask a Question
                  </h3>
                  <p className="text-[11px] text-grey dark:text-gray-300 line-clamp-1">
                    About {product.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeAskModal}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-grey hover:bg-manikstu-red/10 hover:text-manikstu-red transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submitQuestion} className="px-5 py-5">
              <label
                htmlFor="ask-name"
                className="block text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-gray-200"
              >
                Your name <span className="text-manikstu-red">*</span>
              </label>
              <input
                id="ask-name"
                type="text"
                required
                value={askName}
                onChange={(e) => setAskName(e.target.value)}
                placeholder="e.g. Ramesh Pradhan"
                className="mt-1 w-full rounded-lg border border-light-grey bg-white px-3 py-2 text-sm text-charcoal placeholder:text-grey/60 focus:border-manikstu-green focus:outline-none focus:ring-1 focus:ring-manikstu-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />

              <label
                htmlFor="ask-text"
                className="mt-4 block text-xs font-semibold uppercase tracking-wider text-charcoal dark:text-gray-200"
              >
                Your question <span className="text-manikstu-red">*</span>
              </label>
              <textarea
                id="ask-text"
                required
                rows={4}
                value={askText}
                onChange={(e) => setAskText(e.target.value)}
                placeholder="Ask anything about this product — dosage, safety, delivery, use cases…"
                maxLength={500}
                className="mt-1 w-full resize-y rounded-lg border border-light-grey bg-white px-3 py-2 text-sm text-charcoal placeholder:text-grey/60 focus:border-manikstu-green focus:outline-none focus:ring-1 focus:ring-manikstu-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
              <p className="mt-1 text-[10px] text-grey">
                {askText.length}/500 · Manikstu Support usually replies within a
                day.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={!askName.trim() || !askText.trim()}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-manikstu-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-manikstu-leaf focus:outline-none focus:ring-2 focus:ring-manikstu-green focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Check className="h-4 w-4" /> Post Question
                </button>
                <button
                  type="button"
                  onClick={closeAskModal}
                  className="text-xs font-semibold text-grey hover:text-manikstu-red transition-colors"
                >
                  Cancel
                </button>
              </div>

              {askSubmitted && (
                <p
                  role="status"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-manikstu-green/10 px-2.5 py-1.5 text-xs font-semibold text-manikstu-green"
                >
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Question posted — we&apos;ll get back with an answer soon.
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
