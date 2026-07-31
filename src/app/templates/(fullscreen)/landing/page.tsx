import type { Metadata } from "next";
import { TemplatePreviewer } from "@/components/thegridcn/template-previewer";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/templates/landing",
  },
  description:
    "Tron-inspired landing page template built with shadcn/ui components. Futuristic hero sections, feature grids, and CTAs with Greek god color themes.",
  openGraph: {
    description:
      "Tron-inspired landing page template built with shadcn/ui components. Futuristic hero sections, feature grids, and CTAs.",
    images: [{ height: 630, url: "/api/og/ares", width: 1200 }],
    title: "Landing Page Template | The Gridcn",
    url: "https://thegridcn.com/templates/landing",
  },
  title: "Landing Page Template | The Gridcn",
  twitter: {
    card: "summary_large_image",
    images: ["/api/og/ares"],
  },
};

export default function LandingPreviewPage() {
  return <TemplatePreviewer name="Landing Page" slug="landing" />;
}
