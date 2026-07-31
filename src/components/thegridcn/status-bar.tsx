"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

interface StatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  variant?: "default" | "alert" | "info";
}

export function StatusBar({
  leftContent,
  rightContent,
  variant = "default",
  className,
  ...props
}: StatusBarProps) {
  const variantStyles = {
    alert: "bg-red-500/10 border-red-500/50",
    default: "bg-muted/50 border-border",
    info: "bg-cyan-500/10 border-cyan-500/50",
  };

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
  );
}

interface InfoPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: "active" | "pending" | "complete";
  subtitle?: string;
  timestamp?: string;
  title: string;
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
    complete: "bg-cyan-500",
    pending: "bg-amber-500 animate-pulse",
  };

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
      <div className="flex items-center justify-between border-border/50 border-b bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-3">
          <div
            className={cn("h-2 w-2 rounded-full", statusIndicator[status])}
          />
          <span className="font-mono text-[10px] text-foreground/80 uppercase tracking-widest">
            {subtitle}
          </span>
        </div>
        {timestamp ? (
          <span className="font-mono text-[10px] text-foreground/80">
            {timestamp}
          </span>
        ) : null}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 font-bold font-mono text-foreground text-lg uppercase tracking-wider">
          {title}
        </h3>
        {children}
      </div>

      {/* Grid dots decoration */}
      <div className="pointer-events-none absolute top-2 right-2 grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-primary/20" />
        ))}
      </div>
    </div>
  );
}

interface UplinkBarProps extends React.HTMLAttributes<HTMLDivElement> {
  channel: string;
  signal?: "strong" | "medium" | "weak";
  status?: string;
}

export function UplinkBar({
  channel,
  status,
  signal = "strong",
  className,
  ...props
}: UplinkBarProps) {
  const signalBars = {
    medium: 2,
    strong: 4,
    weak: 1,
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between border-cyan-500/30 border-y bg-cyan-500/5 px-4 py-2 font-mono text-xs",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="text-cyan-400">⚡</span>
        <span className="text-cyan-500 uppercase tracking-widest">
          UPLINK: {channel}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {status ? (
          <span className="text-foreground/80 uppercase tracking-widest">
            {status}
          </span>
        ) : null}

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
  );
}

interface ProgressTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  currentLabel?: string;
  markers?: { position: number; label?: string; active?: boolean }[];
  progress: number;
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
      <div className="flex items-center justify-between font-mono text-[10px] text-foreground/80 uppercase tracking-widest">
        <span>00:00</span>
        {currentLabel ? (
          <span className="text-primary">{currentLabel}</span>
        ) : null}
        <span>END</span>
      </div>
    </div>
  );
}
