"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold, Heading2, Heading3, Italic, Link2, List, ListOrdered, Pilcrow, Quote, RemoveFormatting,
  Strikethrough, Underline, type LucideIcon,
} from "lucide-react";

type Tool = { icon: LucideIcon; label: string; command: string; value?: string };

const TOOLS: Tool[] = [
  { icon: Pilcrow, label: "Paragraph", command: "formatBlock", value: "p" },
  { icon: Heading2, label: "Heading", command: "formatBlock", value: "h2" },
  { icon: Heading3, label: "Subheading", command: "formatBlock", value: "h3" },
  { icon: Bold, label: "Bold", command: "bold" },
  { icon: Italic, label: "Italic", command: "italic" },
  { icon: Underline, label: "Underline", command: "underline" },
  { icon: Strikethrough, label: "Strikethrough", command: "strikeThrough" },
  { icon: List, label: "Bullet list", command: "insertUnorderedList" },
  { icon: ListOrdered, label: "Numbered list", command: "insertOrderedList" },
  { icon: Quote, label: "Quote", command: "formatBlock", value: "blockquote" },
];

/**
 * Small rich-text editor posting HTML in a hidden input. Laravel runs it through
 * HTML Purifier on save, so this only needs to produce the tags that survive.
 */
export default function RichTextEditor({ id, name, defaultValue, invalid }: { id: string; name: string; defaultValue?: string; invalid?: boolean }) {
  const editor = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(defaultValue ?? "");

  useEffect(() => {
    // Set once on mount; React must not re-render the editable content.
    if (editor.current) editor.current.innerHTML = defaultValue ?? "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function run(command: string, value?: string) {
    editor.current?.focus();
    document.execCommand(command, false, value);
    setHtml(editor.current?.innerHTML ?? "");
  }

  function addLink() {
    const url = window.prompt("Link address (https://…)");
    if (url && /^(https?:|mailto:)/i.test(url.trim())) run("createLink", url.trim());
  }

  const button =
    "flex h-8 w-8 items-center justify-center rounded-md text-grey transition hover:bg-manikstu-green/10 hover:text-manikstu-leaf";

  return (
    <div className={`overflow-hidden rounded-xl border bg-white ${invalid ? "border-manikstu-red/50" : "border-[#E8E2D6] focus-within:border-manikstu-green"}`}>
      <div className="flex flex-wrap gap-0.5 border-b border-[#EDE9E1] bg-[#FBFAF7] p-1.5" role="toolbar" aria-label="Formatting">
        {TOOLS.map(({ icon: Icon, label, command, value }) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            className={button}
            // mousedown, not click: keeps the text selection in the editor
            onMouseDown={(e) => {
              e.preventDefault();
              run(command, value);
            }}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
        <button type="button" title="Link" aria-label="Link" className={button} onMouseDown={(e) => { e.preventDefault(); addLink(); }}>
          <Link2 className="h-4 w-4" />
        </button>
        <button type="button" title="Clear formatting" aria-label="Clear formatting" className={button} onMouseDown={(e) => { e.preventDefault(); run("removeFormat"); }}>
          <RemoveFormatting className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={editor}
        id={id}
        contentEditable
        role="textbox"
        aria-multiline="true"
        onInput={() => setHtml(editor.current?.innerHTML ?? "")}
        className="min-h-[240px] px-4 py-3 text-sm leading-relaxed text-charcoal outline-none [&_a]:text-manikstu-green [&_a]:underline [&_blockquote]:my-2 [&_blockquote]:border-l-4 [&_blockquote]:border-manikstu-gold/50 [&_blockquote]:pl-3 [&_blockquote]:italic [&_h2]:mb-1 [&_h2]:mt-3 [&_h2]:font-heading [&_h2]:text-lg [&_h2]:font-bold [&_h3]:mb-1 [&_h3]:mt-2 [&_h3]:font-semibold [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5"
      />
      <input type="hidden" name={name} value={html} readOnly />
    </div>
  );
}
