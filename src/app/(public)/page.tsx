import type { Metadata } from "next"
import { HeroSection } from "@/components/sections/HeroSection"
import { PainPointsSection } from "@/components/sections/PainPointsSection"
import { BeforeAfterSection } from "@/components/sections/BeforeAfterSection"
import { ServicesSection } from "@/components/sections/ServicesSection"
import { WorkflowSection } from "@/components/sections/WorkflowSection"
import { AiVsHumanSection } from "@/components/sections/AiVsHumanSection"
import { IndustriesSection } from "@/components/sections/IndustriesSection"
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection"
import { CtaSection } from "@/components/sections/CtaSection"

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://revenueladder.co.uk"

export const metadata: Metadata = {
  title: "Welsh web design & automation agency | Revenue Ladder",
  description:
    "Revenue Ladder builds custom websites, automates business workflows, and improves search rankings for Welsh businesses. Based in Bangor, North Wales.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "Revenue Ladder",
  description:
    "Welsh web design, automation, and SEO agency based in Bangor, North Wales.",
  url: SITE_URL,
  telephone: "+441248000000",
  email: "hello@revenueladder.co.uk",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangor",
    addressRegion: "Gwynedd",
    addressCountry: "GB",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Wales" },
    { "@type": "AdministrativeArea", name: "North Wales" },
    { "@type": "AdministrativeArea", name: "Gwynedd" },
  ],
  knowsAbout: [
    "Web Design",
    "Web Development",
    "Search Engine Optimisation",
    "Business Process Automation",
    "Analytics and Reporting",
  ],
  priceRange: "££",
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <HeroSection />
      <PainPointsSection />
      <BeforeAfterSection />
      <ServicesSection />
      <WorkflowSection />
      <AiVsHumanSection />
      <IndustriesSection />
      <BlogTeaserSection />
      <CtaSection />
    </>
  )
}
