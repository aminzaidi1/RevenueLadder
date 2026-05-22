export interface VipOnboarding {
  label: string
  lines: string[]
}

export interface PricingTier {
  id: string
  badge: string
  featured: boolean
  name: string
  monthly: number
  tagline: string
  team: {
    label: string
    heading: string
    detail: string
    avs: string[]
    extraAv: boolean
  }
  output: {
    label: string
    heading: string
    detail: string
  }
  humans: {
    label: string
    figure: number
    detail: string
  }
  vip: VipOnboarding | null
  platform: string[]
  cta: { label: string; variant: string }
  guarantee: string
}

export interface PricingAddon {
  name: string
  detail: string
  price: string
}

export function fmtPrice(n: number): string {
  return n.toLocaleString("en-GB")
}

export const TIERS: PricingTier[] = [
  {
    id: "assist",
    badge: "Assist",
    featured: false,
    name: "Assist",
    monthly: 1800,
    tagline: "For owner-operators who need consistent help but stay in the driving seat.",
    team: {
      label: "Your team",
      heading: "1 senior lead + shared pool",
      detail: "Half a day a week from the account lead, plus engineering + SEO time as needed.",
      avs: ["RT", "EW"],
      extraAv: false,
    },
    output: {
      label: "AI output capacity",
      heading: "Core",
      detail: "Up to 8 social posts / mo · 1 blog post · standard email flows · 1 chatbot intent set",
    },
    humans: {
      label: "Human hours",
      figure: 16,
      detail: "Per month · roll forward up to 8h · 3-day average turnaround",
    },
    vip: null,
    platform: [
      "Monitoring · office hours",
      "Monthly written report",
    ],
    cta: { label: "Start with Assist", variant: "btn primary lg" },
    guarantee: "30-day rolling · cancel any month",
  },
  {
    id: "delegate",
    badge: "Best fit · most popular",
    featured: true,
    name: "Delegate",
    monthly: 3400,
    tagline: "For founders who have stopped pretending they'll do the marketing themselves.",
    team: {
      label: "Your team",
      heading: "1 lead + 4-person pod",
      detail: "A senior strategist, engineer, SEO + content, and ops person on your account.",
      avs: ["RT", "EW", "CJ", "AP"],
      extraAv: true,
    },
    output: {
      label: "AI output capacity",
      heading: "Pro",
      detail: "20 posts / mo · 4 blog posts · multi-step nurture flows · 1 voice or chat agent included",
    },
    humans: {
      label: "Human hours",
      figure: 40,
      detail: "Per month · roll forward up to 16h · same-day turnaround on small jobs",
    },
    vip: {
      label: "VIP onboarding",
      lines: [
        "Stack audit + 12-page written report",
        "Quarterly strategy day, on-site or video",
        "First-look on new RL services as launched",
      ],
    },
    platform: [
      "Monitoring · office hours",
      "Monthly written report, pro",
    ],
    cta: { label: "Book a Delegate fit call", variant: "btn accent lg" },
    guarantee: "30-day rolling · cancel any month",
  },
  {
    id: "elevate",
    badge: "Elevate",
    featured: false,
    name: "Elevate",
    monthly: 5400,
    tagline: "For businesses past £500k turnover who treat marketing and ops as a system.",
    team: {
      label: "Your team",
      heading: "1 lead + dedicated 5-person pod",
      detail: "Daily Slack presence, monthly strategy day, on-site quarterly visits.",
      avs: ["RT", "EW", "CJ", "AP", "TB"],
      extraAv: false,
    },
    output: {
      label: "AI output capacity",
      heading: "Unlimited",
      detail: "Unlimited posts, blogs, flows · up to 3 voice or chat agents · custom AI agents on your data",
    },
    humans: {
      label: "Human hours",
      figure: 80,
      detail: "Per month · roll forward up to 32h · 4h SLA on priority work",
    },
    vip: null,
    platform: [
      "Monitoring · 24/7 on-call",
      "Monthly board-pack + annual roadmap",
    ],
    cta: { label: "Book an Elevate fit call", variant: "btn primary lg" },
    guarantee: "30-day rolling · cancel any month",
  },
]

export const ADDONS: PricingAddon[] = [
  { name: "Voice agent build",            detail: "One-off -- 3-week setup, you own the agent",    price: "£1,200" },
  { name: "Website rebuild",              detail: "Fixed-scope project, 4--6 weeks",               price: "from £6,800" },
  { name: "Audit & strategy week",        detail: "5-day deep audit + written roadmap",            price: "£3,400" },
  { name: "Custom AI agent on your data", detail: "Bespoke agent · usually paired with a tier",    price: "from £2,800" },
]
