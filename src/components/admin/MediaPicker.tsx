"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "@/lib/toast"

type File_ = { name: string; url: string; kind: "image" | "video" }

const ERRORS: Record<string, string> = {
  type_not_allowed: "That file type is not allowed. Use PNG, JPG, WebP, AVIF or GIF pictures, or MP4 or WebM videos.",
  too_large: "That file is too big.",
  upload_unavailable: "Uploads are not set up yet. Check the Supabase keys in the site's settings.",
}

// Sends a file to storage. In production the browser uploads straight to Supabase with a one-time address from our server
// (so a large video never passes through the site's server); in local development it is saved in public/uploads.
async function upload(file: File): Promise<string | null> {
  const start = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: file.name, type: file.type, size: file.size }),
  })
  const info = await start.json().catch(() => ({}))
  if (!start.ok) {
    const limit = info.maxMb ? ` The limit is ${info.maxMb} MB.` : ""
    toast.error("Could not upload", { description: (ERRORS[info.error] ?? "Please try again.") + (info.error === "too_large" ? limit : "") })
    return null
  }
  if (info.mode === "dev") {
    const put = await fetch(`/api/admin/upload-dev?path=${encodeURIComponent(info.path)}`, { method: "PUT", body: file })
    if (!put.ok) {
      toast.error("Could not upload", { description: "Please try again." })
      return null
    }
    return info.url
  }
  const { createClient } = await import("@supabase/supabase-js")
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "")
  const { error } = await client.storage.from(info.bucket).uploadToSignedUrl(info.path, info.token, file)
  if (error) {
    toast.error("Could not upload", { description: "Storage refused the file. Please try again." })
    return null
  }
  return info.url
}

// A dialog with the files already uploaded and a button to add new ones
export function MediaPicker({ kind, onPick, onClose }: { kind: "image" | "video"; onPick: (url: string) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [files, setFiles] = useState<File_[] | null>(null)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/media")
    setFiles(res.ok ? ((await res.json()).files as File_[]) : [])
  }, [])

  useEffect(() => {
    dialog.current?.showModal()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
  }, [load])

  async function add(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return
    setBusy(true)
    const url = await upload(file)
    setBusy(false)
    // A file just uploaded is the one the editor wants, so use it straight away; it also stays in the library for next time
    if (url) onPick(url)
  }

  const shown = (files ?? []).filter((f) => f.kind === kind)
  return (
    <dialog ref={dialog} className="admDialog" aria-labelledby="adm-media-title" onClose={onClose} onClick={(e) => e.target === dialog.current && onClose()}>
      <div className="admDialogHead">
        <h2 id="adm-media-title">{kind === "image" ? "Pictures" : "Videos"}</h2>
        <label className="admBtn primary">
          {busy ? "Uploading…" : "Upload new"}
          <input
            type="file"
            hidden
            disabled={busy}
            accept={kind === "image" ? "image/png,image/jpeg,image/webp,image/avif,image/gif" : "video/mp4,video/webm"}
            onChange={add}
          />
        </label>
        <button type="button" className="admBtn" onClick={onClose}>
          Close
        </button>
      </div>
      {files === null ? (
        <p className="admHint">Loading…</p>
      ) : shown.length === 0 ? (
        <p className="admHint">Nothing uploaded yet. Use "Upload new" to add a {kind}.</p>
      ) : (
        <ul className="admGrid">
          {shown.map((f) => (
            <li key={f.name}>
              <button type="button" onClick={() => onPick(f.url)} aria-label={`Use ${f.name}`}>
                {f.kind === "image" ? <img src={f.url} alt="" loading="lazy" /> : <video src={f.url} preload="metadata" muted />}
                <span>{f.name.replace(/^\d+-/, "")}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </dialog>
  )
}
