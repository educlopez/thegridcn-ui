import type { Metadata } from "next"
import { TronHeader } from "@/components/layout"
import { SiteFooter } from "@/components/layout/site-footer"
import { DocShell } from "@/components/docs/doc-shell"
import { ProseDoc } from "@/components/docs/prose-doc"
import { renderMarkdownFile } from "@/lib/markdown"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Contributing | The Gridcn",
  description:
    "How to contribute to thegridcn: local setup, adding components and themes, commit conventions, and PR guidelines.",
  openGraph: {
    type: "article",
    title: "Contributing | The Gridcn",
    description:
      "Local setup, adding components and themes, commit conventions, and PR guidelines.",
    url: "https://thegridcn.com/contributing",
    siteName: "The Gridcn",
    images: [{ url: "/api/og/athena", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contributing | The Gridcn",
    description:
      "Local setup, adding components and themes, commit conventions, and PR guidelines.",
    images: ["/api/og/athena"],
  },
  alternates: {
    canonical: "https://thegridcn.com/contributing",
  },
}

export default async function ContributingPage() {
  const html = await renderMarkdownFile("CONTRIBUTING.md")

  return (
    <div className="relative min-h-screen bg-background">
      <TronHeader />
      <main>
        <DocShell
          crumbs={[{ label: "Home", href: "/" }, { label: "Contributing" }]}
          title="Contributing"
          subtitle="Keep contributions focused and small. Follow the patterns that already exist."
        >
          <ProseDoc html={html} />
        </DocShell>
      </main>
      <SiteFooter />
    </div>
  )
}
