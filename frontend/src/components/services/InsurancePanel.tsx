"use client";

import { useState } from "react";

type Props = {
  heading: string;
  paragraphs: string[];
};

export default function InsurancePanel({ heading, paragraphs }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-full rounded-lg border border-light-grey bg-white p-6 shadow-sm md:p-8">
      <h3 className="mb-4 font-heading text-xl font-bold text-manikstu-green md:text-2xl">
        &ldquo;{heading}&rdquo;
      </h3>

      <div className="space-y-4">
        {(expanded ? paragraphs : paragraphs.slice(0, 2)).map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-grey">
            {p}
          </p>
        ))}
      </div>

      {paragraphs.length > 2 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="mt-4 text-sm font-semibold text-manikstu-green transition-colors hover:text-manikstu-leaf"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
}
