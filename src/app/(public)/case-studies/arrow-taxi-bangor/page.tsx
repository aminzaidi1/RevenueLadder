import type { Metadata } from "next"
import { CaseStudyBreadcrumb } from "@/components/sections/case-studies/CaseStudyBreadcrumb"
import { CaseStudyHero } from "@/components/sections/case-studies/CaseStudyHero"
import { CaseStudyContext } from "@/components/sections/case-studies/CaseStudyContext"
import { CaseStudyProblem } from "@/components/sections/case-studies/CaseStudyProblem"
import { CaseStudyWork } from "@/components/sections/case-studies/CaseStudyWork"
import { CaseStudyResults } from "@/components/sections/case-studies/CaseStudyResults"
import { CaseStudyTestimonial } from "@/components/sections/case-studies/CaseStudyTestimonial"
import { CaseStudyCTA } from "@/components/sections/case-studies/CaseStudyCTA"
import {
  arrowTaxiContext,
  arrowTaxiHero,
  arrowTaxiKeywords,
  arrowTaxiStats,
  arrowTaxiTestimonial,
  arrowTaxiWorkCards,
} from "@/data/case-studies/arrow-taxi-bangor"

export const metadata: Metadata = {
  title: "Arrow Taxi Bangor case study | RevenueLadder",
  description:
    "How RevenueLadder eliminated 100% of missed calls for Arrow Taxi Bangor with an AI voice agent, and drove #1 Google rankings for North Wales taxi.",
}

export default function ArrowTaxiCaseStudyPage() {
  return (
    <>
      <CaseStudyBreadcrumb current="Arrow Taxi Bangor" />
      <CaseStudyHero {...arrowTaxiHero} />
      <CaseStudyContext items={arrowTaxiContext} />

      <CaseStudyProblem
        eyebrow="The situation"
        title={<>One in five calls went<br />unanswered.</>}
        pullStat={{
          value: "1 in 5",
          label: "calls went unanswered before RevenueLadder",
        }}
        paragraphs={[
          "Arrow Taxi runs 24 hours a day, seven days a week. Their coverage spans Bangor, Caernarfon, Snowdonia, Anglesey, Llanberis, and airport transfers as far as Manchester and Liverpool. Demand does not stop at 5pm.",
          "But their team is small. There was no dedicated person on calls, and the whole operation depended on a dispatcher being available at all times. Roughly one in five inbound calls went unanswered, mostly at night. A customer called, nobody picked up, and the booking went elsewhere.",
          "That was not a sustainable model for a growing firm covering some of the busiest tourist routes in North Wales.",
        ]}
      />

      <CaseStudyWork
        eyebrow="What we did"
        title="Two things, done properly."
        sub="Arrow Taxi needed to be found, and to never miss a call. We built both, nothing else."
        cards={arrowTaxiWorkCards}
      />

      <CaseStudyResults
        eyebrow="The results"
        title="Numbers that hold."
        stats={arrowTaxiStats}
        context="Booking volume has increased directly as a result of eliminating missed calls. Arrow Taxi do not disclose revenue figures, but the relationship is direct: every call that now gets answered is a booking that previously went elsewhere."
        keywords={arrowTaxiKeywords}
      />

      <CaseStudyTestimonial {...arrowTaxiTestimonial} />

      <CaseStudyCTA
        eyebrow="Ready when you are"
        title={<>Ready to stop<br /><em style={{ color: "var(--rl-gold)", fontStyle: "italic" }}>missing calls?</em></>}
        body="Book a free 30-minute strategy call. Written plan within 48 hours. No obligation."
        primary={{ label: "Book a call", href: "https://calendly.com/revenueladder/30min" }}
        secondary={{ label: "See all services", href: "/services" }}
      />
    </>
  )
}
