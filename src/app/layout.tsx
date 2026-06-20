import type { Metadata } from "next"
import { Montserrat, Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700", "800", "900"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap",
})

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://revenueladder.co.uk"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Welsh web design & automation agency | Revenue Ladder",
    template: "%s | Revenue Ladder",
  },
  description:
    "Revenue Ladder builds custom websites, automates business workflows, and improves search rankings for Welsh businesses. Based in Bangor, North Wales.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Revenue Ladder",
    locale: "en_GB",
    type: "website",
    title: "Welsh web design & automation agency | Revenue Ladder",
    description:
      "Revenue Ladder builds custom websites, automates business workflows, and improves search rankings for Welsh businesses. Based in Bangor, North Wales.",
    url: BASE_URL,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Revenue Ladder - Welsh Web & Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Welsh web design & automation agency | Revenue Ladder",
    description:
      "Revenue Ladder builds custom websites, automates business workflows, and improves search rankings for Welsh businesses. Based in Bangor, North Wales.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col antialiased">
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
        <Analytics />
        <Script
          src="https://voice.revenueladder.co.uk/widget.js"
          data-agent-id="b0801e60-da36-4510-8589-0e510f418aff"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
