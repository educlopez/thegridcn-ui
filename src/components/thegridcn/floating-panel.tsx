"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

export interface FloatingPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  data?: { label: string; value: string }[];
  position?: "left" | "right";
  subtitle?: string;
  title: string;
}

export function FloatingPanel({
  title,
  subtitle,
  position = "left",
  data = [],
  className,
  children,
  ...props
}: FloatingPanelProps) {
  return (
    <div
      data-slot="tron-floating-panel"
      className={cn(
        "relative w-64 border border-primary/30 bg-background/80 backdrop-blur-md",
        position === "right" && "text-right",
        className
      )}
      {...props}
    >
      {/* Corner decorations */}
      <div
        className={cn(
          "pointer-events-none absolute h-4 w-4 border-primary/60",
          position === "left"
            ? "top-0 left-0 border-t-2 border-l-2"
            : "top-0 right-0 border-t-2 border-r-2"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute h-4 w-4 border-primary/60",
          position === "left"
            ? "bottom-0 left-0 border-b-2 border-l-2"
            : "right-0 bottom-0 border-r-2 border-b-2"
        )}
      />

      {/* Header */}
      <div className="border-primary/20 border-b px-4 py-2">
        {subtitle ? (
          <div className="font-mono text-[9px] text-foreground/80 tracking-[0.3em]">
            {subtitle}
          </div>
        ) : null}
        <div className="font-bold font-mono text-primary text-sm tracking-wider">
          {title}
        </div>
      </div>

      {/* Data rows */}
      {data.length > 0 && (
        <div className="space-y-1 p-4">
          {data.map((item, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center justify-between font-mono text-[10px]",
                position === "right" && "flex-row-reverse"
              )}
            >
              <span className="text-foreground/80 tracking-widest">
                {item.label}
              </span>
              <span className="text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Custom content */}
      {children ? <div className="p-4 pt-0">{children}</div> : null}

      {/* Bottom accent line */}
      <div
        className={cn(
          "absolute bottom-0 h-0.5 w-1/2 bg-primary",
          position === "left" ? "left-0" : "right-0"
        )}
      />
    </div>
  );
}
