"use client"

import { useRef, useState, type FormEvent } from "react"
import { Arrow } from "@/components/ui/Arrow"
import { StateSelector } from "@/components/ui/StateSelector"
import { CONTACT_INFO } from "@/constants/site"
import { only } from "@/lib/fieldFilters"
import { EXPLORE_OPTIONS, MEMBER_OPTIONS, validateFpo, type FpoErrors, type FpoValues } from "@/lib/fpo"
import { toast } from "@/lib/toast"

type Status = "idle" | "sending" | "sent" | "failed"

const text = (data: FormData, key: string) => String(data.get(key) ?? "")

// The FPO Connect enquiry form: the fields come from the FPO Connect content brief, and it posts to /api/fpo.
export function FpoForm() {
  const form = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<FpoErrors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [members, setMembers] = useState("")
  const [explore, setExplore] = useState("")

  const invalid = (key: keyof FpoValues) => (errors[key] ? true : undefined)
  const describedBy = (key: keyof FpoValues) => (errors[key] ? `fp-${key}-error` : undefined)
  const error = (key: keyof FpoValues) =>
    errors[key] && (
      <p className="fieldError" id={`fp-${key}-error`}>
        {errors[key]}
      </p>
    )

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: FpoValues = {
      fpo: text(data, "fpo"),
      district: text(data, "district"),
      contact: text(data, "contact"),
      phone: text(data, "phone"),
      members,
      explore,
      message: text(data, "message"),
    }
    const found = validateFpo(values)
    setErrors(found)
    if (Object.keys(found).length) {
      // Move focus to the first field that needs attention
      form.current?.querySelector<HTMLElement>(`#fp-${Object.keys(found)[0]}`)?.focus()
      return
    }

    setStatus("sending")
    try {
      const response = await fetch("/api/fpo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: text(data, "website") }),
      })
      if (response.status === 422) {
        setErrors((await response.json()).errors ?? {})
        setStatus("idle")
        return
      }
      setStatus(response.ok ? "sent" : "failed")
      if (response.ok) toast.sent("Request received")
      else toast.failed()
    } catch {
      setStatus("failed")
      toast.failed()
    }
  }

  if (status === "sent") {
    return (
      <div className="enquirySent" role="status">
        <h3>Thank you. Your enquiry is on its way.</h3>
        <p>Our team will get in touch to plan the first discussion with your CEO and board. We typically reply within 24 hours.</p>
        <button type="button" className="enquiryLink" onClick={() => setStatus("idle")}>
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form ref={form} onSubmit={submit} noValidate className="enquiryGrid">
      <div className="field">
        <label htmlFor="fp-fpo">
          FPO name <span aria-hidden="true">*</span>
        </label>
        <input
          id="fp-fpo"
          name="fpo"
          onInput={only("org")}
          autoComplete="organization"
          placeholder="Name of your FPO"
          required
          aria-invalid={invalid("fpo")}
          aria-describedby={describedBy("fpo")}
        />
        {error("fpo")}
      </div>
      <div className="field">
        <label htmlFor="fp-district">
          District <span aria-hidden="true">*</span>
        </label>
        <input
          id="fp-district"
          name="district"
          onInput={only("place")}
          autoComplete="address-level2"
          placeholder="Your district"
          required
          aria-invalid={invalid("district")}
          aria-describedby={describedBy("district")}
        />
        {error("district")}
      </div>
      <div className="field">
        <label htmlFor="fp-contact">
          Contact person (CEO / representative) <span aria-hidden="true">*</span>
        </label>
        <input
          id="fp-contact"
          name="contact"
          onInput={only("name")}
          autoComplete="name"
          placeholder="Name"
          required
          aria-invalid={invalid("contact")}
          aria-describedby={describedBy("contact")}
        />
        {error("contact")}
      </div>
      <div className="field">
        <label htmlFor="fp-phone">
          Mobile number <span aria-hidden="true">*</span>
        </label>
        <input
          id="fp-phone"
          name="phone"
          onInput={only("phone")}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91"
          required
          aria-invalid={invalid("phone")}
          aria-describedby={describedBy("phone")}
        />
        {error("phone")}
      </div>
      <div className="field">
        <label htmlFor="fp-members">Number of goat-rearing members</label>
        <StateSelector
          id="fp-members"
          name="members"
          options={MEMBER_OPTIONS}
          value={members}
          onChange={setMembers}
          placeholder="Select"
          searchable={false}
          invalid={!!errors.members}
          describedBy={describedBy("members")}
        />
        {error("members")}
      </div>
      <div className="field">
        <label htmlFor="fp-explore">What would you like to explore?</label>
        <StateSelector
          id="fp-explore"
          name="explore"
          options={EXPLORE_OPTIONS}
          value={explore}
          onChange={setExplore}
          placeholder="Select"
          searchable={false}
          invalid={!!errors.explore}
          describedBy={describedBy("explore")}
        />
        {error("explore")}
      </div>
      <div className="field full">
        <label htmlFor="fp-message">Message / additional information</label>
        <textarea
          id="fp-message"
          name="message"
          rows={4}
          placeholder="Optional"
          aria-invalid={invalid("message")}
          aria-describedby={describedBy("message")}
        />
        {error("message")}
      </div>
      {/* Spam trap: hidden from people, filled in by bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="fp-website">Website</label>
        <input id="fp-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="enquiryFoot full">
        <button type="submit" className="enquirySubmit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Submit enquiry"} <Arrow />
        </button>
        <p>Your details will be used only to follow up on your enquiry with Manikstu.</p>
      </div>
      {status === "failed" && (
        <p className="enquiryFailed full" role="alert">
          We could not send your enquiry just now. Please try again, or email{" "}
          <a href={CONTACT_INFO.emailMailto}>{CONTACT_INFO.email}</a> or call <a href={CONTACT_INFO.phoneTel}>{CONTACT_INFO.phone}</a>.
        </p>
      )}
    </form>
  )
}
