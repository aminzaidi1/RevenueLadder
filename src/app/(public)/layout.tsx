import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
