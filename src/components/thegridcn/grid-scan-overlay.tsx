"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface GridScanOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  gridSize?: number
  scanSpeed?: number
}

export function GridScanOverlay({
  gridSize = 100,
  scanSpeed = 8,
  className,
  ...props
}: GridScanOverlayProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      {/* Horizontal scan lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, var(--primary), var(--primary) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* Large grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Moving scan line */}
      <div
        className="absolute left-0 h-px w-full bg-primary/30"
        style={{
          animation: `tron-vertical-scan ${scanSpeed}s linear infinite`,
        }}
      />

      <style jsx>{`
        @keyframes tron-vertical-scan {
          0% { top: -1px; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  )
}
