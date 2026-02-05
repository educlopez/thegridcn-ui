"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TheGridcnLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  showIcon?: boolean
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("text-primary", className)}
      style={{ filter: "drop-shadow(0 0 4px currentColor)" }}
    >
      {/* Grid pattern */}
      <g opacity="0.3" stroke="currentColor" strokeWidth="0.5">
        <line x1="0" y1="8" x2="32" y2="8" />
        <line x1="0" y1="16" x2="32" y2="16" />
        <line x1="0" y1="24" x2="32" y2="24" />
        <line x1="8" y1="0" x2="8" y2="32" />
        <line x1="16" y1="0" x2="16" y2="32" />
        <line x1="24" y1="0" x2="24" y2="32" />
      </g>

      {/* Central circuit pattern */}
      <g stroke="currentColor" strokeWidth="1.5">
        {/* Outer square */}
        <rect x="8" y="8" width="16" height="16" rx="1" />

        {/* Inner cross */}
        <line x1="16" y1="10" x2="16" y2="22" />
        <line x1="10" y1="16" x2="22" y2="16" />

        {/* Corner connectors */}
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
        <circle cx="24" cy="8" r="1.5" fill="currentColor" />
        <circle cx="8" cy="24" r="1.5" fill="currentColor" />
        <circle cx="24" cy="24" r="1.5" fill="currentColor" />

        {/* Center node */}
        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.8" />
      </g>

      {/* Corner accent lines */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.6">
        <line x1="2" y1="2" x2="6" y2="2" />
        <line x1="2" y1="2" x2="2" y2="6" />
        <line x1="30" y1="2" x2="26" y2="2" />
        <line x1="30" y1="2" x2="30" y2="6" />
        <line x1="2" y1="30" x2="6" y2="30" />
        <line x1="2" y1="30" x2="2" y2="26" />
        <line x1="30" y1="30" x2="26" y2="30" />
        <line x1="30" y1="30" x2="30" y2="26" />
      </g>
    </svg>
  )
}

export function TheGridcnLogo({ size = "md", className, showIcon = true }: TheGridcnLogoProps) {
  const sizeClasses = {
    sm: {
      text: "text-sm",
      icon: "h-5 w-5",
      gap: "gap-2",
    },
    md: {
      text: "text-lg",
      icon: "h-6 w-6",
      gap: "gap-2.5",
    },
    lg: {
      text: "text-xl",
      icon: "h-7 w-7",
      gap: "gap-3",
    },
  }

  const s = sizeClasses[size]

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      {showIcon && <GridIcon className={s.icon} />}
      <span className={cn("font-display font-bold tracking-wider text-primary", s.text)}>
        THE GRIDCN
      </span>
    </div>
  )
}
