import type { Metadata } from "next"
import { AIServiceTemplate, type AIServiceSpec } from "@/components/sections/services/AIServiceTemplate"
import { IntegrationsTicker } from "@/components/shared/IntegrationsTicker"

export const metadata: Metadata = {
  title: "Content Generation | Revenue Ladder",
  description: "Long-form articles, web copy, and lead magnets written in your voice -- SEO-tuned, AI-flag free. Built for Welsh and UK SMEs.",
}

function WriterDesk() {
  return (
    <div className="t1-call">
      <div className="t1-call-head">
        <div className="t1-caller">
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,196,37,.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "var(--rl-gold)" }}>C</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Catrin -- Content editor</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>Dovey Marina · draft review</div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 10, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "var(--rl-success)", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--rl-success)" }} />0 AI flags
          </div>
        </div>
      </div>
      <div className="t1-call-body" style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ background: "rgba(255,255,255,.04)", borderRadius: 10, padding: "12px 14px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--rl-gold)", marginBottom: 6, fontFamily: "var(--rl-font-mono)", letterSpacing: ".08em" }}>DRAFT · 1,240 words</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 4, fontFamily: "var(--rl-font-display)" }}>Why a Welsh voice agent outperforms a national call centre</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>The first thing a caller notices is not what the agent says -- it is how it says it. A voice that sounds like home closes faster than one that sounds like a script...</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { lbl: "Tone match",   val: "98%",   ok: true  },
            { lbl: "SEO score",    val: "96/100", ok: true  },
            { lbl: "Readability",  val: "Grade 8",ok: true  },
            { lbl: "AI detection", val: "0 flags",ok: true  },
          ].map((r) => (
            <div key={r.lbl} style={{ background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "8px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>{r.lbl}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: r.ok ? "var(--rl-success)" : "var(--rl-gold)", fontFamily: "var(--rl-font-mono)" }}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="t1-call-foot">
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>Ready to publish -- Eleri approved at 09:14</span>
      </div>
    </div>
  )
}

const spec: AIServiceSpec = {
  service: "Content Generation",
  ic: "pencil",
  h1: <>Articles that earn<br />their place on the page.<br /><em>Written fast, edited well.</em></>,
  sub: "Long-form articles, web pages, ad copy, and lead magnets written in your voice -- SEO-tuned, zero AI flags, approved before publishing. We write the content your team never has time for.",
  secondaryCta: "See a sample article",
  trustBadges: ["420 articles published", "0 AI flags", "x3.2 organic traffic"],
  heroVisual: <WriterDesk />,
  capsHead: {
    eyebrow: "Six content types we produce",
    title: <>Six formats. <em>One voice.</em></>,
    sub: "Every piece is written to your voice profile, fact-checked against your business, and approved by your team before it goes live.",
  },
  caps: [
    { ic: "book",     h: "Long-form articles",      p: "800--2,500-word pieces that rank, educate, and convert. Industry knowledge, original angle, your voice -- not recycled generics." },
    { ic: "globe",    h: "Web pages",                p: "Service pages, landing pages, about pages. Copy that works with your design rather than around it." },
    { ic: "target",   h: "Ad copy",                  p: "Google Ads, Meta, LinkedIn. Short-form that earns the click without wasting the budget." },
    { ic: "sparkles", h: "Lead magnets",             p: "Guides, checklists, and reports that capture emails and demonstrate expertise in one download." },
    { ic: "mail",     h: "Newsletters",              p: "Weekly or monthly sends that keep you front of mind without burning your list. Written to open, not just to land." },
    { ic: "pencil",   h: "Bespoke voice profile",    p: "We start every engagement by building your voice profile -- tone, vocabulary, no-fly list. Everything we write matches it." },
  ],
  proof: {
    eyebrow: "Real numbers",
    h2: "420 articles. 0 AI flags. x3.2 organic.",
    body: "Across our content clients, organic traffic has grown 3.2x on average within six months of launch. Every article passes AI detection at zero flags -- because human editors touch every piece before it leaves our desk.",
    stats: [
      { v: "420",  lbl: "Articles published across all content clients" },
      { v: "0",    lbl: "AI detection flags across all published content" },
      { v: "x3.2", lbl: "Average organic traffic uplift at 6 months" },
    ],
    quote: {
      initials: "GH",
      name: "Gareth Hughes",
      role: "Owner · Dovey Marina · Machynlleth",
      text: "We had no content strategy and no time to write one. RL built our voice profile, started publishing two articles a month, and within four months we were ranking for searches we had never touched. The writing sounds like me -- which is the bit I did not expect.",
      meta: "Content retainer · 8 months",
    },
  },
  diveHead: {
    eyebrow: "How we write content that works",
    title: <>Three things that make content <em>actually perform</em>.</>,
    sub: "Most content fails because it sounds like everyone else, ignores SEO until after it is written, or never gets approved before publishing. We fix all three from the start.",
  },
  diveStats: [
    { v: "98",  unit: "%", lbl: "Tone match score",             tag: "Against voice profile"   },
    { v: "96",             lbl: "Average SEO score",             tag: "SurferSEO across all articles" },
    { v: "x3.2",           lbl: "Organic traffic uplift",        tag: "6-month avg, all clients" },
  ],
  diveRows: [
    {
      eyebrow: "01 · Voice",
      h3: "Sounds like you, not a content farm.",
      body: "Before we write a word, we build your voice profile. We analyse your existing content, interview your team, and define the parameters that make your writing yours -- tone, vocabulary, sentence length, topics you own, topics you avoid.",
      bullets: ["Voice profile built from your existing content + team interview", "Five-axis tone calibration: formal-casual, technical-plain, short-long", "No-fly list: phrases, cliches, and competitor references you want avoided"],
      visual: (
        <div style={{ background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontFamily: "var(--rl-font-display)", fontWeight: 800, fontSize: 13, color: "var(--rl-fg-1)" }}>Voice profile · Dovey Marina</div>
          {[
            { lbl: "Formal", pct: 30, rLbl: "Casual"    },
            { lbl: "Hyped",  pct: 15, rLbl: "Calm"      },
            { lbl: "Technical", pct: 25, rLbl: "Plain"  },
            { lbl: "Short-form", pct: 40, rLbl: "Long"  },
            { lbl: "Welsh", pct: 70, rLbl: "Neutral"    },
          ].map((s) => (
            <div key={s.lbl}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 600, color: "var(--rl-fg-2)", marginBottom: 5 }}>
                <span>{s.lbl}</span><span>{s.rLbl}</span>
              </div>
              <div style={{ height: 6, background: "var(--rl-bg)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", left: `${s.pct}%`, top: "50%", width: 12, height: 12, background: "var(--rl-forest)", borderRadius: "50%", transform: "translate(-50%, -50%)" }} />
                <div style={{ height: "100%", width: `${s.pct}%`, background: "linear-gradient(90deg, var(--rl-forest), var(--rl-gold))", borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "02 · SEO",
      h3: "Optimised before the first word is written.",
      body: "We run keyword research and on-page planning before briefing. Every article is structured around a primary keyword and semantic cluster, with schema markup, internal linking, and meta tags handled automatically.",
      bullets: ["Keyword + semantic cluster defined before brief", "SurferSEO content score target: 90+ before submission", "Schema markup, meta title, and description included on every piece"],
      visual: (
        <div className="t1-vis-intent">
          <div className="input">Article SEO check · Dovey Marina</div>
          <div className="arrow-down" />
          <div className="router">SEO score <span className="tag">96/100</span></div>
          <div className="branches">
            <div className="branch on">Keyword density<div className="conf">pass</div></div>
            <div className="branch on">Schema markup<div className="conf">pass</div></div>
            <div className="branch on">Meta tags<div className="conf">pass</div></div>
          </div>
        </div>
      ),
    },
    {
      eyebrow: "03 · Approval",
      h3: "Nothing publishes without your sign-off.",
      body: "Every piece goes through a structured review flow: drafter completes, editor checks voice and facts, you approve. We use your preferred tool -- Notion, Google Docs, or email -- and nothing goes live until you say so.",
      bullets: ["Two-stage review: editor checks before client sees it", "Approval tracked in your tool of choice", "Scheduled publishing after approval -- no chasing required"],
      visual: (
        <div className="t1-vis-handoff">
          <div className="who-stack">
            <div className="who-card bot">
              <div className="av">D</div>
              <div><div className="nm">Drafter</div><div className="rl">Article complete · 1,240 words</div></div>
              <div className="pill run">Done</div>
            </div>
            <div style={{ padding: "4px 0", fontSize: 11, fontWeight: 600, color: "var(--rl-gold-deep)", paddingLeft: 52 }}>Editor review -- voice + fact check passed</div>
            <div className="who-card">
              <div className="av">E</div>
              <div><div className="nm">Eleri (client)</div><div className="rl">Approved at 09:14 -- scheduled for Mon</div></div>
              <div className="pill done">Approved</div>
            </div>
          </div>
          <div className="swap-note">Scheduled to publish Monday 09:00 -- no action required.</div>
        </div>
      ),
    },
  ],
  hubNodes: [
    { ic: "pencil",   lbl: "WordPress", x: 10, y: 28 },
    { ic: "search",   lbl: "SurferSEO", x: 36, y: 8  },
    { ic: "chart",    lbl: "GA4",       x: 68, y: 8  },
    { ic: "workflow", lbl: "HubSpot",   x: 88, y: 32 },
    { ic: "mail",     lbl: "Mailchimp", x: 78, y: 74 },
    { ic: "chat",     lbl: "Slack",     x: 12, y: 74 },
  ],
  intCats: [
    { ic: "pencil",   h: "CMS & publishing",  sub: "Where content goes live",        logos: [{ nm: "WordPress", color: "#21759B" }, { nm: "Webflow", color: "#4353FF" }, { nm: "Sanity", color: "#F03E2F" }, { nm: "Notion", color: "#000000" }] },
    { ic: "search",   h: "SEO tools",          sub: "Where scores are earned",        logos: [{ nm: "SurferSEO", color: "#5850EC" }, { nm: "Ahrefs", color: "#FF7043" }, { nm: "Semrush", color: "#FF642D" }, { nm: "Search Console", color: "#4285F4" }] },
    { ic: "chart",    h: "Analytics",          sub: "Where performance is measured",  logos: [{ nm: "GA4", color: "#F9AB00" }, { nm: "Plausible", color: "#5850EC" }, { nm: "PostHog", color: "#000000" }, { nm: "Fathom", color: "#9187FF" }] },
    { ic: "mail",     h: "Email & newsletters", sub: "Where content gets distributed", logos: [{ nm: "Mailchimp", color: "#FFE01B" }, { nm: "Klaviyo", color: "#232323" }, { nm: "Brevo", color: "#0B996E" }, { nm: "ConvertKit", color: "#FB6970" }] },
  ],
  engage: {
    setup:   { label: "Voice + setup",      price: "£1,800",        priceSub: "+ VAT · one-time",              lines: ["Voice profile build + tone calibration", "No-fly list + vocabulary guide", "Keyword research + content plan (12 articles)", "First two articles included", "CMS + publishing workflow setup"] },
    monthly: { label: "Content retainer",   price: "from £899",     priceSub: "/ month · cancel any time",    lines: ["4 long-form articles per month (800--2,500 words)", "SEO optimisation on every piece", "Two-stage human review + client approval", "Monthly performance report", "Priority brief turnaround: 3 working days"] },
    ctaCopy: "Ready to publish content that earns its place?",
  },
}

export default function ContentGenerationPage() {
  return (
    <>
      <AIServiceTemplate spec={spec} />
      <IntegrationsTicker eyebrow="Publishes to the platforms you use" />
    </>
  )
}
