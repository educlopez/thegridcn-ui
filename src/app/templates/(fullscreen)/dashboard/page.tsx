import type { Metadata } from "next";
import { TemplatePreviewer } from "@/components/thegridcn/template-previewer";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/templates/dashboard",
  },
  description:
    "Tron-inspired dashboard template built with shadcn/ui components. HUD-style metrics, data grids, and analytics panels with Greek god color themes.",
  openGraph: {
    description:
      "Tron-inspired dashboard template built with shadcn/ui components. HUD-style metrics, data grids, and analytics panels.",
    images: [{ height: 630, url: "/api/og/tron", width: 1200 }],
    title: "Dashboard Template | The Gridcn",
    url: "https://thegridcn.com/templates/dashboard",
  },
  title: "Dashboard Template | The Gridcn",
  twitter: {
    card: "summary_large_image",
    images: ["/api/og/tron"],
  },
};

export default function DashboardPreviewPage() {
  return <TemplatePreviewer name="Dashboard" slug="dashboard" />;
}
