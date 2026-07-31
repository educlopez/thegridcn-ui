"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ActivityFeedItem {
  description?: string;
  icon?: React.ReactNode;
  id: string;
  timestamp: string;
  title: string;
  type?: "default" | "success" | "warning" | "error" | "info";
  user?: string;
}

interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ActivityFeedItem[];
  label?: string;
  maxItems?: number;
  showTimeline?: boolean;
}

const typeConfig: Record<string, { dot: string; glow: string; badge: string }> =
  {
    default: {
      badge: "bg-primary/20 text-primary",
      dot: "bg-primary border-primary/60",
      glow: "shadow-[0_0_6px_var(--primary)]",
    },
    error: {
      badge: "bg-red-500/20 text-red-400",
      dot: "bg-red-500 border-red-500/60",
      glow: "shadow-[0_0_6px_rgba(239,68,68,0.4)]",
    },
    info: {
      badge: "bg-blue-500/20 text-blue-400",
      dot: "bg-blue-500 border-blue-500/60",
      glow: "shadow-[0_0_6px_rgba(59,130,246,0.4)]",
    },
    success: {
      badge: "bg-green-500/20 text-green-400",
      dot: "bg-green-500 border-green-500/60",
      glow: "shadow-[0_0_6px_rgba(34,197,94,0.4)]",
    },
    warning: {
      badge: "bg-amber-500/20 text-amber-400",
      dot: "bg-amber-500 border-amber-500/60",
      glow: "shadow-[0_0_6px_rgba(245,158,11,0.4)]",
    },
  };

export function ActivityFeed({
  items,
  maxItems,
  showTimeline = true,
  label,
  className,
  ...props
}: ActivityFeedProps) {
  const visibleItems = maxItems ? items.slice(0, maxItems) : items;

  // Stagger reveal
  const [revealedIdx, setRevealedIdx] = React.useState(-1);
  React.useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setRevealedIdx(idx);
      idx++;
      if (idx >= visibleItems.length) {
        clearInterval(interval);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [visibleItems.length]);

  return (
    <div
      data-slot="tron-activity-feed"
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
        {visibleItems.map((item, i) => {
          const config = typeConfig[item.type || "default"];
          return (
            <div
              key={item.id}
              className={cn(
                "relative flex gap-4 pb-6 transition-all duration-400",
                i <= revealedIdx
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              )}
            >
              {/* Timeline line + dot */}
              {showTimeline ? (
                <div className="relative flex flex-col items-center">
                  <div
                    className={cn(
                      "relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                      config.dot,
                      config.glow,
                      i === 0 && "animate-pulse"
                    )}
                    style={{ animationDuration: "2s" }}
                  >
                    {item.icon ? (
                      <span className="text-[9px]">{item.icon}</span>
                    ) : null}
                  </div>
                  {i < visibleItems.length - 1 && (
                    <div className="mt-1 w-px flex-1 bg-primary/20" />
                  )}
                </div>
              ) : null}

              {/* Content */}
              <div className={cn("-mt-0.5 flex-1", !showTimeline && "pl-0")}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[9px] text-foreground/30">
                    {item.timestamp}
                  </span>
                  {item.user ? (
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 font-bold font-mono text-[9px] uppercase tracking-wider",
                        config.badge
                      )}
                    >
                      {item.user}
                    </span>
                  ) : null}
                </div>
                <h4 className="mt-1 font-medium font-mono text-foreground/90 text-sm">
                  {item.title}
                </h4>
                {item.description ? (
                  <p className="mt-0.5 text-foreground/50 text-xs leading-relaxed">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {maxItems && items.length > maxItems && (
        <div className="mt-1 text-center font-mono text-[9px] text-foreground/30 uppercase tracking-wider">
          + {items.length - maxItems} more entries
        </div>
      )}

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-primary/50 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-primary/50 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-primary/50 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-primary/50 border-r-2 border-b-2" />
    </div>
  );
}
