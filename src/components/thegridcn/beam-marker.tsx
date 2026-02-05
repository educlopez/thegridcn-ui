"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface BeamMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  sublabel?: string
  beamColor?: "red" | "cyan" | "amber" | "primary"
  coordinates?: string
  beamHeight?: number
}

const colorStyles = {
  red: {
    beam: "from-red-500 to-transparent",
    bg: "bg-red-500/90",
    line: "bg-red-500",
  },
  cyan: {
    beam: "from-cyan-500 to-transparent",
    bg: "bg-cyan-500/90",
    line: "bg-cyan-500",
  },
  amber: {
    beam: "from-amber-500 to-transparent",
    bg: "bg-amber-500/90",
    line: "bg-amber-500",
  },
  primary: {
    beam: "from-primary to-transparent",
    bg: "bg-primary/90",
    line: "bg-primary",
  },
}

export function BeamMarker({
  label,
  sublabel,
  beamColor = "red",
  coordinates,
  beamHeight = 96,
  className,
  ...props
}: BeamMarkerProps) {
  const colors = colorStyles[beamColor]

  return (
    <div className={cn("relative flex flex-col items-center", className)} {...props}>
      {/* Vertical beam */}
      <div
        className={cn("w-0.5 bg-gradient-to-t", colors.beam)}
        style={{ height: beamHeight, filter: "blur(1px)" }}
      />

      {/* Label box */}
      <div
        data-slot="tron-beam-marker"
        data-color={beamColor}
        className={cn(
          "relative px-4 py-1 font-mono text-sm font-bold tracking-wider text-white",
          colors.bg
        )}
      >
        {label}
        {/* Corner brackets */}
        <div className="absolute -left-1 -top-1 h-2 w-2 border-l border-t border-white/50" />
        <div className="absolute -right-1 -top-1 h-2 w-2 border-r border-t border-white/50" />
        <div className="absolute -bottom-1 -left-1 h-2 w-2 border-b border-l border-white/50" />
        <div className="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-white/50" />
      </div>

      {/* Sublabel */}
      {sublabel && (
        <div className="mt-1 font-mono text-[9px] tracking-widest text-foreground/80">
          {sublabel}
        </div>
      )}

      {/* Pointer line */}
      <div className={cn("h-4 w-0.5", colors.line)} />

      {/* Coordinates */}
      {coordinates && (
        <div className="mt-1 font-mono text-[8px] text-foreground/80">
          {coordinates}
        </div>
      )}
    </div>
  )
}
