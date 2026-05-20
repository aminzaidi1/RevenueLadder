import type { Metadata } from "next"
import { Check, TrendingUp } from "lucide-react"
import { EngagementTemplate, type EngServiceSpec } from "@/components/sections/services/EngagementTemplate"

export const metadata: Metadata = {
  title: "Monthly Retainer | RevenueLadder",
  description: "An ongoing monthly engagement -- web, AI, ops, and content -- with a named lead, a fixed monthly cost, and a shared task board. Hand-built from Bangor.",
}

function RetainerReport() {
  const tasks = [
    { t: "GSC report + action list",      s: "Delivered · 3 May",  done: true  },
    { t: "Two blog briefs written",        s: "Delivered · 5 May",  done: true  },
    { t: "Homepage copy refresh",          s: "Delivered · 9 May",  done: true  },
    { t: "Automation: order confirm flow", s: "In progress · 80%",  done: false },
  ]
  return (
    <div className="t3-report">
      <div className="t3-report-head">
        <div>
          <div className="label">Monthly Retainer Report</div>
          <div className="ttl">Aber Coffee Co · March 2025</div>
          <div className="sub">retainer/acc · month 7 · ref RT-0307</div>
        </div>
        <div className="seal">RT<br /><small>MO</small><br /><small>NGNG</small></div>
      </div>
      <div className="t3-figures">
        <div className="fig">
          <div className="lbl">Hours used</div>
          <div className="v">38<small>/40</small></div>
          <div className="ch"><Check size={11} strokeWidth={2.5} /> on track</div>
        </div>
        <div className="fig">
          <div className="lbl">Tasks closed</div>
          <div className="v">24</div>
          <div className="ch"><Check size={11} strokeWidth={2.5} /> this month</div>
        </div>
        <div className="fig">
          <div className="lbl">Revenue lift</div>
          <div className="v">£12.4<small>k</small></div>
          <div className="ch"><TrendingUp size={11} strokeWidth={2.5} /> attributed</div>
        </div>
      </div>
      <div className="t3-deliv">
        {tasks.map((r) => (
          <div className="row" key={r.t}>
            <div className="ic"><Check size={13} strokeWidth={2.25} /></div>
            <div className="meta">
              <div className="t">{r.t}</div>
              <div className="s">{r.s}</div>
            </div>
            <div className={`tag${r.done ? "" : " warn"}`}>{r.done ? "Done" : "Active"}</div>
          </div>
        ))}
      </div>
      <div className="t3-report-foot">
        <div className="sig">
          <div className="av">RT</div>
          <div>
            <div className="nm">Rhys Thomas</div>
            <div className="rl">Retainer lead · Bangor</div>
          </div>
        </div>
        <div className="stamp">Month<br /><small>7</small></div>
      </div>
    </div>
  )
}

const spec: EngServiceSpec = {
  service: "Monthly Retainer",
  ic: "refresh",
  h1: <>An ongoing team.<br />A <em>fixed monthly</em> cost.<br />No surprises.</>,
  sub: "A named lead, a shared task board, and a fixed monthly budget. You bring the priorities -- we handle execution across web, AI, ops, and content.",
  secondaryCta: "See a sample retainer report",
  trustBadges: ["34 active retainers · May 2025", "Avg client tenure 21 months", "Fixed monthly · no hourly billing", "Cancel with 30 days notice"],
  heroVisual: <RetainerReport />,

  capsHead: {
    eyebrow: "What a retainer covers",
    title: <>Six disciplines. <em>One monthly fee.</em></>,
    sub: "A retainer is not a block of hours you burn down. It is an ongoing engagement with a named lead who knows your stack, your priorities, and what you are trying to build.",
  },
  caps: [
    { ic: "globe",    when: "ongoing", h: "Web + content",    p: "Page updates, copy refreshes, new landing pages, blog briefs. Your site stays current without a project every time." },
    { ic: "sparkles", when: "ongoing", h: "AI + automation",  p: "Prompt tuning, workflow automation, new AI integrations -- deployed and monitored, not just set up." },
    { ic: "chart",    when: "monthly", h: "Reporting",         p: "A written monthly report: traffic, rankings, automation performance, revenue attribution. Numbers, not slides." },
    { ic: "pencil",   when: "ongoing", h: "Content support",  p: "Blog briefs, social copy, email sequences. We write to your voice, not a template." },
    { ic: "shield",   when: "ongoing", h: "Ops + monitoring", p: "We watch your stack. If something breaks at 2am, we fix it -- not wait for your next sprint." },
    { ic: "users",    when: "monthly", h: "Strategy call",    p: "A 60-minute call with your lead each month. Priorities set, questions answered, roadmap reviewed." },
  ],

  proof: {
    eyebrow: "Real numbers",
    h2: "34 active retainers. Average tenure: 21 months.",
    body: "Our oldest retainer client has been with us since January 2023. The average tenure across all current retainers is 21 months. 96% of retainer clients who pass month 3 are still with us 12 months later.",
    stats: [
      { v: "34",             lbl: "Active retainers · May 2025" },
      { v: "21", unit: "mo", lbl: "Average client tenure" },
      { v: "96", unit: "%",  lbl: "Retention past month 12" },
    ],
    quote: {
      initials: "DM",
      name: "David Morgan",
      role: "Director · Aberystwyth Coffee Co · retainer month 14",
      text: "We had tried hiring a part-time marketing person, then a freelancer, then another agency. RL is the first arrangement where someone actually knows our business. They spot things before I do. The monthly report is the first thing I read on a Monday.",
      meta: "Delegate retainer · month 14",
    },
  },

  diveHead: {
    eyebrow: "Why a retainer, not project-by-project",
    title: <>Three reasons <em>one-off projects</em><br />cost more in the long run.</>,
    sub: "Project-by-project work feels flexible. In practice it means re-briefing, re-onboarding, and re-quoting every few months. A retainer eliminates all three.",
  },
  diveStats: [
    { v: "0",  unit: "h", lbl: "Re-briefing time each month",    tag: "Lead already knows your stack" },
    { v: "30", unit: "d", lbl: "Notice to cancel",               tag: "No lock-in beyond 30 days" },
    { v: "£0",            lbl: "Setup fee or onboarding charge",  tag: "Included in first month" },
  ],
  compare: {
    label: "How we compare",
    featIndex: 2,
    cols: [
      { nm: "DIY",           sub: "Owner does it all" },
      { nm: "Hire in-house", sub: "£28k-£45k salary" },
      { nm: "RL Retainer",   sub: "Fixed monthly · named lead", ribbon: "Best fit" },
    ],
    rows: [
      {
        ic: "briefcase", label: "Skills available",
        cells: [
          { txt: "Whatever the owner knows",                                          v: "warn", label: "Limited"    },
          { txt: "One hire · one skill set",                                          v: "warn", label: "One person" },
          { txt: <>Web · AI · ops · content · <strong>all included</strong></>,       v: "ok",   label: "Full stack" },
        ],
      },
      {
        ic: "clock", label: "Time to execution",
        cells: [
          { txt: "Whenever the owner has time",                                       v: "bad",  label: "Slow"       },
          { txt: "After hiring · 4-8 week lead",                                     v: "warn", label: "Slow start" },
          { txt: <>Onboarding week 1 · <strong>executing week 2</strong></>,          v: "ok",   label: "Fast"       },
        ],
      },
      {
        ic: "chart", label: "Monthly reporting",
        cells: [
          { txt: "No formal reporting",                    v: "bad",  label: "None"     },
          { txt: "Depends on the hire",                    v: "warn", label: "Variable" },
          { txt: "Written monthly report · always",        v: "ok",   label: "Always"   },
        ],
      },
      {
        ic: "shield", label: "Continuity + cover",
        cells: [
          { txt: "You",                                    v: "bad",  label: "No cover"  },
          { txt: "None if the hire leaves",                v: "bad",  label: "Risk"      },
          { txt: "Named lead + team cover · no gaps",      v: "ok",   label: "Always on" },
        ],
      },
      {
        ic: "trend", label: "Commitment",
        cells: [
          { txt: "No minimum",                              v: "ok",  label: "Flexible" },
          { txt: "3-6 month probation · notice period",    v: "bad", label: "Locked"   },
          { txt: "30-day notice · no lock-in",             v: "ok",  label: "Flexible" },
        ],
      },
    ],
  },
  timeline: {
    eyebrow: "Onboarding in one week",
    title: <>From signature to <em>executing</em><br />inside seven days.</>,
    rows: [
      { gold: true, when: "D0",   stage: "Sign-off",  t: "Retainer confirmed · first month paid",                 s: "Access checklist sent · onboarding call booked",       av: "RT", lead: "Rhys" },
      {             when: "D1-2", stage: "Access",    t: "Stack access granted · priorities interview (60 min)",  s: "We meet your team, your tools, your backlog",           av: "EW", lead: "Eira" },
      {             when: "D3-4", stage: "Audit",     t: "Quick stack audit · 10 quick wins identified",          s: "Shared task board set up · first tasks queued",         av: "TB", lead: "Tom"  },
      { gold: true, when: "D7",   stage: "Executing", t: "First tasks in progress · nothing waiting",             s: "Monthly cadence established · strategy call booked",    av: "RT", lead: "Rhys" },
    ],
  },

  matrix: {
    eyebrow: "Four retainer levels",
    title: <>Pick the level that <em>fits</em><br />what you need covered.</>,
    sub: "All levels include a named lead, a shared task board, and a written monthly report. Bigger levels cover more disciplines and more hours.",
    firstColLabel: "What is included",
    tiers: [
      { nm: "Ad-hoc",   tag: "Pay as you go"    },
      { nm: "Assist",   tag: "£1,800/mo + VAT"  },
      { nm: "Delegate", tag: "£3,400/mo + VAT"  },
      { nm: "Elevate",  tag: "£5,400/mo + VAT"  },
    ],
    rows: [
      { ic: "clock",     nm: "Monthly hours",          cells: ["Buy as needed", "Up to 10h", "Up to 20h", "Up to 35h"] },
      { ic: "users",     nm: "Named lead",              cells: ["off", "on", "on", "on"] },
      { ic: "chart",     nm: "Monthly written report", cells: ["off", "on", "on", "on"] },
      { ic: "globe",     nm: "Web + content",          cells: ["off", "on", "on", "on"] },
      { ic: "sparkles",  nm: "AI + automation",        cells: ["off", "off", "on", "on"] },
      { ic: "shield",    nm: "Ops + monitoring",       cells: ["off", "off", "on", "on"] },
      { ic: "pencil",    nm: "Content production",     cells: ["off", "off", "off", "on"] },
      { ic: "target",    nm: "Quarterly strategy",     cells: ["off", "off", "off", "on"] },
      { ic: "briefcase", nm: "On-call cover",          cells: ["off", "off", "off", "on"] },
      { ic: "star",      nm: "SLA (response time)",    cells: ["off", "72h", "48h", "4h"] },
    ],
    foot: "Prices ex-VAT. 30-day cancellation notice. No setup fee. Ad-hoc hours billed at £85/h + VAT.",
  },

  tiers: {
    eyebrow: "Four retainer levels",
    title: <>Pick a level.<br />Move <em>up or down</em> any month.</>,
    sub: "Most clients start on Delegate and move to Elevate after 3-6 months. You can move between levels with 30 days notice.",
    items: [
      {
        crown: "Assist",
        nm: "Assist retainer",
        price: "£1,800",
        priceSub: " + VAT / month",
        desc: "A named lead and up to 10 hours of web and content support per month. Ideal if you need reliable execution on a defined set of tasks.",
        sections: [
          { h: "Included",     items: [<><strong>Up to 10 hours / month</strong></>, <>Named lead</>, <>Web + content tasks</>, <>Monthly written report</>] },
          { h: "Response SLA", items: [<>72-hour response time</>] },
          { h: "Cancel",       items: [<>30 days notice · no minimum term</>] },
        ],
        cta: "Start with Assist",
        btn: "btn primary lg",
        guarantee: "Cancel with 30 days notice",
      },
      {
        feat: true,
        crown: "Most popular",
        nm: "Delegate retainer",
        price: "£3,400",
        priceSub: " + VAT / month",
        desc: "Up to 20 hours covering web, AI, ops, and content. Includes monitoring, automation, and a monthly strategy call. The right level for most growing businesses.",
        sections: [
          { h: "Included",     items: [<><strong>Up to 20 hours / month</strong></>, <>Named lead + team cover</>, <>Web · AI · automation · ops · content</>, <>Monthly written report</>, <>60-minute strategy call each month</>] },
          { h: "Response SLA", items: [<>48-hour response time</>] },
          { h: "Cancel",       items: [<>30 days notice · no minimum term</>] },
        ],
        cta: "Start with Delegate",
        btn: "btn accent lg",
        guarantee: "Cancel with 30 days notice",
      },
      {
        crown: "Elevate",
        nm: "Elevate retainer",
        price: "£5,400",
        priceSub: " + VAT / month",
        desc: "Up to 35 hours with on-call cover, content production, quarterly strategy, and a 4-hour SLA. For businesses that need a full embedded team.",
        sections: [
          { h: "Included",     items: [<><strong>Up to 35 hours / month</strong></>, <>Named lead + full team coverage</>, <>Web · AI · automation · ops · content production</>, <>Monthly report + quarterly strategy session</>, <>On-call cover included</>] },
          { h: "Response SLA", items: [<>4-hour response time</>] },
          { h: "Cancel",       items: [<>30 days notice · no minimum term</>] },
        ],
        cta: "Start with Elevate",
        btn: "btn primary lg",
        guarantee: "Cancel with 30 days notice",
      },
    ],
  },
}

export default function RetainerPage() {
  return <EngagementTemplate spec={spec} />
}
