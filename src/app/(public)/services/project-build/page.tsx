import type { Metadata } from "next"
import { EngagementTemplate, type EngServiceSpec } from "@/components/sections/services/EngagementTemplate"

export const metadata: Metadata = {
  title: "Project Build | RevenueLadder",
  description: "A fixed-scope, fixed-price build shipped on the day we said. No scope creep. No surprises. Hand-built from Bangor.",
}

function ProjectPlan() {
  const rows = [
    { label: "Discovery",    av: "RT", lead: "Rhys",   weeks: [1,0,0,0,0,0], gold: true  },
    { label: "Copy + design", av: "CJ", lead: "Catrin", weeks: [0,1,0,0,0,0], gold: true  },
    { label: "Build",         av: "EW", lead: "Eira",   weeks: [0,0,1,0,0,0], gold: false },
    { label: "Integrations",  av: "AP", lead: "Alun",   weeks: [0,0,0,1,0,0], gold: false },
    { label: "QA",            av: "EW", lead: "Eira",   weeks: [0,0,0,0,1,0], gold: false },
    { label: "Launch",        av: "RT", lead: "Rhys",   weeks: [0,0,0,0,0,1], gold: true  },
  ]
  return (
    <div className="t3-report">
      <div className="t3-report-head">
        <div>
          <div className="label">Project Plan</div>
          <div className="ttl">Bryn Hall Hotels · Web App</div>
          <div className="sub">build/bh-webapp · 6 weeks · ref PB-0312</div>
        </div>
        <div className="seal">PB<br /><small>6 WK</small><br /><small>FIXED</small></div>
      </div>
      <div className="t3-gantt">
        <div className="t3-gantt-head">
          <div className="row-label" />
          {["W1","W2","W3","W4","W5","W6"].map((w) => (
            <div key={w} className="col-head">{w}</div>
          ))}
          <div className="lead-head">Lead</div>
        </div>
        {rows.map((row) => (
          <div key={row.label} className={`t3-gantt-row${row.gold ? " gold" : ""}`}>
            <div className="row-label">{row.label}</div>
            {row.weeks.map((active, i) => (
              <div key={i} className={`gantt-cell${active ? (row.gold ? " bar-gold" : " bar-green") : ""}`} />
            ))}
            <div className="lead"><div className="av">{row.av}</div>{row.lead}</div>
          </div>
        ))}
      </div>
      <div className="t3-figures">
        <div className="fig">
          <div className="lbl">Duration</div>
          <div className="v">6<small>wks</small></div>
          <div className="ch">fixed</div>
        </div>
        <div className="fig">
          <div className="lbl">Fixed price</div>
          <div className="v">£8.2<small>k</small></div>
          <div className="ch">all-in</div>
        </div>
        <div className="fig">
          <div className="lbl">Launch date</div>
          <div className="v">Fri<small> 14</small></div>
          <div className="ch">as scheduled</div>
        </div>
      </div>
    </div>
  )
}

const spec: EngServiceSpec = {
  service: "Project Build",
  ic: "rocket",
  h1: <>A <em>fixed-scope</em> build.<br />Shipped on the<br />day we said.</>,
  sub: "No scope creep. No time-and-materials surprises. We scope the project, price it, and build it -- shipping on the date in the contract. If it takes longer, that is on us.",
  secondaryCta: "See a sample project brief",
  trustBadges: ["31 projects shipped · 2023-25", "29 on-time · 2 within 5 days", "Fixed price · no extras", "Scope change? We re-quote before we move"],
  heroVisual: <ProjectPlan />,

  capsHead: {
    eyebrow: "How a project build works",
    title: <>Six phases. <em>One fixed price.</em></>,
    sub: "Every project build follows the same six-phase process -- Discovery through Launch. Each phase has a named lead, a defined output, and a sign-off gate before the next phase begins.",
  },
  caps: [
    { ic: "target",   when: "W1", h: "Discovery + scoping",  p: "We turn your brief into a locked scope document. Wireframes, data model, integrations listed. You sign it off before a line is written." },
    { ic: "pencil",   when: "W2", h: "Copy + design",         p: "Pages, copy, component designs -- all reviewed and signed off. Build does not start until design is approved." },
    { ic: "code",     when: "W3", h: "Build",                 p: "Front-end and back-end built against the signed scope. Daily standups. You see progress in a staging environment from day one." },
    { ic: "workflow", when: "W4", h: "Integrations",          p: "Stripe, Clerk, Resend, your CRM -- wired in and tested against real credentials, not mocks." },
    { ic: "shield",   when: "W5", h: "QA + accessibility",    p: "Cross-browser, mobile, screen reader, performance. 88-point checklist. Nothing ships with a known bug." },
    { ic: "rocket",   when: "W6", h: "Launch + handover",     p: "DNS cutover, monitoring live, Loom walkthrough recorded. You own the codebase from day one." },
  ],

  proof: {
    eyebrow: "Real numbers",
    h2: "31 projects shipped. 29 on time.",
    body: "Since 2023 we have shipped 31 fixed-scope projects. 29 launched on the contracted date. Two launched within 5 days of schedule -- both due to client-side delays on content, not our build. No project has overrun its fixed price.",
    stats: [
      { v: "31",              lbl: "Projects shipped · 2023-25" },
      { v: "29", unit: "/31", lbl: "On time or early" },
      { v: "£0",              lbl: "Scope overruns billed to clients" },
    ],
    quote: {
      initials: "AT",
      name: "Aled Thomas",
      role: "COO · Bryn Hall Hotels · project delivered Feb 2025",
      text: "We had been burned before -- a development agency that kept adding weeks and invoices. RL gave us a price, a date, and a scope document. They shipped on a Friday. On the Friday. We have since commissioned two more builds.",
      meta: "Web app + two follow-on builds",
    },
  },

  diveHead: {
    eyebrow: "Why fixed scope, not time-and-materials",
    title: <>Three ways <em>flexible</em> billing<br />quietly costs you more.</>,
    sub: "Time-and-materials feels lower risk. It is not. Fixed scope aligns our incentives with yours -- the faster we build, the better for us. T&M does the opposite.",
  },
  diveStats: [
    { v: "0",    unit: "%", lbl: "Projects that overran their price",       tag: "31 for 31" },
    { v: "~4",   unit: "h", lbl: "Your time required per week",             tag: "Reviews + sign-offs" },
    { v: "£3.8", unit: "k", lbl: "Smallest fixed-scope build we have done", tag: "4 weeks · internal tool" },
  ],
  compare: {
    label: "How we compare",
    featIndex: 3,
    cols: [
      { nm: "T&M agency",       sub: "\"We'll see how it goes\"" },
      { nm: "Freelancer",       sub: "Hired piecemeal" },
      { nm: "Big agency",       sub: "£40k+ engagements" },
      { nm: "RL Project Build", sub: "Fixed scope · fixed price", ribbon: "Best fit" },
    ],
    rows: [
      {
        ic: "chart", label: "Price certainty",
        cells: [
          { txt: "Day rate · estimate only",                              v: "bad",  label: "Estimate"   },
          { txt: "Hourly · scope creep risk",                             v: "warn", label: "Variable"   },
          { txt: "Fixed · but high floor",                               v: "warn", label: "High floor" },
          { txt: <><strong>Fixed price · locked at sign-off</strong></>, v: "ok",   label: "Locked"     },
        ],
      },
      {
        ic: "clock", label: "Timeline certainty",
        cells: [
          { txt: "Estimate · often slips",                    v: "bad",  label: "Slips"      },
          { txt: "Depends on availability",                   v: "warn", label: "Variable"   },
          { txt: "Fixed · but 3-6 month lead",               v: "warn", label: "Long lead"  },
          { txt: <><strong>Contracted launch date</strong></>, v: "ok",  label: "Contracted" },
        ],
      },
      {
        ic: "layers", label: "Scope discipline",
        cells: [
          { txt: "Change requests billed by the hour",           v: "bad",  label: "Add-ons"     },
          { txt: "Depends on the freelancer",                    v: "warn", label: "Variable"    },
          { txt: "Change control process · delays",             v: "warn", label: "Slow"        },
          { txt: "Re-quote before any change · nothing silent", v: "ok",   label: "Transparent" },
        ],
      },
      {
        ic: "code", label: "Codebase handover",
        cells: [
          { txt: "Usually yes · varies",                           v: "warn", label: "Varies"      },
          { txt: "Yes · often undocumented",                       v: "warn", label: "Partial"     },
          { txt: "Yes · transition fee may apply",                v: "warn", label: "Costs extra" },
          { txt: <>You own the code <strong>from day one</strong></>, v: "ok", label: "Day one"  },
        ],
      },
      {
        ic: "shield", label: "Post-launch support",
        cells: [
          { txt: "Billed separately",                         v: "warn", label: "Extra"    },
          { txt: "Often unavailable after handover",          v: "bad",  label: "None"     },
          { txt: "Support retainer available",                v: "warn", label: "Add-on"   },
          { txt: "30-day included · retainer optional after", v: "ok",   label: "Included" },
        ],
      },
    ],
  },
  timeline: {
    eyebrow: "Inside the build",
    title: <>A <em>fixed</em> timeline.<br />Same structure every project.</>,
    rows: [
      { gold: true, when: "W1", stage: "Discovery",    t: "Scope locked · data model agreed · integrations listed",     s: "You sign off the scope document before build begins",          av: "RT", lead: "Rhys"   },
      { gold: true, when: "W2", stage: "Design",       t: "Wireframes + copy + component designs reviewed",              s: "Design sign-off gate -- build does not start until approved",  av: "CJ", lead: "Catrin" },
      {             when: "W3", stage: "Build",        t: "Front-end + back-end built against signed scope",             s: "Staging environment live from day one",                        av: "EW", lead: "Eira"   },
      {             when: "W4", stage: "Integrations", t: "Stripe · Clerk · Resend · CRM wired in + tested",             s: "Real credentials · not mocks",                                 av: "AP", lead: "Alun"   },
      {             when: "W5", stage: "QA",           t: "88-point checklist · cross-browser · mobile · a11y",          s: "Nothing ships with a known bug",                               av: "EW", lead: "Eira"   },
      { gold: true, when: "W6", stage: "Launch",       t: "DNS cutover · monitoring live · Loom walkthrough recorded",   s: "You own the codebase. 30-day support window begins.",          av: "RT", lead: "Rhys"   },
    ],
  },

  matrix: {
    eyebrow: "Three project sizes",
    title: <>Pick the size that <em>fits</em><br />what you need to build.</>,
    sub: "All three sizes are fixed-price and fixed-timeline. Scope is locked at sign-off. If your project is between sizes, we quote to scope.",
    firstColLabel: "What is included",
    tiers: [
      { nm: "Small",  tag: "from £3,800 · 4 wks"    },
      { nm: "Medium", tag: "from £8,400 · 6-8 wks"  },
      { nm: "Large",  tag: "from £18,000 · 8-14 wks" },
    ],
    rows: [
      { ic: "layers",   nm: "Pages / screens",         cells: ["Up to 8", "Up to 20", "Unlimited"] },
      { ic: "users",    nm: "Auth + roles",             cells: ["Single role", "Up to 3 roles", "Custom RBAC"] },
      { ic: "workflow", nm: "Integrations",             cells: ["1 (e.g. Stripe)", "Up to 3", "Up to 8"] },
      { ic: "chart",    nm: "Reporting / analytics",    cells: ["off", "Basic dashboard", "Full analytics suite"] },
      { ic: "mail",     nm: "Transactional email",      cells: ["off", "on", "on"] },
      { ic: "shield",   nm: "Accessibility (WCAG AA)",  cells: ["on", "on", "on + audit"] },
      { ic: "code",     nm: "API / webhooks",           cells: ["off", "REST API", "REST + webhooks + docs"] },
      { ic: "rocket",   nm: "Post-launch support",      cells: ["14 days", "30 days", "60 days"] },
    ],
    foot: "Prices ex-VAT. Fixed price locked at scope sign-off. Scope changes re-quoted before any work begins.",
  },

  tiers: {
    eyebrow: "Three project sizes",
    title: <>Pick a starting point.<br />We quote <em>to scope</em>.</>,
    sub: "These are starting prices. Every project is quoted individually after a free 30-min scoping call. The price in that quote is the price on the invoice.",
    items: [
      {
        crown: "Small",
        nm: "Small build",
        price: "from £3,800",
        priceSub: " + VAT · 4 weeks",
        desc: "A focused internal tool or marketing site. Up to 8 screens, one integration, single user role. Scoped, built, and shipped in four weeks.",
        sections: [
          { h: "Scope",        items: [<><strong>Up to 8 pages or screens</strong></>, <>Single user role</>, <>1 integration (e.g. Stripe or Resend)</>] },
          { h: "Deliverables", items: [<>Full codebase · your repo</>, <>14-day post-launch support</>] },
          { h: "Ideal for",    items: [<>Internal tools · landing pages · simple SaaS</>] },
        ],
        cta: "Scope a small build",
        btn: "btn primary lg",
        guarantee: "Fixed price · re-quoted if scope changes",
      },
      {
        feat: true,
        crown: "Most popular",
        nm: "Medium build",
        price: "from £8,400",
        priceSub: " + VAT · 6-8 weeks",
        desc: "A full web application. Up to 20 screens, up to 3 integrations, up to 3 user roles. The right size for most SaaS MVPs and internal platforms.",
        sections: [
          { h: "Scope",        items: [<><strong>Up to 20 pages or screens</strong></>, <>Up to 3 user roles</>, <>Up to 3 integrations</>] },
          { h: "Deliverables", items: [<>Full codebase · your repo</>, <>Basic dashboard + reporting</>, <>Transactional email included</>, <>30-day post-launch support</>] },
          { h: "Ideal for",    items: [<>SaaS MVPs · customer portals · booking systems</>] },
        ],
        cta: "Scope a medium build",
        btn: "btn accent lg",
        guarantee: "Fixed price · re-quoted if scope changes",
      },
      {
        crown: "Large",
        nm: "Large build",
        price: "from £18,000",
        priceSub: " + VAT · 8-14 weeks",
        desc: "A complex platform. Unlimited screens, custom RBAC, up to 8 integrations, full analytics, API + webhooks with documentation.",
        sections: [
          { h: "Scope",        items: [<><strong>Unlimited screens</strong></>, <>Custom role-based access control</>, <>Up to 8 integrations</>] },
          { h: "Deliverables", items: [<>Full codebase · your repo</>, <>Full analytics suite</>, <>REST API + webhooks + documentation</>, <>60-day post-launch support</>, <>WCAG AA audit included</>] },
          { h: "Ideal for",    items: [<>Enterprise tools · multi-tenant platforms · regulated industries</>] },
        ],
        cta: "Scope a large build",
        btn: "btn primary lg",
        guarantee: "Fixed price · re-quoted if scope changes",
      },
    ],
  },
}

export default function ProjectBuildPage() {
  return <EngagementTemplate spec={spec} />
}
