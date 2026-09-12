"use client";

import { useEffect, useRef, useState, type DragEvent, type MouseEvent } from "react";
import { ImagePlus, X } from "lucide-react";

const MAX_BYTES = 5 * 1024 * 1024;

/**
 * One image upload. Posts the file as `{name}` and the kept image as
 * `{name}_existing` (empty after removal) — Laravel only accepts "keep the
 * current image" or "remove", never a different path.
 */
export default function ImageField({ name, existingPath, existingUrl, error }: { name: string; existingPath?: string | null; existingUrl?: string | null; error?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const objectUrl = useRef<string | null>(null);
  const [existing, setExisting] = useState(existingPath ?? "");
  const [preview, setPreview] = useState<string | null>(existingUrl ?? null);
  const [tooBig, setTooBig] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => () => {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
  }, []);

  function show(file: File | undefined) {
    if (!file) return;
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(file);
    setPreview(objectUrl.current);
    setTooBig(file.size > MAX_BYTES);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length && input.current) {
      input.current.files = e.dataTransfer.files;
      show(e.dataTransfer.files[0]);
    }
  }

  function clear(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (input.current) input.current.value = "";
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = null;
    setExisting("");
    setPreview(null);
    setTooBig(false);
  }

  const message = tooBig ? "Larger than 5MB — choose a smaller image." : error;

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`relative flex aspect-[4/3] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-[1.5px] bg-[#FAF8F3] transition ${
          message ? "border-manikstu-red/60" : dragging ? "border-manikstu-green bg-manikstu-green/5" : "border-dashed border-[#D9D2C4] hover:border-manikstu-green"
        }`}
      >
        <input
          ref={input}
          id={name}
          type="file"
          name={name}
          accept="image/*"
          className="sr-only"
          onChange={(e) => show(e.target.files?.[0])}
        />
        <input type="hidden" name={`${name}_existing`} value={existing} readOnly />
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="" className="h-full w-full object-contain" />
        ) : (
          <span className="flex flex-col items-center gap-1 p-3 text-center">
            <ImagePlus className="h-7 w-7 text-manikstu-green" />
            <span className="text-xs font-semibold text-grey">Drop an image or click to choose</span>
            <span className="text-[10px] text-[#B0A98E]">JPG, PNG or WebP, up to 5MB</span>
          </span>
        )}
        {preview && (
          <button
            type="button"
            onClick={clear}
            aria-label="Remove image"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white hover:bg-manikstu-red"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </label>
      {message && <p className="mt-1.5 text-xs font-medium text-manikstu-red">{message}</p>}
    </div>
  );
}
