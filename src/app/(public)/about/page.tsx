import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Revenue Ladder | Welsh web & automation agency, Bangor",
  description:
    "Revenue Ladder is a web design and automation agency based in Bangor, North Wales. We build websites, automate workflows, and improve search rankings for Welsh and UK SMEs.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return <div>About</div>
}
