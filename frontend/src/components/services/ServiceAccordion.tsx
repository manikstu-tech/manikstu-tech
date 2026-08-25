"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export type AccordionItem = {
  title: string;
  highlight?: string;
  detail?: string;
};

type Props = {
  heading: string;
  items: AccordionItem[];
  /** Index open by default; defaults to null (all collapsed). */
  defaultOpen?: number | null;
};

export default function ServiceAccordion({
  heading,
  items,
  defaultOpen = null,
}: Props) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="h-full rounded-lg border border-light-grey bg-white p-6 shadow-sm md:p-8">
      <h3 className="mb-6 font-heading text-xl font-bold text-charcoal md:text-2xl">
        {heading}
      </h3>

      <ul className="divide-y divide-light-grey/70">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 py-3 text-left"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-manikstu-gold text-manikstu-green">
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
                <span
                  className={`font-semibold ${
                    isOpen ? "text-manikstu-green" : "text-charcoal"
                  }`}
                >
                  {item.title}
                </span>
              </button>

              {isOpen && (item.highlight || item.detail) && (
                <div className="pb-4 pl-11 pr-2">
                  {item.highlight && (
                    <p className="mb-2 font-semibold text-charcoal">
                      {item.highlight}
                    </p>
                  )}
                  {item.detail && (
                    <p className="text-sm leading-relaxed text-grey">
                      {item.detail}
                    </p>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
