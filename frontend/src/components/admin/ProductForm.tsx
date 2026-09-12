"use client";

import Link from "next/link";
import {
  startTransition, useActionState, useEffect, useRef, useState,
  type DragEvent, type FormEvent, type MouseEvent,
} from "react";
import { ArrowLeft, ImagePlus, Loader2, X } from "lucide-react";
import type { AdminCategory, AdminProduct, FormState, ProductImage } from "@/lib/admin/types";
import { Field, inputClass, Section, Toggle } from "./FormBits";

/** Exactly the rows the website's specification table renders. */
const SPEC_FIELDS: [label: string, placeholder: string][] = [
  ["Form", "e.g. Pellet / Powder / Liquid"],
  ["Packaging Type", "e.g. Bag / Bottle / Sachet"],
  ["Grade Standard", "e.g. Feed Grade / Food Grade"],
  ["Shelf Life", "e.g. 12 months"],
  ["Type Of Supplement", "e.g. Nutritional Supplement"],
  ["Packaging", "e.g. 500 ml / 25 kg"],
  ["Country of Origin", "e.g. Made in India"],
];

const SLOTS = [
  { key: "main", label: "Main Image", sub: "Shown first on the website" },
  { key: "angle1", label: "Angle View 1", sub: "Side / detail view" },
  { key: "angle2", label: "Angle View 2", sub: "Side / detail view" },
  { key: "angle3", label: "Angle View 3", sub: "Side / detail view" },
] as const;

/** Laravel's limit (images.* max:5120 KB). Checked here to fail fast. */
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

function ImageSlot({ slot, initial, error }: { slot: (typeof SLOTS)[number]; initial?: ProductImage; error?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrl = useRef<string | null>(null);
  const [existing, setExisting] = useState(initial?.path ?? "");
  const [preview, setPreview] = useState<string | null>(initial?.url ?? null);
  const [tooBig, setTooBig] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => () => {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
  }, []);

  function releasePreview() {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = null;
  }

  function showFile(file: File | undefined) {
    if (!file) return;
    releasePreview();
    objectUrl.current = URL.createObjectURL(file);
    setPreview(objectUrl.current);
    setTooBig(file.size > MAX_IMAGE_BYTES);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length && inputRef.current) {
      inputRef.current.files = files;
      showFile(files[0]);
    }
  }

  function clear(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = "";
    releasePreview();
    setExisting("");
    setPreview(null);
    setTooBig(false);
  }

  const isMain = slot.key === "main";
  const message = tooBig ? "Larger than 5MB — choose a smaller image." : error;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-bold text-grey">{slot.label}</span>
        {isMain && <span className="rounded bg-manikstu-green px-1.5 py-px text-[9px] font-bold uppercase tracking-wide text-white">Featured</span>}
      </div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`relative block aspect-square cursor-pointer overflow-hidden rounded-xl border-[1.5px] bg-[#FAF8F3] transition ${
          dragging || message ? "" : "hover:border-manikstu-green"
        } ${message ? "border-manikstu-red/60" : dragging ? "border-manikstu-green bg-manikstu-green/5" : isMain ? "border-manikstu-green/50" : "border-dashed border-[#D9D2C4]"}`}
      >
        <input
          ref={inputRef}
          type="file"
          name={`images[${slot.key}]`}
          accept="image/*"
          className="sr-only"
          onChange={(e) => showFile(e.target.files?.[0])}
        />
        <input type="hidden" name={`existing_images[${slot.key}]`} value={existing} readOnly />
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2 text-center">
            <ImagePlus className="h-6 w-6 text-manikstu-green" />
            <span className="text-xs font-semibold text-grey">Upload</span>
            <span className="text-[10px] leading-tight text-[#B0A98E]">{slot.sub}</span>
          </span>
        )}
        {preview && (
          <button
            type="button"
            onClick={clear}
            aria-label={`Remove ${slot.label}`}
            className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-white hover:bg-manikstu-red"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </label>
      {message && <p className="mt-1.5 text-xs font-medium text-manikstu-red">{message}</p>}
    </div>
  );
}

type Props = {
  product?: AdminProduct;
  categories: AdminCategory[];
  action: (state: FormState, formData: FormData) => Promise<FormState>;
};

export default function ProductForm({ product, categories, action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const [clientError, setClientError] = useState<string | null>(null);
  const errors = state.errors ?? {};
  const err = (name: string) => errors[name]?.[0];
  const specs = new Map((product?.specifications ?? []).map((s) => [s.label.toLowerCase(), s.value]));
  const summary = clientError ?? state.message;

  useEffect(() => {
    if (state.message) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const oversized = SLOTS.some(({ key }) => {
      const file = formData.get(`images[${key}]`);
      return file instanceof File && file.size > MAX_IMAGE_BYTES;
    });
    if (oversized) {
      setClientError("One of the images is larger than 5MB. Please choose a smaller file.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setClientError(null);
    // A transition rather than <form action>: React resets action forms after
    // they finish, which would wipe everything typed when validation fails.
    startTransition(() => formAction(formData));
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {summary && (
        <div role="alert" className="mb-5 rounded-xl border border-manikstu-red/20 bg-manikstu-red/5 px-4 py-3 text-sm text-manikstu-red">
          <p className="font-semibold">{summary}</p>
          {!clientError && Object.keys(errors).length > 0 && (
            <ul className="mt-1.5 list-disc space-y-0.5 pl-5">
              {Object.values(errors).flat().map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="grid items-start gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Section title="Basics">
            <Field label="Product Name *" name="name" error={err("name")}>
              <input id="name" name="name" defaultValue={product?.name} required className={inputClass(err("name"))} />
            </Field>
            <Field label="Slug" name="slug" error={err("slug")} help="Leave blank to generate it from the name.">
              <input id="slug" name="slug" defaultValue={product?.slug} className={inputClass(err("slug"))} />
            </Field>
            <Field label="Short Description" name="description" error={err("description")} help="One-line summary shown on product cards.">
              <textarea id="description" name="description" rows={2} defaultValue={product?.description ?? ""} className={inputClass(err("description"), true)} />
            </Field>
            <Field label="Full Description" name="long_description" error={err("long_description")} help="Shown on the product detail page.">
              <textarea id="long_description" name="long_description" rows={5} defaultValue={product?.long_description ?? ""} className={inputClass(err("long_description"), true)} />
            </Field>
          </Section>

          <Section title="Highlights & Details">
            <Field label="Highlights (why farmers choose it)" name="highlights" help="One highlight per line — shown as the bullet checklist.">
              <textarea id="highlights" name="highlights" rows={4} defaultValue={product?.highlights.join("\n")} className={inputClass(undefined, true)} />
            </Field>
            <Field label="Recommended For" name="recommended_for" help="One item per line.">
              <textarea id="recommended_for" name="recommended_for" rows={4} defaultValue={product?.recommended_for.join("\n")} className={inputClass(undefined, true)} />
            </Field>

            <div>
              <p className="mb-1.5 text-[13px] font-semibold text-[#3A3A3A]">Product Specifications</p>
              <p className="mb-2.5 text-xs text-grey">Only rows with a value appear on the website.</p>
              <div className="overflow-hidden rounded-xl border border-[#E8E2D6]">
                {SPEC_FIELDS.map(([label, placeholder]) => (
                  <div key={label} className="grid border-b border-[#EDE9E1] last:border-0 sm:grid-cols-[200px_1fr]">
                    <label htmlFor={`spec-${label}`} className="flex items-center bg-[#F5F1E6] px-3.5 py-2.5 text-[13px] font-semibold text-[#3A3A3A] sm:border-r sm:border-[#EDE9E1]">
                      {label}
                    </label>
                    <input
                      id={`spec-${label}`}
                      name={`specs[${label}]`}
                      defaultValue={specs.get(label.toLowerCase()) ?? ""}
                      placeholder={placeholder}
                      className="bg-white px-3.5 py-2.5 text-sm outline-none placeholder:italic placeholder:text-[#B5AC9A] focus:shadow-[inset_0_0_0_2px_rgba(74,140,63,0.2)]"
                    />
                  </div>
                ))}
              </div>
            </div>

            <Field label="Usage / Dosage" name="usage_instructions">
              <textarea id="usage_instructions" name="usage_instructions" rows={3} defaultValue={product?.usage_instructions ?? ""} className={inputClass(undefined, true)} />
            </Field>
            <Field label="Storage & Handling" name="storage_instructions">
              <textarea id="storage_instructions" name="storage_instructions" rows={3} defaultValue={product?.storage_instructions ?? ""} className={inputClass(undefined, true)} />
            </Field>
            <Field label="Composition / Ingredients" name="ingredients">
              <textarea id="ingredients" name="ingredients" rows={3} defaultValue={product?.ingredients ?? ""} className={inputClass(undefined, true)} />
            </Field>
          </Section>

          <Section title="Product Images">
            <p className="text-xs leading-relaxed text-grey">
              One <strong>Main Image</strong> (shown first on the website) and up to three angle views. Drop a file on a slot or click to pick one. JPG, PNG or
              WebP, up to 5MB each.
            </p>
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
              {SLOTS.map((slot, i) => (
                <ImageSlot key={slot.key} slot={slot} initial={product?.images[i]} error={err(`images.${slot.key}`)} />
              ))}
            </div>
          </Section>
        </div>

        <div className="space-y-5 lg:sticky lg:top-6">
          <Section title="Publish">
            <Toggle name="is_active" label="Published" help="On = live on the website. Off = draft." defaultChecked={product?.is_active ?? true} />
            <Toggle name="is_featured" label="Featured" defaultChecked={product?.is_featured ?? false} />
            <button
              type="submit"
              disabled={pending}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-manikstu-green to-manikstu-leaf text-sm font-semibold text-white shadow-md shadow-manikstu-leaf/20 transition hover:-translate-y-px disabled:cursor-wait disabled:opacity-70"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              {pending ? "Saving…" : product ? "Update Product" : "Create Product"}
            </button>
            <Link
              href={product ? `/admin/products/${product.id}` : "/admin/products"}
              className="flex items-center justify-center gap-1.5 text-sm font-medium text-grey hover:text-manikstu-green"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Cancel
            </Link>
          </Section>

          <Section title="Organisation">
            <Field label="Category" name="category_id" error={err("category_id")}>
              <select id="category_id" name="category_id" defaultValue={product?.category_id ?? ""} className={inputClass(err("category_id"))}>
                <option value="">— None —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                    {c.is_active ? "" : " (inactive)"}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Order" name="order" error={err("order")} help="Lower numbers show first.">
              <input id="order" name="order" type="number" step={1} defaultValue={product?.order ?? 0} className={inputClass(err("order"))} />
            </Field>
          </Section>

          <Section title="Pricing & Stock">
            <Field label="Price (₹)" name="price" error={err("price")}>
              <input id="price" name="price" type="number" min={0} step="0.01" defaultValue={product?.price ?? ""} className={inputClass(err("price"))} />
            </Field>
            <Field label="Size / Unit" name="size" error={err("size")} help="Shown as “per 25 kg” next to the price.">
              <input id="size" name="size" defaultValue={product?.size ?? ""} placeholder="e.g. 25 kg" className={inputClass(err("size"))} />
            </Field>
            <Field label="SKU / Product ID" name="sku" error={err("sku")}>
              <input id="sku" name="sku" defaultValue={product?.sku ?? ""} className={inputClass(err("sku"))} />
            </Field>
            <Field label="Stock Quantity" name="stock_quantity" error={err("stock_quantity")}>
              <input id="stock_quantity" name="stock_quantity" type="number" min={0} step={1} defaultValue={product?.stock_quantity ?? 0} className={inputClass(err("stock_quantity"))} />
            </Field>
          </Section>

          <Section title="Ratings">
            <Field label="Rating (0–5)" name="rating" error={err("rating")}>
              <input id="rating" name="rating" type="number" min={0} max={5} step="0.1" defaultValue={product?.rating ?? ""} placeholder="e.g. 4.5" className={inputClass(err("rating"))} />
            </Field>
            <Field label="Ratings Count" name="rating_count" error={err("rating_count")}>
              <input id="rating_count" name="rating_count" type="number" min={0} step={1} defaultValue={product?.rating_count ?? 0} className={inputClass(err("rating_count"))} />
            </Field>
          </Section>
        </div>
      </div>
    </form>
  );
}
