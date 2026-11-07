import type { FormEvent } from "react"

// Keeps each form field to the characters it can hold, as the visitor types or pastes.
// Validation still runs on submit; this only stops the wrong characters getting in.
export const FILTERS = {
  // Digits and spaces, with a single + allowed only at the start
  phone: (v: string) => v.replace(/[^\d+ ]/g, "").replace(/(?!^)\+/g, ""),
  // A person's name: letters in any script, spaces, and . ' -
  name: (v: string) => v.replace(/[^\p{L}\p{M} .'-]/gu, ""),
  // A city, village, district or state: as a name, without the apostrophe
  place: (v: string) => v.replace(/[^\p{L}\p{M} .-]/gu, ""),
  // An organisation name may also hold digits and & , ( ) /
  org: (v: string) => v.replace(/[^\p{L}\p{M}\p{N} &.,'()/-]/gu, ""),
  // PIN codes and other number-only fields
  digits: (v: string) => v.replace(/\D/g, ""),
  // Email addresses never contain spaces
  email: (v: string) => v.replace(/\s/g, ""),
}

export type FieldKind = keyof typeof FILTERS

// onInput handler for fields the form does not control: cleans the value and keeps the caret where it was
export const only =
  (kind: FieldKind) =>
  (event: FormEvent<HTMLInputElement>) => {
    const field = event.currentTarget
    const clean = FILTERS[kind](field.value)
    if (clean === field.value) return
    const caret = Math.max(0, (field.selectionStart ?? clean.length) - (field.value.length - clean.length))
    field.value = clean
    // Email fields do not support moving the caret
    try {
      field.setSelectionRange(caret, caret)
    } catch {}
  }
