"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface VideoProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  currentTime?: string
  endTime?: string
  progress?: number
  markers?: { position: number; label?: string }[]
}

export function VideoProgress({
  currentTime = "01:23:45",
  endTime = "02:15:30",
  progress = 58,
  markers = [],
  className,
  ...props
}: VideoProgressProps) {
  return (
    <div className={cn("font-mono", className)} {...props}>
      {/* Timeline bar */}
      <div className="relative h-1 w-full overflow-hidden bg-muted/30">
        {/* Progress */}
        <div
          className="h-full bg-gradient-to-r from-primary/80 to-primary"
          style={{ width: `${progress}%` }}
        />

        {/* Current position indicator */}
        <div
          data-slot="tron-progress-indicator"
          className="absolute top-0 h-full w-0.5 bg-foreground"
          style={{ left: `${progress}%` }}
        />

        {/* Markers */}
        {markers.map((marker, i) => (
          <div
            key={i}
            className="absolute top-0 h-full w-px bg-amber-500/80"
            style={{ left: `${marker.position}%` }}
          />
        ))}
      </div>

      {/* Timestamps */}
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-primary">{currentTime}</span>
        <span className="text-foreground/80">{endTime}</span>
      </div>
    </div>
  )
}
