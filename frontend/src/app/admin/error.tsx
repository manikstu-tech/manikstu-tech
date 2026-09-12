"use client";

import { useEffect } from "react";
import { RotateCw, ServerCrash } from "lucide-react";

/**
 * Sits above the (panel) layout so it also catches failures in that layout's
 * auth check, e.g. when the Laravel API is unreachable.
 */
export default function AdminError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#ECE7DC] bg-white p-8 text-center shadow-sm">
        <ServerCrash className="mx-auto h-10 w-10 text-manikstu-red/70" strokeWidth={1.5} />
        <h1 className="mt-4 text-xl font-bold">This page couldn&apos;t load</h1>
        <p className="mt-2 text-sm text-grey">
          The admin API may be unreachable, or something went wrong on the server. Please try again in a moment.
        </p>
        {error.digest && <p className="mt-3 font-mono text-xs text-grey">Ref: {error.digest}</p>}
        <button
          type="button"
          onClick={() => retry()}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-manikstu-green px-5 text-sm font-semibold text-white hover:bg-manikstu-leaf"
        >
          <RotateCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </main>
  );
}
