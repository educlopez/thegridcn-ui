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
    "Install The Gridcn theme and components with the shadcn CLI. Register the namespace, pick Radix UI or Base UI, and add themes and tokens to any React app.",
  openGraph: {
    description:
      "Install The Gridcn theme and components with the shadcn CLI. Register the namespace, pick Radix UI or Base UI, and add themes and tokens to any React app.",
    images: [{ height: 630, url: "/api/og/tron", width: 1200 }],
    siteName: "The Gridcn",
    title: "Install The Gridcn theme for shadcn/ui | The Gridcn",
    type: "article",
    url: "https://thegridcn.com/docs/install",
  },
  title: "Install The Gridcn theme for shadcn/ui | The Gridcn",
  twitter: {
    card: "summary_large_image",
    description:
      "Install The Gridcn theme and components with the shadcn CLI. Register the namespace, pick Radix UI or Base UI, and add themes and tokens to any React app.",
    images: ["/api/og/tron"],
    title: "Install The Gridcn theme for shadcn/ui | The Gridcn",
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
