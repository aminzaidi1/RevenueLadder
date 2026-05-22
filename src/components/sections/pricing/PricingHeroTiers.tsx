"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ArrowRight, Shield, Sparkles } from "lucide-react"
import { TIERS, ADDONS, fmtPrice as fmt } from "@/lib/pricing-data"

type Billing = "monthly" | "annual"

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
                  color: "var(--rl-success)",
                  background: tier.featured ? "var(--rl-success-bg)" : "rgba(16,185,129,.08)",
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
