"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * A button for an action the telecalling design shows but that isn't built yet;
 * it explains that instead of doing nothing, like the Blade panel's toasts.
 */
export default function ComingSoonButton({ message, className, children, title }: { message: string; className?: string; children: ReactNode; title?: string }) {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <>
      <button type="button" title={title} onClick={() => setToast(message)} className={className}>
        {children}
      </button>
      {toast && (
        <div role="status" className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-charcoal px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </>
  );
}
