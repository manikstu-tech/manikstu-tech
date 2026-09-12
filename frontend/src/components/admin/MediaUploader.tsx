"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { Film, ImageIcon, Loader2, Upload } from "lucide-react";
import type { FormState } from "@/lib/admin/types";
import { ErrorSummary, Field, inputClass } from "./FormBits";

/** Mirrors the Laravel limits so a too-big file fails here, not after uploading. */
const LIMITS = {
  photo: { bytes: 10 * 1024 * 1024, accept: "image/jpeg,image/png,image/gif,image/webp,application/pdf", hint: "JPG, PNG, GIF, WebP or PDF, up to 10MB" },
  video: { bytes: 100 * 1024 * 1024, accept: "video/mp4,video/webm,video/ogg,video/quicktime,video/x-m4v", hint: "MP4, WebM, OGG or MOV, up to 100MB" },
};

export default function MediaUploader({ action }: { action: (state: FormState, formData: FormData) => Promise<FormState> }) {
  const [state, formAction, pending] = useActionState(action, {});
  const [type, setType] = useState<"photo" | "video">("photo");
  const [clientError, setClientError] = useState<string | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (state.ok) form.current?.reset();
  }, [state]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      setClientError("Choose a file to upload.");
      return;
    }
    if (file.size > LIMITS[type].bytes) {
      setClientError(`That file is too large. ${LIMITS[type].hint}.`);
      return;
    }
    setClientError(null);
    startTransition(() => formAction(formData));
  }

  const tab = (value: "photo" | "video", label: string, Icon: typeof ImageIcon) => (
    <button
      type="button"
      onClick={() => setType(value)}
      aria-pressed={type === value}
      className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition ${
        type === value ? "bg-white text-manikstu-leaf shadow-sm" : "text-grey hover:text-charcoal"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );

  return (
    <form ref={form} onSubmit={onSubmit} className="mb-6 rounded-2xl border border-[#ECE7DC] bg-white p-5 shadow-sm">
      <ErrorSummary message={clientError ?? (state.ok ? undefined : state.message)} errors={clientError ? undefined : state.errors} />
      {state.ok && !clientError && (
        <p role="status" className="mb-4 rounded-xl border border-manikstu-green/20 bg-manikstu-green/5 px-4 py-3 text-sm font-medium text-manikstu-leaf">
          {state.message}
        </p>
      )}
      <input type="hidden" name="type" value={type} />
      <div className="grid gap-4 md:grid-cols-[220px_1fr_1fr_1fr_auto] md:items-end">
        <div>
          <p className="mb-1.5 text-[13px] font-semibold text-[#3A3A3A]">Type</p>
          <div className="flex gap-1 rounded-xl bg-[#F2EEE4] p-1">
            {tab("photo", "Photo", ImageIcon)}
            {tab("video", "Video", Film)}
          </div>
        </div>
        <Field label="File" name="file" help={LIMITS[type].hint}>
          <input id="file" name="file" type="file" accept={LIMITS[type].accept} className="block w-full text-sm text-grey file:mr-3 file:rounded-lg file:border-0 file:bg-manikstu-green/10 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-manikstu-leaf hover:file:bg-manikstu-green/15" />
        </Field>
        <Field label="Event Name" name="title" help="Shown with the item on the website.">
          <input id="title" name="title" maxLength={150} placeholder="e.g. Field day at Kalahandi" className={inputClass()} />
        </Field>
        <Field label="Date" name="date" help={`When this ${type} was taken.`}>
          <input id="date" name="date" type="date" defaultValue={today} max={today} className={inputClass()} />
        </Field>
        <button
          type="submit"
          disabled={pending}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-manikstu-green to-manikstu-leaf px-5 text-sm font-semibold text-white shadow-md shadow-manikstu-leaf/20 disabled:cursor-wait disabled:opacity-70 md:mb-6"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {pending ? "Uploading…" : "Upload"}
        </button>
      </div>
    </form>
  );
}
