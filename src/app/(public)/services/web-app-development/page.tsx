import type { Metadata } from "next"
import { Shield, Users, ShoppingCart, Mail, BarChart2 } from "lucide-react"
import { BuildShipTemplate, type BSServiceSpec } from "@/components/sections/services/BuildShipTemplate"

export const metadata: Metadata = {
  title: "Web App Development | RevenueLadder",
  description: "Custom internal tools, booking systems, and ops dashboards. Fixed scope, fixed price, six to ten weeks. Built for Welsh and UK SMEs.",
}

function AppDashWindow() {
  const bars = [65, 42, 78, 55, 90, 38, 82]
  const orders = [
    { nm: "Hughes", ref: "#4412", amt: "£142", paid: true },
    { nm: "Owen",   ref: "#4411", amt: "£78",  paid: true },
    { nm: "Davies", ref: "#4410", amt: "£215", paid: false },
  ]
  return (
    <div style={{ background: "var(--rl-forest-ink)", border: "2px solid rgba(255,255,255,.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,.45)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", background: "rgba(255,255,255,.02)" }}>
        <div style={{ display: "flex", gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,.15)" }} />
          ))}
        </div>
        <div style={{ flex: 1, fontSize: 11, fontFamily: "var(--rl-font-mono)", color: "rgba(255,255,255,.4)", textAlign: "center" }}>orders.brynhall.app</div>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "var(--rl-forest)", background: "rgba(26,77,46,.25)", padding: "2px 7px", borderRadius: 999 }}>Live</div>
      </div>
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {[
            { lbl: "Orders", v: "142", ch: "+18%" },
            { lbl: "Revenue", v: "£8.4k", ch: "+22%" },
            { lbl: "Avg order", v: "£59", ch: "+4%" },
          ].map((s) => (
            <div key={s.lbl} style={{ background: "rgba(255,255,255,.05)", borderRadius: 10, padding: "10px 10px" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", fontWeight: 600, marginBottom: 3 }}>{s.lbl}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", fontFamily: "var(--rl-font-display)", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 10, color: "var(--rl-forest)", fontWeight: 700, marginTop: 3 }}>{s.ch}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 32, padding: "0 2px" }}>
          {bars.map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 6 ? "var(--rl-gold)" : "rgba(26,77,46,.55)", borderRadius: "3px 3px 0 0" }} />
          ))}
        </div>
        {orders.map((o) => (
          <div key={o.nm} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "7px 10px" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,196,37,.1)", display: "grid", placeItems: "center", fontSize: 9, fontWeight: 900, color: "var(--rl-gold)", fontFamily: "var(--rl-font-display)" }}>
              {o.nm[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{o.nm}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", fontFamily: "var(--rl-font-mono)" }}>{o.ref}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", fontFamily: "var(--rl-font-display)" }}>{o.amt}</div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" as const, padding: "2px 7px", borderRadius: 999, background: o.paid ? "rgba(26,77,46,.25)" : "rgba(255,196,37,.15)", color: o.paid ? "var(--rl-forest)" : "var(--rl-gold)" }}>
              {o.paid ? "Paid" : "Prep"}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,.06)", flexWrap: "wrap" as const }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginRight: 4 }}>Built · 6 wks · 1 engineer</span>
        {["3 users", "11 tables", "0 bugs", "42 tests"].map((chip) => (
          <span key={chip} style={{ fontSize: 10, fontWeight: 700, color: "var(--rl-gold)", background: "rgba(255,196,37,.1)", padding: "1px 7px", borderRadius: 999 }}>{chip}</span>
        ))}
      </div>
    </div>
  )
}

const spec: BSServiceSpec = {
  service: "Web App Development",
  ic: "layers",
  h1: <>The spreadsheet<br />stops here.<br /><em>Own the code.</em></>,
  sub: "Internal tools, booking systems, and ops dashboards -- built to your exact workflow. Fixed scope, fixed price, six to ten weeks. When we hand it over, it is yours: repo, data, accounts, the lot.",
  trustLabel: "Built on",
  trustBadges: ["Next.js 15", "PostgreSQL", "TypeScript strict", "Vercel UK"],
  secondaryCta: "See three recent apps",
  heroVisual: <AppDashWindow />,

  capsHead: {
    eyebrow: "How every app is built",
    title: <>Six pillars. <em>No negotiation.</em></>,
    sub: "Every web app we build follows the same six-pillar approach. Not optional extras -- non-negotiable foundations that keep the codebase healthy and the handover clean.",
  },
  caps: [
    { num: "WP_01", ic: "briefcase", h: "Scope + data model first", p: "Day one is paper. We agree the data model and scope in writing before a single line of code. No scope creep because the scope is signed.", pct: 30, pctLabel: "Weeks 1-2 · foundation" },
    { num: "WP_02", ic: "shield",    h: "Auth + roles day one",      p: "Authentication and role-based access are built in week two -- never bolted on at the end. Every user sees exactly what they should.", pct: 45, pctLabel: "Week 2 · access" },
    { num: "WP_03", ic: "cart",      h: "Stripe billing wired in",   p: "If the app charges for anything, Stripe is wired in week three. Subscriptions, one-off payments, invoicing -- all tested before the build phase ends.", pct: 60, pctLabel: "Week 3 · revenue" },
    { num: "WP_04", ic: "workflow",  h: "Integrations in code",      p: "CRM, email, calendar, accounting -- every integration is written as code, not configured through a GUI. Portable, testable, yours.", pct: 75, pctLabel: "Weeks 3-4 · connections" },
    { num: "WP_05", ic: "check",     h: "Tests gate every merge",    p: "No pull request merges without a passing test suite. We target 80%+ coverage across unit, integration, and end-to-end tests.", pct: 90, pctLabel: "Weeks 4-5 · quality" },
    { num: "WP_06", ic: "sparkles",  h: "Hand-over · you own it",   p: "Repo access, local dev setup, training videos, written handbook, and a 30-day window to ask anything. We do not disappear at go-live.", pct: 100, pctLabel: "Week 6 · complete" },
  ],

  proof: {
    eyebrow: "In production",
    h2: "11 internal apps shipped. £128k in SaaS replaced.",
    body: "Across our eleven web app builds, clients have replaced an average of £11.6k per year in SaaS subscriptions -- tools they were bending their process around rather than tools built for their process. Median build time is six weeks.",
    stats: [
      { v: "11",         lbl: "Web apps in production · 2022-25" },
      { v: "£128", unit: "k",  lbl: "Annual SaaS cost replaced across builds" },
      { v: "6",    unit: "wk", lbl: "Median build duration" },
    ],
    quote: {
      initials: "AT",
      name: "Aled Thomas",
      role: "COO · Bryn Hall Hotels · Conwy",
      text: "We were paying £1,400 a month for four SaaS tools that did not talk to each other. RL built us one app in six weeks that did everything in one place. The build paid for itself in under four months and now we own it outright.",
      meta: "orders.brynhall.app · shipped March 2025",
    },
  },

  diveHead: {
    eyebrow: "How we build differently",
    title: <>Three things most<br /><em>app agencies skip.</em></>,
    sub: "Most web app builds run over budget, over time, and hand you a codebase nobody else can maintain. Three things we do differently.",
  },
  diveStats: [
    { v: "42",           lbl: "Reusable components per build", tag: "Storybook-documented" },
    { v: "88",  unit: "%", lbl: "Median test coverage",          tag: "Across all builds" },
    { v: "<30", unit: "s", lbl: "Rollback time",                 tag: "Any deployment" },
  ],
  diveRows: [
    {
      eyebrow: "01 · Components",
      h3: "42 components. Documented. Reusable.",
      p: "Every app we build gets a living component library. New screens are built from existing pieces. Your team can maintain the codebase without us.",
      items: [
        "Every component documented in Storybook",
        "Accessible by default -- WCAG 2.2 AA minimum",
        "Design tokens from your brand, not from scratch",
      ],
      visual: (
        <div style={{ background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)", borderRadius: 20, padding: 20 }}>
          <div style={{ fontFamily: "var(--rl-font-display)", fontWeight: 800, fontSize: 12, color: "var(--rl-fg-1)", marginBottom: 14 }}>Component library · 42 components</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
            {Array.from({ length: 42 }).map((_, i) => (
              <div key={i} style={{ aspectRatio: "1", borderRadius: 6, background: i < 38 ? (i % 7 === 0 ? "var(--rl-forest)" : i % 5 === 0 ? "rgba(26,77,46,.2)" : "rgba(26,77,46,.08)") : "rgba(255,196,37,.15)", border: i >= 38 ? "1.5px dashed rgba(255,196,37,.4)" : "none" }} />
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: "var(--rl-fg-3)", fontFamily: "var(--rl-font-mono)" }}>38 shipped · 3 in review · 1 draft</div>
        </div>
      ),
    },
    {
      eyebrow: "02 · Testing",
      h3: "No merge without a passing test suite.",
      p: "Tests are written before the feature, not after. Every pull request runs the full suite -- unit, integration, and end-to-end. 88% median coverage across all builds.",
      items: [
        "Tests written before the feature (TDD)",
        "GitHub Actions blocks merge on any failure",
        "End-to-end tests with Playwright on every PR",
      ],
      reverse: true,
      visual: (
        <div style={{ background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)", borderRadius: 20, padding: 20 }}>
          <div style={{ fontFamily: "var(--rl-font-display)", fontWeight: 800, fontSize: 12, color: "var(--rl-fg-1)", marginBottom: 14 }}>Test coverage · orders.brynhall.app</div>
          {[
            { lbl: "Unit tests",    pct: 88 },
            { lbl: "Integration",   pct: 82 },
            { lbl: "End-to-end",    pct: 94 },
            { lbl: "API contracts", pct: 89 },
          ].map((r) => (
            <div key={r.lbl} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "var(--rl-fg-2)", marginBottom: 5 }}>
                <span>{r.lbl}</span>
                <span style={{ fontFamily: "var(--rl-font-mono)", color: "var(--rl-forest)", fontWeight: 700 }}>{r.pct}%</span>
              </div>
              <div style={{ height: 6, background: "var(--rl-bg)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${r.pct}%`, background: "var(--rl-forest)", borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "03 · Auth + billing",
      h3: "Auth and payments, done properly.",
      p: "Authentication, role-based access, and billing are wired in week two -- never bolted on. We use production-grade services: Clerk for identity, Stripe for revenue.",
      items: [
        "Sign-in: Clerk -- magic link, social, SSO",
        "Roles and permissions: row-level security in Postgres",
        "Stripe Checkout and Billing Portal, tested end-to-end",
      ],
      visual: (
        <div style={{ background: "var(--rl-forest-ink)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: 20 }}>
          {[
            { Icon: Shield,      t: "Sign-in · Clerk",              s: "Magic link + social + SSO" },
            { Icon: Users,       t: "Roles · row-level security",   s: "Admin / manager / viewer" },
            { Icon: ShoppingCart, t: "Stripe Checkout",             s: "Subscriptions + one-off" },
            { Icon: Mail,        t: "Transactional email · Resend", s: "Welcome, invoice, alert" },
            { Icon: BarChart2,   t: "Analytics · PostHog",          s: "Events + feature flags" },
          ].map((row) => (
            <div key={row.t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,196,37,.08)", display: "grid", placeItems: "center", flexShrink: 0, color: "var(--rl-gold)" }}>
                <row.Icon size={13} strokeWidth={2} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{row.t}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)" }}>{row.s}</div>
              </div>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" as const, color: "var(--rl-forest)", background: "rgba(26,77,46,.25)", padding: "2px 7px", borderRadius: 999 }}>On</div>
            </div>
          ))}
        </div>
      ),
    },
  ],

  integrateHead: {
    eyebrow: "The build stack",
    title: <>Built on a stack that <em>lasts.</em></>,
    sub: "Every technology we use is open-source-friendly, portable, and in active production. No vendor lock-in -- you can take the codebase to any engineer.",
  },
  hubNodes: [
    { ic: "code",   lbl: "Next.js",  x: 12, y: 22 },
    { ic: "server", lbl: "Postgres", x: 36, y: 6  },
    { ic: "shield", lbl: "Clerk",    x: 68, y: 6  },
    { ic: "cart",   lbl: "Stripe",   x: 88, y: 28 },
    { ic: "mail",   lbl: "Resend",   x: 78, y: 72 },
    { ic: "chart",  lbl: "PostHog",  x: 12, y: 72 },
  ],
  hubCenter: { ic: "layers", nm: "Your App", tg: "RL Build Stack" },
  platformCats: [
    { ic: "code",   h: "Framework + database", sub: "The core of every build",      logos: [{ nm: "Next.js 15", color: "#000000" }, { nm: "TypeScript", color: "#3178C6" }, { nm: "PostgreSQL", color: "#336791" }, { nm: "Drizzle ORM", color: "#C5F74F" }] },
    { ic: "shield", h: "Auth + identity",      sub: "Access control, done right",   logos: [{ nm: "Clerk", color: "#6C47FF" }, { nm: "WorkOS", color: "#111111" }, { nm: "Auth.js", color: "#3178C6" }] },
    { ic: "cart",   h: "Billing + payments",   sub: "Revenue infrastructure",       logos: [{ nm: "Stripe", color: "#635BFF" }, { nm: "Polar", color: "#111111" }, { nm: "GoCardless", color: "#009AC7" }] },
    { ic: "chart",  h: "Observability",        sub: "See what your app is doing",   logos: [{ nm: "Sentry", color: "#362D59" }, { nm: "PostHog", color: "#F76B15" }, { nm: "Better Stack", color: "#3B82F6" }, { nm: "Cloudflare", color: "#F38020" }] },
  ],

  engageHead: {
    eyebrow: "How we engage",
    title: <>Fixed scope. <em>One price.</em></>,
    sub: "A web app engagement is a single fixed-scope project with a price agreed before work starts and a published go-live date.",
  },
  engageSetup: {
    ic: "rocket",
    h: "Build project",
    price: "from £14,800",
    priceSub: "+ VAT · 6-10 weeks",
    p: "A complete web app -- from data model to deployed production -- with full test coverage, auth, billing, and a clean hand-over.",
    items: [
      "Scoped in writing before work starts",
      "Fixed price -- agreed before kick-off",
      "Published go-live date",
      "Weekly Friday demo on staging",
      "Full test suite · 80%+ coverage target",
      "30-day hyper-care window post-launch",
    ],
  },
  engageMonthly: {
    ic: "refresh",
    h: "Care + iteration plan",
    price: "from £349",
    priceSub: "/ month · cancel any time",
    p: "Ongoing hosting, monitoring, dependency updates, and a monthly hour bank for small changes and new features.",
    items: [
      "Managed hosting · Vercel UK edge",
      "Uptime + performance monitoring",
      "Dependency + security patches weekly",
      "4 hours / month for small changes",
      "Emergency fix SLA · 4 hours",
    ],
  },
  engageCta: {
    title: "Want a quote for an internal tool?",
    sub: "Tell us what your spreadsheet does -- we will send a fixed price in 48 hours.",
  },
}

export default function WebAppDevelopmentPage() {
  return <BuildShipTemplate spec={spec} />
}
