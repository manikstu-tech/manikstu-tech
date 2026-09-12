"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";

type Props = {
  name: string;
  action: () => Promise<{ error?: string } | void>;
  variant?: "icon" | "button";
  note?: string;
};

export default function DeleteRecordButton({ name, action, variant = "icon", note = "This cannot be undone." }: Props) {
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!confirm(`Delete "${name}"? ${note}`)) return;
    startTransition(async () => {
      const result = await action();
      if (result && result.error) alert(result.error);
    });
  }

  const icon = pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />;

  return variant === "button" ? (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="inline-flex h-11 items-center gap-2 rounded-xl border border-manikstu-red/25 bg-white px-5 text-sm font-semibold text-manikstu-red transition hover:bg-manikstu-red/5 disabled:opacity-60"
    >
      {icon}
      Delete
    </button>
  ) : (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      title="Delete"
      aria-label={`Delete ${name}`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#ECE7DC] bg-white text-grey transition hover:border-manikstu-red/25 hover:bg-manikstu-red/5 hover:text-manikstu-red disabled:opacity-60"
    >
      {icon}
    </button>
  );
}
