"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface Metric {
  change?: string;
  changeType?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}

interface MetricRowProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
  metrics: Metric[];
}

const changeColor: Record<string, string> = {
  down: "text-red-500",
  neutral: "text-foreground/50",
  up: "text-green-500",
};

const changeIcon: Record<string, string> = {
  down: "\u25BC",
  neutral: "\u2014",
  up: "\u25B2",
};

const columnClass: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export function MetricRow({
  metrics,
  columns = 3,
  className,
  ...props
}: MetricRowProps) {
  return (
    <div
      data-slot="tron-metric-row"
      className={cn("grid gap-4", columnClass[columns], className)}
      {...props}
    >
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm"
        >
          {/* Scanline overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

          {/* Glow effect */}
          <div className="pointer-events-none absolute inset-0 rounded shadow-[inset_0_0_20px_rgba(var(--primary),0.05)]" />

          <div className="relative flex items-start gap-3">
            {metric.icon ? (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-primary/20 bg-primary/10 text-primary">
                {metric.icon}
              </div>
            ) : null}

            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-foreground/60 uppercase tracking-widest">
                {metric.label}
              </div>
              <div className="mt-1 font-bold font-mono text-2xl text-foreground tabular-nums">
                {metric.value}
              </div>
              {metric.change && metric.changeType ? (
                <div
                  className={cn(
                    "mt-1 flex items-center gap-1 font-mono text-xs",
                    changeColor[metric.changeType]
                  )}
                >
                  <span>{changeIcon[metric.changeType]}</span>
                  <span>{metric.change}</span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Corner decorations */}
          <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-primary/50 border-t-2 border-l-2" />
          <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-primary/50 border-t-2 border-r-2" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-primary/50 border-b-2 border-l-2" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-primary/50 border-r-2 border-b-2" />
        </div>
      ))}
    </div>
  );
}
