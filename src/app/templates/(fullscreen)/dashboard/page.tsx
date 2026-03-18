import type { Metadata } from "next"
import { TemplatePreviewer } from "@/components/thegridcn/template-previewer"

export const metadata: Metadata = {
  title: "Dashboard Template | The Gridcn",
  description:
    "Tron-inspired dashboard template built with shadcn/ui components. HUD-style metrics, data grids, and analytics panels with Greek god color themes.",
  openGraph: {
    title: "Dashboard Template | The Gridcn",
    description:
      "Tron-inspired dashboard template built with shadcn/ui components. HUD-style metrics, data grids, and analytics panels.",
    url: "https://thegridcn.com/templates/dashboard",
  },
  alternates: {
    canonical: "https://thegridcn.com/templates/dashboard",
  },
}

export default function DashboardPreviewPage() {
  return <TemplatePreviewer name="Dashboard" slug="dashboard" />
}
