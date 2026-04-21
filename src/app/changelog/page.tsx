import type { Metadata } from "next"
import { execSync } from "node:child_process"
import { ExternalLink } from "lucide-react"
import { TronHeader } from "@/components/layout"
import { SiteFooter } from "@/components/layout/site-footer"
import { DocShell } from "@/components/docs/doc-shell"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Changelog | The Gridcn",
  description:
    "Recent changes to thegridcn — new components, fixes, and refactors parsed from git history.",
  openGraph: {
    type: "article",
    title: "Changelog | The Gridcn",
    description:
      "Recent changes to thegridcn — new components, fixes, and refactors parsed from git history.",
    url: "https://thegridcn.com/changelog",
    siteName: "The Gridcn",
    images: [{ url: "/api/og/ares", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog | The Gridcn",
    description:
      "Recent changes to thegridcn — new components, fixes, and refactors parsed from git history.",
    images: ["/api/og/ares"],
  },
  alternates: {
    canonical: "https://thegridcn.com/changelog",
  },
}

type Category =
  | "feat"
  | "fix"
  | "docs"
  | "style"
  | "refactor"
  | "chore"
  | "perf"
  | "other"

type Commit = {
  hash: string
  date: string
  subject: string
  category: Category
  message: string
}

type MonthGroup = {
  key: string
  label: string
  commits: Commit[]
}

const CATEGORY_META: Record<
  Category,
  { label: string; glyph: string; tone: string }
> = {
  feat: { label: "Added", glyph: "✱", tone: "text-primary" },
  fix: { label: "Fixed", glyph: "▲", tone: "text-primary" },
  docs: { label: "Docs", glyph: "▸", tone: "text-foreground/70" },
  style: { label: "Style", glyph: "·", tone: "text-foreground/60" },
  refactor: { label: "Refactor", glyph: "▸", tone: "text-foreground/70" },
  chore: { label: "Chore", glyph: "·", tone: "text-foreground/60" },
  perf: { label: "Perf", glyph: "▲", tone: "text-primary" },
  other: { label: "Change", glyph: "·", tone: "text-foreground/60" },
}

function parseCategory(subject: string): { category: Category; message: string } {
  const match = subject.match(/^(feat|fix|docs|style|refactor|chore|perf)(\([^)]+\))?!?:\s*(.+)$/)
  if (match) {
    return { category: match[1] as Category, message: match[3] }
  }
  return { category: "other", message: subject }
}

function loadCommits(limit = 50): Commit[] {
  try {
    const raw = execSync(
      `git log -n ${limit} --pretty=format:"%h\x1f%ad\x1f%s" --date=short`,
      { encoding: "utf-8", cwd: process.cwd() },
    )
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash, date, subject] = line.split("\x1f")
        const { category, message } = parseCategory(subject ?? "")
        return { hash, date, subject, category, message }
      })
  } catch {
    return []
  }
}

function groupByMonth(commits: Commit[]): MonthGroup[] {
  const groups = new Map<string, Commit[]>()
  for (const c of commits) {
    const key = c.date.slice(0, 7)
    const arr = groups.get(key) ?? []
    arr.push(c)
    groups.set(key, arr)
  }
  return Array.from(groups.entries()).map(([key, commits]) => ({
    key,
    label: formatMonth(key),
    commits,
  }))
}

function formatMonth(ym: string) {
  const [year, month] = ym.split("-")
  const date = new Date(Number(year), Number(month) - 1, 1)
  return date
    .toLocaleDateString("en-US", { month: "long", year: "numeric" })
    .toUpperCase()
}

export default function ChangelogPage() {
  const commits = loadCommits(50)
  const groups = groupByMonth(commits)

  return (
    <div className="relative min-h-screen bg-background">
      <TronHeader />
      <main>
        <DocShell
          crumbs={[{ label: "Home", href: "/" }, { label: "Changelog" }]}
          title="Changelog"
          subtitle="Rolling log of what's shipped. Parsed from git history, categorized by Conventional Commits."
        >
          {groups.length === 0 ? (
            <p className="font-mono text-sm text-muted-foreground">
              No commits indexed at build time.
            </p>
          ) : (
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[7px] top-2 bottom-2 w-px bg-border/60"
              />
              <div className="space-y-12">
                {groups.map((group) => (
                  <section key={group.key}>
                    <header className="mb-5 flex items-center gap-3 pl-8">
                      <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                        {group.label}
                      </h2>
                      <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {group.commits.length} commits
                      </span>
                    </header>

                    <ul className="space-y-4">
                      {group.commits.map((commit, idx) => {
                        const meta = CATEGORY_META[commit.category]
                        const isLatest =
                          group === groups[0] && idx === 0
                        return (
                          <li
                            key={commit.hash}
                            className="relative pl-8"
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                "absolute left-1 top-[9px] h-2.5 w-2.5 border border-primary/60 bg-background",
                                isLatest && "bg-primary",
                              )}
                              style={
                                isLatest
                                  ? { boxShadow: "0 0 10px var(--primary)" }
                                  : undefined
                              }
                            />
                            <div className="border border-border/60 bg-card/40 p-4 transition-colors hover:border-primary/50">
                              <div className="mb-2 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
                                <span
                                  className={cn(
                                    "inline-flex items-center gap-1.5 border border-primary/30 bg-primary/5 px-1.5 py-0.5",
                                    meta.tone,
                                  )}
                                >
                                  <span aria-hidden="true">{meta.glyph}</span>
                                  {meta.label}
                                </span>
                                <a
                                  href={`https://github.com/educlopez/thegridcn-ui/commit/${commit.hash}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary transition-[text-shadow] hover:[text-shadow:0_0_8px_var(--primary)]"
                                >
                                  {commit.hash}
                                </a>
                                <span className="text-muted-foreground">
                                  {commit.date}
                                </span>
                              </div>
                              <p className="text-sm text-foreground/85">
                                {commit.message}
                              </p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex items-center justify-center">
            <a
              href="https://github.com/educlopez/thegridcn-ui/commits/main"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 border border-primary/40 bg-primary/5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-primary transition-all hover:bg-primary/10 hover:[text-shadow:0_0_8px_var(--primary)]"
            >
              View full history on GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </DocShell>
      </main>
      <SiteFooter />
    </div>
  )
}
