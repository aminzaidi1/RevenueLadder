import type { Metadata } from "next"
import { AIServiceTemplate, type AIServiceSpec } from "@/components/sections/services/AIServiceTemplate"
import { IntegrationsTicker } from "@/components/shared/IntegrationsTicker"

export const metadata: Metadata = {
  title: "AI Consultation | Revenue Ladder",
  description: "A structured AI audit that finds where automation pays in your business -- with a prioritised roadmap and projected ROI. Built for Welsh and UK SMEs.",
}

function AuditReport() {
  const findings = [
    { area: "Inbox triage",      saving: "£18k / yr", effort: "Low", priority: "high" },
    { area: "Quote generation",  saving: "£11k / yr", effort: "Med", priority: "high" },
    { area: "Reporting",         saving: "£6k / yr",  effort: "Low", priority: "med"  },
    { area: "Social scheduling", saving: "£4k / yr",  effort: "Low", priority: "med"  },
  ]
  return (
    <div className="t1-call">
      <div className="t1-call-head">
        <div className="t1-caller">
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,196,37,.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "var(--rl-gold)" }}>RL</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>AI Opportunity Audit</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>Conwy Foods · £39k yr-1 identified</div>
          </div>
        </div>
      </div>
      <div className="t1-call-body" style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
        {findings.map((f) => (
          <div key={f.area} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 10, alignItems: "center", background: "rgba(255,255,255,.04)", borderRadius: 10, padding: "10px 12px" }}>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{f.area}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", fontFamily: "var(--rl-font-mono)" }}>Effort: {f.effort}</div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "var(--rl-gold)", fontFamily: "var(--rl-font-mono)" }}>{f.saving}</div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" as const, padding: "2px 7px", borderRadius: 999, background: f.priority === "high" ? "rgba(255,196,37,.15)" : "rgba(16,185,129,.15)", color: f.priority === "high" ? "var(--rl-gold)" : "var(--rl-success)" }}>{f.priority}</div>
          </div>
        ))}
      </div>
      <div className="t1-call-foot">
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>Roadmap: 4 automations · payback in 6 weeks</span>
      </div>
    </div>
  )
}

const spec: AIServiceSpec = {
  service: "AI Consultation",
  ic: "sparkles",
  h1: <>Find where AI pays<br />in your business.<br /><em>Before you spend a penny.</em></>,
  sub: "A structured audit of your business that identifies where automation saves money, maps a prioritised roadmap, and projects the ROI for each opportunity -- so you invest in what works, not what sounds impressive.",
  secondaryCta: "See a sample audit",
  trustBadges: ["62 audits completed", "£39k avg opportunity", "< 6 wk payback"],
  heroVisual: <AuditReport />,
  capsHead: {
    eyebrow: "What the audit covers",
    title: <>Six lenses. <em>One clear roadmap.</em></>,
    sub: "We look at every part of your business through the lens of automation potential -- not to sell you tools, but to find where the real saving is.",
  },
  caps: [
    { ic: "inbox",    h: "Process mapping",       p: "We document every repetitive process in your business: who does it, how long it takes, how often. That is the baseline." },
    { ic: "chart",    h: "Opportunity scoring",    p: "Each process is scored on savings potential, implementation effort, and business risk. You see exactly what to do first." },
    { ic: "sparkles", h: "Tool recommendation",    p: "We recommend the right tools for your stack and your team -- not the most expensive, the most appropriate." },
    { ic: "target",   h: "ROI projection",         p: "For every opportunity, we model the cost, the saving, and the payback period. No vague promises -- real numbers." },
    { ic: "rocket",   h: "Prioritised roadmap",    p: "A 90-day plan with quick wins first and long-term builds sequenced correctly. Handed over as a working document, not a slide deck." },
    { ic: "users",    h: "Team readiness review",  p: "Automation fails when the team is not ready for it. We assess skill gaps, flag resistance risks, and recommend change management steps." },
  ],
  proof: {
    eyebrow: "Real numbers",
    h2: "62 audits. £39k average. Under 6 weeks.",
    body: "Across 62 AI audits delivered since 2022, the average opportunity identified is £39k in year-one savings. The median payback period on the first automation is under six weeks from go-live.",
    stats: [
      { v: "62",  lbl: "AI audits completed · 2022--25" },
      { v: "£39", unit: "k",  lbl: "Average yr-1 opportunity identified per audit" },
      { v: "< 6", unit: "wk", lbl: "Median payback on first automation post-audit" },
    ],
    quote: {
      initials: "CW",
      name: "Carys Wynne",
      role: "Founder · Conwy Foods · Caernarfon",
      text: "We knew we were leaving time on the table but had no idea where. The audit gave us four specific automations, the cost of each, and the saving. We did the first one in week two -- it paid for the audit by week five. The roadmap has been our plan ever since.",
      meta: "AI audit completed Jan 2025 · 3 automations live",
    },
  },
  diveHead: {
    eyebrow: "How the audit works",
    title: <>Three stages from brief to <em>working roadmap</em>.</>,
    sub: "An AI audit is only useful if it produces something actionable. Ours ends with a prioritised plan, projected numbers, and a clear first step -- not a report that gathers dust.",
  },
  diveStats: [
    { v: "5",    unit: "d",  lbl: "From kick-off to audit delivery",  tag: "Standard audit"           },
    { v: "£39",  unit: "k",  lbl: "Average opportunity identified",   tag: "Yr-1 saving per audit"    },
    { v: "< 6",  unit: "wk", lbl: "Median payback on first build",    tag: "Post-audit, post-go-live"  },
  ],
  diveRows: [
    {
      eyebrow: "01 · Discover",
      h3: "Map everything before you automate anything.",
      body: "We spend the first two days inside your business -- your tools, your team, your processes. We document what exists, what is manual, what breaks, and what the team hates doing. No assumptions.",
      bullets: ["Process inventory across all departments", "Tool and integration audit -- what you pay for vs what you use", "Team interviews to surface hidden bottlenecks"],
      visual: (
        <div className="t1-vis-handoff">
          <div className="who-stack">
            {[
              { av: "P1", nm: "Process inventory", rl: "32 processes mapped · 14 flagged",  cls: "bot" },
              { av: "P2", nm: "Tool audit",        rl: "8 tools · 3 underused · 2 overlap", cls: ""    },
              { av: "P3", nm: "Team interviews",   rl: "6 staff · top pain: inbox + quotes", cls: ""   },
            ].map((c) => (
              <div key={c.nm} className={`who-card${c.cls ? ` ${c.cls}` : ""}`}>
                <div className="av">{c.av}</div>
                <div><div className="nm">{c.nm}</div><div className="rl">{c.rl}</div></div>
                <div className={`pill ${c.cls === "bot" ? "run" : "done"}`}>{c.cls === "bot" ? "Active" : "Done"}</div>
              </div>
            ))}
          </div>
          <div className="swap-note">Discovery complete -- 14 automation candidates identified.</div>
        </div>
      ),
    },
    {
      eyebrow: "02 · Score",
      h3: "Prioritise by saving, not by novelty.",
      body: "Every candidate automation is scored against three axes: financial saving, implementation effort, and business risk. We weight saving highest. The result is a ranked list -- not a wishlist.",
      bullets: ["Saving, effort, and risk scored independently", "Financial model: cost to build vs. year-one saving", "Quick wins separated from strategic builds"],
      visual: (
        <div className="t1-vis-intent">
          <div className="input">Automation candidates · Conwy Foods</div>
          <div className="arrow-down" />
          <div className="router">Opportunity scorer <span className="tag">RANKED</span></div>
          <div className="branches">
            <div className="branch on">Inbox triage<div className="conf">£18k / 6wk</div></div>
            <div className="branch on">Quote gen<div className="conf">£11k / 8wk</div></div>
            <div className="branch">Reporting<div className="conf">£6k / 3wk</div></div>
          </div>
        </div>
      ),
    },
    {
      eyebrow: "03 · Roadmap",
      h3: "A working plan, not a slide deck.",
      body: "The audit ends with a prioritised 90-day roadmap: quick wins first, longer builds sequenced behind them. Every item has a cost estimate, saving projection, and recommended tool. You can hand it to any developer and build immediately.",
      bullets: ["90-day roadmap with week-by-week sequencing", "Cost and saving estimate for every automation", "Tool recommendation + build spec for each item"],
      visual: (
        <div className="t1-vis-handoff">
          <div className="who-stack">
            <div className="who-card bot">
              <div className="av">W1</div>
              <div><div className="nm">Week 1--2: Inbox triage</div><div className="rl">Build £1,400 · saving £18k/yr</div></div>
              <div className="pill run">Priority</div>
            </div>
            <div className="who-card">
              <div className="av">W3</div>
              <div><div className="nm">Week 3--5: Quote generation</div><div className="rl">Build £2,200 · saving £11k/yr</div></div>
              <div className="pill done">Queued</div>
            </div>
            <div className="who-card">
              <div className="av">W6</div>
              <div><div className="nm">Week 6: Reporting automation</div><div className="rl">Build £800 · saving £6k/yr</div></div>
              <div className="pill done">Queued</div>
            </div>
          </div>
          <div className="swap-note">Roadmap delivered as a Notion doc -- ready to act on immediately.</div>
        </div>
      ),
    },
  ],
  hubNodes: [
    { ic: "workflow", lbl: "HubSpot", x: 10, y: 28 },
    { ic: "book",     lbl: "Notion",  x: 36, y: 8  },
    { ic: "chart",    lbl: "PostHog", x: 68, y: 8  },
    { ic: "mail",     lbl: "Outlook", x: 88, y: 32 },
    { ic: "zap",      lbl: "Zapier",  x: 78, y: 74 },
    { ic: "chat",     lbl: "Slack",   x: 12, y: 74 },
  ],
  intCats: [
    { ic: "workflow", h: "CRM & ops",        sub: "Where processes live",        logos: [{ nm: "HubSpot", color: "#FF7A59" }, { nm: "Pipedrive", color: "#017737" }, { nm: "Airtable", color: "#18BFFF" }, { nm: "Monday", color: "#FF3D57" }] },
    { ic: "zap",      h: "Automation tools", sub: "What we recommend and build", logos: [{ nm: "Zapier", color: "#FF4A00" }, { nm: "Make", color: "#6D00CC" }, { nm: "n8n", color: "#EA4B71" }, { nm: "Relay.app", color: "#2563EB" }] },
    { ic: "book",     h: "Knowledge base",   sub: "Where the roadmap lives",     logos: [{ nm: "Notion", color: "#000000" }, { nm: "Confluence", color: "#0052CC" }, { nm: "Google Docs", color: "#4285F4" }, { nm: "Coda", color: "#E3543A" }] },
    { ic: "chart",    h: "Analytics",        sub: "Where we measure the saving", logos: [{ nm: "PostHog", color: "#000000" }, { nm: "GA4", color: "#F9AB00" }, { nm: "Plausible", color: "#5850EC" }, { nm: "Metabase", color: "#509EE3" }] },
  ],
  engage: {
    setup:   { label: "AI audit",          price: "£3,400", priceSub: "+ VAT · delivered in 5 days",  lines: ["Process mapping across all departments", "Opportunity scoring + ROI projection", "Tool and integration audit", "Prioritised 90-day roadmap", "1-hour debrief + Q&A session"] },
    monthly: { label: "Strategy retainer", price: "£699",   priceSub: "/ month · cancel any time",    lines: ["Monthly roadmap review + re-prioritisation", "New automation scoping as business grows", "Build oversight: QA and sign-off on new automations", "Quarterly savings review vs projection", "Direct Slack access to your strategist"] },
    ctaCopy: "Ready to find out where AI pays in your business?",
  },
}

export default function AIConsultationPage() {
  return (
    <>
      <AIServiceTemplate spec={spec} />
      <IntegrationsTicker eyebrow="We audit and connect your existing tools" />
    </>
  )
}
