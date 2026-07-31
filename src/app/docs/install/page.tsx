import type { Metadata } from "next";
import { DocShell } from "@/components/docs/doc-shell";
import { ProseDoc } from "@/components/docs/prose-doc";
import { renderMarkdownFile } from "@/lib/markdown";

export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/docs/install",
  },
  description:
    "Install thegridcn components, themes, and tokens via the shadcn CLI. Works with Next.js, Vite, Remix and any React project.",
  openGraph: {
    description:
      "Install thegridcn components, themes, and tokens via the shadcn CLI.",
    images: [{ height: 630, url: "/api/og/tron", width: 1200 }],
    siteName: "The Gridcn",
    title: "Install Guide | The Gridcn",
    type: "article",
    url: "https://thegridcn.com/docs/install",
  },
  title: "Install Guide | The Gridcn",
  twitter: {
    card: "summary_large_image",
    description:
      "Install thegridcn components, themes, and tokens via the shadcn CLI.",
    images: ["/api/og/tron"],
    title: "Install Guide | The Gridcn",
  },
};

export default async function InstallPage() {
  const html = await renderMarkdownFile("docs/install.md");

  return (
    <DocShell
      crumbs={[
        { href: "/", label: "Home" },
        { label: "Docs" },
        { label: "Install" },
      ]}
      title="Install Guide"
      subtitle="Add thegridcn components, themes, and tokens to any shadcn/ui project with a single CLI call."
    >
      <ProseDoc html={html} />
    </DocShell>
  );
}
