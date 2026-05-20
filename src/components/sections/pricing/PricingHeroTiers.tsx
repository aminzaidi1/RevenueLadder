"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ArrowRight, Shield, Sparkles } from "lucide-react"

type Billing = "monthly" | "annual"

const TIERS = [
  {
    id: "assist",
    badge: "Assist",
    featured: false,
    name: "Assist",
    monthly: 1800,
    tagline: "For owner-operators who need consistent help but stay in the driving seat.",
    team: {
      label: "Your team",
      heading: "1 senior lead + shared pool",
      detail: "Half a day a week from the account lead, plus engineering + SEO time as needed.",
      avs: ["RT", "EW"],
      extraAv: false,
    },
    output: {
      label: "AI output capacity",
      heading: "Core",
      detail: "Up to 8 social posts / mo · 1 blog post · standard email flows · 1 chatbot intent set",
    },
    humans: {
      label: "Human hours",
      figure: 16,
      detail: "Per month · roll forward up to 8h · 3-day average turnaround",
    },
    vip: null as null | { label: string; lines: string[] },
    platform: [
      "Monitoring · office hours",
      "Monthly written report",
    ],
    cta: { label: "Start with Assist", variant: "btn primary lg" },
    guarantee: "30-day rolling · cancel any month",
  },
  {
    id: "delegate",
    badge: "Best fit · most popular",
    featured: true,
    name: "Delegate",
    monthly: 3400,
    tagline: "For founders who have stopped pretending they'll do the marketing themselves.",
    team: {
      label: "Your team",
      heading: "1 lead + 4-person pod",
      detail: "A senior strategist, engineer, SEO + content, and ops person on your account.",
      avs: ["RT", "EW", "CJ", "AP"],
      extraAv: true,
    },
    output: {
      label: "AI output capacity",
      heading: "Pro",
      detail: "20 posts / mo · 4 blog posts · multi-step nurture flows · 1 voice or chat agent included",
    },
    humans: {
      label: "Human hours",
      figure: 40,
      detail: "Per month · roll forward up to 16h · same-day turnaround on small jobs",
    },
    vip: {
      label: "VIP onboarding",
      lines: [
        "Stack audit + 12-page written report",
        "Quarterly strategy day, on-site or video",
        "First-look on new RL services as launched",
      ],
    },
    platform: [
      "Monitoring · office hours",
      "Monthly written report, pro",
    ],
    cta: { label: "Book a Delegate fit call", variant: "btn accent lg" },
    guarantee: "30-day rolling · cancel any month",
  },
  {
    id: "elevate",
    badge: "Elevate",
    featured: false,
    name: "Elevate",
    monthly: 5400,
    tagline: "For businesses past £500k turnover who treat marketing and ops as a system.",
    team: {
      label: "Your team",
      heading: "1 lead + dedicated 5-person pod",
      detail: "Daily Slack presence, monthly strategy day, on-site quarterly visits.",
      avs: ["RT", "EW", "CJ", "AP", "TB"],
      extraAv: false,
    },
    output: {
      label: "AI output capacity",
      heading: "Unlimited",
      detail: "Unlimited posts, blogs, flows · up to 3 voice or chat agents · custom AI agents on your data",
    },
    humans: {
      label: "Human hours",
      figure: 80,
      detail: "Per month · roll forward up to 32h · 4h SLA on priority work",
    },
    vip: null as null | { label: string; lines: string[] },
    platform: [
      "Monitoring · 24/7 on-call",
      "Monthly board-pack + annual roadmap",
    ],
    cta: { label: "Book an Elevate fit call", variant: "btn primary lg" },
    guarantee: "30-day rolling · cancel any month",
  },
]

const ADDONS = [
  { name: "Voice agent build",            detail: "One-off -- 3-week setup, you own the agent",    price: "£1,200" },
  { name: "Website rebuild",              detail: "Fixed-scope project, 4--6 weeks",               price: "from £6,800" },
  { name: "Audit & strategy week",        detail: "5-day deep audit + written roadmap",            price: "£3,400" },
  { name: "Custom AI agent on your data", detail: "Bespoke agent · usually paired with a tier",    price: "from £2,800" },
]

function fmt(n: number) {
  return n.toLocaleString("en-GB")
}

export function PricingHeroTiers() {
  const [billing, setBilling] = useState<Billing>("monthly")

  return (
    <div className="container">
      {/* Hero header */}
      <div className="pr-header">
        <span className="eyebrow forest">Plans &amp; pricing</span>
        <h1>
          Hire a senior team --<br />
          for less than the <em>cost of a hire</em>.
        </h1>
        <p className="sub">
          Three retainer tiers. One bill. All in. No surprise invoices, no upgrade tax,
          no minimum term. Pause any month with 30 days&apos; notice.
        </p>

        <div className="pr-toggle" role="tablist">
          <button
            className={billing === "monthly" ? "on" : ""}
            onClick={() => setBilling("monthly")}
            role="tab"
            aria-selected={billing === "monthly"}
          >
            Monthly
          </button>
          <button
            className={billing === "annual" ? "on" : ""}
            onClick={() => setBilling("annual")}
            role="tab"
            aria-selected={billing === "annual"}
          >
            Annually
            <span className={billing === "annual" ? "badge" : "badge dim"}>2 months free</span>
          </button>
        </div>
        <p className="pr-toggle-note">
          Prices shown in £ ex-VAT. UK-billed. Welsh registered company · #14528221.
        </p>
      </div>

      {/* Tier cards */}
      <div className="pr-tiers">
        {TIERS.map((tier) => {
          const price = billing === "annual"
            ? Math.round((tier.monthly * 10) / 12)
            : tier.monthly
          const strike = billing === "annual" ? tier.monthly : null
          const annualSaving = tier.monthly * 2
          const periodLabel = billing === "annual" ? "/ mo, billed annually" : "/ month"

          return (
            <div key={tier.id} className={`pr-tier${tier.featured ? " feat" : ""}`}>
              <div className="pr-tier-head">
                <span className={`badge${tier.featured ? " gold" : ""}`}>{tier.badge}</span>
                {billing === "annual" && (
                  <span className="save">
                    <Check size={11} strokeWidth={2.5} />
                    Save 2 months
                  </span>
                )}
              </div>

              <div className="name">{tier.name}</div>

              <div className="price">
                <span className="currency">£</span>
                <span>{fmt(price)}</span>
                <span className="small">{periodLabel}</span>
                {strike && <span className="strike">£{fmt(strike)}</span>}
              </div>

              {billing === "annual" && (
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  color: tier.featured ? "#6ee7b7" : "var(--rl-success)",
                  background: tier.featured ? "rgba(110,231,183,.10)" : "rgba(16,185,129,.08)",
                  border: `1px solid ${tier.featured ? "rgba(110,231,183,.20)" : "rgba(16,185,129,.15)"}`,
                  borderRadius: 999,
                  padding: "4px 10px",
                }}>
                  <Check size={11} strokeWidth={2.5} />
                  You save £{fmt(annualSaving)} / year
                </div>
              )}

              <div className="one-line">{tier.tagline}</div>

              {/* Team block */}
              <div className="pr-block team">
                <div className="lbl">{tier.team.label}</div>
                <div className="h">{tier.team.heading}</div>
                <div className="d">{tier.team.detail}</div>
                <div className="av-row">
                  {tier.team.avs.map((av) => (
                    <div className="av" key={av}>{av}</div>
                  ))}
                  {tier.team.extraAv && (
                    <div
                      className="av"
                      style={tier.featured
                        ? { background: "rgba(255,255,255,.10)", color: "#fff" }
                        : undefined}
                    >
                      +1
                    </div>
                  )}
                </div>
              </div>

              {/* AI output */}
              <div className="pr-block">
                <div className="lbl">{tier.output.label}</div>
                <div className="h">{tier.output.heading}</div>
                <div className="d">{tier.output.detail}</div>
              </div>

              {/* Human hours */}
              <div className="pr-block">
                <div className="lbl">{tier.humans.label}</div>
                <div className="figure">
                  {tier.humans.figure}<small>h / mo</small>
                </div>
                <div className="d">{tier.humans.detail}</div>
              </div>

              {/* VIP onboarding (Delegate only) */}
              {tier.vip && (
                <div className="pr-block">
                  <div className="lbl">{tier.vip.label}</div>
                  <ul className="features" style={{ paddingTop: 4 }}>
                    {tier.vip.lines.map((line) => (
                      <li key={line}>
                        <Check size={13} strokeWidth={2.5} />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ul className="features">
                {tier.platform.map((line) => (
                  <li key={line}>
                    <Check size={13} strokeWidth={2.5} />
                    {line}
                  </li>
                ))}
              </ul>

              <div className="cta">
                <Link href="/contact" className={tier.cta.variant}>
                  {tier.cta.label} <ArrowRight size={14} />
                </Link>
                <div className="guarantee">
                  <Shield size={12} strokeWidth={2.5} />
                  {tier.guarantee}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className="pr-context">
        Not sure which tier fits this quarter?{" "}
        <Link href="/contact" style={{ color: "var(--rl-forest)", fontWeight: 700 }}>
          Book a 30-minute fit call
        </Link>{" "}
        -- we&apos;ll walk your stack and tell you straight. Move tiers any month with 30 days&apos; notice.
      </p>

      <details className="pr-addons">
        <summary>
          <Sparkles size={14} strokeWidth={2.5} />
          Power-ups &amp; one-off add-ons
          <ArrowRight
            size={14}
            strokeWidth={2.5}
            style={{ transform: "rotate(90deg)", transition: "transform 200ms" }}
          />
        </summary>
        <div className="pr-addons-grid">
          {ADDONS.map((addon) => (
            <div className="pr-addon" key={addon.name}>
              <div className="nm">
                <span>{addon.name}</span>
                <span className="price">{addon.price}</span>
              </div>
              <div className="d">{addon.detail}</div>
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}
