"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TronMapMarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  variant?: "default" | "primary" | "danger" | "highlight"
  coordinates?: string
  showBeam?: boolean
}

export function TronMapMarker({
  label,
  variant = "default",
  coordinates,
  showBeam = false,
  className,
  ...props
}: TronMapMarkerProps) {
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
        <div className="mt-1 font-mono text-[10px] text-muted-foreground">
          {coordinates}
        </div>
      )}
    </div>
  )
}

interface TronCoordinateDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: number
  bearing?: string
  latitude?: string
  longitude?: string
  label?: string
}

export function TronCoordinateDisplay({
  heading = 0,
  bearing = "NE",
  latitude,
  longitude,
  label,
  className,
  ...props
}: TronCoordinateDisplayProps) {
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
        <span className="text-xs text-muted-foreground">{`${String(Math.floor(Math.random() * 200)).padStart(3, "0")}`}</span>
        <span className="font-bold text-primary">{bearing}</span>
      </div>

      {/* Lat/Long */}
      {(latitude || longitude) && (
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {latitude && <span>LAT {latitude}</span>}
          {latitude && longitude && <span> · </span>}
          {longitude && <span>LNG {longitude}</span>}
        </div>
      )}

      {/* Label */}
      {label && (
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
      )}
    </div>
  )
}

interface TronRadarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  targets?: { x: number; y: number; label?: string }[]
  sweepEnabled?: boolean
}

export function TronRadar({
  size = 200,
  targets = [],
  sweepEnabled = true,
  className,
  ...props
}: TronRadarProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-full", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {/* Background circles */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          className="stroke-primary/20"
          strokeWidth="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          className="stroke-primary/20"
          strokeWidth="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="22"
          fill="none"
          className="stroke-primary/20"
          strokeWidth="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="10"
          fill="none"
          className="stroke-primary/30"
          strokeWidth="0.5"
        />

        {/* Crosshairs */}
        <line
          x1="50"
          y1="2"
          x2="50"
          y2="98"
          className="stroke-primary/20"
          strokeWidth="0.5"
        />
        <line
          x1="2"
          y1="50"
          x2="98"
          y2="50"
          className="stroke-primary/20"
          strokeWidth="0.5"
        />

        {/* Diagonal lines */}
        <line
          x1="15"
          y1="15"
          x2="85"
          y2="85"
          className="stroke-primary/10"
          strokeWidth="0.5"
        />
        <line
          x1="85"
          y1="15"
          x2="15"
          y2="85"
          className="stroke-primary/10"
          strokeWidth="0.5"
        />

        {/* Center dot */}
        <circle cx="50" cy="50" r="2" className="fill-primary" />

        {/* Targets */}
        {targets.map((target, i) => (
          <g key={i}>
            <circle
              cx={target.x}
              cy={target.y}
              r="3"
              className="fill-red-500"
            />
            <circle
              cx={target.x}
              cy={target.y}
              r="6"
              fill="none"
              className="stroke-red-500/50"
              strokeWidth="1"
            />
          </g>
        ))}
      </svg>

      {/* Sweep effect */}
      {sweepEnabled && (
        <div
          className="absolute inset-0 origin-center animate-spin"
          style={{ animationDuration: "4s" }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-1/2 w-1/2"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, var(--primary) 30deg, transparent 60deg)",
              transformOrigin: "left top",
              opacity: 0.3,
            }}
          />
        </div>
      )}
    </div>
  )
}
