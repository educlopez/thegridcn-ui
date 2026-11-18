import type { Metadata } from "next";
import { DocShell } from "@/components/docs/doc-shell";
import { ProseDoc } from "@/components/docs/prose-doc";
import { renderMarkdownFile } from "@/lib/markdown";

export const dynamic = "force-static";

const title = "shadcn grid for React | The Gridcn";
const description =
  "shadcn grid layouts with The Gridcn: HUD panels, bento-style sections, and Tron UI components on shadcn/ui. Install from the registry.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/docs/shadcn-grid",
  },
  description,
  openGraph: {
    description,
    images: [{ height: 630, url: "/api/og/tron", width: 1200 }],
    siteName: "The Gridcn",
    title,
    type: "article",
    url: "https://thegridcn.com/docs/shadcn-grid",
  },
  title: { absolute: title },
  twitter: {
    card: "summary_large_image",
    description,
    images: ["/api/og/tron"],
    title,
  },
};

export default async function ShadcnGridPage() {
  const html = await renderMarkdownFile("docs/shadcn-grid.md");

  return (
    <DocShell
      crumbs={[
        { href: "/", label: "Home" },
        { label: "Docs" },
        { label: "shadcn grid" },
      ]}
      title="shadcn grid with The Gridcn"
    >
      <ProseDoc html={html} />
    </DocShell>
  );
}
