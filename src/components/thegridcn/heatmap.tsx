"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface HeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  columnLabels?: string[];
  data: number[][];
  label?: string;
  rowLabels?: string[];
  variant?: "default" | "success" | "warning" | "danger";
}

const variantBase: Record<string, { low: string; high: string }> = {
  danger: {
    high: "bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.5)]",
    low: "bg-red-500/10",
  },
  default: {
    high: "bg-primary shadow-[0_0_4px_var(--primary)]",
    low: "bg-primary/10",
  },
  success: {
    high: "bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.5)]",
    low: "bg-green-500/10",
  },
  warning: {
    high: "bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.5)]",
    low: "bg-amber-500/10",
  },
};

export function Heatmap({
  data,
  rowLabels,
  columnLabels,
  variant = "default",
  label,
  className,
  ...props
}: HeatmapProps) {
  const allValues = data.flat();
  const maxVal = Math.max(...allValues, 1);

  // Staggered cell reveal
  const [revealedRow, setRevealedRow] = React.useState(-1);
  React.useEffect(() => {
    let row = 0;
    const interval = setInterval(() => {
      setRevealedRow(row);
      row++;
      if (row >= data.length) {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [data.length]);

  function getCellClass(value: number) {
    const intensity = value / maxVal;
    if (intensity <= 0) {
      return "bg-foreground/5";
    }
    if (intensity < 0.25) {
      return variantBase[variant].low;
    }
    if (intensity < 0.5) {
      return cn(variantBase[variant].low, "opacity-80");
    }
    if (intensity < 0.75) {
      return cn(variantBase[variant].high, "opacity-60");
    }
    return variantBase[variant].high;
  }

  return (
    <div
      data-slot="tron-heatmap"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {label ? (
        <div className="mb-3 text-[10px] text-foreground/60 uppercase tracking-widest">
          {label}
        </div>
      ) : null}

      {/* Column labels */}
      {columnLabels ? (
        <div className="mb-1 flex" style={{ paddingLeft: rowLabels ? 40 : 0 }}>
          {columnLabels.map((col, i) => (
            <div
              key={i}
              className="flex-1 text-center font-mono text-[8px] text-foreground/30 uppercase tracking-widest"
            >
              {col}
            </div>
          ))}
        </div>
      ) : null}

      {/* Grid */}
      <div className="space-y-[2px]">
        {data.map((row, ri) => (
          <div key={ri} className="flex items-center gap-[2px]">
            {rowLabels ? (
              <div className="w-9 shrink-0 text-right font-mono text-[8px] text-foreground/30 uppercase tracking-widest">
                {rowLabels[ri]}
              </div>
            ) : null}
            {row.map((cell, ci) => (
              <div
                key={ci}
                className={cn(
                  "h-4 flex-1 rounded-sm transition-all duration-300",
                  ri <= revealedRow ? getCellClass(cell) : "bg-foreground/5",
                  ri <= revealedRow && "opacity-100",
                  ri > revealedRow && "opacity-0"
                )}
                title={`${cell}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-primary/50 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-primary/50 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-primary/50 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-primary/50 border-r-2 border-b-2" />
    </div>
  );
}
