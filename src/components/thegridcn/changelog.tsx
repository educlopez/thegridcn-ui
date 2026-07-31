"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ChangelogEntry {
  date: string;
  description?: string;
  title: string;
  type?: "feature" | "fix" | "improvement" | "breaking";
  version: string;
}

interface ChangelogProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: ChangelogEntry[];
  label?: string;
}

const typeConfig: Record<
  string,
  { label: string; color: string; glow: string }
> = {
  breaking: {
    color: "bg-red-500/80 text-white",
    glow: "shadow-[0_0_6px_rgba(239,68,68,0.4)]",
    label: "BRK",
  },
  feature: {
    color: "bg-primary text-primary-foreground",
    glow: "shadow-[0_0_6px_var(--primary)]",
    label: "NEW",
  },
  fix: {
    color: "bg-green-500/80 text-white",
    glow: "shadow-[0_0_6px_rgba(34,197,94,0.4)]",
    label: "FIX",
  },
  improvement: {
    color: "bg-amber-500/80 text-white",
    glow: "shadow-[0_0_6px_rgba(245,158,11,0.4)]",
    label: "UPD",
  },
};

export function Changelog({
  entries,
  label,
  className,
  ...props
}: ChangelogProps) {
  // Stagger reveal
  const [revealedIdx, setRevealedIdx] = React.useState(-1);
  React.useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setRevealedIdx(idx);
      idx++;
      if (idx >= entries.length) {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [entries.length]);

  return (
    <div
      data-slot="tron-changelog"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 p-5 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {label ? (
        <div className="mb-4 text-[10px] text-foreground/50 uppercase tracking-widest">
          {label}
        </div>
      ) : null}

      <div className="relative space-y-0">
        {entries.map((entry, i) => {
          const config = typeConfig[entry.type || "feature"];
          return (
            <div
              key={i}
              className={cn(
                "relative flex gap-4 pb-6 transition-all duration-400",
                i <= revealedIdx
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              )}
            >
              {/* Timeline line */}
              <div className="relative flex flex-col items-center">
                <div
                  className={cn(
                    "h-2.5 w-2.5 shrink-0 rounded-full",
                    config.color,
                    config.glow,
                    i <= revealedIdx && "animate-pulse"
                  )}
                  style={{ animationDuration: "3s" }}
                />
                {i < entries.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-primary/20" />
                )}
              </div>

              {/* Content */}
              <div className="-mt-0.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 font-bold font-mono text-[9px] uppercase tracking-wider",
                      config.color,
                      config.glow
                    )}
                  >
                    {config.label}
                  </span>
                  <span className="font-mono text-[10px] text-primary/80">
                    v{entry.version}
                  </span>
                  <span className="font-mono text-[9px] text-foreground/30">
                    {entry.date}
                  </span>
                </div>
                <h4 className="mt-1 font-medium font-mono text-foreground/90 text-sm">
                  {entry.title}
                </h4>
                {entry.description ? (
                  <p className="mt-0.5 text-foreground/50 text-xs">
                    {entry.description}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-primary/50 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-primary/50 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-primary/50 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-primary/50 border-r-2 border-b-2" />
    </div>
  );
}
