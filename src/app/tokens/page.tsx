import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { DocShell } from "@/components/docs/doc-shell";
import { TronHeader } from "@/components/layout";
import { SiteFooter } from "@/components/layout/site-footer";
import { TokensExplorer } from "@/components/tokens/tokens-explorer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/tokens",
  },
  description:
    "Design tokens for all six thegridcn themes — CSS variables, Tailwind mappings, and downloadable CSS/JSON.",
  openGraph: {
    description:
      "Design tokens for all six thegridcn themes — CSS variables, Tailwind mappings, and downloadable CSS/JSON.",
    images: [{ height: 630, url: "/api/og/clu", width: 1200 }],
    siteName: "The Gridcn",
    title: "Design Tokens | The Gridcn",
    type: "article",
    url: "https://thegridcn.com/tokens",
  },
  title: "Design Tokens | The Gridcn",
  twitter: {
    card: "summary_large_image",
    description:
      "Design tokens for all six thegridcn themes — CSS variables, Tailwind mappings, and downloadable CSS/JSON.",
    images: ["/api/og/clu"],
    title: "Design Tokens | The Gridcn",
  },
};

interface ThemeIndexEntry {
  css: string;
  json: string;
  name: string;
  varCount: number;
}

interface ThemeIndex {
  generatedAt: string;
  name: string;
  themes: ThemeIndexEntry[];
}

export interface ThemeTokens {
  cssPath: string;
  god: string;
  jsonPath: string;
  name: string;
  selector: string;
  varCount: number;
  vars: Record<string, string>;
}

const GOD_MAP: Record<string, string> = {
  aphrodite: "Goddess of Love",
  ares: "God of War",
  athena: "Goddess of Wisdom",
  clu: "Program",
  poseidon: "God of Sea",
  tron: "User",
};

function readThemeTokens(): { themes: ThemeTokens[]; generatedAt: string } {
  const tokensDir = path.join(process.cwd(), "public", "tokens");
  const indexRaw = fs.readFileSync(path.join(tokensDir, "index.json"), "utf-8");
  const index = JSON.parse(indexRaw) as ThemeIndex;

  const themes: ThemeTokens[] = index.themes.map((entry) => {
    const jsonPath = path.join(tokensDir, `${entry.name}.json`);
    const parsed = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as {
      name: string;
      selector: string;
      vars: Record<string, string>;
    };
    return {
      cssPath: entry.css,
      god: GOD_MAP[entry.name] ?? "",
      jsonPath: entry.json,
      name: entry.name,
      selector: parsed.selector,
      varCount: entry.varCount,
      vars: parsed.vars,
    };
  });

  return { generatedAt: index.generatedAt, themes };
}

export default function TokensPage() {
  const { themes, generatedAt } = readThemeTokens();

  return (
    <div className="relative min-h-screen bg-background">
      <TronHeader />
      <main>
        <DocShell
          crumbs={[{ href: "/", label: "Home" }, { label: "Tokens" }]}
          title="Design Tokens"
          subtitle="Six themes. oklch() color space. Copy a var, download a file, or drop the CSS straight into your globals."
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-border/60 bg-card/40 px-4 py-3 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            <span>
              <span className="text-primary">MANIFEST:</span> {themes.length}{" "}
              themes &middot; generated{" "}
              {new Date(generatedAt).toISOString().slice(0, 10)}
            </span>
            <a
              href="/tokens/index.json"
              className="text-primary transition-[text-shadow] hover:[text-shadow:0_0_8px_var(--primary)]"
            >
              index.json &rarr;
            </a>
          </div>

          <TokensExplorer themes={themes} />
        </DocShell>
      </main>
      <SiteFooter />
    </div>
  );
}
