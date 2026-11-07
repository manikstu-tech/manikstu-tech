"use client"

import { useRef, useState, type FormEvent } from "react"
import { Arrow } from "@/components/ui/Arrow"
import { StateSelector } from "@/components/ui/StateSelector"
import { MAP_STATES } from "@/constants/indiaMap"
import { CONTACT_INFO } from "@/constants/site"
import { only } from "@/lib/fieldFilters"
import {
  FUNDING_OPTIONS,
  LAND_OPTIONS,
  TIMELINE_OPTIONS,
  validateFranchise,
  type FranchiseErrors,
  type FranchiseValues,
} from "@/lib/franchise"
import { toast } from "@/lib/toast"

type Status = "idle" | "sending" | "sent" | "failed"

const STATES = MAP_STATES.map(({ name }) => name)
const text = (data: FormData, key: string) => String(data.get(key) ?? "")

// The franchise interest form: the fields come from the Franchise content brief, and it posts to /api/franchise.
export function FranchiseForm() {
  const form = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<FranchiseErrors>({})
  const [status, setStatus] = useState<Status>("idle")
  const [state, setState] = useState("")
  const [land, setLand] = useState("")
  const [funding, setFunding] = useState("")
  const [timeline, setTimeline] = useState("")

  const invalid = (key: keyof FranchiseValues) => (errors[key] ? true : undefined)
  const describedBy = (key: keyof FranchiseValues) => (errors[key] ? `fr-${key}-error` : undefined)
  const error = (key: keyof FranchiseValues) =>
    errors[key] && (
      <p className="fieldError" id={`fr-${key}-error`}>
        {errors[key]}
      </p>
    )

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values: FranchiseValues = {
      name: text(data, "name"),
      phone: text(data, "phone"),
      district: text(data, "district"),
      state,
      land,
      area: text(data, "area"),
      funding,
      experience: text(data, "experience"),
      timeline,
    }
    const found = validateFranchise(values)
    setErrors(found)
    if (Object.keys(found).length) {
      // Move focus to the first field that needs attention
      form.current?.querySelector<HTMLElement>(`#fr-${Object.keys(found)[0]}`)?.focus()
      return
    }

    setStatus("sending")
    try {
      const response = await fetch("/api/franchise", {
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
      if (response.ok) toast.sent("Interest received")
      else toast.failed()
    } catch {
      setStatus("failed")
      toast.failed()
    }
  }

  if (status === "sent") {
    return (
      <div className="enquirySent" role="status">
        <h3>Thank you. Your interest is on its way.</h3>
        <p>Our team will call you to explain the model and the next steps. We typically reply within 24 hours.</p>
        <button type="button" className="enquiryLink" onClick={() => setStatus("idle")}>
          Send another response
        </button>
      </div>
    )
  }

  return (
    <form ref={form} onSubmit={submit} noValidate className="enquiryGrid">
      <div className="field">
        <label htmlFor="fr-name">
          Full name <span aria-hidden="true">*</span>
        </label>
        <input
          id="fr-name"
          name="name"
          onInput={only("name")}
          autoComplete="name"
          placeholder="Your name"
          required
          aria-invalid={invalid("name")}
          aria-describedby={describedBy("name")}
        />
        {error("name")}
      </div>
      <div className="field">
        <label htmlFor="fr-phone">
          Mobile number <span aria-hidden="true">*</span>
        </label>
        <input
          id="fr-phone"
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
        <label htmlFor="fr-district">
          District <span aria-hidden="true">*</span>
        </label>
        <input
          id="fr-district"
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
        <label htmlFor="fr-state">
          State <span aria-hidden="true">*</span>
        </label>
        <StateSelector
          id="fr-state"
          name="state"
          options={STATES}
          value={state}
          onChange={setState}
          placeholder="Select state"
          required
          invalid={!!errors.state}
          describedBy={describedBy("state")}
        />
        {error("state")}
      </div>
      <div className="field">
        <label htmlFor="fr-land">
          Land availability <span aria-hidden="true">*</span>
        </label>
        <StateSelector
          id="fr-land"
          name="land"
          options={LAND_OPTIONS}
          value={land}
          onChange={setLand}
          placeholder="Select"
          searchable={false}
          required
          invalid={!!errors.land}
          describedBy={describedBy("land")}
        />
        {error("land")}
      </div>
      <div className="field">
        <label htmlFor="fr-area">Approximate area</label>
        <input
          id="fr-area"
          name="area"
          onInput={only("org")}
          placeholder="For example, 2 acres"
          aria-invalid={invalid("area")}
          aria-describedby={describedBy("area")}
        />
        {error("area")}
      </div>
      <div className="field">
        <label htmlFor="fr-funding">
          Investment capacity <span aria-hidden="true">*</span>
        </label>
        <StateSelector
          id="fr-funding"
          name="funding"
          options={FUNDING_OPTIONS}
          value={funding}
          onChange={setFunding}
          placeholder="Select"
          searchable={false}
          required
          invalid={!!errors.funding}
          describedBy={describedBy("funding")}
        />
        {error("funding")}
      </div>
      <div className="field">
        <label htmlFor="fr-timeline">
          Preferred timeline to start <span aria-hidden="true">*</span>
        </label>
        <StateSelector
          id="fr-timeline"
          name="timeline"
          options={TIMELINE_OPTIONS}
          value={timeline}
          onChange={setTimeline}
          placeholder="Select"
          searchable={false}
          required
          invalid={!!errors.timeline}
          describedBy={describedBy("timeline")}
        />
        {error("timeline")}
      </div>
      <div className="field full">
        <label htmlFor="fr-experience">Experience in farming, livestock or business</label>
        <textarea
          id="fr-experience"
          name="experience"
          rows={4}
          placeholder="Optional. Tell us what you have done so far."
          aria-invalid={invalid("experience")}
          aria-describedby={describedBy("experience")}
        />
        {error("experience")}
      </div>
      {/* Spam trap: hidden from people, filled in by bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="fr-website">Website</label>
        <input id="fr-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="enquiryFoot full">
        <button type="submit" className="enquirySubmit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Express Your Interest"} <Arrow />
        </button>
        <p>
          By sending this form you agree to our <a href="/privacy">privacy policy</a>.
        </p>
      </div>
      {status === "failed" && (
        <p className="enquiryFailed full" role="alert">
          We could not send your response just now. Please try again, or call{" "}
          <a href="tel:+919337901430">+91-9337901430</a> or email <a href={CONTACT_INFO.emailMailto}>{CONTACT_INFO.email}</a>.
        </p>
      )}
    </form>
  )
}
