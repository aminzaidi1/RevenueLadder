import {
  Target,
  Mic,
  Search,
  BarChart2,
  MapPin,
  Zap,
  Clock,
  MessageCircle,
  TrendingUp,
  Check,
} from "lucide-react"
import type {
  CaseStudyContextItem,
  CaseStudyHeroProps,
  CaseStudyKeyword,
  CaseStudyStat,
  CaseStudySummary,
  CaseStudyTestimonial,
  CaseStudyWorkCard,
} from "@/components/sections/case-studies/types"
import {
  CaseStudyWorkCaps,
  CaseStudyWorkKeywordBlock,
} from "@/components/sections/case-studies/CaseStudyWork"

export const arrowTaxiSummary: CaseStudySummary = {
  slug: "arrow-taxi-bangor",
  client: "Arrow Taxi Bangor",
  tags: ["Local SEO", "AI Voice Agent"],
  headline: "0 missed calls. #1 on Google for North Wales taxi.",
  blurb:
    "300 to 800 inbound calls handled every day across Bangor, Snowdonia, and Anglesey, with every one answered by a voice agent that books the fare on the call.",
  stats: [
    { value: "0", label: "Missed calls, post-launch" },
    { value: "#1", label: "Google · North Wales taxi" },
    { value: "800", label: "Calls / day at peak" },
  ],
}

export const arrowTaxiHero: CaseStudyHeroProps = {
  badges: ["Case study", "Local SEO", "AI Voice Agent"],
  eyebrow: "Arrow Taxi Bangor",
  title: (
    <>
      <em style={{ color: "var(--rl-gold)", fontStyle: "italic", fontWeight: 900 }}>0 missed</em>
      <br />
      calls.
    </>
  ),
  subtitle: "300 to 800 inbound calls handled daily. Every one answered.",
  logoSrc: "/assets/case-studies/arrow-logo.png",
  logoAlt: "Arrow Taxi Bangor",
  metaLines: ["Bangor, North Wales", "Taxi and private hire, 24/7"],
  card: {
    title: "Results at a glance",
    sub: "Arrow Taxi, post RevenueLadder",
    statusLabel: "Live",
    rows: [
      {
        kind: "beforeAfter",
        icon: <Mic size={14} aria-hidden="true" />,
        label: "Missed calls",
        sub: "Per day, before vs after",
        before: { label: "Before", value: "~1 in 5", sub: "unanswered" },
        after: { label: "After", value: "0", sub: "missed" },
      },
      {
        kind: "row",
        icon: <Search size={14} aria-hidden="true" />,
        label: <>&ldquo;North Wales taxi&rdquo;</>,
        sub: "Google ranking, organic",
        pill: { text: "#1", variant: "done" },
      },
      {
        kind: "row",
        icon: <BarChart2 size={14} aria-hidden="true" />,
        label: "Calls handled",
        sub: "Peak season, per day",
        pill: { text: "800 / day", variant: "run" },
      },
    ],
    avatars: [
      { initials: "AT", tone: "gold" },
      { initials: "RL", tone: "green" },
    ],
    footMeta: "Arrow Taxi x RevenueLadder, ongoing",
  },
}

export const arrowTaxiContext: CaseStudyContextItem[] = [
  { label: "Location", value: "Bangor, North Wales", icon: <MapPin size={18} aria-hidden="true" /> },
  { label: "Industry", value: "Taxi and private hire", icon: <Target size={18} aria-hidden="true" /> },
  { label: "Services", value: "Local SEO + AI Voice Agent", icon: <Zap size={18} aria-hidden="true" /> },
]

const SEO_TAGS = [
  "Snowdon taxi",
  "Gwynedd taxi",
  "Caernarfon taxi",
  "Anglesey taxi",
  "Llanberis taxi",
  "Airport transfers North Wales",
  "Manchester airport transfer Bangor",
  "Liverpool airport transfer Bangor",
  "Pen Y Pass taxi",
  "Beddgelert taxi",
  "Porthmadog taxi",
  "Bangor train station taxi",
  "Bangor University taxi",
  "Private hire North Wales",
]

export const arrowTaxiWorkCards: CaseStudyWorkCard[] = [
  {
    icon: <Search size={22} aria-hidden="true" />,
    title: "Local SEO",
    paragraphs: [
      "We audited Arrow Taxi's online presence and rebuilt it around high-intent local search. The site now ranks for location and journey-type keywords across Bangor, Gwynedd, Snowdonia, Anglesey, Caernarfon, and airport transfers from North Wales to Manchester and Liverpool.",
      "The strategy focused on terms that signal actual booking intent, not just traffic. Someone searching “Pen Y Pass taxi” is ready to book, not browsing.",
    ],
    extra: (
      <CaseStudyWorkKeywordBlock
        primary={[
          { term: "North Wales taxi", rank: "#1", tone: "gold" },
          { term: "Bangor taxi", rank: "#2", tone: "forest" },
        ]}
        tags={SEO_TAGS}
      />
    ),
    result: {
      icon: <TrendingUp size={14} aria-hidden="true" />,
      text: "#1 for “North Wales taxi”, #2 for “Bangor taxi”",
    },
  },
  {
    icon: <Mic size={22} aria-hidden="true" />,
    title: "AI Voice Agent",
    paragraphs: [
      "We built and deployed a voice agent that handles every inbound call, around the clock. It manages bookings, answers questions, quotes fares, and covers out-of-hours enquiries without any human involvement.",
      "Arrow Taxi's team now handles exceptions, not volume. The agent replaced the need for a dedicated dispatcher on call at all times.",
    ],
    dark: true,
    extra: (
      <CaseStudyWorkCaps
        caps={[
          { icon: <Mic size={13} aria-hidden="true" />, label: "Takes bookings" },
          { icon: <MessageCircle size={13} aria-hidden="true" />, label: "Answers FAQs" },
          { icon: <Clock size={13} aria-hidden="true" />, label: "Out-of-hours calls" },
        ]}
      />
    ),
    result: {
      icon: <Check size={14} aria-hidden="true" />,
      text: "0 missed calls since deployment",
    },
  },
]

export const arrowTaxiStats: CaseStudyStat[] = [
  {
    featured: true,
    icon: <Mic size={20} aria-hidden="true" />,
    value: "0",
    unit: "missed calls",
    label: "Every call answered, 24/7",
  },
  {
    icon: <BarChart2 size={20} aria-hidden="true" />,
    value: (
      <>
        300<span className="cs-range-sep">&ndash;</span>800
      </>
    ),
    unit: "/ day",
    label: "Calls handled by the voice agent",
  },
  {
    icon: <Search size={20} aria-hidden="true" />,
    value: "#1",
    unit: "on Google",
    label: "For “North Wales taxi”",
  },
]

export const arrowTaxiKeywords: CaseStudyKeyword[] = [
  { keyword: "North Wales taxi", position: "#1", tier: "top-1" },
  { keyword: "Bangor taxi", position: "#2", tier: "top-2" },
  { keyword: "Snowdon taxi", position: "Ranked", tier: "" },
  { keyword: "Gwynedd taxi", position: "Ranked", tier: "" },
  { keyword: "Caernarfon taxi", position: "#3", tier: "top-3" },
  { keyword: "Anglesey taxi", position: "Ranked", tier: "" },
  { keyword: "Llanberis taxi", position: "Ranked", tier: "" },
  { keyword: "Airport transfers North Wales", position: "Ranked", tier: "" },
  { keyword: "Manchester airport transfer Bangor", position: "Ranked", tier: "" },
  { keyword: "Liverpool airport transfer Bangor", position: "Ranked", tier: "" },
  { keyword: "Pen Y Pass taxi", position: "Ranked", tier: "" },
  { keyword: "Beddgelert taxi", position: "#3", tier: "top-3" },
  { keyword: "Porthmadog taxi", position: "Ranked", tier: "" },
  { keyword: "Bangor train station taxi", position: "Ranked", tier: "" },
  { keyword: "Bangor University taxi", position: "Ranked", tier: "" },
  { keyword: "Taxi Bangor Gwynedd", position: "#1", tier: "top-1" },
  { keyword: "Private hire North Wales", position: "Ranked", tier: "" },
]

export const arrowTaxiTestimonial: CaseStudyTestimonial = {
  quote:
    "Every call now gets answered, every booking gets logged, and the work that used to eat our evenings happens on its own. We just run the cars.",
  attribution: "Arrow Taxi Bangor",
  location: "Bangor, North Wales, taxi and private hire",
}
