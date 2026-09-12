"use client";

import { startTransition, useActionState, useState, type FormEvent } from "react";
import { Check, ChevronDown, Languages, Loader2 } from "lucide-react";
import { TRANSLATION_LOCALES } from "@/lib/admin/sections";
import type { PageDetail } from "@/lib/admin/pages";
import type { FormState } from "@/lib/admin/types";
import { ErrorSummary, Field, inputClass, Section, Toggle } from "./FormBits";

type Props = {
  page: PageDetail;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
};

export default function PageSettingsForm({ page, action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState(TRANSLATION_LOCALES[0].value);
  const errors = state.errors ?? {};
  const existing = new Map(page.translations.map((t) => [t.locale, t]));

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Section title="Page Settings">
        {state.ok ? (
          <p role="status" className="flex items-center gap-2 rounded-xl border border-manikstu-green/20 bg-manikstu-green/5 px-4 py-3 text-sm font-medium text-manikstu-leaf">
            <Check className="h-4 w-4" /> {state.message}
          </p>
        ) : (
          <ErrorSummary message={state.message} errors={errors} />
        )}
        <Field label="Title *" name="title" error={errors.title?.[0]}>
          <input id="title" name="title" defaultValue={page.title} required className={inputClass(errors.title?.[0])} />
        </Field>
        <Field label="Meta Description" name="meta_description" error={errors.meta_description?.[0]} help="Shown in Google results. Up to 500 characters.">
          <textarea id="meta_description" name="meta_description" rows={3} defaultValue={page.meta_description ?? ""} className={inputClass(errors.meta_description?.[0], true)} />
        </Field>
        <Toggle name="is_published" label="Published" help="Off hides this page's content from the website API." defaultChecked={page.is_published} />

        <div className="rounded-xl border border-[#EDE9E1]">
          <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-manikstu-leaf">
            <span className="flex items-center gap-2">
              <Languages className="h-4 w-4" />
              Translations ({page.translations.length}/{TRANSLATION_LOCALES.length})
            </span>
            <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
          </button>
          {open && (
            <div className="space-y-4 border-t border-[#EDE9E1] p-4">
              <div className="flex flex-wrap gap-1.5">
                {TRANSLATION_LOCALES.map((l) => (
                  <button
                    key={l.value}
                    type="button"
                    onClick={() => setLocale(l.value)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                      l.value === locale ? "bg-manikstu-green text-white" : existing.has(l.value) ? "bg-manikstu-green/10 text-manikstu-leaf" : "bg-[#F2EEE4] text-grey"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              {TRANSLATION_LOCALES.map((l) => (
                <div key={l.value} hidden={l.value !== locale} className="space-y-4">
                  <Field label={`Title (${l.label})`} name={`title_${l.value}`} help="Required for this language's translation to be saved.">
                    <input id={`title_${l.value}`} name={`title_${l.value}`} defaultValue={existing.get(l.value)?.title ?? ""} className={inputClass()} />
                  </Field>
                  <Field label={`Meta Description (${l.label})`} name={`meta_description_${l.value}`}>
                    <textarea id={`meta_description_${l.value}`} name={`meta_description_${l.value}`} rows={2} defaultValue={existing.get(l.value)?.meta_description ?? ""} className={inputClass(undefined, true)} />
                  </Field>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-manikstu-green to-manikstu-leaf text-sm font-semibold text-white shadow-md shadow-manikstu-leaf/20 disabled:opacity-70"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {pending ? "Saving…" : "Save Page"}
        </button>
      </Section>
    </form>
  );
}
