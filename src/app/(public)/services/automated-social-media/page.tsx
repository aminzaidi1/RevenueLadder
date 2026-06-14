import type { Metadata } from "next"
import { AIServiceTemplate, type AIServiceSpec } from "@/components/sections/services/AIServiceTemplate"
import { IntegrationsTicker } from "@/components/shared/IntegrationsTicker"

export const metadata: Metadata = {
  title: "Automated Social Media | Revenue Ladder",
  description: "Social media content planned, written, and scheduled automatically -- with a human approving every post. Built for Welsh and UK SMEs.",
}

function CalendarPanel() {
  const posts = [
    { day: "Mon", platform: "LinkedIn",  status: "done", copy: "Why 38s is the magic number for voice booking..." },
    { day: "Wed", platform: "Instagram", status: "done", copy: "Behind the scenes at Snowdon Trails..." },
    { day: "Thu", platform: "LinkedIn",  status: "run",  copy: "The real cost of a missed call [data]" },
    { day: "Fri", platform: "Instagram", status: "next", copy: "Weekend vibes -- what are you booking?" },
  ]
  return (
    <div className="t1-call">
      <div className="t1-call-head">
        <div className="t1-caller">
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,196,37,.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "var(--rl-gold)" }}>ST</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Snowdon Trails · Social</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>16 posts scheduled this month</div>
          </div>
        </div>
      </div>
      <div className="t1-call-body" style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
        {posts.map((p) => (
          <div key={p.day + p.platform} style={{ display: "grid", gridTemplateColumns: "32px 80px 1fr auto", gap: 10, alignItems: "center", background: "rgba(255,255,255,.04)", borderRadius: 10, padding: "8px 12px" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,.4)", fontFamily: "var(--rl-font-mono)" }}>{p.day}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: p.platform === "LinkedIn" ? "#0A66C2" : "#E4405F", background: "rgba(255,255,255,.06)", borderRadius: 6, padding: "2px 6px", textAlign: "center" }}>{p.platform}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.copy}</div>
            <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase" as const, padding: "2px 7px", borderRadius: 999, background: p.status === "done" ? "rgba(16,185,129,.15)" : p.status === "run" ? "rgba(255,196,37,.15)" : "rgba(255,255,255,.06)", color: p.status === "done" ? "var(--rl-success)" : p.status === "run" ? "var(--rl-gold)" : "rgba(255,255,255,.35)" }}>{p.status === "done" ? "Live" : p.status === "run" ? "Queued" : "Draft"}</div>
          </div>
        ))}
      </div>
      <div className="t1-call-foot" style={{ display: "flex", justifyContent: "center" }}>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,.45)", textAlign: "center", whiteSpace: "nowrap" }}>4.2k reach this week -- up 38% on last month</span>
      </div>
    </div>
  )
}

const spec: AIServiceSpec = {
  service: "Automated Social Media",
  ic: "share",
  h1: <>Planned. Written.<br />Scheduled automatically.<br /><em>Approved by you.</em></>,
  sub: "Social media content generated from your business -- your wins, your voice, your audience -- planned a month ahead, approved in one sitting, and posted without you touching a scheduler.",
  secondaryCta: "See a sample calendar",
  trustBadges: ["16 posts / month avg", "4.2k reach / week", "38% engagement uplift"],
  heroVisual: <CalendarPanel />,
  capsHead: {
    eyebrow: "Six things we automate",
    title: <>Six jobs. <em>Zero scheduling sessions.</em></>,
    sub: "From content planning to cross-posting to performance reporting -- we handle the social media work your team does not have time for.",
  },
  caps: [
    { ic: "chart",    h: "Monthly content calendar",    p: "A full month of posts planned around your business calendar -- launches, offers, events, and evergreen content mixed to a proven ratio." },
    { ic: "pencil",   h: "Post copy + creative briefs",  p: "Copy written in your voice for every post. Caption, hook, CTA, and hashtag set included. Creative brief for visuals if you have a designer." },
    { ic: "share",    h: "Cross-platform scheduling",    p: "LinkedIn, Instagram, Facebook, and X scheduled from one place. Platform-native formatting -- no cropped images, no truncated captions." },
    { ic: "eye",      h: "Approval workflow",            p: "Every post lands in your inbox for a single yes or edit before it goes live. Nothing posts without your sign-off." },
    { ic: "sparkles", h: "Reel and short-form scripts",  p: "Short-form video scripts written around your best-performing topics. Record once, post across platforms." },
    { ic: "chart",    h: "Monthly performance report",   p: "Reach, engagement, follower growth, and top posts. Plain-English summary with what to change next month." },
  ],
  proof: {
    eyebrow: "Real numbers",
    h2: "16 posts a month. 4.2k reach. 38% up.",
    body: "Across our social media clients, average weekly reach is 4.2k and engagement has grown 38% in the first three months. Posts are approved in a single monthly session -- no day-to-day scheduling required.",
    stats: [
      { v: "16",  lbl: "Posts scheduled per month, per client" },
      { v: "4.2", unit: "k", lbl: "Average weekly reach across deployments" },
      { v: "38",  unit: "%", lbl: "Average engagement uplift at 3 months" },
    ],
    quote: {
      initials: "DM",
      name: "David Morgan",
      role: "Owner · Snowdon Trails · Llanberis",
      text: "I used to spend a Sunday evening every week trying to think of something to post. Now I spend 20 minutes once a month approving the calendar RL send me. Engagement is up, follower count is up, and I have my Sundays back.",
      meta: "Social media retainer · 5 months",
    },
  },
  diveHead: {
    eyebrow: "How it works",
    title: <>Three parts that make social media <em>run itself</em>.</>,
    sub: "Most social media automation fails because the content sounds robotic, the approval step is skipped, or the posts never vary. We build plans that stay fresh without requiring daily attention.",
  },
  diveStats: [
    { v: "16",              lbl: "Posts per month",           tag: "All platforms combined" },
    { v: "< 30", unit: "m", lbl: "Monthly approval session",  tag: "One sitting, not daily" },
    { v: "38",   unit: "%", lbl: "Avg engagement uplift",     tag: "First 3 months"         },
  ],
  diveRows: [
    {
      eyebrow: "01 · Plan",
      h3: "A month of content in one brief.",
      body: "We plan every month against your business calendar -- new services, seasonal hooks, industry news, and evergreen content. The ratio is set: 40% educational, 30% social proof, 20% promotional, 10% culture. You review the plan once.",
      bullets: ["Monthly content calendar delivered 5 days before month start", "Built around your events: launches, offers, campaigns", "Content ratio set to avoid over-promotion fatigue"],
      visual: (
        <div style={{ background: "var(--rl-surface)", border: "2px solid var(--rl-border-soft)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontFamily: "var(--rl-font-display)", fontWeight: 800, fontSize: 13, color: "var(--rl-fg-1)" }}>Content mix · June</div>
          {[
            { lbl: "Educational",  pct: 40, col: "var(--rl-forest)"      },
            { lbl: "Social proof", pct: 30, col: "var(--rl-gold)"        },
            { lbl: "Promotional",  pct: 20, col: "var(--rl-forest-dark)" },
            { lbl: "Culture",      pct: 10, col: "rgba(255,196,37,.5)"   },
          ].map((r) => (
            <div key={r.lbl}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "var(--rl-fg-2)", marginBottom: 5 }}>
                <span>{r.lbl}</span>
                <span style={{ fontFamily: "var(--rl-font-mono)", color: "var(--rl-forest)", fontWeight: 700 }}>{r.pct}%</span>
              </div>
              <div style={{ height: 6, background: "var(--rl-bg)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${r.pct}%`, background: r.col, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      eyebrow: "02 · Write",
      h3: "Copy that sounds like you, not a content tool.",
      body: "Every post is written to your voice profile. Platform-native formatting: LinkedIn gets different structure to Instagram. Hooks are tested against your top-performing posts.",
      bullets: ["Voice profile applied to every caption", "Platform-native formatting: LinkedIn, Instagram, Facebook, X", "Hook library built from your top-performing posts"],
      visual: (
        <div className="t1-vis-handoff">
          <div className="who-stack">
            {[
              { av: "LI", nm: "LinkedIn post",    rl: "800 chars · hook + insight + CTA", cls: "bot" },
              { av: "IG", nm: "Instagram caption", rl: "150 chars · hook + hashtag set",   cls: ""    },
              { av: "FB", nm: "Facebook post",     rl: "Adapted from LI · community tone", cls: ""    },
            ].map((c) => (
              <div key={c.nm} className={`who-card${c.cls ? ` ${c.cls}` : ""}`}>
                <div className="av">{c.av}</div>
                <div><div className="nm">{c.nm}</div><div className="rl">{c.rl}</div></div>
                <div className={`pill ${c.cls === "bot" ? "run" : "done"}`}>{c.cls === "bot" ? "Writing" : "Done"}</div>
              </div>
            ))}
          </div>
          <div className="swap-note">One brief -- three platform-native versions ready for approval.</div>
        </div>
      ),
    },
    {
      eyebrow: "03 · Schedule",
      h3: "Posted at the right time, every time.",
      body: "Once you approve the calendar, every post is scheduled at peak engagement time for your audience on each platform. No manual posting, no missed windows.",
      bullets: ["Peak-time scheduling per platform and audience", "Cross-posting handled from one tool -- no duplicate logins", "Rescheduling on the fly if plans change"],
      visual: (
        <div className="t1-vis-intent">
          <div className="input">Thursday post · LinkedIn · approved</div>
          <div className="arrow-down" />
          <div className="router">Scheduler <span className="tag">AUTO</span></div>
          <div className="branches">
            <div className="branch on">LinkedIn<div className="conf">08:30</div></div>
            <div className="branch on">Instagram<div className="conf">12:00</div></div>
            <div className="branch on">Facebook<div className="conf">12:00</div></div>
          </div>
        </div>
      ),
    },
  ],
  hubNodes: [
    { ic: "share",    lbl: "Meta",      x: 14, y: 14, logoSrc: "/assets/icons/meta.svg",             logoBg: "#fff" },
    { ic: "zap",      lbl: "Make",      x: 78, y: 14, logoSrc: "/assets/icons/make.png",             logoBg: "#fff" },
    { ic: "zap",      lbl: "Zapier",    x: 4,  y: 42, logoSrc: "/assets/icons/zapier.png",           logoBg: "#fff" },
    { ic: "mail",     lbl: "Mailchimp", x: 88, y: 42, logoSrc: "/assets/icons/mailchimp-icon-3.svg", logoBg: "#FFE01B" },
    { ic: "book",     lbl: "Notion",    x: 14, y: 70, logoSrc: "/assets/icons/notion.svg",           logoBg: "#fff" },
    { ic: "layout",   lbl: "Airtable",  x: 78, y: 70, logoSrc: "/assets/icons/airtable.svg",         logoBg: "#fff" },
  ],
  intCats: [
    { ic: "share",    h: "Social platforms",   sub: "Where content goes live",       logos: [{ nm: "LinkedIn", color: "#0A66C2" }, { nm: "Instagram", color: "#E4405F" }, { nm: "Facebook", color: "#0866FF" }, { nm: "X (Twitter)", color: "#000000" }] },
    { ic: "pencil",   h: "Creative tools",     sub: "Where visuals are made",        logos: [{ nm: "Canva", color: "#00C4CC" }, { nm: "Adobe Express", color: "#FF0000" }, { nm: "Figma", color: "#F24E1E" }, { nm: "CapCut", color: "#000000" }] },
    { ic: "zap",      h: "Scheduling & CMS",   sub: "Where posts are managed",       logos: [{ nm: "Buffer", color: "#168EEA" }, { nm: "Hootsuite", color: "#143059" }, { nm: "Later", color: "#7B16FF" }, { nm: "Metricool", color: "#0085FF" }] },
    { ic: "chart",    h: "Analytics",          sub: "Where performance is tracked",  logos: [{ nm: "Meta Insights", color: "#0866FF" }, { nm: "LinkedIn Analytics", color: "#0A66C2" }, { nm: "Sprout Social", color: "#59CB59" }, { nm: "GA4", color: "#F9AB00" }] },
  ],
  engage: {
    setup:   { label: "Onboarding",      price: "£1,400",   priceSub: "+ VAT · one-time",           lines: ["Voice profile + brand audit", "Platform setup + profile optimisation", "Content ratio + calendar structure", "First month of content written + approved", "Scheduling tool configured"] },
    monthly: { label: "Social retainer", price: "£799",     priceSub: "/ month · cancel any time",  lines: ["16 posts per month across platforms", "Monthly calendar approval session", "Reel + short-form scripts (2 per month)", "Monthly performance report", "Ad-hoc post requests: 2 included"] },
    ctaCopy: "Ready to stop guessing what to post?",
  },
}

export default function AutomatedSocialMediaPage() {
  return (
    <>
      <AIServiceTemplate spec={spec} />
      <IntegrationsTicker eyebrow="Works with your existing stack" />
    </>
  )
}
