import type { Metadata } from "next";
import { TemplatePreviewer } from "@/components/thegridcn/template-previewer";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/templates/analytics",
  },
  description:
    "Tron-inspired analytics template built with shadcn/ui components. Real-time charts, metric cards, and data visualization with Greek god color themes.",
  openGraph: {
    description:
      "Tron-inspired analytics template built with shadcn/ui components. Real-time charts, metric cards, and data visualization.",
    images: [{ height: 630, url: "/api/og/clu", width: 1200 }],
    title: "Analytics Template | The Gridcn",
    url: "https://thegridcn.com/templates/analytics",
  },
  title: "Analytics Template | The Gridcn",
  twitter: {
    card: "summary_large_image",
    images: ["/api/og/clu"],
  },
};

export default function AnalyticsPreviewPage() {
  return <TemplatePreviewer name="Analytics" slug="analytics" />;
}
