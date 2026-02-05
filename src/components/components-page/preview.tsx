"use client";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Copy, Check, ChevronDown } from "lucide-react";
import { type ComponentItem, componentSections } from "@/lib/component-data";
import { ComponentPreview } from "./component-preview";
import { ComponentErrorBoundary } from "./error-boundary";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme";

// Complementary colors for each theme (opposite on color wheel for contrast)
const complementaryColors: Record<string, { border: string; bg: string; bgHover: string; text: string; textMuted: string }> = {
  ares: { border: "border-cyan-500/30", bg: "bg-cyan-500/10", bgHover: "hover:bg-cyan-500/20", text: "text-cyan-400", textMuted: "text-cyan-400/70" },
  tron: { border: "border-orange-500/30", bg: "bg-orange-500/10", bgHover: "hover:bg-orange-500/20", text: "text-orange-400", textMuted: "text-orange-400/70" },
  clu: { border: "border-blue-500/30", bg: "bg-blue-500/10", bgHover: "hover:bg-blue-500/20", text: "text-blue-400", textMuted: "text-blue-400/70" },
  athena: { border: "border-purple-500/30", bg: "bg-purple-500/10", bgHover: "hover:bg-purple-500/20", text: "text-purple-400", textMuted: "text-purple-400/70" },
  aphrodite: { border: "border-green-500/30", bg: "bg-green-500/10", bgHover: "hover:bg-green-500/20", text: "text-green-400", textMuted: "text-green-400/70" },
  poseidon: { border: "border-amber-500/30", bg: "bg-amber-500/10", bgHover: "hover:bg-amber-500/20", text: "text-amber-400", textMuted: "text-amber-400/70" },
};

interface PreviewProps {
  component: ComponentItem | null;
}

// Map component IDs to their registry names
function getRegistryName(componentId: string): string {
  // Special cases where registry name differs from component ID
  const specialMappings: Record<string, string> = {
    "alert-banner": "thegridcn-alert",
  };
  return specialMappings[componentId] || componentId;
}

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const packageManagerCommands: Record<PackageManager, string> = {
  pnpm: "pnpm dlx shadcn@latest add",
  npm: "npx shadcn@latest add",
  yarn: "npx shadcn@latest add",
  bun: "bunx shadcn@latest add",
};

function InstallCommand({ componentId }: { componentId: string }) {
  const [copied, setCopied] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [packageManager, setPackageManager] = React.useState<PackageManager>("pnpm");
  const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0 });
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const { theme } = useTheme();
  const colors = complementaryColors[theme] || complementaryColors.tron;

  const registryName = getRegistryName(componentId);
  const command = `${packageManagerCommands[packageManager]} "@thegridcn/${registryName}"`;

  const handleCopy = async () => {
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
      if (buttonRef.current && !buttonRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const packageManagers: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];

  return (
    <div className="flex items-center">
      {/* Package manager selector */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={cn(
          "flex items-center gap-1 rounded-l border border-r-0 px-2 py-1.5 font-mono text-xs transition-all",
          colors.border,
          colors.bg,
          colors.bgHover,
          colors.text
        )}
      >
        {packageManager}
        <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {/* Dropdown rendered via Portal */}
      {isOpen && typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <div
            className={cn(
              "fixed z-[9999] min-w-[80px] overflow-hidden rounded border bg-background shadow-lg shadow-black/20",
              colors.border
            )}
            style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
          >
            {packageManagers.map((pm) => (
              <button
                key={pm}
                onClick={() => handleSelect(pm)}
                className={cn(
                  "block w-full px-3 py-1.5 text-left font-mono text-xs transition-colors",
                  colors.textMuted,
                  colors.bgHover,
                  pm === packageManager && cn(colors.bg, colors.text)
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
        className={cn(
          "group flex items-center gap-2 rounded-r border px-3 py-1.5 font-mono text-xs transition-all",
          colors.border,
          colors.bg,
          colors.bgHover,
          colors.textMuted
        )}
      >
        <code className="whitespace-nowrap">{command}</code>
        {copied ? (
          <Check className={cn("h-3.5 w-3.5 shrink-0", colors.text)} />
        ) : (
          <Copy className="h-3.5 w-3.5 shrink-0 opacity-50 group-hover:opacity-100" />
        )}
      </button>
    </div>
  );
}

export function Preview({ component }: PreviewProps) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="relative mx-auto flex h-full w-full flex-col rounded-lg border border-primary/20 bg-background/50 ring-1 ring-primary/10">
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-background/80 to-background/40" />

        {component ? (
          <div className="relative z-10 flex h-full min-h-0 flex-col">
            <div className="flex shrink-0 flex-col gap-2 border-b border-primary/20 bg-primary/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <div className="shrink-0">
                <h3 className="font-mono text-sm font-semibold tracking-wider text-primary">
                  {component.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {componentSections[component.type]?.title}
                </p>
              </div>
              <InstallCommand componentId={component.id} />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <ComponentErrorBoundary>
                <ComponentPreview component={component} />
              </ComponentErrorBoundary>
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 font-mono text-[10px] tracking-widest text-muted-foreground">
              [ NO COMPONENT SELECTED ]
            </div>
            <p className="text-sm text-muted-foreground">
              Select a component from the sidebar to preview it here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
