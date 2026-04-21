import type { Metadata } from "next"
import { DocShell } from "@/components/docs/doc-shell"
import { ProseDoc } from "@/components/docs/prose-doc"
import { renderMarkdownFile } from "@/lib/markdown"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Install Guide | The Gridcn",
  description:
    "Install thegridcn components, themes, and tokens via the shadcn CLI. Works with Next.js, Vite, Remix and any React project.",
  openGraph: {
    type: "article",
    title: "Install Guide | The Gridcn",
    description:
      "Install thegridcn components, themes, and tokens via the shadcn CLI.",
    url: "https://thegridcn.com/docs/install",
    siteName: "The Gridcn",
    images: [{ url: "/api/og/tron", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Install Guide | The Gridcn",
    description:
      "Install thegridcn components, themes, and tokens via the shadcn CLI.",
    images: ["/api/og/tron"],
  },
  alternates: {
    canonical: "https://thegridcn.com/docs/install",
  },
}

export default async function InstallPage() {
  const html = await renderMarkdownFile("docs/install.md")

  return (
    <DocShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "Docs" },
        { label: "Install" },
      ]}
      title="Install Guide"
      subtitle="Add thegridcn components, themes, and tokens to any shadcn/ui project with a single CLI call."
    >
      <ProseDoc html={html} />
    </DocShell>
  )
}
