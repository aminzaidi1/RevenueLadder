import type { Metadata } from "next"
import { AIServiceTemplate, type AIServiceSpec } from "@/components/sections/services/AIServiceTemplate"

export const metadata: Metadata = {
  title: "Personalised AI Agents | RevenueLadder",
  description: "Custom AI agents that live where your team works -- triaging inboxes, drafting responses, monitoring sites, and taking notes on calls. Built for Welsh and UK SMEs.",
}

function AgentRoster() {
  const agents = [
    { nm: "Scout",     role: "Pipeline triage",  actions: "142 actions today", status: "run"  },
    { nm: "Drafter",   role: "Email drafts",      actions: "38 drafts queued",  status: "run"  },
    { nm: "Ranger",    role: "Site monitoring",   actions: "All green",         status: "done" },
    { nm: "Notetaker", role: "Call notes",        actions: "3 calls today",     status: "done" },
  ]
  return (
    <div className="t1-call">
      <div className="t1-call-head">
        <div className="t1-caller">
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,196,37,.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "var(--rl-gold)" }}>BH</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Bryn Hall Hotels · Agent team</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>4 agents · 142 actions today</div>
          </div>
        </div>
      </div>
      <div className="t1-call-body" style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        {agents.map((a) => (
          <div key={a.nm} style={{ display: "grid", gridTemplateColumns: "36px 1fr auto", gap: 12, alignItems: "center", background: "rgba(255,255,255,.04)", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,196,37,.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "var(--rl-gold)", fontFamily: "var(--rl-font-display)" }}>{a.nm[0]}</div>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{a.nm}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", fontFamily: "var(--rl-font-mono)" }}>{a.role} · {a.actions}</div>
            </div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" as const, padding: "2px 7px", borderRadius: 999, background: a.status === "run" ? "rgba(255,196,37,.15)" : "rgba(16,185,129,.15)", color: a.status === "run" ? "var(--rl-gold)" : "var(--rl-success)" }}>{a.status === "run" ? "Running" : "Done"}</div>
          </div>
        ))}
      </div>
      <div className="t1-call-foot">
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>£420k operational saving projected yr-1</span>
      </div>
    </div>
  )
}

const spec: AIServiceSpec = {
  service: "Personalised AI Agents",
  ic: "bot",
  h1: <>Agents that <em>live</em><br />where your team works.<br />Trained on your business.</>,
  sub: "Custom AI agents that sit inside your tools -- Slack, email, CRM, your website -- triage what matters, draft what needs writing, monitor what might break, and surface what your team needs to know.",
  secondaryCta: "See an agent in action",
  trustBadges: ["4 agent types deployed", "142 actions / day avg", "£420k saving projected"],
  heroVisual: <AgentRoster />,
  capsHead: {
    eyebrow: "Six agent types we deploy",
    title: <>Six agents. <em>One team.</em></>,
    sub: "Each agent is purpose-built for a specific job. They work together -- Scout triages, Drafter writes, Ranger monitors, Notetaker listens. Your team does the judgement calls.",
  },
  caps: [
    { ic: "inbox",    h: "Inbox + lead triage",   p: "Reads every inbound email or CRM entry, scores it, routes it, and drafts a suggested reply -- before your team opens the thread." },
    { ic: "pencil",   h: "Drafter",               p: "Writes first-draft responses, proposals, and follow-ups in your voice. Your team reviews and sends -- or does not." },
    { ic: "eye",      h: "Site monitor",           p: "Watches your site, your competitors, and your data feeds for changes that matter. Alerts you before customers notice." },
    { ic: "mic",      h: "Notetaker",              p: "Joins calls, transcribes, extracts action points, and drops a structured summary into your CRM or Notion within 60 seconds of the call ending." },
    { ic: "chart",    h: "Reporter",               p: "Pulls data from your tools every morning and writes a plain-English summary. No dashboard-staring, no manual reports." },
    { ic: "sparkles", h: "Bespoke",               p: "If it is repetitive, rule-based, and done on a screen, we can probably automate it. Tell us the job -- we will tell you if it is possible." },
  ],
  proof: {
    eyebrow: "Real numbers",
    h2: "4 agents. 142 actions a day. £420k projected.",
    body: "Bryn Hall Hotels runs a team of four agents that between them handle what used to take two full-time admin staff. The projected year-one saving is £420k once the full team is deployed.",
    stats: [
      { v: "4",    lbl: "Active agents deployed at Bryn Hall Hotels" },
      { v: "142",  lbl: "Automated actions per day across agent team" },
      { v: "£420", unit: "k", lbl: "Projected yr-1 operational saving" },
    ],
    quote: {
      initials: "AT",
      name: "Aled Thomas",
      role: "COO · Bryn Hall Hotels · Snowdonia",
      text: "We started with Scout triaging our group enquiry inbox. Within two weeks we added Drafter for proposal first drafts. Those two agents alone freed up 18 hours a week of senior staff time. The agents do not take days off and they do not get tired on a Friday afternoon.",
      meta: "4-agent deployment · 6 months live",
    },
  },
  diveHead: {
    eyebrow: "How we build agents that work",
    title: <>Three things that separate <em>useful agents</em> from demos.</>,
    sub: "Most AI agent demos are impressive for 10 minutes and unreliable in production. We build agents that work reliably because we constrain them carefully.",
  },
  diveStats: [
    { v: "< 24", unit: "h",  lbl: "From brief to first agent running",  tag: "Scoped builds"       },
    { v: "142",              lbl: "Actions per day, per agent team",     tag: "Bryn Hall Hotels"    },
    { v: "99.4", unit: "%",  lbl: "Task completion rate",               tag: "Across all deployments" },
  ],
  diveRows: [
    {
      eyebrow: "01 · Permissions",
      h3: "Agents that know their limits.",
      body: "Every agent runs with the minimum permissions needed for its job. Scout can read your inbox and suggest -- it cannot send. Drafter can write -- it cannot publish. Permissions are explicit, audited, and shown to you before go-live.",
      bullets: ["Read-only by default -- write access only where required", "Audit log of every action the agent takes", "Kill switch per agent -- pause in one click"],
      visual: (
        <div className="t1-vis-intent">
          <div className="input">Scout agent · permission matrix</div>
          <div className="arrow-down" />
          <div className="router">Permissions check <span className="tag">AUDIT</span></div>
          <div className="branches">
            <div className="branch on">Read email<div className="conf">granted</div></div>
            <div className="branch on">Write draft<div className="conf">granted</div></div>
            <div className="branch">Send email<div className="conf">denied</div></div>
          </div>
        </div>
      ),
    },
    {
      eyebrow: "02 · Data sources",
      h3: "Trained on your data, not the internet.",
      body: "Your agents know your business because we connect them to your actual data -- your CRM, your docs, your email history, your product catalogue. They do not hallucinate facts they should know.",
      bullets: ["Connected to CRM, docs, email, and product data", "Private retrieval -- your data never trains public models", "Data freshness controls: live, daily, or weekly sync"],
      visual: (
        <div className="t1-vis-handoff">
          <div className="who-stack">
            {[
              { av: "CR", nm: "CRM data",        rl: "HubSpot · live sync",           cls: "bot" },
              { av: "DC", nm: "Document store",  rl: "Notion + Google Drive · daily",  cls: ""    },
              { av: "EM", nm: "Email history",   rl: "Outlook · 90-day window",        cls: ""    },
            ].map((c) => (
              <div key={c.nm} className={`who-card${c.cls ? ` ${c.cls}` : ""}`}>
                <div className="av">{c.av}</div>
                <div><div className="nm">{c.nm}</div><div className="rl">{c.rl}</div></div>
                <div className={`pill ${c.cls === "bot" ? "run" : "done"}`}>{c.cls === "bot" ? "Live" : "Synced"}</div>
              </div>
            ))}
          </div>
          <div className="swap-note"><b>Private retrieval:</b> your data never leaves your environment to train public models.</div>
        </div>
      ),
    },
    {
      eyebrow: "03 · Handoff",
      h3: "Knows when to stop and ask.",
      body: "The most important thing an agent can do is recognise when it is out of its depth. Our agents have confidence thresholds and escalation paths built in from day one -- they surface uncertainty rather than hide it.",
      bullets: ["Confidence threshold triggers human review before acting", "Uncertain outputs are flagged, not silently submitted", "Weekly accuracy review included in every care plan"],
      visual: (
        <div className="t1-vis-handoff">
          <div className="who-stack">
            <div className="who-card bot">
              <div className="av">S</div>
              <div><div className="nm">Scout</div><div className="rl">Group enquiry · 12 rooms · conf 0.61</div></div>
              <div className="pill run">Review</div>
            </div>
            <div style={{ padding: "4px 0", fontSize: 11, fontWeight: 600, color: "var(--rl-gold-deep)", paddingLeft: 52 }}>Below threshold -- flagging for Aled</div>
            <div className="who-card">
              <div className="av">AT</div>
              <div><div className="nm">Aled (COO)</div><div className="rl">Draft + context sent to Slack</div></div>
              <div className="pill done">Reviewing</div>
            </div>
          </div>
          <div className="swap-note">Scout flagged the enquiry, wrote a draft, and asked Aled to review before sending.</div>
        </div>
      ),
    },
  ],
  hubNodes: [
    { ic: "mail",     lbl: "Outlook",   x: 10, y: 28 },
    { ic: "workflow", lbl: "HubSpot",   x: 36, y: 8  },
    { ic: "chat",     lbl: "Slack",     x: 68, y: 8  },
    { ic: "book",     lbl: "Notion",    x: 88, y: 32 },
    { ic: "chart",    lbl: "PostHog",   x: 78, y: 74 },
    { ic: "mic",      lbl: "Fireflies", x: 12, y: 74 },
  ],
  intCats: [
    { ic: "mail",     h: "Email & comms",   sub: "Where your agents read + write", logos: [{ nm: "Outlook", color: "#0078D4" }, { nm: "Gmail", color: "#EA4335" }, { nm: "Slack", color: "#4A154B" }, { nm: "Teams", color: "#6264A7" }] },
    { ic: "workflow", h: "CRM & ops",        sub: "Where context lives",            logos: [{ nm: "HubSpot", color: "#FF7A59" }, { nm: "Pipedrive", color: "#017737" }, { nm: "Salesforce", color: "#00A1E0" }, { nm: "Airtable", color: "#18BFFF" }] },
    { ic: "book",     h: "Knowledge base",   sub: "What agents are trained on",     logos: [{ nm: "Notion", color: "#000000" }, { nm: "Google Drive", color: "#4285F4" }, { nm: "Confluence", color: "#0052CC" }, { nm: "Dropbox", color: "#0061FF" }] },
    { ic: "mic",      h: "Calls & meetings", sub: "Where Notetaker listens",        logos: [{ nm: "Fireflies", color: "#7B68EE" }, { nm: "Otter.ai", color: "#4A90E2" }, { nm: "Teams", color: "#6264A7" }, { nm: "Zoom", color: "#2D8CFF" }] },
  ],
  engage: {
    setup:   { label: "Agent build",  price: "from £2,800", priceSub: "+ VAT · per agent",               lines: ["Discovery + job scoping", "Data source connection + permissions setup", "Agent training + red-team testing", "50-action supervised go-live", "Full documentation + kill-switch"] },
    monthly: { label: "Care plan",    price: "£189",        priceSub: "/ mo per agent · cancel any time", lines: ["Weekly accuracy review", "Retraining on new data / edge cases", "Prompt improvements + tuning", "Usage + cost report monthly", "Priority support via Slack"] },
    ctaCopy: "Ready to add an agent to your team?",
  },
}

export default function PersonalisedAIAgentsPage() {
  return <AIServiceTemplate spec={spec} />
}
