"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  variant?: "default" | "glow" | "dashed" | "circuit"
  orientation?: "horizontal" | "vertical"
}

export function Divider({
  label,
  variant = "default",
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  const isHorizontal = orientation === "horizontal"

  if (!isHorizontal) {
    return (
      <div
        data-slot="tron-divider"
        className={cn(
          "relative inline-flex self-stretch",
          variant === "default" && "w-px bg-primary/20",
          variant === "glow" && "w-px bg-primary/30 shadow-[0_0_4px_var(--primary)]",
          variant === "dashed" && "w-px border-l border-dashed border-primary/30",
          variant === "circuit" && "w-px bg-primary/20",
          className
        )}
        {...props}
      >
        {variant === "circuit" && (
          <div
            className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary/60"
            style={{ animation: "dividerDot 3s ease-in-out infinite" }}
          />
        )}
      </div>
    )
  }

  return (
    <div
      data-slot="tron-divider"
      className={cn(
        "relative flex items-center",
        className
      )}
      {...props}
    >
      {/* Left line */}
      <div className={cn(
        "flex-1",
        variant === "default" && "h-px bg-primary/20",
        variant === "glow" && "h-px bg-primary/30 shadow-[0_0_4px_var(--primary)]",
        variant === "dashed" && "border-t border-dashed border-primary/30",
        variant === "circuit" && "h-px bg-primary/20",
      )}>
        {variant === "circuit" && (
          <>
            <div className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary/40" />
            <div
              className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-primary/80"
              style={{ animation: "dividerDot 3s ease-in-out infinite" }}
            />
          </>
        )}
      </div>

      {/* Label */}
      {label && (
        <span className="mx-3 shrink-0 font-mono text-[9px] uppercase tracking-widest text-foreground/30">
          {label}
        </span>
      )}

      {/* Right line */}
      <div className={cn(
        "flex-1",
        variant === "default" && "h-px bg-primary/20",
        variant === "glow" && "h-px bg-primary/30 shadow-[0_0_4px_var(--primary)]",
        variant === "dashed" && "border-t border-dashed border-primary/30",
        variant === "circuit" && "h-px bg-primary/20",
      )}>
        {variant === "circuit" && (
          <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary/40" />
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
  )
}
