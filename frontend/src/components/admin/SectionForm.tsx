"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, ChevronDown, Languages, Loader2 } from "lucide-react";
import { getSection, TRANSLATION_LOCALES, type FieldDef } from "@/lib/admin/sections";
import type { AdminCategory, FormState } from "@/lib/admin/types";
import { ErrorSummary, Field, inputClass, Section, Toggle } from "./FormBits";
import ImageField from "./ImageField";
import RichTextEditor from "./RichTextEditor";

type Rec = Record<string, unknown>;
type Translation = { locale: string; title: string | null; excerpt: string | null; content: string | null };

type Props = {
  sectionKey: string;
  record?: Rec;
  /** Category options keyed by category type, for "category" fields. */
  categories?: Record<string, AdminCategory[]>;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  cancelHref: string;
};

function initialText(field: FieldDef, record?: Rec): string {
  const value = record?.[field.name];
  if (field.type === "lines") return Array.isArray(value) ? value.join("\n") : "";
  if (value === null || value === undefined) return !record && field.defaultValue !== undefined ? String(field.defaultValue) : "";
  return String(value);
}

function Input({ field, record, error, categories }: { field: FieldDef; record?: Rec; error?: string; categories?: Record<string, AdminCategory[]> }) {
  const type = field.type ?? "text";
  const common = { id: field.name, name: field.name, required: field.required, placeholder: field.placeholder };

  switch (type) {
    case "textarea":
    case "lines":
      return <textarea {...common} rows={field.rows ?? 4} defaultValue={initialText(field, record)} className={inputClass(error, true)} />;
    case "richtext":
      return <RichTextEditor id={field.name} name={field.name} defaultValue={initialText(field, record)} invalid={!!error} />;
    case "image":
      return (
        <ImageField
          name={field.name}
          existingPath={record?.[field.name] as string | null | undefined}
          existingUrl={record?.[`${field.name}_url`] as string | null | undefined}
          error={error}
        />
      );
    case "select":
      return (
        <select {...common} defaultValue={initialText(field, record)} className={inputClass(error)}>
          {!field.required && <option value="">— None —</option>}
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    case "category":
      return (
        <select {...common} defaultValue={initialText(field, record)} className={inputClass(error)}>
          <option value="">— None —</option>
          {(categories?.[field.categoryType ?? ""] ?? []).map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
              {c.is_active ? "" : " (inactive)"}
            </option>
          ))}
        </select>
      );
    case "password":
      return <input {...common} type="password" autoComplete="new-password" required={field.required && !record} className={inputClass(error)} />;
    default:
      return (
        <input
          {...common}
          type={type}
          min={field.min}
          max={field.max}
          step={field.step}
          defaultValue={initialText(field, record)}
          className={inputClass(error)}
        />
      );
  }
}

function Translations({ record }: { record?: Rec }) {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState(TRANSLATION_LOCALES[0].value);
  const existing = new Map(((record?.translations as Translation[] | undefined) ?? []).map((t) => [t.locale, t]));
  const done = TRANSLATION_LOCALES.filter((l) => existing.get(l.value)?.title).length;

  return (
    <Section
      title="Translations"
      action={
        <button type="button" onClick={() => setOpen((v) => !v)} className="flex items-center gap-1.5 text-xs font-semibold text-manikstu-leaf">
          <Languages className="h-4 w-4" />
          {done}/{TRANSLATION_LOCALES.length} languages
          <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
        </button>
      }
    >
      {!open ? (
        <p className="text-xs text-grey">Open to add the title, excerpt and content in other languages. Empty languages fall back to English on the website.</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-1.5">
            {TRANSLATION_LOCALES.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setLocale(l.value)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                  l.value === locale ? "bg-manikstu-green text-white" : existing.get(l.value)?.title ? "bg-manikstu-green/10 text-manikstu-leaf" : "bg-[#F2EEE4] text-grey hover:bg-[#E9E3D5]"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          {/* Every language stays mounted (just hidden) so all of them submit. */}
          {TRANSLATION_LOCALES.map((l) => {
            const t = existing.get(l.value);
            return (
              <div key={l.value} hidden={l.value !== locale} className="space-y-4">
                <Field label={`Title (${l.label})`} name={`title_${l.value}`}>
                  <input id={`title_${l.value}`} name={`title_${l.value}`} defaultValue={t?.title ?? ""} className={inputClass()} />
                </Field>
                <Field label={`Excerpt (${l.label})`} name={`excerpt_${l.value}`}>
                  <textarea id={`excerpt_${l.value}`} name={`excerpt_${l.value}`} rows={2} defaultValue={t?.excerpt ?? ""} className={inputClass(undefined, true)} />
                </Field>
                <Field label={`Content (${l.label})`} name={`content_${l.value}`}>
                  <textarea id={`content_${l.value}`} name={`content_${l.value}`} rows={6} defaultValue={t?.content ?? ""} className={inputClass(undefined, true)} />
                </Field>
              </div>
            );
          })}
        </>
      )}
    </Section>
  );
}

export default function SectionForm({ sectionKey, record, categories, action, cancelHref }: Props) {
  const section = getSection(sectionKey)!;
  const [state, formAction, pending] = useActionState(action, {});
  const errors = state.errors ?? {};
  const fields = section.fields.filter((f) => !(f.createOnly && record));
  const main = fields.filter((f) => !f.side);
  const side = fields.filter((f) => f.side);

  useEffect(() => {
    if (state.message) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // A transition rather than <form action>: React resets action forms after
    // they finish, which would wipe everything typed when validation fails.
    startTransition(() => formAction(formData));
  }

  const renderField = (field: FieldDef) =>
    field.type === "toggle" ? (
      <Toggle
        key={field.name}
        name={field.name}
        label={field.label}
        help={field.help}
        defaultChecked={record ? Boolean(record[field.name]) : Boolean(field.defaultValue)}
      />
    ) : (
      <Field key={field.name} label={field.required ? `${field.label} *` : field.label} name={field.name} error={errors[field.name]?.[0]} help={field.help}>
        <Input field={field} record={record} error={errors[field.name]?.[0]} categories={categories} />
      </Field>
    );

  return (
    <form onSubmit={onSubmit} noValidate>
      <ErrorSummary message={state.message} errors={errors} />
      <div className="grid items-start gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Section title="Details">{main.map(renderField)}</Section>
          {section.translations && <Translations record={record} />}
        </div>
        <div className="space-y-5 lg:sticky lg:top-6">
          <Section title={record ? "Save Changes" : `New ${section.singular}`}>
            {side.map(renderField)}
            <button
              type="submit"
              disabled={pending}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-manikstu-green to-manikstu-leaf text-sm font-semibold text-white shadow-md shadow-manikstu-leaf/20 transition hover:-translate-y-px disabled:cursor-wait disabled:opacity-70"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              {pending ? "Saving…" : record ? `Update ${section.singular}` : `Create ${section.singular}`}
            </button>
            <Link href={cancelHref} className="flex items-center justify-center gap-1.5 text-sm font-medium text-grey hover:text-manikstu-green">
              <ArrowLeft className="h-3.5 w-3.5" />
              Cancel
            </Link>
          </Section>
        </div>
      </div>
    </form>
  );
}
