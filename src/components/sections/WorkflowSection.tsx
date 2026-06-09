"use client"

import { useState } from "react"
import { Share2, Mic, Globe, Workflow, CheckCircle, Settings, Target, PenLine, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SectionHeader } from "@/components/ui/SectionHeader"

interface BuildTask {
  t: string
  pct: number
  done: boolean
}

interface UseCase {
  id: string
  label: string
  Icon: LucideIcon
  user: string
  plan: { title: string; body: string }
  write: string
  build: BuildTask[]
  done: { t: string; s: string }
  foot: string
}

const USE_CASES: UseCase[] = [
  {
    id: "social",
    label: "Launch a social campaign",
    Icon: Share2,
    user: "I need a weekly LinkedIn pipeline — 4 posts on the trade, 1 founder note. Tuesday and Thursday.",
    plan: {
      title: "Content calendar drafted",
      body: "5 posts / week · 4 industry, 1 founder · approval Mondays · auto-cross-posted to X and Threads.",
    },
    write: "Drafting captions and hooks, in your voice…",
    build: [
      { t: "Designing carousels",    pct: 100, done: true },
      { t: "Editing reels (3)",      pct: 100, done: true },
      { t: "Scheduling to Buffer",   pct: 82,  done: false },
      { t: "Smart-link redirects",   pct: 40,  done: false },
    ],
    done: { t: "Campaign scheduled", s: "Auto-posting on for the next 12 weeks" },
    foot: "Approved by Eleri · 14:03",
  },
  {
    id: "voice",
    label: "Set up a voice agent",
    Icon: Mic,
    user: "Need an after-hours line for the tasting Saturdays. Should book, reschedule, and route emergencies to me.",
    plan: {
      title: "Agent script + scope",
      body: "Voice Bryn · Welsh-English · 3 intents: book / cancel / urgent · escalation rings your mobile after 22:00.",
    },
    write: "Writing intents, prompts, and fall-back lines…",
    build: [
      { t: "Calendar connected",      pct: 100, done: true },
      { t: "Stripe deposit flow",     pct: 100, done: true },
      { t: "Latency tuning",          pct: 76,  done: false },
      { t: "Edge-case QA (32 calls)", pct: 50,  done: false },
    ],
    done: { t: "Bryn is live", s: "Answering 24/7 · summaries to inbox" },
    foot: "First booking in 38 mins",
  },
  {
    id: "site",
    label: "Build a landing page",
    Icon: Globe,
    user: "Need a page for the new accessibility audit service. Local SEO, two CTAs, one testimonial.",
    plan: {
      title: "Page outline + brief",
      body: "Slug /accessibility-audit · Bangor + Conwy targets · two CTAs (book / quote) · indexed in week one.",
    },
    write: "Drafting copy and meta — short, plain, local…",
    build: [
      { t: "Hero + form built",       pct: 100, done: true },
      { t: "Schema markup",           pct: 100, done: true },
      { t: "Indexing + sitemap ping", pct: 84,  done: false },
      { t: "Performance pass",        pct: 60,  done: false },
    ],
    done: { t: "Page live, indexed", s: "First impressions in Google by Friday" },
    foot: "Mobile score · 96 / 100",
  },
  {
    id: "auto",
    label: "Wire up your tools",
    Icon: Workflow,
    user: "Our enquiry form, CRM, and Slack don't talk. Can you join them up and stop the duplicates?",
    plan: {
      title: "Integration map drafted",
      body: "Form to HubSpot to Slack #leads to owner round-robin · dedupe by email · weekly Monday digest.",
    },
    write: "Drafting field mapping and routing rules…",
    build: [
      { t: "HubSpot pipeline wired",  pct: 100, done: true },
      { t: "Slack alerts",            pct: 100, done: true },
      { t: "Round-robin owner rota",  pct: 70,  done: false },
      { t: "Dedupe + cleanup",        pct: 30,  done: false },
    ],
    done: { t: "Pipeline live", s: "Zero double-handling since Tuesday" },
    foot: "Cuts ~6h / wk of admin",
  },
]

const CARD_BASE: React.CSSProperties = {
  borderRadius: 16, padding: "18px 20px",
  display: "flex", flexDirection: "column", gap: 12,
}

const AVATAR_BASE: React.CSSProperties = {
  width: 32, height: 32, borderRadius: "50%",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: 11, fontWeight: 800, flexShrink: 0,
  fontFamily: "var(--font-montserrat, var(--rl-font-display))",
}

export function WorkflowSection() {
  const [activeId, setActiveId] = useState(USE_CASES[0].id)
  const uc = USE_CASES.find((u) => u.id === activeId) ?? USE_CASES[0]

  return (
    <section className="rl-section-pad" style={{ background: "var(--rl-bg-warm)" }} id="how">
      <div style={{ maxWidth: 1240, margin: "0 auto" }} className="rl-px">

        <SectionHeader
          eyebrow="How it actually works"
          heading={<>You say what you need.<br />It gets <em>done</em>.</>}
          description="Tell us what you need. We handle strategy, copy, design, build, and ship — then write back when it's live. Pick a use case to see the same flow rewired around it."
        />

        {/* Use-case switcher */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          {USE_CASES.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveId(id)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "9px 18px", borderRadius: 12,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                fontFamily: "var(--rl-font-body)",
                border: activeId === id ? "2px solid var(--rl-forest)" : "2px solid var(--rl-border)",
                background: activeId === id ? "var(--rl-forest)" : "var(--rl-surface)",
                color: activeId === id ? "#fff" : "var(--rl-fg-2)",
                transition: "all 160ms ease",
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* 5-step pipeline */}
        <div style={{ maxWidth: 740, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Step 1 */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ maxWidth: 520, width: "100%" }}>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--rl-fg-3)", marginBottom: 6, textAlign: "right" }}>
                Step 01
              </div>
              <div style={{ ...CARD_BASE, background: "var(--rl-gold-tint)", border: "2px solid var(--rl-gold-tint-2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ ...AVATAR_BASE, background: "var(--rl-gold)", color: "var(--rl-forest)" }}>You</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--rl-gold-deep)" }}>You</div>
                    <div style={{ fontSize: 11, color: "var(--rl-fg-3)" }}>via WhatsApp · just now</div>
                  </div>
                  <Zap size={14} style={{ color: "var(--rl-gold-deep)", marginLeft: "auto" }} />
                </div>
                <p style={{ fontSize: 14, color: "var(--rl-fg-1)", lineHeight: 1.6, fontStyle: "italic" }}>
                  &ldquo;{uc.user}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ maxWidth: 520, width: "100%" }}>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--rl-fg-3)", marginBottom: 6 }}>
                Step 02
              </div>
              <div style={{ ...CARD_BASE, background: "var(--rl-forest-tint)", border: "2px solid var(--rl-forest-tint-2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ ...AVATAR_BASE, background: "var(--rl-forest)", color: "#fff" }}>RT</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--rl-forest)" }}>Rhys · Strategy lead</div>
                    <div style={{ fontSize: 11, color: "var(--rl-fg-3)" }}>Planning</div>
                  </div>
                  <Target size={14} style={{ color: "var(--rl-forest)", marginLeft: "auto" }} />
                </div>
                <div style={{ background: "var(--rl-surface)", borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "var(--rl-fg-1)", marginBottom: 4 }}>{uc.plan.title}</div>
                  <div style={{ fontSize: 13, color: "var(--rl-fg-2)", lineHeight: 1.5 }}>{uc.plan.body}</div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--rl-fg-3)" }}>
                  <span>Scoped + priced in under 24h</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--rl-success)", fontWeight: 700 }}>
                    <CheckCircle size={11} strokeWidth={3} /> Approved
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ maxWidth: 520, width: "100%" }}>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--rl-fg-3)", marginBottom: 6, textAlign: "right" }}>
                Step 03
              </div>
              <div style={{ ...CARD_BASE, background: "var(--rl-gold-tint)", border: "2px solid var(--rl-gold-tint-2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ ...AVATAR_BASE, background: "var(--rl-gold)", color: "var(--rl-forest)" }}>CJ</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--rl-gold-deep)" }}>Catrin · Copy &amp; SEO</div>
                    <div style={{ fontSize: 11, color: "var(--rl-fg-3)" }}>Drafting</div>
                  </div>
                  <PenLine size={14} style={{ color: "var(--rl-gold-deep)", marginLeft: "auto" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--rl-fg-2)", fontStyle: "italic" }}>
                  <span style={{ display: "flex", gap: 3 }}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--rl-gold-deep)", display: "inline-block", opacity: 0.6 + i * 0.2 }} />
                    ))}
                  </span>
                  {uc.write}
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ maxWidth: 520, width: "100%" }}>
              <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".14em", color: "var(--rl-fg-3)", marginBottom: 6 }}>
                Step 04
              </div>
              <div style={{ ...CARD_BASE, background: "var(--rl-forest-tint)", border: "2px solid var(--rl-forest-tint-2)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ ...AVATAR_BASE, background: "var(--rl-forest)", color: "#fff" }}>EW</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--rl-forest)" }}>Eira · Engineering</div>
                    <div style={{ fontSize: 11, color: "var(--rl-fg-3)" }}>Building</div>
                  </div>
                  <Settings size={14} style={{ color: "var(--rl-forest)", marginLeft: "auto" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {uc.build.map(({ t, pct, done }) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                      <CheckCircle size={12} strokeWidth={done ? 3 : 2} style={{ color: done ? "var(--rl-success)" : "var(--rl-fg-3)", flexShrink: 0 }} />
                      <span style={{ flex: 1, color: done ? "var(--rl-fg-1)" : "var(--rl-fg-2)" }}>{t}</span>
                      <div style={{ width: 60, height: 4, borderRadius: 9999, background: "var(--rl-border)", overflow: "hidden", flexShrink: 0 }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: done ? "var(--rl-success)" : "var(--rl-forest)", borderRadius: 9999 }} />
                      </div>
                      <span style={{ width: 28, textAlign: "right", color: "var(--rl-fg-3)", fontFamily: "var(--rl-font-mono)", fontSize: 10 }}>{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 16,
              background: "var(--rl-forest)", color: "#fff",
              borderRadius: 16, padding: "18px 28px",
              boxShadow: "var(--rl-shadow-pop)",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(255,255,255,.15)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <CheckCircle size={20} strokeWidth={2.5} style={{ color: "#86efac" }} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, fontFamily: "var(--font-montserrat, var(--rl-font-display))" }}>
                  {uc.done.t}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 2 }}>{uc.done.s}</div>
              </div>
              <div style={{ display: "flex", marginLeft: 8 }}>
                {["RT", "CJ", "EW"].map((initials, i) => (
                  <div key={initials} style={{
                    width: 26, height: 26, borderRadius: "50%",
                    border: "2px solid var(--rl-forest)",
                    background: "rgba(255,255,255,.15)",
                    marginLeft: i === 0 ? 0 : -8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 800,
                    fontFamily: "var(--font-montserrat, var(--rl-font-display))",
                  }}>
                    {initials}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", marginTop: 28, fontSize: 12, color: "var(--rl-fg-3)", fontFamily: "var(--rl-font-mono)" }}>
          {uc.foot}
        </p>

      </div>
    </section>
  )
}
