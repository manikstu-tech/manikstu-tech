"use client";

import { useEffect, useRef, useState } from "react";
import { X, UploadCloud, CheckCircle2, Loader2, FileText } from "lucide-react";
import { submitJobApplication } from "@/lib/api";

const MAX_MB = 5;
const ACCEPT = ".pdf,.doc,.docx";
const ALLOWED = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export default function ApplyModal({
  jobId,
  jobTitle,
  open,
  onClose,
}: {
  jobId: number | string;
  jobTitle: string;
  open: boolean;
  onClose: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Reset when reopened.
  useEffect(() => {
    if (open) {
      setFile(null);
      setDone(false);
      setError(null);
      setSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  function pickFile(f: File | null) {
    setError(null);
    if (!f) return setFile(null);
    const okType = ALLOWED.includes(f.type) || /\.(pdf|docx?|doc)$/i.test(f.name);
    if (!okType) return setError("Please upload a PDF or Word document.");
    if (f.size > MAX_MB * 1024 * 1024) return setError(`File is too large (max ${MAX_MB} MB).`);
    setFile(f);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    if (!file) return setError("Please attach your CV.");
    setError(null);
    setSubmitting(true);
    try {
      const form = new FormData(e.currentTarget);
      form.set("resume", file);
      await submitJobApplication(jobId, form);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-charcoal/50 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Apply for ${jobTitle}`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-grey transition hover:bg-manikstu-cream hover:text-charcoal"
        >
          <X className="h-5 w-5" />
        </button>

        {done ? (
          <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-manikstu-green/10 text-manikstu-green">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h2 className="font-heading text-2xl font-bold text-charcoal">Application received</h2>
            <p className="max-w-sm text-sm text-grey">
              Thank you for applying for <span className="font-semibold text-charcoal">{jobTitle}</span>. Our team will review your CV and get back to you.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-full bg-manikstu-green px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-manikstu-leaf"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 pb-6 pt-7 sm:px-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-manikstu-green">Apply now</p>
            <h2 className="mt-1.5 font-heading text-2xl font-bold leading-tight text-charcoal">{jobTitle}</h2>
            <p className="mt-1 text-sm text-grey">Fill in your details and attach your CV.</p>

            {error && (
              <p role="alert" className="mt-4 rounded-lg border border-manikstu-red/20 bg-manikstu-red/5 px-3.5 py-2.5 text-sm font-medium text-manikstu-red">
                {error}
              </p>
            )}

            <div className="mt-5 space-y-4">
              <Field id="apply-name" name="name" label="Full name" required autoComplete="name" placeholder="Your name" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="apply-email" name="email" type="email" label="Email" required autoComplete="email" placeholder="you@example.com" />
                <Field id="apply-phone" name="phone" type="tel" label="Phone" autoComplete="tel" placeholder="Optional" />
              </div>

              <div>
                <label htmlFor="apply-note" className="mb-1.5 block text-sm font-semibold text-charcoal">
                  Message <span className="font-normal text-grey">(optional)</span>
                </label>
                <textarea
                  id="apply-note"
                  name="cover_note"
                  rows={3}
                  maxLength={2000}
                  placeholder="A short note on why you're a good fit"
                  className="w-full rounded-xl border border-[#E8E2D6] bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-4 focus:ring-manikstu-green/10"
                />
              </div>

              {/* CV upload */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-charcoal">
                  CV / Resume <span className="text-manikstu-red">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full items-center gap-3 rounded-xl border-2 border-dashed border-manikstu-green/40 bg-manikstu-cream/40 px-4 py-3.5 text-left transition hover:border-manikstu-green hover:bg-manikstu-cream/70"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-manikstu-green/10 text-manikstu-green">
                    {file ? <FileText className="h-5 w-5" /> : <UploadCloud className="h-5 w-5" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-charcoal">
                      {file ? file.name : "Choose a file"}
                    </span>
                    <span className="block text-xs text-grey">PDF or Word, up to {MAX_MB} MB</span>
                  </span>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept={ACCEPT}
                  className="hidden"
                  onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-manikstu-green text-sm font-semibold text-white transition hover:bg-manikstu-leaf disabled:cursor-wait disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                "Submit application"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  id, name, label, type = "text", required, placeholder, autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-charcoal">
        {label} {required && <span className="text-manikstu-red">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-11 w-full rounded-xl border border-[#E8E2D6] bg-white px-3.5 text-sm text-charcoal outline-none transition focus:border-manikstu-green focus:ring-4 focus:ring-manikstu-green/10"
      />
    </div>
  );
}
