import type { Metadata } from "next";
import { DocShell } from "@/components/docs/doc-shell";
import { ProseDoc } from "@/components/docs/prose-doc";
import { renderMarkdownFile } from "@/lib/markdown";

export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/docs/api",
  },
  description:
    "Public HTTP APIs for The Gridcn: shadcn registry, themed payloads, template source, component search, and the light-cycle leaderboard.",
  openGraph: {
    description:
      "Public HTTP APIs for The Gridcn registry, tokens, templates, and leaderboard.",
    images: [{ height: 630, url: "/api/og/tron", width: 1200 }],
    siteName: "The Gridcn",
    title: "API Reference | The Gridcn",
    type: "article",
    url: "https://thegridcn.com/docs/api",
  },
  title: "API Reference | The Gridcn",
  twitter: {
    card: "summary_large_image",
    description:
      "Public HTTP APIs for The Gridcn registry, tokens, templates, and leaderboard.",
    images: ["/api/og/tron"],
    title: "API Reference | The Gridcn",
  },
};

export default async function ApiDocsPage() {
  const html = await renderMarkdownFile("docs/api.md");

  return (
    <DocShell
      crumbs={[
        { href: "/", label: "Home" },
        { label: "Docs" },
        { label: "API" },
      ]}
      title="API Reference"
      subtitle="Registry, tokens, templates, and the light-cycle leaderboard — plus machine-readable catalogs for agents."
    >
      <ProseDoc html={html} />
    </DocShell>
  );
}
