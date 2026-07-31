"use client";

import * as React from "react";
import { CopyButton } from "@/components/thegridcn/copy-button";
import { cn } from "@/lib/utils";

type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

interface InstallCommandProps extends React.HTMLAttributes<HTMLDivElement> {
  command?: string;
  packageManager?: PackageManager | "auto";
  packageName: string;
}

const managerCommands: Record<PackageManager, string> = {
  bun: "bun add",
  npm: "npm install",
  pnpm: "pnpm add",
  yarn: "yarn add",
};

const allManagers: PackageManager[] = ["npm", "yarn", "pnpm", "bun"];

export function InstallCommand({
  packageName,
  packageManager = "auto",
  command,
  className,
  ...props
}: InstallCommandProps) {
  const [activeManager, setActiveManager] = React.useState<PackageManager>(
    packageManager === "auto" ? "npm" : packageManager
  );

  const showTabs = packageManager === "auto";

  const fullCommand = command
    ? command
    : `${managerCommands[activeManager]} ${packageName}`;

  return (
    <div
      data-slot="tron-install-command"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-2 w-2 border-primary/40 border-t border-l" />
      <div className="pointer-events-none absolute top-0 right-0 h-2 w-2 border-primary/40 border-t border-r" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-primary/40 border-b border-l" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-2 w-2 border-primary/40 border-r border-b" />

      {/* Package manager tabs */}
      {showTabs && (
        <div className="relative flex border-primary/15 border-b">
          {allManagers.map((manager) => (
            <button
              key={manager}
              type="button"
              onClick={() => setActiveManager(manager)}
              className={cn(
                "relative px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest transition-all",
                activeManager === manager
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/40 hover:text-foreground/60"
              )}
            >
              {manager}
              {activeManager === manager && (
                <div className="absolute right-0 bottom-0 left-0 h-px bg-primary/60 shadow-[0_0_4px_rgba(var(--primary-rgb,0,180,255),0.3)]" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Command display */}
      <div className="relative flex items-center gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="shrink-0 font-mono text-foreground/30 text-xs">
            $
          </span>
          <code className="min-w-0 flex-1 truncate font-mono text-foreground/70 text-xs">
            {fullCommand}
          </code>
        </div>
        <CopyButton
          value={fullCommand}
          variant="ghost"
          size="sm"
          className="shrink-0"
        />
      </div>

      {/* Bottom glow */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
