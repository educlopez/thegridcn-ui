"use client";

import {
  ArrowLeft,
  Code,
  ExternalLink,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockGroup,
  CodeBlockHeader,
  CodeBlockIcon,
} from "@/components/code-block/code-block";
import { CopyButton } from "@/components/code-block/copy-button";
import { CodeBlockShiki } from "@/components/code-block/shiki";
import { ThemeSwitcherCompact, useTheme } from "@/components/theme";
import { cn } from "@/lib/utils";

type DeviceSize = "mobile" | "tablet" | "desktop";
type ViewMode = "preview" | "code";

const DEVICE_CONFIG: {
  id: DeviceSize;
  icon: typeof Monitor;
  label: string;
  maxWidth: string;
}[] = [
  {
    icon: Smartphone,
    id: "mobile",
    label: "Mobile",
    maxWidth: "max-w-[375px]",
  },
  { icon: Tablet, id: "tablet", label: "Tablet", maxWidth: "max-w-[768px]" },
  { icon: Monitor, id: "desktop", label: "Desktop", maxWidth: "max-w-full" },
];

interface TemplatePreviewerProps {
  name: string;
  slug: string;
}

function TemplateCodeViewer({ slug }: { slug: string }) {
  const [code, setCode] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState("template.tsx");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    setCode(null);

    fetch(`/api/template-source/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Template not found");
        }
        return res.json();
      })
      .then((data) => {
        setCode(data.content);
        setFileName(data.fileName);
      })
      .catch((err) => {
        console.error("Failed to load template source:", err);
        setError("Failed to load source code");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-background/50">
        <div className="flex items-center gap-2 font-mono text-foreground/40 text-xs">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          LOADING SOURCE...
        </div>
      </div>
    );
  }

  if (error || !code) {
    return (
      <div className="flex h-full items-center justify-center bg-background/50">
        <div className="font-mono text-[10px] text-foreground/30 uppercase tracking-widest">
          {error || "No source code available"}
        </div>
      </div>
    );
  }

  const lineCount = code.split("\n").length;

  return (
    <CodeBlock className="h-full rounded-none border-0">
      <CodeBlockHeader>
        <CodeBlockGroup>
          <CodeBlockIcon language="tsx" />
          <span className="font-mono text-[11px]">{fileName}</span>
        </CodeBlockGroup>
        <CodeBlockGroup>
          <span className="font-mono text-[9px] text-foreground/20 uppercase tracking-widest">
            {lineCount} lines
          </span>
          <CopyButton content={code} />
        </CodeBlockGroup>
      </CodeBlockHeader>
      <CodeBlockContent className="flex-1 text-[13px] leading-[1.7]">
        <CodeBlockShiki code={code} language="tsx" lineNumbers />
      </CodeBlockContent>
    </CodeBlock>
  );
}

export function TemplatePreviewer({ name, slug }: TemplatePreviewerProps) {
  const [device, setDevice] = React.useState<DeviceSize>("desktop");
  const [viewMode, setViewMode] = React.useState<ViewMode>("preview");
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const { theme } = useTheme();

  // Sync theme to iframe via postMessage whenever theme changes
  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ theme, type: "theme-sync" }, "*");
    }
  }, [theme]);

  // Also sync on iframe load
  const handleIframeLoad = React.useCallback(() => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ theme, type: "theme-sync" }, "*");
    }
  }, [theme]);

  const embedUrl = `/templates/embed/${slug}`;
  const activeConfig =
    DEVICE_CONFIG.find((d) => d.id === device) ?? DEVICE_CONFIG[0];

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Toolbar header */}
      <header className="grid shrink-0 grid-cols-3 items-center border-border border-b bg-card/95 px-4 py-2.5 backdrop-blur-sm">
        {/* Left: Back + Template name */}
        <div className="flex items-center gap-3">
          <Link
            href="/templates"
            className="hover:glow-sm flex items-center justify-center rounded-md border border-border p-2 text-foreground/60 transition-all hover:border-primary hover:text-primary"
            title="Back to templates"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-2">
            <h1 className="font-[family-name:var(--font-orbitron)] font-semibold text-primary text-sm tracking-wider">
              {name}
            </h1>
            <span className="hidden font-mono text-foreground/40 text-xs sm:inline">
              · Template
            </span>
          </div>
        </div>

        {/* Center: Device toggles (only in preview mode) */}
        <div className="flex justify-center">
          {viewMode === "preview" ? (
            <div className="flex items-center gap-1 rounded-lg border border-border bg-background/50 p-1">
              {DEVICE_CONFIG.map((d) => (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => setDevice(d.id)}
                  title={d.label}
                  className={cn(
                    "rounded-md p-1.5 transition-all",
                    device === d.id
                      ? "bg-primary/15 text-primary [box-shadow:0_0_8px_oklch(from_var(--primary)_l_c_h/0.3)]"
                      : "text-foreground/40 hover:text-foreground/70"
                  )}
                >
                  <d.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          ) : (
            <div className="font-mono text-[10px] text-foreground/30 uppercase tracking-widest">
              SOURCE CODE
            </div>
          )}
        </div>

        {/* Right: Preview/Code toggle + Theme switcher + fullscreen */}
        <div className="flex items-center justify-end gap-3">
          {/* Preview / Code toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-background/50 p-1">
            <button
              type="button"
              onClick={() => setViewMode("preview")}
              title="Preview"
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-all",
                viewMode === "preview"
                  ? "bg-primary/15 text-primary [box-shadow:0_0_8px_oklch(from_var(--primary)_l_c_h/0.3)]"
                  : "text-foreground/40 hover:text-foreground/70"
              )}
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("code")}
              title="Code"
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-all",
                viewMode === "code"
                  ? "bg-primary/15 text-primary [box-shadow:0_0_8px_oklch(from_var(--primary)_l_c_h/0.3)]"
                  : "text-foreground/40 hover:text-foreground/70"
              )}
            >
              <Code className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Code</span>
            </button>
          </div>

          <div className="hidden sm:block">
            <ThemeSwitcherCompact />
          </div>
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:glow-sm flex items-center justify-center rounded-md border border-border p-2 text-foreground/60 transition-all hover:border-primary hover:text-primary"
            title="Open in new tab"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Content area */}
      <div className="flex flex-1 overflow-hidden">
        {viewMode === "preview" ? (
          /* Iframe container */
          <div className="flex flex-1 items-start justify-center bg-background/50 p-4">
            <div
              className={cn(
                "h-full w-full transition-all duration-500 ease-in-out",
                activeConfig.maxWidth,
                device !== "desktop" && "mx-auto"
              )}
            >
              <iframe
                ref={iframeRef}
                src={embedUrl}
                onLoad={handleIframeLoad}
                className={cn(
                  "h-full w-full border border-border bg-background",
                  device === "desktop" ? "rounded-lg" : "rounded-xl"
                )}
                title={`${name} template preview`}
              />
            </div>
          </div>
        ) : (
          /* Code viewer */
          <div className="flex-1 overflow-hidden">
            <TemplateCodeViewer slug={slug} />
          </div>
        )}
      </div>
    </div>
  );
}
