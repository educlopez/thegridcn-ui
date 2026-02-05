"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Copy, Check, ChevronDown, Code, Eye } from "lucide-react";
import { type ComponentItem } from "@/lib/component-data";
import { AnomalyBanner } from "@/components/thegridcn";
import { ComponentPreview } from "./component-preview";
import { ComponentErrorBoundary } from "./error-boundary";
import { cn } from "@/lib/utils";

type ViewMode = "preview" | "code";

interface PreviewProps {
  component: ComponentItem | null;
}

// Map component IDs to their registry names
function getRegistryName(componentId: string): string | null {
  // Special cases where registry name differs from component ID
  const specialMappings: Record<string, string> = {
    "alert-banner": "thegridcn-alert",
  };

  if (specialMappings[componentId]) {
    return specialMappings[componentId];
  }

  // Standard shadcn components have -example suffix in ID but not in registry
  if (componentId.endsWith("-example")) {
    return componentId.replace(/-example$/, "");
  }

  return componentId;
}

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const packageManagerCommands: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "yarn shadcn@latest add",
  bun: "bunx --bun shadcn@latest add",
};

// Code viewer component with Shiki syntax highlighting
function CodeViewer({ componentId }: { componentId: string }) {
  const [code, setCode] = React.useState<string | null>(null);
  const [highlightedCode, setHighlightedCode] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const registryName = getRegistryName(componentId);

  // Fetch code and highlight it
  React.useEffect(() => {
    // Handle components without registry files
    if (!registryName) {
      setLoading(false);
      setError("Source code not available for this component");
      return;
    }

    setLoading(true);
    setError(null);
    setHighlightedCode(null);

    fetch(`/r/${registryName}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Component not found");
        return res.json();
      })
      .then(async (data) => {
        if (data.files && data.files[0]?.content) {
          const sourceCode = data.files[0].content;
          setCode(sourceCode);

          // Dynamically import shiki to avoid SSR issues
          const { codeToHtml } = await import("shiki");
          const { tronTheme } = await import("@/lib/shiki-tron-theme");

          const html = await codeToHtml(sourceCode, {
            lang: "tsx",
            theme: tronTheme,
          });

          setHighlightedCode(html);
        } else {
          setError("No source code available");
        }
      })
      .catch((err) => {
        console.error("Failed to load code:", err);
        setError("Failed to load source code");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [registryName]);

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-black">
        <div className="flex items-center gap-2 font-mono text-xs text-foreground/60">
          <div className="h-1.5 w-1.5 animate-pulse bg-primary" />
          Loading source code...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center bg-black">
        <div className="font-mono text-xs text-foreground/60">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col bg-black">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded border border-primary/30 bg-black/80 px-2 py-1 font-mono text-[10px] text-primary transition-all hover:bg-primary/20"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3" />
            COPIED
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" />
            COPY
          </>
        )}
      </button>

      {/* Code display with Shiki highlighting */}
      <div
        className="shiki-code h-full overflow-auto p-4 text-sm leading-relaxed [&_pre]:!bg-transparent [&_code]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: highlightedCode || "" }}
      />
    </div>
  );
}

function InstallCommand({ componentId }: { componentId: string }) {
  const [copied, setCopied] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [packageManager, setPackageManager] = React.useState<PackageManager>("pnpm");
  const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0 });
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const registryName = getRegistryName(componentId);
  const command = registryName
    ? `${packageManagerCommands[packageManager]} @thegridcn/${registryName}`
    : "";

  const handleCopy = async () => {
    if (!command) return;
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelect = (pm: PackageManager) => {
    setPackageManager(pm);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const packageManagers: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

  // Don't show install command for components without registry
  if (!registryName) {
    return (
      <div className="flex items-center gap-2 rounded border border-foreground/20 bg-foreground/5 px-3 py-1.5 font-mono text-[10px] text-foreground/50">
        <span>PREVIEW ONLY</span>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 max-w-full items-center">
      {/* Package manager selector */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center gap-1 rounded-l border border-r-0 border-primary/30 bg-primary/10 px-2 py-1.5 font-mono text-xs text-primary transition-all hover:bg-primary/20"
      >
        {packageManager}
        <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {/* Dropdown rendered via Portal */}
      {isOpen && typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[9999] min-w-[80px] overflow-hidden rounded border border-primary/30 bg-panel shadow-lg shadow-black/20"
            style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
          >
            {packageManagers.map((pm) => (
              <button
                key={pm}
                onClick={() => handleSelect(pm)}
                className={cn(
                  "block w-full px-3 py-1.5 text-left font-mono text-xs transition-colors hover:bg-primary/20",
                  pm === packageManager
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70"
                )}
              >
                {pm}
              </button>
            ))}
          </div>,
          document.body
        )
      }

      {/* Command display and copy button */}
      <button
        onClick={handleCopy}
        className="group flex min-w-0 flex-1 items-center gap-2 rounded-r border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary/80 transition-all hover:bg-primary/20"
      >
        <code className="truncate">{command}</code>
        {copied ? (
          <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
        ) : (
          <Copy className="h-3.5 w-3.5 shrink-0 opacity-50 group-hover:opacity-100" />
        )}
      </button>
    </div>
  );
}

export function Preview({ component }: PreviewProps) {
  const [viewMode, setViewMode] = React.useState<ViewMode>("preview");

  // Reset to preview when component changes
  React.useEffect(() => {
    setViewMode("preview");
  }, [component?.id]);

  return (
    <div className="relative flex h-full min-w-0 flex-col">
      {/* Component title banner - outside the terminal */}
      {component && (
        <div className="mb-4 shrink-0">
          <AnomalyBanner
            title={component.title}
            animated={false}
            className="scale-75 origin-center"
          />
        </div>
      )}

      <div className="relative mx-auto flex min-h-0 flex-1 w-full min-w-0 flex-col overflow-hidden rounded-lg border border-primary/20 bg-background/50 ring-1 ring-primary/10">
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-background/80 to-background/40" />

        {component ? (
          <div className="relative z-10 flex h-full min-h-0 flex-col">
            {/* Header with bg-panel and CRT effect */}
            <div className="relative shrink-0 border-b border-primary/20 bg-panel px-4 py-3">
              {/* CRT scanline effect */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, var(--primary), var(--primary) 1px, transparent 1px, transparent 3px)",
                }}
              />
              <div className="relative flex flex-wrap items-center gap-3">
                {/* View mode tabs */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewMode("preview")}
                    className={cn(
                      "flex items-center gap-1.5 rounded px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all",
                      viewMode === "preview"
                        ? "bg-primary/20 text-primary"
                        : "text-foreground/60 hover:bg-primary/10 hover:text-foreground"
                    )}
                  >
                    <Eye className="h-3 w-3" />
                    Preview
                  </button>
                  <button
                    onClick={() => setViewMode("code")}
                    className={cn(
                      "flex items-center gap-1.5 rounded px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all",
                      viewMode === "code"
                        ? "bg-primary/20 text-primary"
                        : "text-foreground/60 hover:bg-primary/10 hover:text-foreground"
                    )}
                  >
                    <Code className="h-3 w-3" />
                    Code
                  </button>
                </div>

                {/* Install command - pushed to the right */}
                <div className="ml-auto">
                  <InstallCommand componentId={component.id} />
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="min-h-0 flex-1 overflow-hidden">
              {viewMode === "preview" ? (
                <div className="h-full overflow-y-auto p-6">
                  <ComponentErrorBoundary>
                    <ComponentPreview component={component} />
                  </ComponentErrorBoundary>
                </div>
              ) : (
                <CodeViewer componentId={component.id} />
              )}
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 font-mono text-[10px] tracking-widest text-foreground/80">
              [ NO COMPONENT SELECTED ]
            </div>
            <p className="text-sm text-foreground/80">
              Select a component from the sidebar to preview it here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
