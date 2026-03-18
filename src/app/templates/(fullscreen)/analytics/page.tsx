import type { Metadata } from "next"
import { TemplatePreviewer } from "@/components/thegridcn/template-previewer"

export const metadata: Metadata = {
  title: "Analytics Template | The Gridcn",
  description:
    "Tron-inspired analytics template built with shadcn/ui components. Real-time charts, metric cards, and data visualization with Greek god color themes.",
  openGraph: {
    title: "Analytics Template | The Gridcn",
    description:
      "Tron-inspired analytics template built with shadcn/ui components. Real-time charts, metric cards, and data visualization.",
    url: "https://thegridcn.com/templates/analytics",
  },
  alternates: {
    canonical: "https://thegridcn.com/templates/analytics",
  },
}

export default function AnalyticsPreviewPage() {
  return <TemplatePreviewer name="Analytics" slug="analytics" />
}
