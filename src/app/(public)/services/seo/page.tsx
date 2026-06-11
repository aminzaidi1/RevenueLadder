import type { Metadata } from "next"
import { BuildShipTemplate, type BSServiceSpec } from "@/components/sections/services/BuildShipTemplate"

export const metadata: Metadata = {
  title: "SEO services Wales | Revenue Ladder",
  description: "Technical SEO audits, keyword maps, and on-page work that moves Welsh and UK businesses up Google. Transparent reporting, monthly retainer.",
}

function RankingWindow() {
  const keywords = [
    { kw: "welsh single origin coffee", pos: 3 },
    { kw: "gwynedd coffee",             pos: 4 },
    { kw: "aberystwyth coffee",         pos: 7 },
  ]
  return (
    <div style={{ background: "var(--rl-forest-ink)", border: "2px solid rgba(255,255,255,.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,.45)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", background: "rgba(255,255,255,.02)" }}>
        <div style={{ display: "flex", gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,.15)" }} />
          ))}
        </div>
        <div style={{ flex: 1, fontSize: 10, fontFamily: "var(--rl-font-mono)", color: "rgba(255,255,255,.4)", textAlign: "center" }}>search.google.com/console/conwy-foods</div>
      </div>
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", fontWeight: 600, marginBottom: 4 }}>Avg position</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", fontFamily: "var(--rl-font-display)", lineHeight: 1 }}>4.2</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 3 }}>from 18.4 · 180 days ago</div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" as const, color: "var(--rl-forest)", background: "rgba(26,77,46,.25)", padding: "4px 10px", borderRadius: 999 }}>Climbing</div>
        </div>
        <svg viewBox="0 0 200 48" style={{ width: "100%", height: 48 }}>
          <polyline points="0,40 30,36 60,32 90,28 120,20 150,14 200,8" fill="none" stroke="rgba(255,196,37,.15)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="0,40 30,36 60,32 90,28 120,20 150,14 200,8" fill="none" stroke="var(--rl-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {keywords.map((k) => (
          <div key={k.kw} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "7px 10px" }}>
            <div style={{ flex: 1, fontSize: 11, color: "rgba(255,255,255,.7)", fontWeight: 500 }}>{k.kw}</div>
            <div style={{ fontSize: 9, fontWeight: 800, color: "rgba(255,255,255,.35)" }}>pos</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: k.pos <= 3 ? "var(--rl-gold)" : "var(--rl-forest)", fontFamily: "var(--rl-font-display)", minWidth: 20, textAlign: "right" as const }}>{k.pos}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,.06)", flexWrap: "wrap" as const }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginRight: 4 }}>180 days · retainer</span>
        {["42 page-1 KWs", "8 pos 1-3", "96 tech score"].map((chip) => (
          <span key={chip} style={{ fontSize: 10, fontWeight: 700, color: "var(--rl-gold)", background: "rgba(255,196,37,.1)", padding: "1px 7px", borderRadius: 999 }}>{chip}</span>
        ))}
      </div>
    </div>
  )
}

const spec: BSServiceSpec = {
  service: "SEO",
  ic: "search",
  h1: <>Rank for the<br />searches that<br /><em>actually convert.</em></>,
  sub: "Technical SEO, keyword research, and on-page work -- done once properly, then compounded every month. Plain-English reporting, no jargon, no vanity metrics.",
  trustLabel: "Tooling",
  trustBadges: ["Google Search Console", "Ahrefs", "Screaming Frog", "Schema.org"],
  secondaryCta: "See a sample report",
  heroVisual: <RankingWindow />,

  capsHead: {
    eyebrow: "What every SEO retainer covers",
    title: <>Six jobs. <em>No shortcuts.</em></>,
    sub: "SEO is not one thing -- it is six recurring jobs done to a standard. We do all six, every month, and report on each one in plain English.",
  },
  caps: [
    { num: "SE_01", ic: "check",  h: "Technical audit · 48 checks", p: "48 technical checks in week one -- crawlability, Core Web Vitals, structured data, canonicals, redirects. Every issue blocking your rankings, found and fixed.", pct: 100, pctLabel: "Weeks 1-2 · foundation" },
    { num: "SE_02", ic: "target", h: "Keyword map · 24 picks",       p: "24 keywords chosen for commercial intent, search volume, and achievability -- not vanity terms you will never rank for. One map, revisited monthly.", pct: 90, pctLabel: "Week 2 · strategy" },
    { num: "SE_03", ic: "pencil", h: "Content briefs",               p: "Detailed briefs for every page we want to rank. Structure, headings, word count, internal links, target keywords. Ready to write or hand to a copywriter.", pct: 80, pctLabel: "Week 3 · content" },
    { num: "SE_04", ic: "globe",  h: "On-page work",                 p: "Titles, metas, headings, internal linking, image alt text, schema markup. Done directly in your CMS -- not a list of recommendations you have to action yourself.", pct: 70, pctLabel: "Week 4 · on-page" },
    { num: "SE_05", ic: "pin",    h: "Local SEO",                    p: "Google Business Profile optimisation, local citations, review strategy, local schema. Critical for any Welsh business serving a physical area.", pct: 60, pctLabel: "Monthly · local" },
    { num: "SE_06", ic: "chart",  h: "Monthly performance report",   p: "Rankings, traffic, CTR, conversions. Plain English. What moved, what we are doing next month, and why. Signed off by the account lead.", pct: 50, pctLabel: "Monthly · reporting" },
  ],

  proof: {
    eyebrow: "Real results",
    h2: "3.2x traffic. 42 page-1 keywords. £640k organic.",
    body: "Across our SEO retainer clients, average organic traffic has grown 3.2x in the first twelve months. Conwy Foods now holds 42 page-1 keyword positions and attributes £640k of annual revenue to organic search.",
    stats: [
      { v: "3.2", unit: "x",  lbl: "Avg organic traffic growth · 12 months" },
      { v: "42",              lbl: "Avg page-1 keywords per client at month 12" },
      { v: "£640", unit: "k", lbl: "Organic revenue attributed · Conwy Foods" },
    ],
    quote: {
      initials: "CW",
      name: "Carys Wynne",
      role: "Founder · Conwy Foods · Conwy",
      text: "We were invisible on Google for anything useful. RL ran a two-week audit, fixed the technical issues in week three, and started producing content briefs that matched what people were actually searching for. Within six months we had a page-one position for our main category term. The monthly report is the first thing I read every time.",
      meta: "SEO retainer · 14 months",
    },
  },

  diveHead: {
    eyebrow: "How the work is done",
    title: <>Three things that make<br /><em>SEO compound.</em></>,
    sub: "Most SEO work stops at keyword research. Three things we do that most agencies skip entirely.",
  },
  diveStats: [
    { v: "24",            lbl: "Keywords per client map",     tag: "Reviewed monthly" },
    { v: "48",            lbl: "Technical checks per audit",  tag: "Every site, every time" },
    { v: "96", unit: "/100", lbl: "Median tech score at month 3", tag: "From 61 at start" },
  ],
  diveRows: [
    {
      eyebrow: "01 · Keywords",
      h3: "24 keywords. Chosen to win.",
      p: "We pick 24 keywords per map -- small enough to be actionable, big enough to move revenue. Volume, commercial intent, and achievability scored for each one. Revised monthly.",
      items: [
        "Intent-first: searches that convert, not just searches with traffic",
        "Achievability scored -- no terms you cannot rank for in six months",
        "Revised monthly based on what moved and what the data shows",
      ],
      visual: (
        <div style={{ background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)", borderRadius: 20, padding: 20 }}>
          <div style={{ fontFamily: "var(--rl-font-display)", fontWeight: 800, fontSize: 12, color: "var(--rl-fg-1)", marginBottom: 14 }}>Keyword map · Conwy Foods</div>
          {[
            { kw: "welsh single origin coffee", vol: "880", priority: "high" },
            { kw: "gwynedd coffee roasters",    vol: "480", priority: "high" },
            { kw: "buy welsh coffee online",    vol: "320", priority: "mid"  },
            { kw: "aberystwyth coffee",         vol: "260", priority: "high" },
            { kw: "welsh coffee subscription",  vol: "210", priority: "mid"  },
            { kw: "specialty coffee wales",     vol: "590", priority: "mid"  },
          ].map((r) => (
            <div key={r.kw} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: "1px solid var(--rl-border-soft)" }}>
              <div style={{ flex: 1, fontSize: 11, color: "var(--rl-fg-1)", fontWeight: 500 }}>{r.kw}</div>
              <div style={{ fontSize: 10, color: "var(--rl-fg-3)", fontFamily: "var(--rl-font-mono)", minWidth: 32, textAlign: "right" as const }}>{r.vol}</div>
              <div style={{ fontSize: 8, fontWeight: 800, padding: "1px 6px", borderRadius: 999, background: r.priority === "high" ? "rgba(26,77,46,.15)" : "rgba(255,196,37,.12)", color: r.priority === "high" ? "var(--rl-forest)" : "var(--rl-gold)" }}>{r.priority}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "02 · Content",
      h3: "Briefs that actually rank.",
      p: "Every content brief is a full specification -- structure, headings, internal links, target queries, word count, and schema type. Your writer hits publish and it ranks.",
      items: [
        "Full brief: structure, headings, H2 map, word count target",
        "Internal linking plan included -- no orphaned pages",
        "Schema type specified and validated before publish",
      ],
      reverse: true,
      visual: (
        <div style={{ background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)", borderRadius: 20, padding: 20 }}>
          <div style={{ fontFamily: "var(--rl-font-display)", fontWeight: 800, fontSize: 12, color: "var(--rl-fg-1)", marginBottom: 12 }}>Content brief · welsh voice agent</div>
          {[
            { lbl: "Target query",   val: "welsh voice agent for small business" },
            { lbl: "Word count",     val: "1,400 -- 1,800" },
            { lbl: "Schema type",    val: "Article + FAQPage" },
            { lbl: "Internal links", val: "voice-agents/, chatbots/" },
            { lbl: "CTA",           val: "Book a call" },
          ].map((r) => (
            <div key={r.lbl} style={{ display: "flex", gap: 8, padding: "5px 0", borderBottom: "1px solid var(--rl-border-soft)" }}>
              <div style={{ fontSize: 11, color: "var(--rl-fg-3)", fontWeight: 600, minWidth: 90 }}>{r.lbl}</div>
              <div style={{ fontSize: 11, color: "var(--rl-fg-1)", fontFamily: "var(--rl-font-mono)" }}>{r.val}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "03 · Technical",
      h3: "48 checks. Fixed before month two.",
      p: "48 technical checks on every site we take on. Crawlability, Core Web Vitals, structured data, canonical issues, redirects. Fixed in code -- not handed back as a to-do list.",
      items: [
        "Crawl errors fixed directly in your CMS or codebase",
        "Core Web Vitals: LCP, CLS, INP measured and addressed",
        "Structured data validated and deployed -- product, FAQ, local business",
      ],
      visual: (
        <div style={{ background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)", borderRadius: 20, padding: 20 }}>
          <div style={{ fontFamily: "var(--rl-font-display)", fontWeight: 800, fontSize: 12, color: "var(--rl-fg-1)", marginBottom: 4 }}>Technical audit · 48 checks</div>
          <div style={{ fontSize: 11, color: "var(--rl-fg-3)", marginBottom: 14 }}>42 passed · 4 fixed · 2 monitoring</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 5 }}>
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} style={{ aspectRatio: "1", borderRadius: 4, background: i < 42 ? "var(--rl-forest)" : i < 46 ? "rgba(255,196,37,.4)" : "rgba(26,77,46,.08)" }} />
            ))}
          </div>
          <div style={{ marginTop: 12, display: "flex", gap: 14, fontSize: 10, fontWeight: 600, color: "var(--rl-fg-3)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "var(--rl-forest)", display: "inline-block" }} />42 passed</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(255,196,37,.4)", display: "inline-block" }} />4 fixed</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(26,77,46,.08)", display: "inline-block" }} />2 monitoring</span>
          </div>
        </div>
      ),
    },
  ],

  integrateHead: {
    eyebrow: "Tools we use",
    title: <>The tooling behind <em>the rankings.</em></>,
    sub: "We use the same professional-grade tools as the largest SEO agencies -- and we show you the data, not just the summary.",
  },
  hubNodes: [
    { ic: "search", lbl: "GSC",             x: 10, y: 25 },
    { ic: "chart",  lbl: "Ahrefs",          x: 36, y: 6  },
    { ic: "server", lbl: "Screaming Frog",  x: 68, y: 6  },
    { ic: "code",   lbl: "Schema.org",      x: 88, y: 30 },
    { ic: "chart",  lbl: "Plausible",       x: 80, y: 72 },
    { ic: "pin",    lbl: "Google Business", x: 10, y: 72 },
  ],
  hubCenter: { ic: "search", nm: "Your SEO", tg: "Rankings · climbing" },
  platformCats: [
    { ic: "search", h: "Research + auditing", sub: "Data behind the strategy",  logos: [{ nm: "Google Search Console", color: "#4285F4" }, { nm: "Ahrefs", color: "#FF7A00" }, { nm: "SEMrush", color: "#FF642D" }, { nm: "Screaming Frog", color: "#3F9142" }] },
    { ic: "pencil", h: "Content + CMS",       sub: "Where the briefs land",     logos: [{ nm: "WordPress", color: "#21759B" }, { nm: "Webflow", color: "#146EF5" }, { nm: "Sanity", color: "#F03E2F" }, { nm: "Shopify", color: "#95BF47" }] },
    { ic: "pin",    h: "Local SEO",            sub: "Maps and local presence",   logos: [{ nm: "Google Business", color: "#4285F4" }, { nm: "Apple Maps", color: "#FF2D55" }, { nm: "Bing Places", color: "#008373" }, { nm: "TripAdvisor", color: "#00AF87" }] },
    { ic: "chart",  h: "Reporting",            sub: "What the numbers show",     logos: [{ nm: "Plausible", color: "#5850EC" }, { nm: "GA4", color: "#F9AB00" }, { nm: "Looker Studio", color: "#4285F4" }, { nm: "Linear", color: "#5E6AD2" }] },
  ],

  engageHead: {
    eyebrow: "How we engage",
    title: <>Audit first. <em>Then compound.</em></>,
    sub: "Every retainer starts with a two-week audit and keyword map. Month two is execution -- on-page work, content, local, and monthly reporting.",
  },
  engageSetup: {
    ic: "search",
    h: "SEO audit + plan",
    price: "£1,400",
    priceSub: "+ VAT · 2 weeks",
    p: "A full 48-check technical audit, 24-keyword map, and a 90-day on-page and content plan. Delivered in writing, with a walkthrough call.",
    items: [
      "48-point technical audit",
      "24-keyword map with intent + volume",
      "90-day on-page and content plan",
      "Competitor gap analysis",
      "Walkthrough call with the account lead",
    ],
  },
  engageMonthly: {
    ic: "refresh",
    h: "SEO retainer",
    price: "from £899",
    priceSub: "/ month · cancel any time",
    p: "Monthly execution of the plan -- on-page fixes, content briefs, local SEO, and a written report. No SEO theatre, just work that moves rankings.",
    items: [
      "On-page work done directly in your CMS",
      "2 content briefs per month",
      "Local SEO maintenance",
      "Monthly performance report",
      "Slack access · Monday to Friday",
    ],
  },
  engageCta: {
    title: "Want to see a sample SEO report?",
    sub: "30-min call. We will walk a real client monthly report -- numbers, movement, and what we did to get there.",
  },
}

export default function SEOPage() {
  return <BuildShipTemplate spec={spec} />
}
