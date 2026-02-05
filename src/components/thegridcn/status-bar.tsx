"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
  variant?: "default" | "alert" | "info"
}

export function StatusBar({
  leftContent,
  rightContent,
  variant = "default",
  className,
  ...props
}: StatusBarProps) {
  const variantStyles = {
    default: "bg-muted/50 border-border",
    alert: "bg-red-500/10 border-red-500/50",
    info: "bg-cyan-500/10 border-cyan-500/50",
  }

  return (
    <div
      data-slot="tron-status-bar"
      data-variant={variant}
      className={cn(
        "flex items-center justify-between border-y px-4 py-2 font-mono text-xs uppercase tracking-widest",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4 text-foreground/80">
        {leftContent}
      </div>
      <div className="flex items-center gap-4 text-foreground/80">
        {rightContent}
      </div>
    </div>
  )
}

interface InfoPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  timestamp?: string
  status?: "active" | "pending" | "complete"
}

export function InfoPanel({
  title,
  subtitle,
  timestamp,
  status = "active",
  children,
  className,
  ...props
}: InfoPanelProps) {
  const statusIndicator = {
    active: "bg-green-500",
    pending: "bg-amber-500 animate-pulse",
    complete: "bg-cyan-500",
  }

  return (
    <div
      data-slot="tron-info-panel"
      className={cn(
        "relative overflow-hidden rounded border border-border/50 bg-card/50 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-3">
          <div className={cn("h-2 w-2 rounded-full", statusIndicator[status])} />
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/80">
            {subtitle}
          </span>
        </div>
        {timestamp && (
          <span className="font-mono text-[10px] text-foreground/80">
            {timestamp}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 font-mono text-lg font-bold uppercase tracking-wider text-foreground">
          {title}
        </h3>
        {children}
      </div>

      {/* Grid dots decoration */}
      <div className="pointer-events-none absolute right-2 top-2 grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-1 w-1 rounded-full bg-primary/20"
          />
        ))}
      </div>
    </div>
  )
}

interface UplinkBarProps extends React.HTMLAttributes<HTMLDivElement> {
  channel: string
  status?: string
  signal?: "strong" | "medium" | "weak"
}

export function UplinkBar({
  channel,
  status,
  signal = "strong",
  className,
  ...props
}: UplinkBarProps) {
  const signalBars = {
    strong: 4,
    medium: 2,
    weak: 1,
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between border-y border-cyan-500/30 bg-cyan-500/5 px-4 py-2 font-mono text-xs",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="text-cyan-400">⚡</span>
        <span className="uppercase tracking-widest text-cyan-500">
          UPLINK: {channel}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {status && (
          <span className="uppercase tracking-widest text-foreground/80">
            {status}
          </span>
        )}

        {/* Signal strength */}
        <div className="flex items-end gap-0.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 rounded-t",
                i < signalBars[signal] ? "bg-cyan-500" : "bg-cyan-500/20"
              )}
              style={{ height: `${(i + 1) * 3 + 2}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface ProgressTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number
  markers?: { position: number; label?: string; active?: boolean }[]
  currentLabel?: string
}

export function ProgressTimeline({
  progress,
  markers = [],
  currentLabel,
  className,
  ...props
}: ProgressTimelineProps) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {/* Timeline bar */}
      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
        {/* Progress */}
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />

        {/* Red progress indicator like in the movie */}
        <div
          data-slot="tron-progress-indicator"
          className="absolute top-0 h-full w-1 bg-red-500"
          style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
        />

        {/* Markers */}
        {markers.map((marker, i) => (
          <div
            key={i}
            className={cn(
              "absolute top-1/2 h-3 w-0.5 -translate-y-1/2",
              marker.active ? "bg-primary" : "bg-muted-foreground/50"
            )}
            style={{ left: `${marker.position}%` }}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-foreground/80">
        <span>00:00</span>
        {currentLabel && <span className="text-primary">{currentLabel}</span>}
        <span>END</span>
      </div>
    </div>
  )
}
