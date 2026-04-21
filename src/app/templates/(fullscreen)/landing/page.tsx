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
    images: [{ url: "/api/og/ares", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/api/og/ares"],
  },
  alternates: {
    canonical: "https://thegridcn.com/templates/landing",
  },
}

export default function LandingPreviewPage() {
  return <TemplatePreviewer name="Landing Page" slug="landing" />
}
