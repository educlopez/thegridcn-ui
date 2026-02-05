"use client"

import { cn } from "@/lib/utils"

interface RegenIndicatorProps {
  className?: string
}

export function RegenIndicator({ className }: RegenIndicatorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 font-mono text-sm tracking-widest text-cyan-500",
        className
      )}
    >
      <span className="animate-pulse">&gt;&gt;&gt;</span>
      <span>REGEN</span>
      <span className="animate-pulse">&lt;&lt;&lt;</span>
    </div>
  )
}
