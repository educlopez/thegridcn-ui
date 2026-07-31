"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface HUDFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function HUDFrame({
  label,
  children,
  className,
  ...props
}: HUDFrameProps) {
  return (
    <div
      data-slot="tron-hud-frame"
      className={cn(
        "relative border border-primary/30 bg-background/50 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Top left corner */}
      <div className="absolute -top-px -left-px h-4 w-4 border-primary border-t-2 border-l-2" />
      {/* Top right corner */}
      <div className="absolute -top-px -right-px h-4 w-4 border-primary border-t-2 border-r-2" />
      {/* Bottom left corner */}
      <div className="absolute -bottom-px -left-px h-4 w-4 border-primary border-b-2 border-l-2" />
      {/* Bottom right corner */}
      <div className="absolute -right-px -bottom-px h-4 w-4 border-primary border-r-2 border-b-2" />

      {/* Label */}
      {label ? (
        <div className="absolute -top-3 left-4 bg-background px-2 text-[10px] text-primary uppercase tracking-widest">
          {label}
        </div>
      ) : null}

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative p-4">{children}</div>
    </div>
  );
}
