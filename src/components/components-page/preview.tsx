"use client";

import { Check, ChevronDown, Code, Copy, Eye } from "lucide-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockGroup,
  CodeBlockHeader,
  CodeBlockIcon,
} from "@/components/code-block/code-block";
import { CopyButton } from "@/components/code-block/copy-button";
import { CodeBlockShiki } from "@/components/code-block/shiki";
import { usePrimitive } from "@/components/registry/primitive-provider";
import { PrimitiveSwitcherCompact } from "@/components/registry/primitive-switcher";
import { AnomalyBanner } from "@/components/thegridcn";
import { useTheme } from "@/components/theme";
import type { ComponentItem } from "@/lib/component-data";
import { getRegistryName } from "@/lib/registry-name";
import {
  buildComponentInstallCommand,
  downloadComponentsJson,
} from "@/lib/shadcn-primitive";
import { cn } from "@/lib/utils";
import { ComponentPreview } from "./component-preview";
import { ComponentErrorBoundary } from "./error-boundary";

type ViewMode = "preview" | "code";

interface PreviewProps {
  component: ComponentItem | null;
}

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const packageManagerCommands: Record<PackageManager, string> = {
  bun: "bunx --bun shadcn@latest add",
  npm: "npx shadcn@latest add",
  pnpm: "pnpm dlx shadcn@latest add",
  yarn: "yarn shadcn@latest add",
};

/** Resolve file path from registry data into a short display name */
function getFileName(registryData: { files?: { path?: string }[] }): string {
  const raw = registryData?.files?.[0]?.path ?? "";
  return raw.split("/").pop() || "component.tsx";
}

/** Derive the language extension from a filename (e.g. "modal.tsx" → "tsx") */
function getLanguageFromFileName(name: string): string {
  const ext = name.split(".").pop();
  return ext || "tsx";
}

// Code viewer using pheralb/code-blocks compound components + CodeBlockShiki
function CodeViewer({ componentId }: { componentId: string }) {
  const [code, setCode] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState("component.tsx");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const registryName = getRegistryName(componentId);

  React.useEffect(() => {
    if (!registryName) {
      setLoading(false);
      setError("Source code not available for this component");
      return;
    }

    setLoading(true);
    setError(null);
    setCode(null);

    fetch(`/r/${registryName}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Component not found");
        }
        return res.json();
      })
      .then((data) => {
        if (data.files?.[0]?.content) {
          setCode(data.files[0].content);
          setFileName(getFileName(data));
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

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center bg-black">
        <div className="flex items-center gap-2 font-mono text-foreground/40 text-xs">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          LOADING SOURCE...
        </div>
      </div>
    );
  }

  if (error || !code) {
    return (
      <div className="flex h-full items-center justify-center bg-black">
        <div className="font-mono text-[10px] text-foreground/30 uppercase tracking-widest">
          {error || "No source code available"}
        </div>
      </div>
    );
  }

  const lineCount = code.split("\n").length;
  const language = getLanguageFromFileName(fileName);

  return (
    <CodeBlock className="h-full">
      <CodeBlockHeader>
        <CodeBlockGroup>
          <CodeBlockIcon language={language} />
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
        <CodeBlockShiki code={code} language={language} lineNumbers />
      </CodeBlockContent>
    </CodeBlock>
  );
}

function InstallCommand({ componentId }: { componentId: string }) {
  const [copied, setCopied] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [packageManager, setPackageManager] =
    React.useState<PackageManager>("pnpm");
  const [dropdownPosition, setDropdownPosition] = React.useState({
    left: 0,
    top: 0,
  });
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const { theme, tronIntensity } = useTheme();
  const { primitive } = usePrimitive();

  const registryName = getRegistryName(componentId);
  const extraItems: string[] = [];
  if (theme !== "tron") {
    extraItems.push(`@thegridcn/theme-${theme}`);
  }
  if (tronIntensity !== "light") {
    extraItems.push(`@thegridcn/intensity-${tronIntensity}`);
  }
  const command = registryName
    ? buildComponentInstallCommand(
        packageManagerCommands[packageManager],
        primitive,
        componentId,
        extraItems
      )
    : "";

  const handleCopy = async () => {
    if (!command) {
      return;
    }
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
        left: rect.left,
        top: rect.bottom + 4,
      });
    }
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

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
        type="button"
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center gap-1 rounded-l border border-primary/30 border-r-0 bg-primary/10 px-2 py-1.5 font-mono text-primary text-xs transition-all hover:bg-primary/20"
      >
        {packageManager}
        <ChevronDown
          className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {/* Dropdown rendered via Portal */}
      {isOpen &&
        typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[9999] min-w-[80px] overflow-hidden rounded border border-primary/30 bg-panel shadow-black/20 shadow-lg"
            style={{ left: dropdownPosition.left, top: dropdownPosition.top }}
          >
            {packageManagers.map((pm) => (
              <button
                type="button"
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
        )}

      {/* Command display and copy button */}
      <button
        type="button"
        onClick={handleCopy}
        className="group flex min-w-0 flex-1 items-center gap-2 border border-primary/30 border-r-0 bg-primary/10 px-3 py-1.5 font-mono text-primary/80 text-xs transition-all hover:bg-primary/20"
      >
        <code className="truncate">{command}</code>
        {copied ? (
          <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
        ) : (
          <Copy className="h-3.5 w-3.5 shrink-0 opacity-50 group-hover:opacity-100" />
        )}
      </button>
      <button
        type="button"
        onClick={() => downloadComponentsJson(primitive)}
        className="shrink-0 rounded-r border border-primary/30 bg-primary/10 px-2 py-1.5 font-mono text-[9px] text-primary uppercase tracking-wider transition-all hover:bg-primary/20"
        title="Download components.json"
      >
        JSON
      </button>
    </div>
  );
}

export function Preview({ component }: PreviewProps) {
  const [viewMode, setViewMode] = React.useState<ViewMode>("preview");

  // Reset to preview when component changes
  React.useEffect(() => {
    setViewMode("preview");
  }, []);

  return (
    <div className="relative flex h-full min-w-0 flex-col">
      {/* Component title banner - outside the terminal */}
      {component ? (
        <div className="mb-4 shrink-0">
          <AnomalyBanner
            title={component.title}
            animated={false}
            className="origin-center scale-75"
          />
        </div>
      ) : null}

      <div className="relative mx-auto flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-primary/20 bg-background/50 ring-1 ring-primary/10">
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-background/80 to-background/40" />

        {component ? (
          <div className="relative z-10 flex h-full min-h-0 flex-col">
            {/* Header with bg-panel and CRT effect */}
            <div className="relative shrink-0 border-primary/20 border-b bg-panel px-4 py-3">
              {/* CRT scanline effect */}
              <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />
              <div className="relative flex flex-wrap items-center gap-3">
                {/* View mode tabs */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
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
                    type="button"
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

                <PrimitiveSwitcherCompact />

                {/* Install command - pushed to the right */}
                <div className="ml-auto min-w-0">
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
            <div className="mb-4 font-mono text-[10px] text-foreground/80 tracking-widest">
              [ NO COMPONENT SELECTED ]
            </div>
            <p className="text-foreground/80 text-sm">
              Select a component from the sidebar to preview it here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
