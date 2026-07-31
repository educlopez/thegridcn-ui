"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BentoGridItem {
  description?: string;
  icon?: React.ReactNode;
  span?: "1x1" | "2x1" | "1x2" | "2x2";
  title: string;
  variant?: "default" | "highlight";
}

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  items: BentoGridItem[];
}

const spanMap: Record<string, string> = {
  "1x1": "",
  "1x2": "md:row-span-2",
  "2x1": "md:col-span-2",
  "2x2": "md:col-span-2 md:row-span-2",
};

const colsMap: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export function BentoGrid({
  items,
  columns = 3,
  className,
  ...props
}: BentoGridProps) {
  // Stagger card reveal
  const [revealedIdx, setRevealedIdx] = React.useState(-1);
  React.useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      setRevealedIdx(idx);
      idx++;
      if (idx >= items.length) {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div
      data-slot="tron-bento-grid"
      className={cn("grid grid-cols-1 gap-3", colsMap[columns], className)}
      {...props}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "group relative overflow-hidden rounded border bg-card/80 p-5 backdrop-blur-sm transition-all duration-400",
            item.variant === "highlight"
              ? "border-primary/50 shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.06)]"
              : "border-primary/20",
            spanMap[item.span || "1x1"],
            i <= revealedIdx
              ? "translate-y-0 opacity-100"
              : "translate-y-3 opacity-0"
          )}
        >
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

          {/* Hover glow sweep */}
          <div className="pointer-events-none absolute -inset-px rounded opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/8 to-transparent"
              style={{ animation: "bentoSweep 2s ease-in-out infinite" }}
            />
          </div>

          <div className="relative">
            {item.icon ? (
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary/80">
                {item.icon}
              </div>
            ) : null}
            <h3 className="font-medium font-mono text-foreground/90 text-sm uppercase tracking-wider">
              {item.title}
            </h3>
            {item.description ? (
              <p className="mt-1.5 text-foreground/50 text-xs leading-relaxed">
                {item.description}
              </p>
            ) : null}
          </div>

          {/* Corner decorations */}
          <div className="pointer-events-none absolute top-0 left-0 h-2.5 w-2.5 border-primary/40 border-t border-l transition-all group-hover:h-3.5 group-hover:w-3.5 group-hover:border-primary/60" />
          <div className="pointer-events-none absolute top-0 right-0 h-2.5 w-2.5 border-primary/40 border-t border-r transition-all group-hover:h-3.5 group-hover:w-3.5 group-hover:border-primary/60" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-primary/40 border-b border-l transition-all group-hover:h-3.5 group-hover:w-3.5 group-hover:border-primary/60" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-2.5 w-2.5 border-primary/40 border-r border-b transition-all group-hover:h-3.5 group-hover:w-3.5 group-hover:border-primary/60" />
        </div>
      ))}

      <style jsx>{`
        @keyframes bentoSweep {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
