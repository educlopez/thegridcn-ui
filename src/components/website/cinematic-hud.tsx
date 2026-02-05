"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Large movie-style "ANOMALY FOUND" banner
interface AnomalyBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  animated?: boolean
}

export function AnomalyBanner({
  title = "ANOMALY FOUND",
  subtitle,
  animated = true,
  className,
  ...props
}: AnomalyBannerProps) {
  return (
    <div className={cn("relative w-full", className)} {...props}>
      {/* Top line with brackets */}
      <div className="flex items-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
        <span className="px-4 font-mono text-[10px] tracking-[0.5em] text-amber-500/70">
          [ ALERT ]
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
      </div>

      {/* Main content */}
      <div className="relative my-4 overflow-hidden">
        {/* Scan line effect */}
        {animated && (
          <div
            className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent"
            style={{
              animation: "scan 2s linear infinite",
            }}
          />
        )}

        <div className="text-center">
          {subtitle && (
            <div className="mb-2 font-mono text-sm tracking-[0.3em] text-amber-500/60">
              {subtitle}
            </div>
          )}
          <h2
            className={cn(
              "font-display text-4xl font-black tracking-[0.2em] text-amber-500 md:text-5xl lg:text-6xl",
              animated && "animate-pulse"
            )}
            style={{
              textShadow: "0 0 40px rgba(245, 158, 11, 0.5), 0 0 80px rgba(245, 158, 11, 0.3)",
            }}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Bottom line */}
      <div className="flex items-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
        <div className="mx-4 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 w-1.5 bg-amber-500",
                animated && "animate-pulse",
                i % 2 === 0 ? "opacity-100" : "opacity-50"
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  )
}

// Movie-style elapsed timer with large numbers
interface CinematicTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  hours?: number
  minutes?: number
  seconds?: number
  label?: string
  variant?: "elapsed" | "countdown" | "timestamp"
}

export function CinematicTimer({
  hours = 4,
  minutes = 27,
  seconds = 53,
  label = "ELAPSED",
  variant = "elapsed",
  className,
  ...props
}: CinematicTimerProps) {
  const formatNumber = (n: number) => String(n).padStart(2, "0")

  const variantColors = {
    elapsed: "text-foreground",
    countdown: "text-red-500",
    timestamp: "text-primary",
  }

  return (
    <div className={cn("font-mono", className)} {...props}>
      <div className="flex items-baseline">
        <span
          className={cn(
            "text-5xl font-light tracking-[0.1em] md:text-7xl lg:text-8xl",
            variantColors[variant]
          )}
          style={{
            textShadow:
              variant === "elapsed"
                ? "0 0 30px rgba(255, 255, 255, 0.2)"
                : variant === "countdown"
                ? "0 0 30px rgba(239, 68, 68, 0.4)"
                : "0 0 30px var(--primary)",
          }}
        >
          {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}
        </span>
        <span className="ml-4 text-xl tracking-[0.3em] text-muted-foreground md:text-2xl">
          {label}
        </span>
      </div>
    </div>
  )
}

// HUD corner frame overlay
interface HUDCornerFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  size?: number
}

export function HUDCornerFrame({
  position,
  size = 60,
  className,
  ...props
}: HUDCornerFrameProps) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }

  const borderClasses = {
    "top-left": "border-l-2 border-t-2",
    "top-right": "border-r-2 border-t-2",
    "bottom-left": "border-l-2 border-b-2",
    "bottom-right": "border-r-2 border-b-2",
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute border-primary/60",
        positionClasses[position],
        borderClasses[position],
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    />
  )
}

// Video player style progress bar with timestamp
interface VideoProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  currentTime?: string
  endTime?: string
  progress?: number
  markers?: { position: number; label: string }[]
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
          className="absolute top-0 h-full w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
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
        <span className="text-muted-foreground">{endTime}</span>
      </div>
    </div>
  )
}

// Horizontal status bar with bracket decorations
interface StatusStripProps extends React.HTMLAttributes<HTMLDivElement> {
  items: { label: string; value: string; highlighted?: boolean }[]
  variant?: "default" | "primary" | "accent"
}

export function StatusStrip({
  items,
  variant = "default",
  className,
  ...props
}: StatusStripProps) {
  const variantStyles = {
    default: "border-border/50 bg-background/50",
    primary: "border-primary/30 bg-primary/5",
    accent: "border-amber-500/30 bg-amber-500/5",
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between border-y px-4 py-2 backdrop-blur-sm",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 font-mono text-[10px] tracking-widest">
          <span className="text-muted-foreground">{item.label}:</span>
          <span
            className={cn(
              item.highlighted ? "text-primary" : "text-foreground"
            )}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

// Floating data panel like in the movie analysis view
interface FloatingPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  position?: "left" | "right"
  data?: { label: string; value: string }[]
}

export function FloatingPanel({
  title,
  subtitle,
  position = "left",
  data = [],
  className,
  children,
  ...props
}: FloatingPanelProps) {
  return (
    <div
      className={cn(
        "relative w-64 border border-primary/30 bg-background/80 backdrop-blur-md",
        position === "right" && "text-right",
        className
      )}
      {...props}
    >
      {/* Corner decorations */}
      <HUDCornerFrame position={position === "left" ? "top-left" : "top-right"} size={16} />
      <HUDCornerFrame position={position === "left" ? "bottom-left" : "bottom-right"} size={16} />

      {/* Header */}
      <div className="border-b border-primary/20 px-4 py-2">
        {subtitle && (
          <div className="font-mono text-[9px] tracking-[0.3em] text-muted-foreground">
            {subtitle}
          </div>
        )}
        <div className="font-mono text-sm font-bold tracking-wider text-primary">
          {title}
        </div>
      </div>

      {/* Data rows */}
      {data.length > 0 && (
        <div className="space-y-1 p-4">
          {data.map((item, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center justify-between font-mono text-[10px]",
                position === "right" && "flex-row-reverse"
              )}
            >
              <span className="tracking-widest text-muted-foreground">{item.label}</span>
              <span className="text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Custom content */}
      {children && <div className="p-4 pt-0">{children}</div>}

      {/* Bottom accent line */}
      <div
        className={cn(
          "absolute bottom-0 h-0.5 w-1/2 bg-primary",
          position === "left" ? "left-0" : "right-0"
        )}
      />
    </div>
  )
}

// Grid scan overlay effect
export function GridScanOverlay({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
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
          backgroundSize: "100px 100px",
        }}
      />

      {/* Moving scan line */}
      <div
        className="absolute left-0 h-px w-full bg-primary/30"
        style={{
          animation: "verticalScan 8s linear infinite",
        }}
      />

      <style jsx>{`
        @keyframes verticalScan {
          0% { top: -1px; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  )
}

// Movie-style coordinate/location display
interface LocationDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
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
        <span className="text-muted-foreground">|</span>
        <span className="text-muted-foreground">{grid}</span>
        <span className="text-muted-foreground">|</span>
        <span className="text-muted-foreground">{coordinates}</span>
        <span className="text-muted-foreground">|</span>
        <span className="text-green-500">{status}</span>
      </div>
    </div>
  )
}
