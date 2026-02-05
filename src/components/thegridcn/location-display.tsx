"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface LocationDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  sector?: string
  grid?: string
  coordinates?: string
  status?: string
}

export function LocationDisplay({
  sector = "SECTOR 7G",
  grid = "GRID 12-A",
  coordinates = "X: 847.23 Y: 129.45",
  status = "ACTIVE",
  className,
  ...props
}: LocationDisplayProps) {
  return (
    <div className={cn("font-mono text-[10px] tracking-widest", className)} {...props}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
          <span className="text-cyan-500">{sector}</span>
        </div>
        <span className="text-foreground/80">|</span>
        <span className="text-foreground/80">{grid}</span>
        <span className="text-foreground/80">|</span>
        <span className="text-foreground/80">{coordinates}</span>
        <span className="text-foreground/80">|</span>
        <span className="text-green-500">{status}</span>
      </div>
    </div>
  )
}
