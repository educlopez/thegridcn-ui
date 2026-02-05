"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MapMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  variant?: "default" | "primary" | "danger" | "highlight"
  coordinates?: string
  showBeam?: boolean
}

export function MapMarker({
  label,
  variant = "default",
  coordinates,
  showBeam = false,
  className,
  ...props
}: MapMarkerProps) {
  const variantStyles = {
    default: {
      bg: "bg-muted/80",
      border: "border-muted-foreground/50",
      text: "text-foreground",
    },
    primary: {
      bg: "bg-cyan-500/20",
      border: "border-cyan-500",
      text: "text-cyan-500",
    },
    danger: {
      bg: "bg-red-500/20",
      border: "border-red-500",
      text: "text-red-500",
    },
    highlight: {
      bg: "bg-primary/20",
      border: "border-primary",
      text: "text-primary",
    },
  }

  const styles = variantStyles[variant]

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)} {...props}>
      {/* Beam effect */}
      {showBeam && (
        <div
          className={cn(
            "absolute bottom-full left-1/2 h-32 w-0.5 -translate-x-1/2",
            variant === "danger" && "bg-gradient-to-t from-red-500 to-transparent",
            variant === "primary" && "bg-gradient-to-t from-cyan-500 to-transparent",
            variant === "highlight" && "bg-gradient-to-t from-primary to-transparent",
            variant === "default" && "bg-gradient-to-t from-muted-foreground to-transparent"
          )}
        />
      )}

      {/* Marker label */}
      <div
        data-slot="tron-map-marker"
        data-variant={variant}
        className={cn(
          "relative rounded border px-3 py-1 font-mono text-sm font-bold uppercase tracking-wider",
          styles.bg,
          styles.border,
          styles.text
        )}
      >
        {/* Corner decorations */}
        <div className="absolute -left-px -top-px h-2 w-2 border-l border-t border-current opacity-50" />
        <div className="absolute -right-px -top-px h-2 w-2 border-r border-t border-current opacity-50" />
        <div className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-current opacity-50" />
        <div className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-current opacity-50" />

        {label}
      </div>

      {/* Pointer */}
      <div
        className={cn(
          "h-4 w-0.5",
          variant === "danger" && "bg-red-500",
          variant === "primary" && "bg-cyan-500",
          variant === "highlight" && "bg-primary",
          variant === "default" && "bg-muted-foreground"
        )}
      />

      {/* Dot */}
      <div
        className={cn(
          "h-2 w-2 rounded-full",
          variant === "danger" && "bg-red-500",
          variant === "primary" && "bg-cyan-500",
          variant === "highlight" && "bg-primary",
          variant === "default" && "bg-muted-foreground"
        )}
      />

      {/* Coordinates */}
      {coordinates && (
        <div className="mt-1 font-mono text-[10px] text-foreground/80">
          {coordinates}
        </div>
      )}
    </div>
  )
}
