"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CoordinateDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: number
  bearing?: string
  latitude?: string
  longitude?: string
  label?: string
}

export function CoordinateDisplay({
  heading = 0,
  bearing = "NE",
  latitude,
  longitude,
  label,
  className,
  ...props
}: CoordinateDisplayProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-end font-mono text-sm",
        className
      )}
      {...props}
    >
      {/* Heading */}
      <div className="flex items-baseline gap-1">
        <span className="text-lg font-bold text-primary">
          {heading}°
        </span>
        <span className="text-xs text-foreground/80">{`${String(Math.floor(Math.random() * 200)).padStart(3, "0")}`}</span>
        <span className="font-bold text-primary">{bearing}</span>
      </div>

      {/* Lat/Long */}
      {(latitude || longitude) && (
        <div className="text-[10px] uppercase tracking-widest text-foreground/80">
          {latitude && <span>LAT {latitude}</span>}
          {latitude && longitude && <span> · </span>}
          {longitude && <span>LNG {longitude}</span>}
        </div>
      )}

      {/* Label */}
      {label && (
        <div className="text-[10px] uppercase tracking-widest text-foreground/80">
          {label}
        </div>
      )}
    </div>
  )
}
