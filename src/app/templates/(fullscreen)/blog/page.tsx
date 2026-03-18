import type { Metadata } from "next"
import { TemplatePreviewer } from "@/components/thegridcn/template-previewer"

export const metadata: Metadata = {
  title: "Blog Template | The Gridcn",
  description:
    "Tron-inspired blog template built with shadcn/ui components. Futuristic article layouts, post grids, and reading views with Greek god color themes.",
  openGraph: {
    title: "Blog Template | The Gridcn",
    description:
      "Tron-inspired blog template built with shadcn/ui components. Futuristic article layouts, post grids, and reading views.",
    url: "https://thegridcn.com/templates/blog",
  },
  alternates: {
    canonical: "https://thegridcn.com/templates/blog",
  },
}

export default function BlogPreviewPage() {
  return <TemplatePreviewer name="Blog" slug="blog" />
}
