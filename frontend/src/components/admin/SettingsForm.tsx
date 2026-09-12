"use client";

import { startTransition, useActionState, useEffect, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { SETTINGS_GROUPS } from "@/lib/admin/sections";
import type { FormState } from "@/lib/admin/types";
import { ErrorSummary, Field, inputClass, Section } from "./FormBits";

type Props = {
  values: Record<string, string | null>;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
};

export default function SettingsForm({ values, action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const errors = state.errors ?? {};

  useEffect(() => {
    if (state.message) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Not <form action>: React would reset the fields after saving.
    startTransition(() => formAction(formData));
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {state.ok ? (
        <p role="status" className="mb-5 rounded-xl border border-manikstu-green/20 bg-manikstu-green/5 px-4 py-3 text-sm font-medium text-manikstu-leaf">
          {state.message}
        </p>
      ) : (
        <ErrorSummary message={state.message} errors={errors} />
      )}
      <div className="grid items-start gap-5 lg:grid-cols-2">
        {SETTINGS_GROUPS.map((group) => (
          <Section key={group.title} title={group.title}>
            {group.fields.map((f) => {
              const error = errors[f.name]?.[0];
              return (
                <Field key={f.name} label={f.label} name={f.name} error={error} help={f.help}>
                  {f.type === "textarea" ? (
                    <textarea id={f.name} name={f.name} rows={f.rows ?? 3} defaultValue={values[f.name] ?? ""} className={inputClass(error, true)} />
                  ) : (
                    <input id={f.name} name={f.name} type={f.type ?? "text"} placeholder={f.placeholder} defaultValue={values[f.name] ?? ""} className={inputClass(error)} />
                  )}
                </Field>
              );
            })}
          </Section>
        ))}
      </div>
      <div className="sticky bottom-4 mt-6 flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="flex h-11 items-center gap-2 rounded-xl bg-gradient-to-br from-manikstu-green to-manikstu-leaf px-6 text-sm font-semibold text-white shadow-lg shadow-manikstu-leaf/25 disabled:cursor-wait disabled:opacity-70"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {pending ? "Saving…" : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
