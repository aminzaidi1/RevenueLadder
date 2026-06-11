import type { Metadata } from "next"
import { AIServiceTemplate, type AIServiceSpec } from "@/components/sections/services/AIServiceTemplate"
import { IntegrationsTicker } from "@/components/shared/IntegrationsTicker"

export const metadata: Metadata = {
  title: "Chatbots | Revenue Ladder",
  description: "AI chatbots trained on your business that book, qualify leads, and hand off to humans. Built for Welsh and UK SMEs.",
}

function ChatThread() {
  return (
    <div className="t1-call">
      <div className="t1-call-head">
        <div className="t1-caller">
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,196,37,.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "var(--rl-gold)" }}>D</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Dovey Marina Chat</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>18k chats handled this month</div>
          </div>
        </div>
      </div>
      <div className="t1-call-body">
        <div className="t1-script">
          {[
            { who: "Visitor", text: "Is the 28ft boat dog-friendly? We have a labrador." },
            { who: "Bot",     text: "Yes -- all 28ft day boats are dog-friendly at no extra charge. I can hold one for you. Which date?" },
            { who: "Visitor", text: "Saturday the 14th, full day." },
            { who: "Bot",     text: "Saturday 14th is available. Shall I take a £30 deposit to confirm?" },
          ].map((l, i) => (
            <div key={i} className={`t1-line${l.who === "Bot" ? " agent" : ""}`}>
              <span className="who">{l.who}</span>
              <span className="txt">{l.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="t1-call-foot">
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>Stripe deposit queued · 28ft day boat · Sat 14th</span>
      </div>
    </div>
  )
}

const spec: AIServiceSpec = {
  service: "Chatbots",
  ic: "chat",
  h1: <>Chat that <em>books</em>.<br />Chat that qualifies.<br />Chat that knows when to fetch a human.</>,
  sub: "A chatbot trained on your business -- your FAQs, your pricing, your products -- that books appointments, takes deposits, qualifies leads, and hands off to your team the moment the conversation gets serious.",
  secondaryCta: "See it in action",
  trustBadges: ["38k chats / mo", "18% chat-to-action", "< 2s reply"],
  heroVisual: <ChatThread />,
  capsHead: {
    eyebrow: "Six things our chatbots do",
    title: <>Six capabilities. <em>One chat window.</em></>,
  },
  caps: [
    { ic: "book",   h: "Trained on your business",    p: "Your FAQs, your pricing, your products, your policies. We train the bot on your actual content -- not a generic template." },
    { ic: "cart",   h: "Books and takes deposits",     p: "Direct calendar and payment integration. The customer leaves the conversation with a confirmed booking and a receipt." },
    { ic: "target", h: "Qualifies leads",              p: "Three-question qualifier built into the flow. Serious buyers routed to sales; window shoppers sent useful content." },
    { ic: "globe",  h: "Bilingual",                    p: "Welsh and English by default. The bot detects language and stays consistent throughout the conversation." },
    { ic: "shield", h: "Guard-rails built in",         p: "Out-of-scope questions, sensitive topics, and complaints trigger a clean handoff -- the bot never wings it." },
    { ic: "share",  h: "Hands off seamlessly",         p: "When a conversation needs a human, the bot transfers with full context -- no re-explaining, no frustration." },
  ],
  proof: {
    eyebrow: "Real numbers",
    h2: "38k chats. 18% action rate. Under 2 seconds.",
    body: "Across our chatbot deployments, 18% of conversations result in a booking, enquiry, or qualified lead -- compared to an industry average of 3--5%. The bots run around the clock with zero extra staff cost.",
    stats: [
      { v: "38",  unit: "k", lbl: "Chats handled per month across deployments" },
      { v: "18",  unit: "%", lbl: "Chat-to-real-action rate" },
      { v: "< 2", unit: "s", lbl: "Median first response time" },
    ],
    quote: {
      initials: "GH",
      name: "Gareth Hughes",
      role: "Owner · Dovey Marina · Machynlleth",
      text: "We were getting the same 12 questions on Instagram DMs every day. Now the bot handles all of them, books the boat, takes the deposit, and only sends me a Slack message when someone actually needs me. I saved eight hours a week on day one.",
      meta: "Chatbot live since March 2025",
    },
  },
  diveHead: {
    eyebrow: "How it actually works",
    title: <>Three parts that make a chatbot <em>useful</em>.</>,
    sub: "Most chatbots fail because they only handle FAQ-style questions and punt everything else to a contact form. Ours book, qualify, and escalate -- in the same conversation.",
  },
  diveStats: [
    { v: "38k",              lbl: "Chats per month",      tag: "All deployments" },
    { v: "18",  unit: "%",   lbl: "Chat-to-action rate",  tag: "vs 3--5% industry avg" },
    { v: "< 2", unit: "s",   lbl: "First response time",  tag: "24/7" },
  ],
  diveRows: [
    {
      eyebrow: "01 · Knowledge",
      h3: "Trained on what your customers actually ask.",
      body: "We build the knowledge base from your existing content -- website copy, FAQs, pricing pages, past email threads. Then we red-team it: 200+ test conversations before go-live.",
      bullets: ["Trained on your actual content, not generic templates", "Pricing, availability, policies, product details all included", "200+ test conversations before launch"],
      visual: (
        <div className="t1-vis-intent">
          <div className="input">Do you do group bookings for hen parties?</div>
          <div className="arrow-down" />
          <div className="router">Knowledge base <span className="tag">SEARCH</span></div>
          <div className="branches">
            <div className="branch on">Group bookings<div className="conf">0.94</div></div>
            <div className="branch">Pricing<div className="conf">0.61</div></div>
            <div className="branch">Handoff<div className="conf">0.08</div></div>
          </div>
        </div>
      ),
    },
    {
      eyebrow: "02 · Qualify",
      h3: "Separates serious buyers from browsers.",
      body: "A three-question qualifier built into the natural flow of the conversation routes hot leads to your team and gives cold leads useful content -- without being pushy or robotic.",
      bullets: ["Budget, timeline, and intent captured conversationally", "Hot leads routed to your CRM with a full summary", "Cold leads sent to a relevant blog post or lead magnet"],
      visual: (
        <div className="t1-vis-handoff">
          <div className="who-stack">
            {[
              { av: "Q1", nm: "What are you looking to do?",           rl: "Intent captured",   cls: "bot" },
              { av: "Q2", nm: "When are you looking to get started?",  rl: "Timeline captured", cls: ""    },
              { av: "Q3", nm: "What is your rough budget?",            rl: "Budget captured",   cls: ""    },
            ].map((c) => (
              <div key={c.nm} className={`who-card${c.cls ? ` ${c.cls}` : ""}`}>
                <div className="av">{c.av}</div>
                <div><div className="nm">{c.nm}</div><div className="rl">{c.rl}</div></div>
                <div className={`pill ${c.cls === "bot" ? "run" : "done"}`}>{c.cls === "bot" ? "Active" : "Done"}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      eyebrow: "03 · Handoff",
      h3: "Clean escalation, every time.",
      body: "When the conversation needs a person -- complaint, complex enquiry, serious lead -- the bot hands off with the full context. Your team picks up mid-conversation, not from scratch.",
      bullets: ["Trigger-based escalation: topic, sentiment, or keyword", "Full chat transcript delivered via Slack or email", "Out-of-hours escalation queued for next morning"],
      visual: (
        <div className="t1-vis-handoff">
          <div className="who-stack">
            <div className="who-card bot">
              <div className="av">B</div>
              <div><div className="nm">Bot</div><div className="rl">Dovey Marina chat · active</div></div>
              <div className="pill run">Active</div>
            </div>
            <div style={{ padding: "4px 0", fontSize: 11, fontWeight: 600, color: "var(--rl-gold-deep)", paddingLeft: 52 }}>Refund request -- escalating to Gareth</div>
            <div className="who-card">
              <div className="av">GH</div>
              <div><div className="nm">Gareth (Owner)</div><div className="rl">Slack + full transcript sent</div></div>
              <div className="pill done">Alerted</div>
            </div>
          </div>
          <div className="swap-note">Full chat history delivered before the handoff completes.</div>
        </div>
      ),
    },
  ],
  hubNodes: [
    { ic: "chat",     lbl: "WhatsApp",  x: 10, y: 28 },
    { ic: "globe",    lbl: "Website",   x: 36, y: 8  },
    { ic: "workflow", lbl: "HubSpot",   x: 68, y: 8  },
    { ic: "cart",     lbl: "Stripe",    x: 88, y: 32 },
    { ic: "chat",     lbl: "Slack",     x: 78, y: 74 },
    { ic: "mail",     lbl: "Intercom",  x: 12, y: 74 },
  ],
  intCats: [
    { ic: "chat",     h: "Chat channels",  sub: "Where conversations happen",   logos: [{ nm: "Website widget", color: "#1A4D2E" }, { nm: "WhatsApp", color: "#25D366" }, { nm: "Facebook", color: "#0866FF" }, { nm: "Instagram DM", color: "#E4405F" }] },
    { ic: "clock",    h: "Calendars",       sub: "Where bookings land",          logos: [{ nm: "Calendly", color: "#0066FF" }, { nm: "Google Calendar", color: "#4285F4" }, { nm: "Acuity", color: "#0015CC" }, { nm: "Outlook", color: "#0078D4" }] },
    { ic: "cart",     h: "Payments",        sub: "Where deposits are taken",     logos: [{ nm: "Stripe", color: "#635BFF" }, { nm: "GoCardless", color: "#0066FA" }, { nm: "Square", color: "#000000" }, { nm: "SumUp", color: "#1A1A2E" }] },
    { ic: "workflow", h: "CRM & helpdesk",  sub: "Where leads and tickets land", logos: [{ nm: "HubSpot", color: "#FF7A59" }, { nm: "Intercom", color: "#1F8AED" }, { nm: "Freshdesk", color: "#26BC85" }, { nm: "Zendesk", color: "#1F73B7" }] },
  ],
  engage: {
    setup:   { label: "Chatbot build", price: "£1,400", priceSub: "+ VAT · 3 weeks",           lines: ["Knowledge base built from your content", "Qualifier flow design + copywriting", "Calendar + payment integration", "200-conversation QA", "2-week monitored launch"] },
    monthly: { label: "Re-train plan", price: "£199",   priceSub: "/ month · cancel any time", lines: ["Monthly knowledge base update", "New FAQ topics as needed", "Conversation analytics report", "Escalation audit quarterly", "A/B testing on qualifier flow"] },
    ctaCopy: "Ready to turn your website into a 24/7 booking engine?",
  },
}

export default function ChatbotsPage() {
  return (
    <>
      <AIServiceTemplate spec={spec} />
      <IntegrationsTicker eyebrow="Plugs into the tools you already use" />
    </>
  )
}
