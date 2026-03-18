import type { Metadata } from "next"
import { TemplatePreviewer } from "@/components/thegridcn/template-previewer"

export const metadata: Metadata = {
  title: "Landing Page Template | The Gridcn",
  description:
    "Tron-inspired landing page template built with shadcn/ui components. Futuristic hero sections, feature grids, and CTAs with Greek god color themes.",
  openGraph: {
    title: "Landing Page Template | The Gridcn",
    description:
      "Tron-inspired landing page template built with shadcn/ui components. Futuristic hero sections, feature grids, and CTAs.",
    url: "https://thegridcn.com/templates/landing",
  },
  alternates: {
    canonical: "https://thegridcn.com/templates/landing",
  },
}

export default function LandingPreviewPage() {
  return <TemplatePreviewer name="Landing Page" slug="landing" />
}
