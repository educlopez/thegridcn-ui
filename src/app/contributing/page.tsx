import type { Metadata } from "next";
import { DocShell } from "@/components/docs/doc-shell";
import { ProseDoc } from "@/components/docs/prose-doc";
import { TronHeader } from "@/components/layout";
import { SiteFooter } from "@/components/layout/site-footer";
import { renderMarkdownFile } from "@/lib/markdown";

export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/contributing",
  },
  description:
    "How to contribute to thegridcn: local setup, adding components and themes, commit conventions, and PR guidelines.",
  openGraph: {
    description:
      "Local setup, adding components and themes, commit conventions, and PR guidelines.",
    images: [{ height: 630, url: "/api/og/athena", width: 1200 }],
    siteName: "The Gridcn",
    title: "Contributing | The Gridcn",
    type: "article",
    url: "https://thegridcn.com/contributing",
  },
  title: "Contributing | The Gridcn",
  twitter: {
    card: "summary_large_image",
    description:
      "Local setup, adding components and themes, commit conventions, and PR guidelines.",
    images: ["/api/og/athena"],
    title: "Contributing | The Gridcn",
  },
};

export default async function ContributingPage() {
  const html = await renderMarkdownFile("CONTRIBUTING.md");

  return (
    <div className="relative min-h-screen bg-background">
      <TronHeader />
      <main>
        <DocShell
          crumbs={[{ href: "/", label: "Home" }, { label: "Contributing" }]}
          title="Contributing"
          subtitle="Keep contributions focused and small. Follow the patterns that already exist."
        >
          <ProseDoc html={html} />
        </DocShell>
      </main>
      <SiteFooter />
    </div>
  );
}
