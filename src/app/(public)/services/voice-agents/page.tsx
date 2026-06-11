import type { Metadata } from "next"
import { AIServiceTemplate, type AIServiceSpec } from "@/components/sections/services/AIServiceTemplate"
import { IntegrationsTicker } from "@/components/shared/IntegrationsTicker"

export const metadata: Metadata = {
  title: "AI voice agents Wales | Revenue Ladder",
  description: "AI voice agents that answer every call, take bookings, collect deposits, and hand off to humans when it matters. Built for Welsh and UK SMEs.",
}

function LiveCallPanel() {
  return (
    <div className="t1-call">
      <div className="t1-call-head">
        <div className="t1-caller">
          <div className="t1-wave">{Array.from({ length: 5 }).map((_, i) => <span key={i} />)}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Bryn · Voice Agent</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>Snowdon Trails · Active call</div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 10, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "var(--rl-success)", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--rl-success)" }} />Live
          </div>
        </div>
      </div>
      <div className="t1-call-body">
        <div className="t1-script">
          {[
            { who: "Caller", text: "Hi, I want to book two places on the Cwm Idwal walk for Saturday." },
            { who: "Bryn",   text: "Great choice -- two spots on Saturday 9am. That is £18 per person. Shall I take a deposit now?" },
            { who: "Caller", text: "Yes please, card ending 4242." },
            { who: "Bryn",   text: "Brilliant. Deposit taken. Confirmation text on its way." },
          ].map((l, i) => (
            <div key={i} className={`t1-line${l.who === "Bryn" ? " agent" : ""}`}>
              <span className="who">{l.who}</span>
              <span className="txt">{l.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="t1-call-foot">
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>Booking created · 2 x Cwm Idwal · £18 deposit</span>
      </div>
    </div>
  )
}

const spec: AIServiceSpec = {
  service: "Voice Agents",
  ic: "mic",
  h1: <>Answers every call.<br />Books the slot.<br /><em>Takes the deposit.</em></>,
  sub: "A voice agent that picks up within two rings, knows your business inside out, books appointments directly into your calendar, and collects a deposit on the call. No hold music. No missed bookings.",
  secondaryCta: "Hear a live demo",
  trustBadges: ["14,200+ calls handled", "38s ring-to-booked", "320h saved / yr"],
  heroVisual: <LiveCallPanel />,
  capsHead: {
    eyebrow: "Six things Bryn does on every call",
    title: <>Six capabilities.<br /><em>One voice.</em></>,
  },
  caps: [
    { ic: "mic",   h: "Answers every call, day or night",       p: "No voicemail, no missed bookings. Bryn picks up every call -- bank holidays, Sunday evenings, 3am if needed." },
    { ic: "clock", h: "Books and reschedules in your calendar", p: "Real-time availability, instant confirmation, and automatic reminders. The customer hangs up with a booking in hand." },
    { ic: "cart",  h: "Takes a deposit on the call",            p: "Stripe-powered payment collection mid-conversation. No chase-up invoice, no invoice left unpaid." },
    { ic: "share", h: "Hands off to a human when it matters",   p: "Escalation rules you define: refund requests, complaints, or anything beyond the brief go straight to your team." },
    { ic: "mail",  h: "Sends a written summary",                p: "Every call gets a transcript and action summary sent to Slack, email, or your CRM within 60 seconds of ending." },
    { ic: "globe", h: "Bilingual when you need it",             p: "Welsh and English by default. Switches language mid-call based on how the customer opens. No configuration required." },
  ],
  proof: {
    eyebrow: "Real numbers",
    h2: "14,200 calls. 38 seconds. 320 hours saved.",
    body: "Bryn has handled over 14,200 calls across our client base -- booking tours, taking deposits, rescheduling appointments. The median time from ring to confirmed booking is 38 seconds.",
    stats: [
      { v: "14,200", unit: "+", lbl: "Calls handled across all deployments" },
      { v: "38",     unit: "s", lbl: "Median ring-to-booked time" },
      { v: "320",    unit: "h", lbl: "Staff hours saved per year, per client" },
    ],
    quote: {
      initials: "DM",
      name: "David Morgan",
      role: "Owner · Snowdon Trails · Llanberis",
      text: "We were burning two days a week on the phone. Three weeks after Bryn went live, we had taken 80 bookings without a single member of staff picking up the phone. The deposit collection alone paid for the setup in the first fortnight.",
      meta: "Voice agent live since January 2025",
    },
  },
  diveHead: {
    eyebrow: "How it actually works",
    title: <>Three layers that make voice agents <em>trustworthy</em>.</>,
    sub: "The reason most voice bots fail is they can only handle the one path the developer imagined. Bryn is built around intent recognition, not scripts.",
  },
  diveStats: [
    { v: "96",  unit: "%", lbl: "Intent recognised correctly",       tag: "QA across 14,200 calls" },
    { v: "38",  unit: "s", lbl: "Median ring-to-booked",             tag: "End-to-end" },
    { v: "£14", unit: "k", lbl: "Avg yr-1 saving vs receptionist",   tag: "30h/wk role equivalent" },
  ],
  diveRows: [
    {
      eyebrow: "01 · Voice",
      h3: "A voice your customers will trust.",
      body: "Bryn sounds like a person because we train it on your actual calls, your team's phrases, and your regional tone. Welsh accents, industry jargon, your opening line -- all included.",
      bullets: ["Welsh and English by default, switchable mid-call", "Trained on 200 real calls before go-live", "Four voice options: Bryn, Mair, Alex, Sasha"],
      visual: (
        <div className="t1-vis-voice">
          {[{ id: "Bryn", lang: "EN/CY", on: true }, { id: "Mair", lang: "CY", on: false }, { id: "Alex", lang: "EN", on: false }, { id: "Sasha", lang: "EN", on: false }].map((v) => (
            <div key={v.id} className={`voice-row${v.on ? " on" : ""}`}>
              <div className="av">{v.id[0]}</div>
              <div className="meta"><span className="nm">{v.id}</span><span className="tag">{v.lang}</span></div>
              <div className="play"><span style={{ fontSize: 10 }}>&#9654;</span></div>
            </div>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "02 · Brain",
      h3: "Intent recognition, not scripts.",
      body: "Bryn understands what the caller means, not just what they say. Reschedule requests, deposit disputes, group bookings -- each gets routed to the right outcome without a decision tree.",
      bullets: ["96% intent recognition rate across 14,200 calls", "Handles multiple intents in one call", "Confidence score threshold triggers human handoff"],
      visual: (
        <div className="t1-vis-intent">
          <div className="input">Can I push my Saturday booking to next week?</div>
          <div className="arrow-down" />
          <div className="router">Intent router <span className="tag">NLU</span></div>
          <div className="branches">
            <div className="branch">Book<div className="conf">0.12</div></div>
            <div className="branch on">Reschedule<div className="conf">0.97</div></div>
            <div className="branch">Cancel<div className="conf">0.08</div></div>
          </div>
        </div>
      ),
    },
    {
      eyebrow: "03 · Handoff",
      h3: "Knows exactly when to fetch a human.",
      body: "Bryn is not trying to handle everything. When a call exceeds its brief -- refund requests, complaints, or anything that needs judgement -- it transfers to a named member of your team with full context.",
      bullets: ["Configurable escalation triggers (topic, sentiment, keyword)", "Warm transfer with full transcript to the human", "Out-of-hours escalation goes to Slack or SMS"],
      visual: (
        <div className="t1-vis-handoff">
          <div className="who-stack">
            <div className="who-card bot">
              <div className="av">B</div>
              <div><div className="nm">Bryn</div><div className="rl">Voice agent · active</div></div>
              <div className="pill run">Handling</div>
            </div>
            <div style={{ padding: "4px 0", fontSize: 11, fontWeight: 600, color: "var(--rl-gold-deep)", paddingLeft: 52 }}>Refund request detected -- escalating</div>
            <div className="who-card">
              <div className="av">DM</div>
              <div><div className="nm">David (Owner)</div><div className="rl">Notified via Slack + transcript</div></div>
              <div className="pill done">Alerted</div>
            </div>
          </div>
          <div className="swap-note">Full call transcript + context sent before transfer completes.</div>
        </div>
      ),
    },
  ],
  hubNodes: [
    { ic: "mic",      lbl: "Twilio",    x: 10, y: 28 },
    { ic: "clock",    lbl: "Calendly",  x: 36, y: 8  },
    { ic: "workflow", lbl: "HubSpot",   x: 68, y: 8  },
    { ic: "cart",     lbl: "Stripe",    x: 88, y: 32 },
    { ic: "chat",     lbl: "Slack",     x: 78, y: 74 },
    { ic: "mail",     lbl: "Outlook",   x: 12, y: 74 },
  ],
  intCats: [
    { ic: "mic",      h: "Telephony",            sub: "Where calls arrive",            logos: [{ nm: "Twilio", color: "#F22F46" }, { nm: "Vonage", color: "#000000" }, { nm: "Telnyx", color: "#00D4AA" }, { nm: "Plivo", color: "#FF5040" }] },
    { ic: "clock",    h: "Calendars",             sub: "Where bookings land",           logos: [{ nm: "Calendly", color: "#0066FF" }, { nm: "Google Calendar", color: "#4285F4" }, { nm: "Outlook", color: "#0078D4" }, { nm: "Acuity", color: "#0015C" }] },
    { ic: "cart",     h: "Payments & deposits",   sub: "Where money moves on the call", logos: [{ nm: "Stripe", color: "#635BFF" }, { nm: "GoCardless", color: "#0066FA" }, { nm: "Square", color: "#000000" }, { nm: "SumUp", color: "#1A1A2E" }] },
    { ic: "workflow", h: "CRM & comms",            sub: "Where context lives",           logos: [{ nm: "HubSpot", color: "#FF7A59" }, { nm: "Pipedrive", color: "#017737" }, { nm: "Slack", color: "#4A154B" }, { nm: "Notion", color: "#000000" }] },
  ],
  engage: {
    setup:   { label: "Agent setup",  price: "£1,200", priceSub: "+ VAT · 3--4 weeks",        lines: ["Discovery + script design", "Voice training on 200+ real calls", "Calendar + payment integration", "200-call QA + accuracy testing", "2-week monitored go-live"] },
    monthly: { label: "Monthly care", price: "£249",   priceSub: "/ month · cancel any time", lines: ["Re-training on new call types", "2 new intents per month included", "24/7 uptime monitoring", "Monthly call analytics report", "Quarterly escalation review"] },
    ctaCopy: "Ready to stop missing calls?",
  },
}

export default function VoiceAgentsPage() {
  return (
    <>
      <AIServiceTemplate spec={spec} />
      <IntegrationsTicker eyebrow="Connects with your phone system and CRM" />
    </>
  )
}
