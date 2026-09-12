"use client";

import { startTransition, useActionState, useEffect, useState, useTransition, type FormEvent } from "react";
import { AlertTriangle, ArrowDown, ArrowUp, Check, EyeOff, Loader2, Pencil, Plus, Trash2, Wand2, X } from "lucide-react";
import type { PageBlock } from "@/lib/admin/pages";
import type { FormState } from "@/lib/admin/types";
import { ErrorSummary, Field, inputClass, Section, Toggle } from "./FormBits";

type SaveAction = (blockId: number | null, state: FormState, formData: FormData) => Promise<FormState>;

type Props = {
  blocks: PageBlock[];
  canDelete: boolean;
  saveAction: SaveAction;
  reorderAction: (ids: number[]) => Promise<{ error?: string }>;
  deleteAction: (blockId: number) => Promise<{ error?: string }>;
};

/** Block types already used by the website, offered as suggestions for new blocks. */
const KNOWN_TYPES = [
  "text", "stats", "partners", "testimonials", "hero", "cta", "image", "cta_pillars", "steps",
  "career_values", "career_benefits", "partner_types", "training_programs", "awareness_initiatives",
];

function pretty(content: string | null): string {
  if (!content) return "";
  try {
    return JSON.stringify(JSON.parse(content), null, 2);
  } catch {
    return content;
  }
}

function jsonError(text: string): string | null {
  if (!text.trim()) return null;
  try {
    JSON.parse(text);
    return null;
  } catch (e) {
    return e instanceof Error ? e.message : "Invalid JSON";
  }
}

function summary(content: string | null): string {
  if (!content) return "Empty";
  try {
    const value = JSON.parse(content);
    if (Array.isArray(value)) return `${value.length} item${value.length === 1 ? "" : "s"}`;
    if (value && typeof value === "object") return Object.keys(value).slice(0, 4).join(", ") || "Empty object";
    return String(value);
  } catch {
    return "Not valid JSON";
  }
}

function JsonField({ name, initial, error, onValidity }: { name: string; initial: string; error?: string; onValidity: (ok: boolean) => void }) {
  const [text, setText] = useState(initial);
  const problem = jsonError(text);

  useEffect(() => onValidity(!problem), [problem, onValidity]);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={`${name}-content`} className="text-[13px] font-semibold text-[#3A3A3A]">
          Content (JSON)
        </label>
        <button
          type="button"
          onClick={() => !problem && setText(pretty(text))}
          disabled={!!problem}
          className="flex items-center gap-1 text-xs font-semibold text-manikstu-leaf disabled:opacity-40"
        >
          <Wand2 className="h-3.5 w-3.5" /> Format
        </button>
      </div>
      <textarea
        id={`${name}-content`}
        name="content"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={Math.min(22, Math.max(8, text.split("\n").length + 1))}
        spellCheck={false}
        className={`${inputClass(error || problem || undefined, true)} font-mono text-[12.5px] leading-relaxed`}
      />
      <p className={`mt-1.5 flex items-center gap-1 text-xs ${problem || error ? "font-medium text-manikstu-red" : "text-manikstu-leaf"}`}>
        {problem ? (
          <>
            <AlertTriangle className="h-3.5 w-3.5" /> {problem}
          </>
        ) : error ? (
          error
        ) : (
          <>
            <Check className="h-3.5 w-3.5" /> Valid JSON
          </>
        )}
      </p>
    </div>
  );
}

function BlockForm({ block, saveAction, onDone }: { block?: PageBlock; saveAction: SaveAction; onDone?: () => void }) {
  const [state, formAction, pending] = useActionState(saveAction.bind(null, block?.id ?? null), {});
  const [valid, setValid] = useState(true);
  const [formKey, setFormKey] = useState(0);
  const errors = state.errors ?? {};

  useEffect(() => {
    // A new block's form starts fresh after it is added.
    if (state.ok && !block) setFormKey((k) => k + 1);
    if (state.ok && block) onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid) return;
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  }

  return (
    <form key={formKey} onSubmit={onSubmit} noValidate className="space-y-4">
      {state.ok && !block ? (
        <p role="status" className="flex items-center gap-2 rounded-xl border border-manikstu-green/20 bg-manikstu-green/5 px-4 py-2.5 text-sm font-medium text-manikstu-leaf">
          <Check className="h-4 w-4" /> {state.message}
        </p>
      ) : (
        <ErrorSummary message={state.message} errors={errors} />
      )}
      {!block && (
        <Field label="Type *" name="new-block-type" error={errors.type?.[0]} help="Decides how the website renders it, and can't be changed later.">
          <input id="new-block-type" name="type" list="block-types" required placeholder="e.g. text, stats, cta_pillars" className={inputClass(errors.type?.[0])} />
        </Field>
      )}
      <Field
        label="Title"
        name={block ? `title-${block.id}` : "new-block-title"}
        error={errors.title?.[0]}
        help={block ? "Careful: the website finds some blocks by title (e.g. Vision, Mission, Timeline). Renaming one can hide that section." : undefined}
      >
        <input id={block ? `title-${block.id}` : "new-block-title"} name="title" defaultValue={block?.title ?? ""} className={inputClass(errors.title?.[0])} />
      </Field>
      <JsonField name={block ? `block-${block.id}` : "new-block"} initial={block ? pretty(block.content) : "{}"} error={errors.content?.[0]} onValidity={setValid} />
      <Toggle name="is_active" label="Visible on the website" defaultChecked={block?.is_active ?? true} />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={pending || !valid}
          className="flex h-10 items-center gap-2 rounded-xl bg-manikstu-green px-5 text-sm font-semibold text-white hover:bg-manikstu-leaf disabled:opacity-60"
        >
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          {block ? "Save Block" : "Add Block"}
        </button>
        {block && onDone && (
          <button type="button" onClick={onDone} className="h-10 rounded-xl px-4 text-sm font-medium text-grey hover:text-charcoal">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default function BlocksEditor({ blocks, canDelete, saveAction, reorderAction, deleteAction }: Props) {
  const [editing, setEditing] = useState<number | null>(null);
  const [pending, startWork] = useTransition();

  function move(index: number, delta: number) {
    const ids = blocks.map((b) => b.id);
    const target = index + delta;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    startWork(async () => {
      const result = await reorderAction(ids);
      if (result.error) alert(result.error);
    });
  }

  function remove(block: PageBlock) {
    if (!confirm(`Delete the "${block.title || block.type}" block? The website stops showing it. This cannot be undone.`)) return;
    startWork(async () => {
      const result = await deleteAction(block.id);
      if (result.error) alert(result.error);
    });
  }

  const iconButton = "flex h-8 w-8 items-center justify-center rounded-lg border border-[#ECE7DC] bg-white text-grey transition hover:text-manikstu-green disabled:opacity-40";

  return (
    <div className="space-y-5">
      <Section title={`Content Blocks (${blocks.length})`} action={pending ? <Loader2 className="h-4 w-4 animate-spin text-grey" /> : undefined}>
        <datalist id="block-types">
          {KNOWN_TYPES.map((t) => (
            <option key={t} value={t} />
          ))}
        </datalist>
        {blocks.length === 0 && <p className="text-sm text-grey">No blocks yet. Add one below.</p>}
        <div className="space-y-3">
          {blocks.map((block, i) => (
            <article key={block.id} className={`rounded-xl border ${editing === block.id ? "border-manikstu-green/50" : "border-[#EDE9E1]"} bg-white`}>
              <header className="flex flex-wrap items-center gap-2 px-4 py-3">
                <span className="w-6 text-xs font-bold text-[#9A9A8E]">{i + 1}</span>
                <span className="rounded-md bg-[#5B8DEF]/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#3E6FD0]">{block.type}</span>
                <span className="min-w-0 flex-1 truncate text-sm font-semibold">{block.title || "Untitled block"}</span>
                {!block.is_active && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800">
                    <EyeOff className="h-3 w-3" /> Hidden
                  </span>
                )}
                <div className="flex gap-1">
                  <button type="button" className={iconButton} onClick={() => move(i, -1)} disabled={i === 0 || pending} aria-label={`Move ${block.title || block.type} up`}>
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button type="button" className={iconButton} onClick={() => move(i, 1)} disabled={i === blocks.length - 1 || pending} aria-label={`Move ${block.title || block.type} down`}>
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className={iconButton}
                    onClick={() => setEditing(editing === block.id ? null : block.id)}
                    aria-label={`${editing === block.id ? "Close" : "Edit"} ${block.title || block.type}`}
                    aria-expanded={editing === block.id}
                  >
                    {editing === block.id ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                  </button>
                  {canDelete && (
                    <button type="button" className={`${iconButton} hover:text-manikstu-red`} onClick={() => remove(block)} disabled={pending} aria-label={`Delete ${block.title || block.type}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </header>
              {editing === block.id ? (
                <div className="border-t border-[#EDE9E1] p-4">
                  <BlockForm block={block} saveAction={saveAction} onDone={() => setEditing(null)} />
                </div>
              ) : (
                <p className="border-t border-[#F4F1EA] px-4 py-2 font-mono text-xs text-grey">{summary(block.content)}</p>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section title="Add Block">
        <p className="-mt-1 flex items-center gap-1.5 text-xs text-grey">
          <Plus className="h-3.5 w-3.5" /> New blocks go to the end; move them into place afterwards.
        </p>
        <BlockForm saveAction={saveAction} />
      </Section>
    </div>
  );
}
