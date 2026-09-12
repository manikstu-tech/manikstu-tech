import type { ReactNode } from "react";

// Shared building blocks for the admin forms.

const inputBase =
  "w-full rounded-xl border bg-white px-3.5 text-sm text-charcoal outline-none transition focus:ring-4 focus:ring-manikstu-green/10";

export const inputClass = (error?: string, textarea = false) =>
  `${inputBase} ${textarea ? "py-2.5" : "h-11"} ${error ? "border-manikstu-red/50 focus:border-manikstu-red" : "border-[#E8E2D6] focus:border-manikstu-green"}`;

export function Field({ label, name, error, help, children }: { label: string; name: string; error?: string; help?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[13px] font-semibold text-[#3A3A3A]">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-xs font-medium text-manikstu-red">{error}</p> : help && <p className="mt-1.5 text-xs text-grey">{help}</p>}
    </div>
  );
}

export function Section({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#ECE7DC] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#F0ECE2] bg-[#FBFAF7] px-5 py-3.5">
        <h2 className="text-[15px] font-bold">{title}</h2>
        {action}
      </div>
      <div className="space-y-5 p-5">{children}</div>
    </section>
  );
}

export function Toggle({ name, label, help, defaultChecked }: { name: string; label: string; help?: string; defaultChecked: boolean }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4">
      <span>
        <span className="block text-[13px] font-semibold text-[#3A3A3A]">{label}</span>
        {help && <span className="mt-0.5 block text-xs text-grey">{help}</span>}
      </span>
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input type="checkbox" name={name} value="1" defaultChecked={defaultChecked} className="peer sr-only" />
        <span className="h-6 w-11 rounded-full bg-[#DCD6C8] transition peer-checked:bg-manikstu-green peer-focus-visible:ring-4 peer-focus-visible:ring-manikstu-green/20" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

export function ErrorSummary({ message, errors }: { message?: string; errors?: Record<string, string[]> }) {
  if (!message) return null;
  const all = Object.values(errors ?? {}).flat();
  return (
    <div role="alert" className="mb-5 rounded-xl border border-manikstu-red/20 bg-manikstu-red/5 px-4 py-3 text-sm text-manikstu-red">
      <p className="font-semibold">{message}</p>
      {all.length > 0 && (
        <ul className="mt-1.5 list-disc space-y-0.5 pl-5">
          {all.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
