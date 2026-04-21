import { TronHeader } from "@/components/layout"
import { SiteFooter } from "@/components/layout/site-footer"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <TronHeader />
      <main className="relative">{children}</main>
      <SiteFooter />
    </div>
  )
}
