import type { Metadata } from "next"
import { AIServiceTemplate, type AIServiceSpec } from "@/components/sections/services/AIServiceTemplate"
import { IntegrationsTicker } from "@/components/shared/IntegrationsTicker"

export const metadata: Metadata = {
  title: "Marketing Automation | Revenue Ladder",
  description: "Automated lead capture, CRM workflows, and nurture sequences that route prospects to revenue. Built for Welsh and UK SMEs.",
}

function PipelinePanel() {
  const steps = [
    { label: "Form submit",  detail: "New lead captured",         status: "done" },
    { label: "Enriched",     detail: "Company + LinkedIn pulled",  status: "done" },
    { label: "Routed",       detail: "Sales owner assigned",       status: "done" },
    { label: "Slack alert",  detail: "#sales-hot-leads",           status: "done" },
    { label: "Nurture",      detail: "5-email sequence started",   status: "run"  },
    { label: "Booked",       detail: "Demo in calendar",           status: "next" },
  ]
  return (
    <div className="t1-call">
      <div className="t1-call-head">
        <div className="t1-caller">
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,196,37,.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "var(--rl-gold)", fontFamily: "var(--rl-font-display)" }}>RL</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Pipeline · Conwy Foods</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>38 leads routed this week</div>
          </div>
        </div>
      </div>
      <div className="t1-call-body" style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
        {steps.map((s) => (
          <div key={s.label} style={{ display: "grid", gridTemplateColumns: "10px 1fr auto", gap: 12, alignItems: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.status === "done" ? "var(--rl-success)" : s.status === "run" ? "var(--rl-gold)" : "rgba(255,255,255,.18)", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: s.status === "next" ? "rgba(255,255,255,.45)" : "#fff" }}>{s.label}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", fontFamily: "var(--rl-font-mono)" }}>{s.detail}</div>
            </div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" as const, padding: "2px 7px", borderRadius: 999, background: s.status === "done" ? "rgba(16,185,129,.15)" : s.status === "run" ? "rgba(255,196,37,.15)" : "rgba(255,255,255,.06)", color: s.status === "done" ? "var(--rl-success)" : s.status === "run" ? "var(--rl-gold)" : "rgba(255,255,255,.35)" }}>{s.status}</div>
          </div>
        ))}
      </div>
      <div className="t1-call-foot">
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>£840k routed through this pipeline in 2024</span>
      </div>
    </div>
  )
}

const spec: AIServiceSpec = {
  service: "Marketing Automation",
  ic: "workflow",
  h1: <>Lead lands.<br />Pipeline <em>fires</em>.<br />Sale gets booked.</>,
  sub: "Stop losing leads to slow follow-up. We build automation pipelines that capture, enrich, route, and nurture every prospect the moment they land -- so your team only picks up the phone when the deal is warm.",
  secondaryCta: "See a live pipeline",
  trustBadges: ["38 pipelines built", "£840k routed 2024", "3.4x uplift"],
  heroVisual: <PipelinePanel />,
  capsHead: {
    eyebrow: "What gets automated",
    title: <>Six things that should happen automatically.<br /><em>And never do.</em></>,
    sub: "Most businesses have leads falling through the gaps between their forms, their CRM, and their calendar. We close those gaps permanently.",
  },
  caps: [
    { ic: "inbox",    h: "Inbound capture",    p: "Every form, chat, call, and enquiry routed into one system -- no manual data entry, no leads lost to a spreadsheet." },
    { ic: "workflow", h: "CRM workflows",       p: "Deals move through your pipeline automatically based on actions: viewed pricing, booked a call, went quiet." },
    { ic: "mail",     h: "Nurture sequences",   p: "Multi-step email and SMS flows triggered by behaviour. The right message at the right time, without anyone pressing send." },
    { ic: "chat",     h: "WhatsApp + SMS",      p: "Appointment reminders, follow-ups, and booking confirmations sent automatically. Reduce no-shows, increase repeat bookings." },
    { ic: "chart",    h: "Attribution",         p: "Know which channel, campaign, and touchpoint produced the revenue. Not just the last click -- the full journey." },
    { ic: "shield",   h: "Compliance",          p: "GDPR-compliant consent capture, suppression lists, and data retention policies built in from day one." },
  ],
  proof: {
    eyebrow: "Real numbers",
    h2: "38 pipelines. £840k routed. 3.4x uplift.",
    body: "Since 2022 we have built marketing automation stacks for Welsh and UK SMEs -- food producers, hospitality groups, professional services firms. The average pipeline goes live in three weeks and pays back within the first quarter.",
    stats: [
      { v: "38",   lbl: "Pipelines built · 2022--25" },
      { v: "£840", unit: "k", lbl: "Revenue routed through RL pipelines · 2024" },
      { v: "×3.4", lbl: "Average conversion uplift vs manual follow-up" },
    ],
    quote: {
      initials: "CW",
      name: "Carys Wynne",
      role: "Founder · Conwy Foods · Caernarfon",
      text: "We had a HubSpot account we had paid for for two years and barely used. RL came in, built us a proper pipeline in three weeks, and we tripled our demo-to-close rate in the first month. It runs itself.",
      meta: "Marketing automation retainer · 14 months",
    },
  },
  diveHead: {
    eyebrow: "Under the bonnet",
    title: <>Three parts that make <em>pipelines</em> actually work.</>,
    sub: "Most marketing automation fails because the workflow logic is wrong, the data is dirty, or the nurture content is generic. We fix all three before we press go.",
  },
  diveStats: [
    { v: "< 90", unit: "s",  lbl: "Lead-to-first-touch median",  tag: "Across all pipelines" },
    { v: "×3.4",             lbl: "Avg conversion uplift",        tag: "vs manual follow-up"  },
    { v: "3",    unit: "wk", lbl: "Avg pipeline-to-live time",    tag: "Scoped builds"        },
  ],
  diveRows: [
    {
      eyebrow: "01 · Rules engine",
      h3: "A pipeline that thinks, not just routes.",
      body: "We build conditional logic that routes leads based on what they did, not just that they submitted a form. Lead score, company size, page visited, time since last touch -- it all shapes the path.",
      bullets: ["Scored lead routing by behaviour + firmographics", "Branching flows for cold vs. warm vs. re-engaged leads", "Slack alert with full lead context on every hot handoff"],
      visual: (
        <div className="t1-vis-intent">
          <div className="input">New lead · Conwy Foods form · 14:32</div>
          <div className="arrow-down" />
          <div className="router">Rules engine <span className="tag">ROUTING</span></div>
          <div className="branches">
            <div className="branch">Nurture<div className="conf">score &lt; 40</div></div>
            <div className="branch on">Sales alert<div className="conf">score 0.94</div></div>
            <div className="branch">Re-engage<div className="conf">dormant</div></div>
          </div>
        </div>
      ),
    },
    {
      eyebrow: "02 · Nurture sequences",
      h3: "Five emails that feel written for them.",
      body: "Generic drip sequences get ignored. We write nurture flows tuned to your voice, your product, and what the lead actually looked at. Each message earns the next one.",
      bullets: ["Written in your brand voice -- no AI-slop templates", "Personalised with CRM data: name, company, pages visited", "Conditional branches based on opens, clicks, and replies"],
      visual: (
        <div className="t1-vis-handoff">
          <div className="who-stack">
            {[
              { av: "D1", nm: "Welcome + value proof",                  rl: "Sent immediately · 61% open rate",          cls: "bot" },
              { av: "D3", nm: "Case study relevant to their sector",    rl: "Conditional on D1 open · 44% open rate",    cls: ""    },
              { av: "D7", nm: "Objection handled + pricing hint",       rl: "Sent if no reply to D1--3 · 38% open rate", cls: ""    },
            ].map((c) => (
              <div key={c.nm} className={`who-card${c.cls ? ` ${c.cls}` : ""}`}>
                <div className="av">{c.av}</div>
                <div><div className="nm">{c.nm}</div><div className="rl">{c.rl}</div></div>
                <div className={`pill ${c.cls === "bot" ? "run" : "done"}`}>{c.cls === "bot" ? "Live" : "Done"}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      eyebrow: "03 · Attribution",
      h3: "Know which channel earned the sale.",
      body: "Last-click attribution lies. We wire up multi-touch tracking so you know exactly which campaigns, pages, and touchpoints influenced each closed deal -- and which to cut.",
      bullets: ["First-touch, last-touch, and linear attribution models", "Campaign revenue tied to actual CRM deals", "Monthly revenue attribution report with channel-level ROI"],
      visual: (
        <div style={{ background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)", borderRadius: 20, padding: 24, minHeight: 280, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontFamily: "var(--rl-font-display)", fontWeight: 800, fontSize: 13, color: "var(--rl-fg-1)" }}>Revenue attribution · Q1 2025</div>
          {[
            { ch: "Google Ads",       pct: 38, rev: "£16.4k" },
            { ch: "Email nurture",    pct: 29, rev: "£12.5k" },
            { ch: "Organic search",   pct: 21, rev: "£9.1k"  },
            { ch: "Direct / referral",pct: 12, rev: "£5.2k"  },
          ].map((r) => (
            <div key={r.ch}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "var(--rl-fg-2)", marginBottom: 5 }}>
                <span>{r.ch}</span>
                <span style={{ fontFamily: "var(--rl-font-mono)", color: "var(--rl-forest)", fontWeight: 700 }}>{r.rev}</span>
              </div>
              <div style={{ height: 6, background: "var(--rl-bg)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${r.pct}%`, background: "linear-gradient(90deg, var(--rl-forest), var(--rl-gold))", borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ],
  hubNodes: [
    { ic: "workflow", lbl: "HubSpot",   x: 10, y: 28 },
    { ic: "mail",     lbl: "Mailchimp", x: 36, y: 8  },
    { ic: "chat",     lbl: "WhatsApp",  x: 68, y: 8  },
    { ic: "clock",    lbl: "Calendly",  x: 88, y: 32 },
    { ic: "chart",    lbl: "Plausible", x: 78, y: 74 },
    { ic: "zap",      lbl: "Zapier",    x: 12, y: 74 },
  ],
  intCats: [
    { ic: "workflow", h: "CRM platforms",           sub: "Where your deals live",      logos: [{ nm: "HubSpot", color: "#FF7A59" }, { nm: "Pipedrive", color: "#017737" }, { nm: "Salesforce", color: "#00A1E0" }, { nm: "ActiveCampaign", color: "#356AE6" }] },
    { ic: "mail",     h: "Email & messaging",        sub: "Where your sequences run",   logos: [{ nm: "Mailchimp", color: "#FFE01B" }, { nm: "Klaviyo", color: "#232323" }, { nm: "Brevo", color: "#0B996E" }, { nm: "Twilio", color: "#F22F46" }] },
    { ic: "zap",      h: "Automation middleware",    sub: "Where the logic lives",      logos: [{ nm: "Zapier", color: "#FF4A00" }, { nm: "Make", color: "#6D00CC" }, { nm: "n8n", color: "#EA4B71" }, { nm: "Relay.app", color: "#2563EB" }] },
    { ic: "chart",    h: "Analytics & attribution",  sub: "Where the truth lives",      logos: [{ nm: "Plausible", color: "#5850EC" }, { nm: "GA4", color: "#F9AB00" }, { nm: "PostHog", color: "#000000" }, { nm: "Segment", color: "#52BD95" }] },
  ],
  engage: {
    setup:   { label: "Pipeline build",    price: "from £4,800", priceSub: "+ VAT · fixed scope",           lines: ["Discovery + stack audit (week 1)", "Workflow design + copy (week 2)", "Build, test, QA (week 2--3)", "Go-live + 2-week monitoring", "Full handover + training"] },
    monthly: { label: "Tuning retainer",   price: "£399",        priceSub: "/ month · cancel any time",     lines: ["Monthly pipeline performance review", "A/B testing on sequences", "New triggers + branch logic as needed", "CRM hygiene + deduplication", "Monthly revenue attribution report"] },
    ctaCopy: "Want a pipeline that runs itself?",
  },
}

export default function MarketingAutomationPage() {
  return (
    <>
      <AIServiceTemplate spec={spec} />
      <IntegrationsTicker eyebrow="Works with your existing tools" />
    </>
  )
}
