import type { Metadata } from "next"
import fs from "node:fs"
import path from "node:path"
import { TronHeader } from "@/components/layout"
import { SiteFooter } from "@/components/layout/site-footer"
import { DocShell } from "@/components/docs/doc-shell"
import { TokensExplorer } from "@/components/tokens/tokens-explorer"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Design Tokens | The Gridcn",
  description:
    "Design tokens for all six thegridcn themes — CSS variables, Tailwind mappings, and downloadable CSS/JSON.",
  openGraph: {
    type: "article",
    title: "Design Tokens | The Gridcn",
    description:
      "Design tokens for all six thegridcn themes — CSS variables, Tailwind mappings, and downloadable CSS/JSON.",
    url: "https://thegridcn.com/tokens",
    siteName: "The Gridcn",
    images: [{ url: "/api/og/clu", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Tokens | The Gridcn",
    description:
      "Design tokens for all six thegridcn themes — CSS variables, Tailwind mappings, and downloadable CSS/JSON.",
    images: ["/api/og/clu"],
  },
  alternates: {
    canonical: "https://thegridcn.com/tokens",
  },
}

type ThemeIndexEntry = {
  name: string
  css: string
  json: string
  varCount: number
}

type ThemeIndex = {
  name: string
  generatedAt: string
  themes: ThemeIndexEntry[]
}

export type ThemeTokens = {
  name: string
  god: string
  selector: string
  varCount: number
  cssPath: string
  jsonPath: string
  vars: Record<string, string>
}

const GOD_MAP: Record<string, string> = {
  tron: "User",
  ares: "God of War",
  clu: "Program",
  athena: "Goddess of Wisdom",
  aphrodite: "Goddess of Love",
  poseidon: "God of Sea",
}

function readThemeTokens(): { themes: ThemeTokens[]; generatedAt: string } {
  const tokensDir = path.join(process.cwd(), "public", "tokens")
  const indexRaw = fs.readFileSync(path.join(tokensDir, "index.json"), "utf-8")
  const index = JSON.parse(indexRaw) as ThemeIndex

  const themes: ThemeTokens[] = index.themes.map((entry) => {
    const jsonPath = path.join(tokensDir, `${entry.name}.json`)
    const parsed = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as {
      name: string
      selector: string
      vars: Record<string, string>
    }
    return {
      name: entry.name,
      god: GOD_MAP[entry.name] ?? "",
      selector: parsed.selector,
      varCount: entry.varCount,
      cssPath: entry.css,
      jsonPath: entry.json,
      vars: parsed.vars,
    }
  })

  return { themes, generatedAt: index.generatedAt }
}

export default function TokensPage() {
  const { themes, generatedAt } = readThemeTokens()

  return (
    <div className="relative min-h-screen bg-background">
      <TronHeader />
      <main>
        <DocShell
          crumbs={[{ label: "Home", href: "/" }, { label: "Tokens" }]}
          title="Design Tokens"
          subtitle="Six themes. oklch() color space. Copy a var, download a file, or drop the CSS straight into your globals."
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-border/60 bg-card/40 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>
              <span className="text-primary">MANIFEST:</span>{" "}
              {themes.length} themes &middot; generated{" "}
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
  )
}
