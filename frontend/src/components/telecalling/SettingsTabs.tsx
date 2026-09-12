"use client";

import { startTransition, useActionState, useEffect, useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { ErrorSummary, Field, inputClass } from "@/components/admin/FormBits";
import type { TcSettings } from "@/lib/admin/telecalling";
import type { FormState } from "@/lib/admin/types";

type Tab = "profile" | "notifications" | "team";

function ProfileForm({ profile, action }: { profile: TcSettings["profile"]; action: (s: FormState, fd: FormData) => Promise<FormState> }) {
  const [state, formAction, pending] = useActionState(action, {});
  const errors = state.errors ?? {};

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {state.ok ? (
        <p role="status" className="mb-4 flex items-center gap-2 rounded-xl border border-manikstu-green/20 bg-manikstu-green/5 px-4 py-3 text-sm font-medium text-manikstu-leaf">
          <Check className="h-4 w-4" /> {state.message}
        </p>
      ) : (
        <ErrorSummary message={state.message} errors={errors} />
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" error={errors.name?.[0]}>
          <input id="name" name="name" defaultValue={profile.name} required className={inputClass(errors.name?.[0])} />
        </Field>
        <Field label="Role" name="role">
          <input id="role" value={profile.role} readOnly className={`${inputClass()} bg-[#FBF8F1] capitalize text-grey`} />
        </Field>
        <Field label="Phone" name="phone" error={errors.phone?.[0]}>
          <input id="phone" name="phone" defaultValue={profile.phone ?? ""} placeholder="+91 98765 43210" className={inputClass(errors.phone?.[0])} />
        </Field>
        <Field label="Region" name="region" error={errors.region?.[0]}>
          <input id="region" name="region" defaultValue={profile.region ?? ""} placeholder="e.g. Mayurbhanj, Odisha" className={inputClass(errors.region?.[0])} />
        </Field>
      </div>
      <button type="submit" disabled={pending} className="mt-5 flex h-11 items-center gap-2 rounded-xl bg-manikstu-green px-5 text-sm font-semibold text-white hover:bg-manikstu-leaf disabled:opacity-70">
        {pending && <Loader2 className="h-4 w-4 animate-spin" />}
        {pending ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

/** Preference toggles are design-only for now, as in the Blade panel. */
function Preferences({ items }: { items: TcSettings["notifications"] }) {
  const [on, setOn] = useState(items.map((i) => i.on));
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className="divide-y divide-[#F4F1EA]">
      {items.map((item, i) => (
        <label key={item.label} className="flex cursor-pointer items-center justify-between gap-4 py-3.5">
          <span>
            <span className="block text-sm font-semibold">{item.label}</span>
            <span className="block text-xs text-grey">{item.desc}</span>
          </span>
          <span className="relative inline-flex shrink-0">
            <input
              type="checkbox"
              checked={on[i]}
              onChange={() => {
                setOn((v) => v.map((x, j) => (j === i ? !x : x)));
                setToast(true);
              }}
              className="peer sr-only"
            />
            <span className="h-6 w-11 rounded-full bg-[#DCD6C8] transition peer-checked:bg-manikstu-green" />
            <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
          </span>
        </label>
      ))}
      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-charcoal px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          Preference updated
        </div>
      )}
    </div>
  );
}

export default function SettingsTabs({ settings, profileAction }: { settings: TcSettings; profileAction: (s: FormState, fd: FormData) => Promise<FormState> }) {
  const [tab, setTab] = useState<Tab>("profile");
  const card = "overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm";
  const head = "border-b border-[#F0ECE2] bg-[#FBFAF7] px-5 py-3.5 text-[15px] font-bold";

  return (
    <>
      <div className="mb-5 flex gap-1 rounded-xl bg-[#F2EEE4] p-1 sm:inline-flex" role="tablist">
        {(["profile", "notifications", "team"] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-lg px-5 py-2 text-sm font-semibold capitalize transition ${tab === t ? "bg-white text-manikstu-leaf shadow-sm" : "text-grey hover:text-charcoal"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="space-y-5">
          <section className={card}>
            <h2 className={head}>Profile</h2>
            <div className="p-5">
              <ProfileForm profile={settings.profile} action={profileAction} />
            </div>
          </section>
          <section className={card}>
            <h2 className={head}>Notification preferences</h2>
            <div className="px-5">
              <Preferences items={settings.notifications} />
            </div>
          </section>
        </div>
      )}

      {tab === "notifications" && (
        <section className={card}>
          <h2 className={head}>Notification preferences</h2>
          <div className="px-5">
            <Preferences items={settings.notifications} />
          </div>
        </section>
      )}

      {tab === "team" && (
        <section className={card}>
          <h2 className={head}>Team members</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="bg-[#FBF8F1] text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[#5A6B4E]">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Region</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {settings.team.map((m) => (
                  <tr key={m.name} className="border-t border-[#F4F1EA]">
                    <td className="px-5 py-3 font-semibold">{m.name}</td>
                    <td className="px-5 py-3">{m.role}</td>
                    <td className="px-5 py-3 text-grey">{m.region}</td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${m.status === "Active" ? "bg-manikstu-green/10 text-manikstu-leaf" : "bg-amber-100 text-amber-800"}`}>{m.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
