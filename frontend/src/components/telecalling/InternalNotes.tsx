"use client";

import { useState, type FormEvent } from "react";

/** Notes for this visit only — as in the Blade panel, they aren't saved yet. */
export default function InternalNotes() {
  const [notes, setNotes] = useState<{ text: string; at: string }[]>([]);
  const [text, setText] = useState("");

  function add(e: FormEvent) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setNotes((n) => [{ text: value, at: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) }, ...n]);
    setText("");
  }

  return (
    <div>
      <form onSubmit={add} className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write internal note..."
          aria-label="Internal note"
          className="h-11 flex-1 rounded-xl border border-[#E8E2D6] px-3.5 text-sm outline-none focus:border-manikstu-green focus:ring-4 focus:ring-manikstu-green/10"
        />
        <button type="submit" className="h-11 rounded-xl bg-manikstu-green px-5 text-sm font-semibold text-white hover:bg-manikstu-leaf">
          Add Note
        </button>
      </form>
      {notes.length > 0 && (
        <ul className="mt-4 space-y-2">
          {notes.map((n, i) => (
            <li key={i} className="rounded-xl bg-[#FBF8F1] px-4 py-2.5 text-sm">
              <span className="mr-2 text-xs font-semibold text-manikstu-leaf">{n.at}</span>
              {n.text}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-xs text-[#9A9A8E]">Notes stay on this page only for now; saving them is coming soon.</p>
    </div>
  );
}
