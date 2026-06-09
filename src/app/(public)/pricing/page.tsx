import type { Metadata } from "next"
import { PricingHeroTiers } from "@/components/sections/pricing/PricingHeroTiers"
import { PrCompareSection } from "@/components/sections/pricing/PrCompareSection"
import { PrStatsSection, PrTestimonialsSection } from "@/components/sections/pricing/PrStatsTestimonialsSection"
import { PrMatrixSection } from "@/components/sections/pricing/PrMatrixSection"
import { PrFounderSection } from "@/components/sections/pricing/PrFounderSection"
import { PrFAQSection } from "@/components/sections/pricing/PrFAQSection"
import { PrGuaranteeSection } from "@/components/sections/pricing/PrGuaranteeSection"
import { CtaSection } from "@/components/sections/CtaSection"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://revenueladder.co.uk"

export const metadata: Metadata = {
  title: "Pricing · Three tiers, one bill, all in | Revenue Ladder",
  description:
    "Three retainer tiers from £1,800 / month. One bill, all in. 30-day rolling. Pause any month with 30 days' notice. Hand-built from Bangor for Welsh & UK SMEs.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/pricing`,
  },
}

export default function PricingPage() {
  return (
    <>
      <PricingHeroTiers />
      <PrCompareSection />
      <PrStatsSection />
      <PrTestimonialsSection />
      <PrMatrixSection />
      <PrFounderSection />
      <PrFAQSection />
      <PrGuaranteeSection />
      <CtaSection />
    </>
  )
}
