"use client"

import { cn } from "@/lib/utils"

interface SpeedIndicatorProps {
  speed: number
  maxSpeed?: number
  className?: string
}

export function SpeedIndicator({
  speed,
  maxSpeed = 200,
  className,
}: SpeedIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-mono text-3xl font-bold text-primary">{speed}</span>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-foreground/80">
          KM/H
        </span>
        <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${(speed / maxSpeed) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
