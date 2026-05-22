"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"

const SERVICES = [
  "Web development",
  "Web app development",
  "SEO",
  "Marketing automation",
  "Voice agents",
  "Chatbots",
  "Personalised AI agents",
  "Content generation",
  "Automated social media",
  "AI consultation",
  "DevOps & hosting",
  "Audit & strategy",
  "Retainer",
  "Not sure yet",
]

const BUDGETS = [
  "Under £1,000",
  "£1,000 to £5,000",
  "£5,000 to £15,000",
  "£15,000 or more",
  "Not sure yet",
]

interface FormState {
  name: string
  email: string
  company: string
  phone: string
  service: string
  budget: string
  message: string
}

type Status = "idle" | "loading" | "success" | "error"

const EMPTY: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          company: form.company || undefined,
          phone: form.phone || undefined,
          service: form.service || undefined,
          budget: form.budget || undefined,
        }),
      })

      if (res.ok) {
        setStatus("success")
        setForm(EMPTY)
      } else {
        const data: unknown = await res.json()
        const msg =
          data && typeof data === "object" && "error" in data && typeof (data as Record<string, unknown>).error === "string"
            ? (data as Record<string, string>).error
            : "Something went wrong. Please try again."
        setErrorMsg(msg)
        setStatus("error")
      }
    } catch {
      setErrorMsg("Could not reach the server. Please check your connection and try again.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 20, padding: "64px 32px", textAlign: "center", background: "var(--rl-surface)",
        borderRadius: "var(--rl-radius-lg)", border: "2px solid var(--rl-forest)",
      }}>
        <CheckCircle size={48} color="var(--rl-forest)" strokeWidth={1.5} />
        <div>
          <h3 style={{ fontFamily: "var(--rl-font-display)", fontSize: 24, fontWeight: 700, color: "var(--rl-fg-1)", marginBottom: 8 }}>
            Enquiry received
          </h3>
          <p style={{ fontSize: 15, color: "var(--rl-fg-2)", lineHeight: 1.6, maxWidth: 360 }}>
            Thank you for getting in touch. We review every enquiry personally and will respond within one working day.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {status === "error" && (
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px",
          background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: "var(--rl-radius-md)",
          color: "#b91c1c", fontSize: 14, lineHeight: 1.5,
        }}>
          <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-name">Full name <span style={{ color: "var(--rl-forest)" }}>*</span></label>
          <input
            id="cf-name"
            type="text"
            value={form.name}
            onChange={set("name")}
            placeholder="Jane Smith"
            required
            autoComplete="name"
          />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email address <span style={{ color: "var(--rl-forest)" }}>*</span></label>
          <input
            id="cf-email"
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="jane@example.com"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-company">Company</label>
          <input
            id="cf-company"
            type="text"
            value={form.company}
            onChange={set("company")}
            placeholder="Optional"
            autoComplete="organization"
          />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">Phone</label>
          <input
            id="cf-phone"
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="Optional"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label htmlFor="cf-service">Service</label>
          <select id="cf-service" value={form.service} onChange={set("service")}>
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="cf-budget">Budget</label>
          <select id="cf-budget" value={form.budget} onChange={set("budget")}>
            <option value="">Select a budget</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-message">Message <span style={{ color: "var(--rl-forest)" }}>*</span></label>
        <textarea
          id="cf-message"
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us about your project or challenge..."
          required
          rows={5}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn primary"
        style={{ alignSelf: "flex-start", minWidth: 160, opacity: status === "loading" ? 0.7 : 1 }}
      >
        {status === "loading" ? "Sending..." : "Send enquiry"}
      </button>
    </form>
  )
}
