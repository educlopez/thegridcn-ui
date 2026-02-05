"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ArrivalPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  time: string
  unit?: string
}

export function ArrivalPanel({
  title,
  subtitle,
  time,
  unit = "MINUTES",
  className,
  ...props
}: ArrivalPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Dot pattern decoration left */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-primary/30" />
        ))}
      </div>

      {/* Dot pattern decoration right */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-primary/30" />
        ))}
      </div>

      <div className="px-12 py-4 text-center">
        {subtitle && (
          <div className="mb-1 font-mono text-[9px] tracking-widest text-foreground/80">
            {subtitle}
          </div>
        )}
        <div className="font-mono text-sm tracking-wider text-foreground">
          {title}
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span
            data-slot="tron-arrival-time"
            className="bg-red-500/90 px-4 py-1 font-mono text-xl font-bold tracking-wider text-white"
          >
            {time}
          </span>
          <span className="font-mono text-sm tracking-wider text-foreground">
            {unit}
          </span>
        </div>
      </div>
    </div>
  )
}
