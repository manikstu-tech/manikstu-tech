"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { Film, ImageIcon, Loader2, Pencil, X } from "lucide-react";
import type { FormState } from "@/lib/admin/types";
import type { MediaItem } from "@/lib/admin/sections-api";
import { ErrorSummary, Field, inputClass } from "./FormBits";

export default function EditMediaModal({
  item,
  action,
}: {
  item: MediaItem;
  action: (state: FormState, formData: FormData) => Promise<FormState>;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(action, {});
  const [type, setType] = useState<"photo" | "video">(item.type);
  const formRef = useRef<HTMLFormElement>(null);

  const initialDate = item.created_at ? item.created_at.slice(0, 10) : new Date().toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (state.ok && !pending) {
      setOpen(false);
    }
  }, [state, pending]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => formAction(formData));
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Edit item"
        aria-label={`Edit ${item.name}`}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-grey transition-colors hover:bg-manikstu-green/10 hover:text-manikstu-green focus:outline-none focus:ring-2 focus:ring-manikstu-green"
      >
        <Pencil className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-[#ECE7DC] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-grey hover:bg-charcoal/5 hover:text-charcoal"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-heading text-xl font-bold text-charcoal">Edit Media Item</h3>
            <p className="mt-1 text-xs text-grey">Update the name, date, or replace the uploaded file.</p>

            <form ref={formRef} onSubmit={onSubmit} className="mt-5 space-y-4">
              <ErrorSummary message={state.ok ? undefined : state.message} errors={state.ok ? undefined : state.errors} />

              {/* Current Preview */}
              <div className="flex items-center gap-3 rounded-xl border border-[#ECE7DC] bg-[#FBFAF7] p-3">
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-charcoal/5">
                  {item.type === "video" ? (
                    <video src={`${item.url}#t=0.5`} className="h-full w-full object-cover" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-charcoal">{item.name}</p>
                  <p className="text-[11px] text-grey">{item.file_name}</p>
                </div>
              </div>

              {/* Type Switcher */}
              <div>
                <p className="mb-1.5 text-[13px] font-semibold text-[#3A3A3A]">Type</p>
                <div className="flex gap-1 rounded-xl bg-[#F2EEE4] p-1">
                  <button
                    type="button"
                    onClick={() => setType("photo")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${
                      type === "photo" ? "bg-white text-manikstu-leaf shadow-sm" : "text-grey hover:text-charcoal"
                    }`}
                  >
                    <ImageIcon className="h-4 w-4" />
                    Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("video")}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${
                      type === "video" ? "bg-white text-manikstu-leaf shadow-sm" : "text-grey hover:text-charcoal"
                    }`}
                  >
                    <Film className="h-4 w-4" />
                    Video
                  </button>
                </div>
                <input type="hidden" name="type" value={type} />
              </div>

              {/* Event Name / Title */}
              <Field label="Event Name" name="title" help="Shown with the item in the website gallery.">
                <input
                  id="edit-title"
                  name="title"
                  defaultValue={item.name}
                  maxLength={150}
                  placeholder="e.g. Field day at Kalahandi"
                  className={inputClass()}
                  required
                />
              </Field>

              {/* Date */}
              <Field label="Date" name="date" help="When this photo or video was taken.">
                <input
                  id="edit-date"
                  name="date"
                  type="date"
                  defaultValue={initialDate}
                  max={today}
                  className={inputClass()}
                />
              </Field>

              {/* Replace File */}
              <Field label="Replace File (Optional)" name="file" help="Leave empty to keep the existing file.">
                <input
                  id="edit-file"
                  name="file"
                  type="file"
                  accept={type === "video" ? "video/*" : "image/*,application/pdf"}
                  className="block w-full text-xs text-grey file:mr-3 file:rounded-lg file:border-0 file:bg-manikstu-green/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-manikstu-leaf hover:file:bg-manikstu-green/15"
                />
              </Field>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={pending}
                  className="rounded-xl border border-light-grey px-4 py-2.5 text-sm font-semibold text-charcoal hover:bg-charcoal/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-manikstu-green to-manikstu-leaf px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-manikstu-leaf/20 disabled:cursor-wait disabled:opacity-70"
                >
                  {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {pending ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
