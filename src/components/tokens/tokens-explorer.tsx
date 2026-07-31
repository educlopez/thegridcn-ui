"use client";

import { Download, Eye, FileCode, FileJson } from "lucide-react";
import * as React from "react";
import { CopyButton } from "@/components/code-block/copy-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface ThemeTokens {
  cssPath: string;
  god: string;
  jsonPath: string;
  name: string;
  selector: string;
  varCount: number;
  vars: Record<string, string>;
}

type ViewMode = "css" | "tailwind" | "json";

const VIEW_MODES: { id: ViewMode; label: string }[] = [
  { id: "css", label: "CSS Vars" },
  { id: "tailwind", label: "Tailwind" },
  { id: "json", label: "Raw JSON" },
];

const CATEGORY_ORDER = [
  "core",
  "primary",
  "surface",
  "text",
  "border",
  "state",
  "chart",
  "sidebar",
  "radius",
  "other",
] as const;

type Category = (typeof CATEGORY_ORDER)[number];

const CATEGORY_LABELS: Record<Category, string> = {
  border: "Border",
  chart: "Chart",
  core: "Core",
  other: "Other",
  primary: "Primary",
  radius: "Radius",
  sidebar: "Sidebar",
  state: "State",
  surface: "Surface",
  text: "Text",
};

function categorize(varName: string): Category {
  const n = varName.replace(/^--/, "");
  if (n.startsWith("chart-")) {
    return "chart";
  }
  if (n.startsWith("sidebar")) {
    return "sidebar";
  }
  if (n.startsWith("radius") || n === "radius") {
    return "radius";
  }
  if (n.includes("primary")) {
    return "primary";
  }
  if (
    n === "background" ||
    n === "card" ||
    n === "popover" ||
    n === "muted" ||
    n === "secondary" ||
    n === "accent"
  ) {
    return "surface";
  }
  if (n.endsWith("-foreground") || n === "foreground") {
    return "text";
  }
  if (n === "border" || n === "input" || n === "ring") {
    return "border";
  }
  if (n === "destructive" || n === "glow" || n === "glow-muted") {
    return "state";
  }
  return "other";
}

function groupVars(vars: Record<string, string>) {
  const groups = new Map<Category, [string, string][]>();
  for (const [key, value] of Object.entries(vars)) {
    const cat = categorize(key);
    const arr = groups.get(cat) ?? [];
    arr.push([key, value]);
    groups.set(cat, arr);
  }
  return CATEGORY_ORDER.filter((c) => groups.has(c)).map((c) => ({
    category: c,
    entries: groups.get(c) ?? [],
    label: CATEGORY_LABELS[c],
  }));
}

function formatCss(theme: ThemeTokens) {
  const entries = Object.entries(theme.vars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join("\n");
  return `${theme.selector} {\n${entries}\n}`;
}

function formatTailwind(theme: ThemeTokens) {
  const colorEntries = Object.entries(theme.vars)
    .filter(([k]) => !(k.startsWith("--chart-") || k.startsWith("--radius")))
    .map(([k]) => {
      const name = k.replace(/^--/, "");
      return `        "${name}": "var(${k})"`;
    })
    .join(",\n");
  return `/* tailwind.config.ts */\nexport default {\n  theme: {\n    extend: {\n      colors: {\n${colorEntries}\n      }\n    }\n  }\n}`;
}

function formatJson(theme: ThemeTokens) {
  return JSON.stringify(
    { name: theme.name, selector: theme.selector, vars: theme.vars },
    null,
    2
  );
}

function isColorValue(value: string) {
  return (
    value.startsWith("oklch") ||
    value.startsWith("#") ||
    value.startsWith("rgb") ||
    value.startsWith("hsl")
  );
}

export function TokensExplorer({ themes }: { themes: ThemeTokens[] }) {
  const [selected, setSelected] = React.useState<ThemeTokens | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => {
          const primary = theme.vars["--primary"] ?? "oklch(0.75 0.18 195)";
          return (
            <article
              key={theme.name}
              data-theme={theme.name}
              className={cn(
                "group relative flex flex-col border border-primary/30 bg-card/40 backdrop-blur-sm transition-all",
                "hover:border-primary/70 hover:shadow-[0_0_32px_oklch(from_var(--primary)_l_c_h/0.2)]"
              )}
            >
              <span className="pointer-events-none absolute -top-px -left-px h-3 w-3 border-primary border-t border-l" />
              <span className="pointer-events-none absolute -top-px -right-px h-3 w-3 border-primary border-t border-r" />
              <span className="pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-primary border-b border-l" />
              <span className="pointer-events-none absolute -right-px -bottom-px h-3 w-3 border-primary border-r border-b" />

              <div className="flex items-center gap-3 px-5 py-4">
                <span
                  aria-hidden="true"
                  className="h-10 w-10 shrink-0 border border-primary/40"
                  style={{
                    background: primary,
                    boxShadow: `0 0 16px ${primary}`,
                  }}
                />
                <div className="min-w-0">
                  <div className="font-display text-base text-primary uppercase tracking-[0.18em]">
                    {theme.name}
                  </div>
                  <div className="truncate font-mono text-[10px] text-foreground/60 uppercase tracking-widest">
                    {theme.god || "theme"} &middot; {theme.varCount} vars
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelected(theme)}
                aria-label={`View ${theme.name} tokens`}
                className="mx-5 mb-3 inline-flex items-center justify-center gap-1.5 border border-primary/40 bg-primary/5 px-3 py-2 font-mono text-[10px] text-primary uppercase tracking-[0.25em] transition-all hover:border-primary hover:bg-primary/15 hover:[text-shadow:0_0_8px_var(--primary)]"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>View Tokens</span>
              </button>

              <div className="mt-auto flex flex-wrap gap-2 border-primary/20 border-t px-5 py-3">
                <DownloadLink
                  href={theme.cssPath}
                  label="CSS"
                  filename={`${theme.name}.css`}
                  icon={<FileCode className="h-3.5 w-3.5" />}
                />
                <DownloadLink
                  href={theme.jsonPath}
                  label="JSON"
                  filename={`${theme.name}.json`}
                  icon={<FileJson className="h-3.5 w-3.5" />}
                />
                <CopyButton content={formatCss(theme)} label="Copy CSS" />
              </div>
            </article>
          );
        })}
      </div>

      <TokenDialog
        theme={selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </div>
  );
}

function TokenDialog({
  theme,
  onOpenChange,
}: {
  theme: ThemeTokens | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [view, setView] = React.useState<ViewMode>("css");

  React.useEffect(() => {
    if (theme) {
      setView("css");
    }
  }, [theme]);

  if (!theme) {
    return (
      <Dialog open={false} onOpenChange={onOpenChange}>
        <DialogContent />
      </Dialog>
    );
  }

  const primary = theme.vars["--primary"] ?? "oklch(0.75 0.18 195)";

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent
        data-theme={theme.name}
        className="max-h-[85vh] max-w-3xl overflow-hidden border border-primary/40 bg-background p-0 sm:max-w-4xl"
      >
        <DialogHeader className="border-primary/20 border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-8 w-8 shrink-0 border border-primary/40"
              style={{
                background: primary,
                boxShadow: `0 0 14px ${primary}`,
              }}
            />
            <div className="min-w-0 flex-1 text-left">
              <DialogTitle className="font-display text-lg text-primary uppercase tracking-[0.2em]">
                {theme.name}
              </DialogTitle>
              <DialogDescription className="font-mono text-[10px] text-foreground/60 uppercase tracking-widest">
                {theme.god || "theme"} &middot; {theme.varCount} vars &middot;{" "}
                {theme.selector}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex items-center justify-between gap-3 border-primary/20 border-b px-6 py-3">
          <div
            role="tablist"
            aria-label="Token view mode"
            className="inline-flex border border-border/70 bg-card/40 p-0.5"
          >
            {VIEW_MODES.map((mode) => {
              const active = view === mode.id;
              return (
                <button
                  type="button"
                  key={mode.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setView(mode.id)}
                  className={cn(
                    "px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors",
                    active
                      ? "bg-primary/15 text-primary [text-shadow:0_0_8px_var(--primary)]"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <DownloadLink
              href={theme.cssPath}
              label="CSS"
              filename={`${theme.name}.css`}
              icon={<FileCode className="h-3.5 w-3.5" />}
            />
            <DownloadLink
              href={theme.jsonPath}
              label="JSON"
              filename={`${theme.name}.json`}
              icon={<FileJson className="h-3.5 w-3.5" />}
            />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-auto px-6 py-5">
          {view === "css" ? (
            <VarsByCategory vars={theme.vars} />
          ) : (
            <CodePanel
              code={
                view === "tailwind" ? formatTailwind(theme) : formatJson(theme)
              }
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DownloadLink({
  href,
  label,
  filename,
  icon,
}: {
  href: string;
  label: string;
  filename: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      download={filename}
      className="group/dl inline-flex items-center gap-1.5 border border-primary/30 bg-primary/5 px-2.5 py-1 font-mono text-[10px] text-foreground/80 uppercase tracking-[0.2em] transition-all hover:border-primary hover:text-primary hover:[text-shadow:0_0_8px_var(--primary)]"
    >
      {icon}
      <span>{label}</span>
      <Download className="h-3 w-3 opacity-50 group-hover/dl:opacity-100" />
    </a>
  );
}

function CodePanel({ code }: { code: string }) {
  return (
    <div className="relative border border-primary/20 bg-black">
      <div className="absolute top-2 right-2 z-10">
        <CopyButton content={code} />
      </div>
      <pre className="max-h-[50vh] overflow-auto p-4 font-mono text-[11px] text-foreground/80 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function VarsByCategory({ vars }: { vars: Record<string, string> }) {
  const groups = groupVars(vars);
  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <section key={group.category}>
          <h3 className="mb-2 font-mono text-[10px] text-primary uppercase tracking-[0.3em]">
            {group.label}
          </h3>
          <ul className="divide-y divide-border/40 border border-border/40 bg-background/40">
            {group.entries.map(([name, value]) => {
              const isColor = isColorValue(value);
              return (
                <li
                  key={name}
                  className="flex items-center gap-3 px-3 py-1.5 text-[11px]"
                >
                  {isColor ? (
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 border border-border/60"
                      style={{ background: value }}
                    />
                  ) : (
                    <span className="h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                  <code className="shrink-0 font-mono text-primary">
                    {name}
                  </code>
                  <code className="flex-1 truncate font-mono text-foreground/70">
                    {value}
                  </code>
                  <CopyButton content={value} />
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
