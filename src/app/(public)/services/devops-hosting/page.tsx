import type { Metadata } from "next"
import { BuildShipTemplate, type BSServiceSpec } from "@/components/sections/services/BuildShipTemplate"

export const metadata: Metadata = {
  title: "DevOps & Hosting | RevenueLadder",
  description: "Managed hosting, uptime monitoring, and on-call support for Welsh and UK businesses. 99.99% uptime. 4-hour incident SLA.",
}

function StatusWindow() {
  const services = [
    { nm: "orders.brynhall.app", ms: 38,  warn: false },
    { nm: "abercoffee.co.uk",    ms: 92,  warn: false },
    { nm: "voice.snowdon.app",   ms: 142, warn: false },
    { nm: "chat.dovey.co.uk",    ms: 64,  warn: false },
    { nm: "api.conwy-foods.com", ms: 410, warn: true  },
    { nm: "cdn.rl-static.io",   ms: 12,  warn: false },
  ]
  return (
    <div style={{ background: "var(--rl-forest-ink)", border: "2px solid rgba(255,255,255,.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,.45)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", background: "rgba(255,255,255,.02)" }}>
        <div style={{ display: "flex", gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,.15)" }} />
          ))}
        </div>
        <div style={{ flex: 1, fontSize: 10, fontFamily: "var(--rl-font-mono)", color: "rgba(255,255,255,.4)", textAlign: "center" }}>status.revenueladder.co.uk/live</div>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" as const, color: "var(--rl-forest)", background: "rgba(26,77,46,.25)", padding: "2px 8px", borderRadius: 999 }}>Operational</div>
      </div>
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0 10px" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--rl-forest)", flexShrink: 0 }} />
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>All systems operational</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginLeft: "auto" }}>11 services</div>
        </div>
        {services.map((s) => (
          <div key={s.nm} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.04)", borderRadius: 8, padding: "7px 10px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.warn ? "var(--rl-gold)" : "var(--rl-forest)", flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: 11, color: "rgba(255,255,255,.7)", fontFamily: "var(--rl-font-mono)", fontWeight: 500 }}>{s.nm}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: s.warn ? "var(--rl-gold)" : "rgba(255,255,255,.5)", fontFamily: "var(--rl-font-mono)" }}>
              {s.ms}<span style={{ fontSize: 9, fontWeight: 600, marginLeft: 2, opacity: .7 }}>ms</span>
            </div>
            {s.warn && <div style={{ fontSize: 9, fontWeight: 800, color: "var(--rl-gold)", background: "rgba(255,196,37,.12)", padding: "1px 6px", borderRadius: 999 }}>slow</div>}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderTop: "1px solid rgba(255,255,255,.06)", flexWrap: "wrap" as const }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", marginRight: 4 }}>Last 90 days</span>
        {["99.99% uptime", "0 sev-1", "142 deploys", "4h MTTR"].map((chip) => (
          <span key={chip} style={{ fontSize: 10, fontWeight: 700, color: "var(--rl-gold)", background: "rgba(255,196,37,.1)", padding: "1px 7px", borderRadius: 999 }}>{chip}</span>
        ))}
      </div>
    </div>
  )
}

const spec: BSServiceSpec = {
  service: "DevOps & Hosting",
  ic: "server",
  h1: <>Hosted. Monitored.<br />Backed up. <em>On call.</em></>,
  sub: "Managed hosting on UK infrastructure with uptime monitoring, weekly security patches, hourly backups, and a 4-hour incident SLA. We see problems before you do and fix them before you have to ask.",
  trustLabel: "Infrastructure",
  trustBadges: ["Vercel UK edge", "Cloudflare", "Neon EU", "Better Stack"],
  secondaryCta: "See a real status page",
  heroVisual: <StatusWindow />,

  capsHead: {
    eyebrow: "What managed hosting actually means",
    title: <>Six jobs that run <em>without you.</em></>,
    sub: "Most hosting is just a server. Managed hosting is the six jobs that keep everything running -- and the one person who picks up the phone when something breaks.",
  },
  caps: [
    { num: "DO_01", ic: "server", h: "Managed hosting · UK edge",        p: "Every site and app hosted on UK-region infrastructure -- Vercel, Cloudflare, or Fly.io depending on the stack. UK data residency, GDPR-ready.", pct: 100, pctLabel: "Always · infrastructure" },
    { num: "DO_02", ic: "chart",  h: "Uptime + performance monitoring",  p: "We monitor every service every 60 seconds. Response time, error rate, certificate expiry, Lighthouse scores. You hear from us before you notice.", pct: 90, pctLabel: "Continuous · monitoring" },
    { num: "DO_03", ic: "shield", h: "Security + dependency patches",    p: "Weekly automated dependency updates via Renovate. Critical security patches applied same day. No six-month-old npm vulnerabilities.", pct: 85, pctLabel: "Weekly · security" },
    { num: "DO_04", ic: "inbox",  h: "Backups · DB, storage, and code",  p: "Hourly database snapshots, daily storage backups, monthly restore rehearsals. You have never had to restore until you really need to.", pct: 95, pctLabel: "Hourly · backups" },
    { num: "DO_05", ic: "clock",  h: "On-call · 4-hour SLA",            p: "A real engineer on rota -- not a support ticket queue. Severity-1 incidents get a human response within 4 hours, any day of the week.", pct: 100, pctLabel: "On-call · SLA" },
    { num: "DO_06", ic: "mail",   h: "Monthly ops report",               p: "Uptime, deploy count, incident log, patch status. Plain English. If something went wrong this month, it is in the report with what we did about it.", pct: 80, pctLabel: "Monthly · reporting" },
  ],

  proof: {
    eyebrow: "90-day track record",
    h2: "99.99% uptime. 0 severity-1 incidents. 4h MTTR.",
    body: "Across all services under our managed hosting, we have maintained 99.99% uptime over the last 90 days with zero severity-1 incidents. The two severity-2 incidents that occurred were detected by our monitoring and resolved before any client raised a ticket.",
    stats: [
      { v: "99.99", unit: "%", lbl: "Uptime across all managed services · 90 days" },
      { v: "0",               lbl: "Severity-1 incidents · last 90 days" },
      { v: "4",    unit: "h", lbl: "Median time to resolution · all incidents" },
    ],
    quote: {
      initials: "CW",
      name: "Carys Wynne",
      role: "Founder · Conwy Foods · Conwy",
      text: "Our old hosting went down twice in a year and I found out from a customer. With RL, I got a Slack message at 6am saying there had been a brief latency spike and it was already resolved. I did not even know it had happened. That is what managed hosting should look like.",
      meta: "Managed hosting retainer · 18 months",
    },
  },

  diveHead: {
    eyebrow: "How the ops work",
    title: <>Three things that keep<br /><em>everything running.</em></>,
    sub: "Uptime is the obvious metric. Three things underneath it that most hosting providers do not cover.",
  },
  diveStats: [
    { v: "142",           lbl: "Deploys per month · all clients", tag: "Zero-downtime" },
    { v: "100", unit: "%", lbl: "Restore rehearsals passed · 12 mo", tag: "Monthly practice" },
    { v: "7",             lbl: "Days on, 0 off · on-call rota",   tag: "No gaps" },
  ],
  diveRows: [
    {
      eyebrow: "01 · Deploys",
      h3: "142 deploys a month. Zero downtime.",
      p: "Every deployment goes through a preview environment, automated tests, and a rollback checkpoint. If something breaks, we are back to the previous version in under 30 seconds.",
      items: [
        "Preview deployment on every pull request",
        "Automated Lighthouse and Playwright checks pre-merge",
        "One-click rollback in under 30 seconds",
      ],
      visual: (
        <div style={{ background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)", borderRadius: 20, padding: 20 }}>
          <div style={{ fontFamily: "var(--rl-font-display)", fontWeight: 800, fontSize: 12, color: "var(--rl-fg-1)", marginBottom: 14 }}>Deploy log · last 7 days</div>
          {[
            { ref: "abc-de1f", env: "production", rolled: false, ago: "2h ago"  },
            { ref: "3bc-f92a", env: "production", rolled: false, ago: "1d ago"  },
            { ref: "77f-c041", env: "preview",    rolled: false, ago: "1d ago"  },
            { ref: "4ac-8b2e", env: "production", rolled: false, ago: "2d ago"  },
            { ref: "c91-d33f", env: "production", rolled: true,  ago: "3d ago"  },
          ].map((d) => (
            <div key={d.ref} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: "1px solid var(--rl-border-soft)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: d.rolled ? "rgba(255,196,37,.6)" : "var(--rl-forest)", flexShrink: 0 }} />
              <div style={{ fontSize: 10, fontFamily: "var(--rl-font-mono)", color: "var(--rl-fg-1)" }}>{d.ref}</div>
              <div style={{ fontSize: 10, color: "var(--rl-fg-3)", background: "var(--rl-bg)", padding: "1px 5px", borderRadius: 4 }}>{d.env}</div>
              <div style={{ fontSize: 10, color: "var(--rl-fg-3)", marginLeft: "auto" }}>{d.ago}</div>
              {d.rolled && <div style={{ fontSize: 8, fontWeight: 800, color: "var(--rl-gold)", letterSpacing: ".06em" }}>rolled back</div>}
            </div>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "02 · On-call",
      h3: "A real engineer. 7 days a week.",
      p: "The on-call rota rotates weekly across our senior engineers. Severity-1 gets a response in under 4 hours, any day. No offshore support centre, no ticket queue.",
      items: [
        "4-hour response SLA for all severity-1 incidents",
        "Weekly rota -- always a senior engineer, never a junior",
        "Slack escalation -- no ticket queue for emergencies",
      ],
      reverse: true,
      visual: (
        <div style={{ background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)", borderRadius: 20, padding: 20 }}>
          <div style={{ fontFamily: "var(--rl-font-display)", fontWeight: 800, fontSize: 12, color: "var(--rl-fg-1)", marginBottom: 14 }}>On-call rota · this week</div>
          {[
            { av: "EW", nm: "Eira Wynne",  role: "Lead engineer",    days: "Mon-Tue" },
            { av: "AP", nm: "Alaw Pugh",   role: "Backend engineer", days: "Wed-Thu" },
            { av: "TB", nm: "Tom Bevan",   role: "DevOps",           days: "Fri"     },
            { av: "RJ", nm: "Rhys Jones",  role: "Senior engineer",  days: "Sat-Sun" },
          ].map((r) => (
            <div key={r.nm} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid var(--rl-border-soft)" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(26,77,46,.1)", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 900, color: "var(--rl-forest)", fontFamily: "var(--rl-font-display)", flexShrink: 0 }}>{r.av}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--rl-fg-1)" }}>{r.nm}</div>
                <div style={{ fontSize: 10, color: "var(--rl-fg-3)" }}>{r.role}</div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--rl-fg-2)", fontFamily: "var(--rl-font-mono)" }}>{r.days}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "03 · Backups",
      h3: "Hourly backups. Monthly restore rehearsals.",
      p: "Backups mean nothing if you have never tested a restore. We run a restore rehearsal every month and log the result. You have never had to restore until you really need to.",
      items: [
        "Hourly database snapshots -- 7-day rolling window",
        "Daily storage backups -- 30-day retention",
        "Monthly restore rehearsal -- logged and signed off",
      ],
      visual: (
        <div style={{ background: "var(--rl-forest-ink)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: 20 }}>
          {[
            { lbl: "Postgres snapshots", freq: "Hourly",  ret: "7 days",  last: "12 min ago" },
            { lbl: "File storage",       freq: "Daily",   ret: "30 days", last: "6h ago"     },
            { lbl: "Code + config",      freq: "On push", ret: "Forever", last: "2h ago"     },
            { lbl: "Secrets vault",      freq: "Daily",   ret: "90 days", last: "6h ago"     },
            { lbl: "Restore rehearsal",  freq: "Monthly", ret: "Log kept", last: "14d ago"   },
          ].map((r) => (
            <div key={r.lbl} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{r.lbl}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)" }}>{r.freq} · {r.ret}</div>
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", fontFamily: "var(--rl-font-mono)" }}>{r.last}</div>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--rl-forest)", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      ),
    },
  ],

  integrateHead: {
    eyebrow: "The infrastructure stack",
    title: <>UK infrastructure. <em>Zero lock-in.</em></>,
    sub: "Every service we use has UK or EU data residency. We document everything -- if you ever want to move, we hand you the keys.",
  },
  hubNodes: [
    { ic: "server",  lbl: "Cloudflare",     x: 10, y: 22 },
    { ic: "rocket",  lbl: "Vercel UK",      x: 36, y: 6  },
    { ic: "server",  lbl: "Neon EU",        x: 68, y: 6  },
    { ic: "shield",  lbl: "Better Stack",   x: 88, y: 30 },
    { ic: "code",    lbl: "GitHub Actions", x: 80, y: 72 },
    { ic: "chart",   lbl: "Sentry",         x: 10, y: 72 },
  ],
  hubCenter: { ic: "server", nm: "Your Ops", tg: "Hand-off-ready" },
  platformCats: [
    { ic: "server", h: "Compute + edge",  sub: "Where your app runs",        logos: [{ nm: "Vercel", color: "#000000" }, { nm: "Cloudflare", color: "#F38020" }, { nm: "Fly.io", color: "#7C3AED" }, { nm: "Railway", color: "#0B0D0E" }] },
    { ic: "server", h: "Databases · UK",  sub: "Data that stays in Europe",  logos: [{ nm: "Neon EU", color: "#00E699" }, { nm: "Supabase LDN", color: "#3ECF8E" }, { nm: "PlanetScale", color: "#FF6B6B" }, { nm: "AWS RDS UK", color: "#FF9900" }] },
    { ic: "chart",  h: "Monitoring",      sub: "Eyes on everything",         logos: [{ nm: "Better Stack", color: "#3B82F6" }, { nm: "Sentry", color: "#362D59" }, { nm: "Datadog", color: "#632CA6" }, { nm: "Slack alerts", color: "#4A154B" }] },
    { ic: "code",   h: "CI + delivery",   sub: "Automated and auditable",    logos: [{ nm: "GitHub Actions", color: "#2088FF" }, { nm: "Renovate", color: "#1A86FF" }, { nm: "Lighthouse CI", color: "#F9AB00" }, { nm: "Playwright", color: "#2EAD33" }] },
  ],

  engageHead: {
    eyebrow: "How we engage",
    title: <>Migrate once. <em>Then relax.</em></>,
    sub: "We migrate your services to managed infrastructure in two to three weeks, then handle everything ongoing for a flat monthly fee per service.",
  },
  engageSetup: {
    ic: "rocket",
    h: "Migration",
    price: "from £1,800",
    priceSub: "+ VAT · 2-3 weeks",
    p: "We audit your current infrastructure, migrate to managed hosting, set up monitoring and backups, and document everything. One-off, fixed price.",
    items: [
      "Infrastructure audit + migration plan",
      "Zero-downtime migration",
      "Monitoring + alerting configured",
      "Backup system set up and tested",
      "Full documentation handed over",
    ],
  },
  engageMonthly: {
    ic: "refresh",
    h: "Managed ops",
    price: "from £149",
    priceSub: "/ month · per service",
    p: "Per-service monthly fee covering hosting, monitoring, patches, backups, on-call, and a monthly report. No surprises.",
    items: [
      "Managed hosting · UK edge",
      "60-second uptime monitoring",
      "Weekly dependency + security patches",
      "Hourly database backups",
      "On-call · 4-hour SLA",
      "Monthly ops report",
    ],
  },
  engageCta: {
    title: "Want to see a real status page?",
    sub: "30-min call. We will walk our internal status dashboard -- real services, real numbers.",
  },
}

export default function DevOpsHostingPage() {
  return <BuildShipTemplate spec={spec} />
}
