"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "glow" | "dashed" | "circuit";
}

export function Divider({
  label,
  variant = "default",
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";

  if (!isHorizontal) {
    return (
      <div
        data-slot="tron-divider"
        className={cn(
          "relative inline-flex self-stretch",
          variant === "default" && "w-px bg-primary/20",
          variant === "glow" &&
            "w-px bg-primary/30 shadow-[0_0_4px_var(--primary)]",
          variant === "dashed" &&
            "w-px border-primary/30 border-l border-dashed",
          variant === "circuit" && "w-px bg-primary/20",
          className
        )}
        {...props}
      >
        {variant === "circuit" && (
          <div
            className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary/60"
            style={{ animation: "dividerDot 3s ease-in-out infinite" }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      data-slot="tron-divider"
      className={cn("relative flex items-center", className)}
      {...props}
    >
      {/* Left line */}
      <div
        className={cn(
          "flex-1",
          variant === "default" && "h-px bg-primary/20",
          variant === "glow" &&
            "h-px bg-primary/30 shadow-[0_0_4px_var(--primary)]",
          variant === "dashed" && "border-primary/30 border-t border-dashed",
          variant === "circuit" && "h-px bg-primary/20"
        )}
      >
        {variant === "circuit" && (
          <>
            <div className="absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary/40" />
            <div
              className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-primary/80"
              style={{ animation: "dividerDot 3s ease-in-out infinite" }}
            />
          </>
        )}
      </div>

      {/* Label */}
      {label ? (
        <span className="mx-3 shrink-0 font-mono text-[9px] text-foreground/30 uppercase tracking-widest">
          {label}
        </span>
      ) : null}

      {/* Right line */}
      <div
        className={cn(
          "flex-1",
          variant === "default" && "h-px bg-primary/20",
          variant === "glow" &&
            "h-px bg-primary/30 shadow-[0_0_4px_var(--primary)]",
          variant === "dashed" && "border-primary/30 border-t border-dashed",
          variant === "circuit" && "h-px bg-primary/20"
        )}
      >
        {variant === "circuit" && (
          <div className="absolute top-1/2 right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary/40" />
        )}
      </div>

      <style jsx>{`
        @keyframes dividerDot {
          0% { left: 0%; }
          50% { left: calc(100% - 4px); }
          100% { left: 0%; }
        }
      `}</style>
    </div>
  );
}
