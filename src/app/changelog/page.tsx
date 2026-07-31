import { execSync } from "node:child_process";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { DocShell } from "@/components/docs/doc-shell";
import { TronHeader } from "@/components/layout";
import { SiteFooter } from "@/components/layout/site-footer";
import { cn } from "@/lib/utils";

export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://thegridcn.com/changelog",
  },
  description:
    "Recent changes to thegridcn — new components, fixes, and refactors parsed from git history.",
  openGraph: {
    description:
      "Recent changes to thegridcn — new components, fixes, and refactors parsed from git history.",
    images: [{ height: 630, url: "/api/og/ares", width: 1200 }],
    siteName: "The Gridcn",
    title: "Changelog | The Gridcn",
    type: "article",
    url: "https://thegridcn.com/changelog",
  },
  title: "Changelog | The Gridcn",
  twitter: {
    card: "summary_large_image",
    description:
      "Recent changes to thegridcn — new components, fixes, and refactors parsed from git history.",
    images: ["/api/og/ares"],
    title: "Changelog | The Gridcn",
  },
};

type Category =
  | "feat"
  | "fix"
  | "docs"
  | "style"
  | "refactor"
  | "chore"
  | "perf"
  | "other";

interface Commit {
  category: Category;
  date: string;
  hash: string;
  message: string;
  subject: string;
}

interface MonthGroup {
  commits: Commit[];
  key: string;
  label: string;
}

const CATEGORY_META: Record<
  Category,
  { label: string; glyph: string; tone: string }
> = {
  chore: { glyph: "·", label: "Chore", tone: "text-foreground/60" },
  docs: { glyph: "▸", label: "Docs", tone: "text-foreground/70" },
  feat: { glyph: "✱", label: "Added", tone: "text-primary" },
  fix: { glyph: "▲", label: "Fixed", tone: "text-primary" },
  other: { glyph: "·", label: "Change", tone: "text-foreground/60" },
  perf: { glyph: "▲", label: "Perf", tone: "text-primary" },
  refactor: { glyph: "▸", label: "Refactor", tone: "text-foreground/70" },
  style: { glyph: "·", label: "Style", tone: "text-foreground/60" },
};

function parseCategory(subject: string): {
  category: Category;
  message: string;
} {
  const match = subject.match(
    /^(feat|fix|docs|style|refactor|chore|perf)(\([^)]+\))?!?:\s*(.+)$/
  );
  if (match) {
    return { category: match[1] as Category, message: match[3] };
  }
  return { category: "other", message: subject };
}

function loadCommits(limit = 50): Commit[] {
  try {
    const raw = execSync(
      `git log -n ${limit} --pretty=format:"%h\x1f%ad\x1f%s" --date=short`,
      { cwd: process.cwd(), encoding: "utf-8" }
    );
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [hash, date, subject] = line.split("\x1f");
        const { category, message } = parseCategory(subject ?? "");
        return { category, date, hash, message, subject };
      });
  } catch {
    return [];
  }
}

function groupByMonth(commits: Commit[]): MonthGroup[] {
  const groups = new Map<string, Commit[]>();
  for (const c of commits) {
    const key = c.date.slice(0, 7);
    const arr = groups.get(key) ?? [];
    arr.push(c);
    groups.set(key, arr);
  }
  return Array.from(groups.entries()).map(([key, commits]) => ({
    commits,
    key,
    label: formatMonth(key),
  }));
}

function formatMonth(ym: string) {
  const [year, month] = ym.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date
    .toLocaleDateString("en-US", { month: "long", year: "numeric" })
    .toUpperCase();
}

export default function ChangelogPage() {
  const commits = loadCommits(50);
  const groups = groupByMonth(commits);

  return (
    <div className="relative min-h-screen bg-background">
      <TronHeader />
      <main>
        <DocShell
          crumbs={[{ href: "/", label: "Home" }, { label: "Changelog" }]}
          title="Changelog"
          subtitle="Rolling log of what's shipped. Parsed from git history, categorized by Conventional Commits."
        >
          {groups.length === 0 ? (
            <p className="font-mono text-muted-foreground text-sm">
              No commits indexed at build time.
            </p>
          ) : (
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-2 bottom-2 left-[7px] w-px bg-border/60"
              />
              <div className="space-y-12">
                {groups.map((group) => (
                  <section key={group.key}>
                    <header className="mb-5 flex items-center gap-3 pl-8">
                      <h2 className="font-mono text-[11px] text-primary uppercase tracking-[0.3em]">
                        {group.label}
                      </h2>
                      <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                        {group.commits.length} commits
                      </span>
                    </header>

                    <ul className="space-y-4">
                      {group.commits.map((commit, idx) => {
                        const meta = CATEGORY_META[commit.category];
                        const isLatest = group === groups[0] && idx === 0;
                        return (
                          <li key={commit.hash} className="relative pl-8">
                            <span
                              aria-hidden="true"
                              className={cn(
                                "absolute top-[9px] left-1 h-2.5 w-2.5 border border-primary/60 bg-background",
                                isLatest && "bg-primary"
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
                                    meta.tone
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
                              <p className="text-foreground/85 text-sm">
                                {commit.message}
                              </p>
                            </div>
                          </li>
                        );
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
              className="group inline-flex items-center gap-2 border border-primary/40 bg-primary/5 px-4 py-2 font-mono text-[11px] text-primary uppercase tracking-[0.25em] transition-all hover:bg-primary/10 hover:[text-shadow:0_0_8px_var(--primary)]"
            >
              View full history on GitHub
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </DocShell>
      </main>
      <SiteFooter />
    </div>
  );
}
