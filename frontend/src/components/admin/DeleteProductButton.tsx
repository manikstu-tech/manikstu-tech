"use client";

import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { deleteProductAction } from "@/app/admin/(panel)/products/actions";

type Props = { id: number; name: string; variant?: "icon" | "button" };

export default function DeleteProductButton({ id, name, variant = "icon" }: Props) {
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (!confirm(`Delete "${name}"? Its uploaded images are removed too. This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteProductAction(id);
      if (result?.error) alert(result.error);
    });
  }

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        className="inline-flex h-11 items-center gap-2 rounded-xl border border-manikstu-red/25 bg-white px-5 text-sm font-semibold text-manikstu-red transition hover:bg-manikstu-red/5 disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        Delete
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      title="Delete"
      aria-label={`Delete ${name}`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#ECE7DC] bg-white text-grey transition hover:border-manikstu-red/25 hover:bg-manikstu-red/5 hover:text-manikstu-red disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  );
}
