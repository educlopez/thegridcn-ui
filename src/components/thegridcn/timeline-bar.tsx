"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TimelineBarProps extends React.HTMLAttributes<HTMLDivElement> {
  markers: { id: string; position: number; active?: boolean }[]
  progress: number
  leftLabel?: string
  rightLabel?: string
}

export function TimelineBar({
  markers,
  progress,
  leftLabel,
  rightLabel,
  className,
  ...props
}: TimelineBarProps) {
  return (
    <div className={cn("font-mono", className)} {...props}>
      {/* Main bar */}
      <div className="relative h-6 border border-border/50 bg-card/30">
        {/* Progress fill */}
        <div
          className="absolute left-0 top-0 h-full bg-primary/20"
          style={{ width: `${progress}%` }}
        />

        {/* Progress indicator (red line) */}
        <div
          data-slot="tron-progress-indicator"
          className="absolute top-0 h-full w-1 bg-red-500"
          style={{ left: `${progress}%` }}
        />

        {/* Markers */}
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="absolute top-0 flex h-full flex-col items-center justify-center"
            style={{ left: `${marker.position}%` }}
          >
            <div
              className={cn(
                "h-3 w-px",
                marker.active ? "bg-primary" : "bg-foreground/50"
              )}
            />
            <span className="absolute -bottom-4 text-[8px] text-foreground/80">
              {marker.id}
            </span>
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="mt-1 flex items-center justify-between text-[9px] text-foreground/80">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  )
}
