"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

export interface ArrivalPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  subtitle?: string;
  time: string;
  title: string;
  unit?: string;
}

export function ArrivalPanel({
  title,
  subtitle,
  time,
  unit = "MINUTES",
  className,
  ...props
}: ArrivalPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Dot pattern decoration left */}
      <div className="absolute top-1/2 left-2 grid -translate-y-1/2 grid-cols-2 gap-1">
        {[...new Array(6)].map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-primary/30" />
        ))}
      </div>

      {/* Dot pattern decoration right */}
      <div className="absolute top-1/2 right-2 grid -translate-y-1/2 grid-cols-2 gap-1">
        {[...new Array(6)].map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-primary/30" />
        ))}
      </div>

      <div className="px-12 py-4 text-center">
        {subtitle ? (
          <div className="mb-1 font-mono text-[9px] text-foreground/80 tracking-widest">
            {subtitle}
          </div>
        ) : null}
        <div className="font-mono text-foreground text-sm tracking-wider">
          {title}
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span
            data-slot="tron-arrival-time"
            className="bg-red-500/90 px-4 py-1 font-bold font-mono text-white text-xl tracking-wider"
          >
            {time}
          </span>
          <span className="font-mono text-foreground text-sm tracking-wider">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}
