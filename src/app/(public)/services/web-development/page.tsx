import type { Metadata } from "next"
import React from "react"
import { BuildShipTemplate, type BSServiceSpec } from "@/components/sections/services/BuildShipTemplate"

export const metadata: Metadata = {
  title: "Web development Wales | Revenue Ladder",
  description: "Marketing sites built fast and built right -- Lighthouse 96+, WCAG 2.2, Welsh and English. Hand-built from Bangor.",
}

function SiteWindow() {
  return (
    <div className="t2-mock">
      <div className="t2-window">
        <div className="t2-win-chrome">
          <div className="dots"><i /><i /><i /></div>
          <div className="url">
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ color: "var(--rl-success)" }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            <b>abercoffee.co.uk</b> <span style={{ color: "var(--rl-fg-3)" }}>/ shop</span>
          </div>
        </div>
        <div className="t2-win-body" style={{ gap: 12 }}>
          <div style={{ height: 44, background: "var(--rl-forest)", borderRadius: 8, display: "flex", alignItems: "center", padding: "0 16px", gap: 12 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--rl-gold)" }} />
            <div style={{ flex: 1, height: 7, background: "rgba(255,255,255,.2)", borderRadius: 4 }} />
            <div style={{ padding: "4px 12px", background: "var(--rl-gold)", borderRadius: 6, fontSize: 10, fontWeight: 800, color: "var(--rl-forest-ink)" }}>Shop</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[{ l: "Sessions", v: "4.2k", d: "+38%" }, { l: "Conv rate", v: "3.8%", d: "+1.2%" }, { l: "Avg order", v: "£28", d: "+9%" }].map((s) => (
              <div key={s.l} style={{ background: "var(--rl-bg)", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase" as const, color: "var(--rl-fg-3)" }}>{s.l}</div>
                <div style={{ fontFamily: "var(--rl-font-display)", fontWeight: 900, fontSize: 18, color: "var(--rl-forest)", marginTop: 3 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: "var(--rl-success)", fontWeight: 700 }}>{s.d}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 5 }}>
            {[
              { id: "#2841", prod: "Hafod Blend · 250g", total: "£14.50", s: "dispatched" },
              { id: "#2840", prod: "Cwmni Dark · 500g",  total: "£24.00", s: "paid" },
              { id: "#2839", prod: "Tasting pack x3",    total: "£38.00", s: "paid" },
            ].map((r) => (
              <div key={r.id} style={{ display: "grid", gridTemplateColumns: "48px 1fr auto auto", gap: 8, padding: "6px 10px", background: "var(--rl-bg)", borderRadius: 6, fontSize: 11 }}>
                <span style={{ fontFamily: "var(--rl-font-mono)", color: "var(--rl-fg-3)" }}>{r.id}</span>
                <span style={{ color: "var(--rl-fg-1)", fontWeight: 600 }}>{r.prod}</span>
                <span style={{ fontFamily: "var(--rl-font-mono)", fontWeight: 700 }}>{r.total}</span>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".10em", textTransform: "uppercase" as const, padding: "2px 6px", borderRadius: 99, background: "rgba(16,185,129,.12)", color: "var(--rl-success)" }}>{r.s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="t2-light">
        <div className="h"><span>Lighthouse · abercoffee.co.uk</span><span className="live">LIVE</span></div>
        <div className="t2-light-grid">
          <div className="t2-light-score"><div className="ring" style={{ "--p": 96 } as React.CSSProperties}><span className="v">96</span></div><div className="lbl">Perf</div></div>
          <div className="t2-light-score"><div className="ring" style={{ "--p": 100 } as React.CSSProperties}><span className="v">100</span></div><div className="lbl">A11y</div></div>
          <div className="t2-light-score"><div className="ring" style={{ "--p": 100 } as React.CSSProperties}><span className="v">100</span></div><div className="lbl">Best pr.</div></div>
          <div className="t2-light-score"><div className="ring" style={{ "--p": 98 } as React.CSSProperties}><span className="v">98</span></div><div className="lbl">SEO</div></div>
        </div>
      </div>
    </div>
  )
}

function LighthouseVis() {
  return (
    <div className="t2-vis-perf">
      <div className="h">Lighthouse CI · abercoffee.co.uk<small>{'// all green · every deploy'}</small></div>
      <div className="scores">
        {[{ lbl: "Performance", v: 96 }, { lbl: "Accessibility", v: 100 }, { lbl: "Best practices", v: 100 }, { lbl: "SEO", v: 98 }].map((s) => (
          <div key={s.lbl} className="score-row">
            <span className="lbl">{s.lbl}</span>
            <div className="bar"><i style={{ width: `${s.v}%` }} /></div>
            <span className="v">{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function A11yChecklist() {
  return (
    <div className="t2-vis-check">
      <div className="h">WCAG 2.2 checklist<small>{'// AA + AAA · every page'}</small></div>
      <ul>
        {[
          ["Colour contrast · 11.5:1 (AAA)", true],
          ["Keyboard navigation · full", true],
          ["Screen reader · VoiceOver + NVDA", true],
          ["Focus indicators · visible", true],
          ["Welsh language · hreflang set", true],
          ["Alt text · all images covered", true],
        ].map(([t, done]) => (
          <li key={String(t)} className={done ? "ok" : ""}>
            <span className="ic">{done ? "✓" : "○"}</span>{String(t)}
          </li>
        ))}
      </ul>
    </div>
  )
}

function DeployLog() {
  return (
    <div className="t2-vis-deploy">
      <div className="h">
        <div className="ttl">deploy · main → production<small>{'// commit a31f8c · pushed 09:11'}</small></div>
        <div className="pill">Live</div>
      </div>
      <div className="log">
        {[
          { t: "09:11:02", g: "→", txt: "queue → build (vercel-uk-1)", ms: "2s" },
          { t: "09:11:14", g: "⚙", txt: "pnpm install · 312 modules",  ms: "14s" },
          { t: "09:11:48", g: "✓", txt: "lint · 0 errors",             ms: "6s",  ok: true },
          { t: "09:12:21", g: "✓", txt: "next build · 32 pages",       ms: "23s", ok: true },
          { t: "09:12:38", g: "✓", txt: "lighthouse-ci · all green",   ms: "17s", ok: true },
          { t: "09:12:42", g: "◉", txt: "promote → production",        ms: "live", alive: true },
        ].map((r, i) => (
          <div key={i} className={`row${r.alive ? " alive" : ""}`}>
            <span className="t">{r.t}</span>
            <span className="glyph">{r.g}</span>
            <span className={r.ok ? "ok" : ""}>{r.txt}</span>
            <span className="ms">{r.ms}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const spec: BSServiceSpec = {
  service: "Web Development",
  ic: "globe",
  h1: <>Marketing sites built fast.<br />Built to <em>perform</em>.<br />Bilingual by default.</>,
  sub: "Marketing sites, e-commerce, and landing pages built in Next.js, scored 96+ on Lighthouse, WCAG 2.2 compliant, Welsh and English ready. No templates. No page builders.",
  secondaryCta: "See live examples",
  trustBadges: ["Next.js + Vercel UK", "Lighthouse 96+", "WCAG 2.2 AAA", "4-week median delivery"],
  heroVisual: <SiteWindow />,
  capsHead: {
    eyebrow: "What gets built",
    title: <>Six work-packages.<br /><em>One shipped site.</em></>,
    sub: "Every build runs the same scaffold so we quote it accurately and deliver it predictably.",
  },
  caps: [
    { num: "WP_01", pct: 20,  pctLabel: "wk 1",   ic: "pencil", h: "Copy + design, not just code",    p: "We write the copy and design the pages. You get a finished site, not a blank theme waiting for content." },
    { num: "WP_02", pct: 40,  pctLabel: "wk 1--2", ic: "globe",  h: "Welsh + English, built in",       p: "Bilingual from day one. Proper i18n routing, hreflang, Welsh-first or toggle -- your choice." },
    { num: "WP_03", pct: 60,  pctLabel: "wk 2--3", ic: "search", h: "SEO baked in, not bolted on",    p: "Schema, meta, sitemap, Core Web Vitals, GSC submission. Done at build, not left for the retainer." },
    { num: "WP_04", pct: 75,  pctLabel: "wk 3",    ic: "shield", h: "WCAG 2.2 · AAA contrast",        p: "Our brand hits 11.5:1 contrast. Every build tested with VoiceOver + NVDA before launch." },
    { num: "WP_05", pct: 88,  pctLabel: "wk 3--4", ic: "chart",  h: "Lighthouse 96+ on every deploy", p: "Performance scores gate every CI run. A deploy that drops below 90 does not promote to production." },
    { num: "WP_06", pct: 100, pctLabel: "wk 4",    ic: "rocket", h: "Hand-over · you own it",         p: "Repo access, CMS training, written handover doc. Built to hand over, not to lock you in." },
  ],
  proof: {
    eyebrow: "Sites shipped",
    h2: "27 sites. 2.8x performance. 100% on time.",
    body: "Twenty-seven marketing sites and e-commerce builds delivered between 2022 and 2025. Average Lighthouse performance score at launch: 96. Average performance improvement over the previous site: 2.8x. Every one shipped within scope and on budget.",
    stats: [
      { v: "27",   lbl: "Sites shipped · 2022--25" },
      { v: "×2.8", lbl: "Avg performance vs previous site" },
      { v: "100",  unit: "%", lbl: "On time and on budget" },
    ],
    quote: {
      initials: "EW",
      name: "Eleri Williams",
      role: "Owner · Aber Coffee · Aberystwyth",
      text: "Our old site scored 34 on Lighthouse and loaded in 6 seconds. RL rebuilt it in four weeks -- 96 performance, under a second on mobile. We added a Welsh version and a shop and it still beat the old site on every metric. The SEO traffic from the first month alone covered the build cost.",
      meta: "Site live March 2025",
    },
  },
  diveHead: {
    eyebrow: "Where most sites go wrong",
    title: <>Three things that separate a <em>real site</em><br />from a template.</>,
    sub: "A website is not a Figma file made clickable. Performance, accessibility, and deployability are engineering problems. We solve them before launch.",
  },
  diveStats: [
    { v: "96",   unit: "+",  lbl: "Lighthouse score at launch",   tag: "Gated in CI"      },
    { v: "100",  unit: "%",  lbl: "WCAG 2.2 compliance",          tag: "AAA contrast"     },
    { v: "< 30", unit: "s",  lbl: "Rollback if something breaks", tag: "One-click revert" },
  ],
  diveRows: [
    {
      eyebrow: "01 · Performance",
      h3: <>Lighthouse scores <em>gated in CI</em>.<br />Not checked after launch.</>,
      p: "Every push runs Lighthouse CI against a budget. Performance below 90 blocks the deploy. So does accessibility regression. The score on day one is the score on day 365.",
      items: ["Lighthouse CI on every push -- blocks on regression", "Core Web Vitals: LCP < 1s, CLS < 0.1, INP < 100ms", "Image optimisation, font loading, and bundle split handled automatically"],
      visual: <LighthouseVis />,
    },
    {
      eyebrow: "02 · Accessibility",
      h3: <>WCAG 2.2 compliant.<br /><em>Before</em> it ships.</>,
      p: "We test with VoiceOver, NVDA, and keyboard-only navigation on every build. 11.5:1 contrast ratio. Every image has alt text. Every form has a label.",
      items: ["11.5:1 contrast ratio (AAA) -- exceeds the 7:1 minimum", "Keyboard navigation tested on every page", "Screen reader tested with VoiceOver + NVDA before launch"],
      visual: <A11yChecklist />,
      reverse: true,
    },
    {
      eyebrow: "03 · Deployability",
      h3: <>Every change through the same<br /><em>boring</em> pipeline.</>,
      p: "No FTP, no \"while I am in there\". Every change is a pull request, runs through CI, ships to a preview URL, gets approved, then promotes. Rollback in 30 seconds.",
      items: ["Preview URLs on every branch -- share before merging", "CI gates: lint, types, Lighthouse, and build", "One-click rollback to any previous deploy"],
      visual: <DeployLog />,
    },
  ],
  integrateHead: {
    eyebrow: "The build stack",
    title: <>A stack you can <em>hire for</em>.<br />Not one we invented.</>,
    sub: "Boring, popular, well-documented technology. So you can hire another developer onto it later without calling us.",
  },
  hubNodes: [
    { ic: "code",   lbl: "Next.js",   x: 12, y: 30 },
    { ic: "rocket", lbl: "Vercel UK", x: 36, y: 12 },
    { ic: "pencil", lbl: "Sanity",    x: 70, y: 12 },
    { ic: "search", lbl: "GSC",       x: 88, y: 36 },
    { ic: "chart",  lbl: "Plausible", x: 78, y: 76 },
    { ic: "cart",   lbl: "Stripe",    x: 14, y: 76 },
  ],
  hubCenter: { ic: "globe", nm: "Your Site", tg: "RL Build Stack" },
  platformCats: [
    { ic: "code",   h: "Framework + deploy", sub: "The backbone",         logos: [{ nm: "Next.js", color: "#000000" }, { nm: "TypeScript", color: "#3178C6" }, { nm: "Vercel UK", color: "#000000" }, { nm: "Tailwind", color: "#06B6D4" }] },
    { ic: "pencil", h: "CMS options",        sub: "What editors use",     logos: [{ nm: "Sanity", color: "#F03E2F" }, { nm: "Contentful", color: "#2478CC" }, { nm: "Payload", color: "#000000" }, { nm: "Notion API", color: "#000000" }] },
    { ic: "cart",   h: "Commerce",           sub: "When you need a shop", logos: [{ nm: "Stripe", color: "#635BFF" }, { nm: "Shopify", color: "#7AB55C" }, { nm: "Medusa", color: "#1A1A1A" }, { nm: "Snipcart", color: "#3B82F6" }] },
    { ic: "chart",  h: "Analytics",          sub: "Where the truth is",   logos: [{ nm: "Plausible", color: "#5850EC" }, { nm: "GA4", color: "#F9AB00" }, { nm: "PostHog", color: "#000000" }, { nm: "Fathom", color: "#9187FF" }] },
  ],
  engageHead: {
    eyebrow: "How we engage",
    title: <>Build once. <em>Maintain</em> forever.</>,
    sub: "Fixed-scope build, then an optional care plan so the site keeps working as the business changes.",
  },
  engageSetup: {
    ic: "rocket", h: "Project build", price: "from £6,800", priceSub: "+ VAT · 4 weeks",
    p: "Fixed-price, fixed-scope site build. You own the repo, the domain, the CMS. We deliver a live site with copy, design, and Lighthouse 96+.",
    items: ["Discovery + sitemap (week 1)", "Design + copy (week 1--2)", "Build on staging, weekly reviews", "SEO + a11y + Lighthouse all green", "Hand-over training + docs"],
  },
  engageMonthly: {
    ic: "refresh", h: "Care plan", price: "£189", priceSub: "/ month · cancel any time",
    p: "Keep the site fast, secure, and up to date. We handle hosting, patches, and small updates.",
    items: ["Managed hosting on Vercel UK", "Up to 4h / month of copy + code updates", "Weekly dependency + security patches", "Monthly Lighthouse check", "Priority turnaround on urgent fixes"],
  },
  engageCta: {
    title: "Want a quote for your site?",
    sub: "30-min call. We will send a fixed price within 48 hours.",
  },
}

export default function WebDevelopmentPage() {
  return <BuildShipTemplate spec={spec} />
}
