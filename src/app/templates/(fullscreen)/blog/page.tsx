import type { Metadata } from "next";
import { TemplatePreviewer } from "@/components/thegridcn/template-previewer";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/templates/blog",
  },
  description:
    "Tron-inspired blog template built with shadcn/ui components. Futuristic article layouts, post grids, and reading views with Greek god color themes.",
  openGraph: {
    description:
      "Tron-inspired blog template built with shadcn/ui components. Futuristic article layouts, post grids, and reading views.",
    images: [{ height: 630, url: "/api/og/athena", width: 1200 }],
    title: "Blog Template | The Gridcn",
    url: "https://thegridcn.com/templates/blog",
  },
  title: "Blog Template | The Gridcn",
  twitter: {
    card: "summary_large_image",
    images: ["/api/og/athena"],
  },
};

export default function BlogPreviewPage() {
  return <TemplatePreviewer name="Blog" slug="blog" />;
}
