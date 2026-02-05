"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TheGridcnLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function TheGridcnLogo({ size = "md", className }: TheGridcnLogoProps) {
  const sizeClasses = {
    sm: {
      text: "text-sm",
      padding: "px-3 py-1.5",
      corner: "h-2 w-2",
      inset: "-inset-1.5",
    },
    md: {
      text: "text-lg",
      padding: "px-4 py-2",
      corner: "h-2.5 w-2.5",
      inset: "-inset-2",
    },
    lg: {
      text: "text-xl",
      padding: "px-5 py-2.5",
      corner: "h-3 w-3",
      inset: "-inset-2.5",
    },
  }

  const s = sizeClasses[size]

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Border frame */}
      <div className={cn("absolute border border-primary/30", s.inset)}>
        {/* Corner accents */}
        <div className={cn("absolute -left-px -top-px border-l border-t border-primary", s.corner)} />
        <div className={cn("absolute -right-px -top-px border-r border-t border-primary", s.corner)} />
        <div className={cn("absolute -bottom-px -left-px border-b border-l border-primary", s.corner)} />
        <div className={cn("absolute -bottom-px -right-px border-b border-r border-primary", s.corner)} />
      </div>
      {/* Logo text */}
      <span className={cn("font-display font-bold tracking-wider text-primary", s.text, s.padding)}>
        THE GRIDCN
      </span>
    </div>
  )
}
