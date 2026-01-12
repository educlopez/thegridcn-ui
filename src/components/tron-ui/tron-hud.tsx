"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TronReticleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  animated?: boolean
  variant?: "default" | "locked" | "scanning"
}

export function TronReticle({
  size = 120,
  animated = true,
  variant = "default",
  className,
  ...props
}: TronReticleProps) {
  const variantColors = {
    default: "stroke-primary",
    locked: "stroke-red-500",
    scanning: "stroke-amber-500",
  }

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        viewBox="0 0 100 100"
        className={cn(
          "h-full w-full",
          animated && variant === "scanning" && "animate-pulse"
        )}
      >
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className={cn(variantColors[variant], "opacity-30")}
          strokeWidth="1"
        />

        {/* Inner circle */}
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          className={cn(variantColors[variant], "opacity-50")}
          strokeWidth="1"
        />

        {/* Center dot */}
        <circle
          cx="50"
          cy="50"
          r="3"
          className={cn(
            variantColors[variant].replace("stroke-", "fill-"),
            "opacity-80"
          )}
        />

        {/* Crosshairs */}
        <line
          x1="50"
          y1="5"
          x2="50"
          y2="20"
          className={variantColors[variant]}
          strokeWidth="1"
        />
        <line
          x1="50"
          y1="80"
          x2="50"
          y2="95"
          className={variantColors[variant]}
          strokeWidth="1"
        />
        <line
          x1="5"
          y1="50"
          x2="20"
          y2="50"
          className={variantColors[variant]}
          strokeWidth="1"
        />
        <line
          x1="80"
          y1="50"
          x2="95"
          y2="50"
          className={variantColors[variant]}
          strokeWidth="1"
        />

        {/* Corner brackets */}
        <path
          d="M 15 25 L 15 15 L 25 15"
          fill="none"
          className={variantColors[variant]}
          strokeWidth="2"
        />
        <path
          d="M 75 15 L 85 15 L 85 25"
          fill="none"
          className={variantColors[variant]}
          strokeWidth="2"
        />
        <path
          d="M 85 75 L 85 85 L 75 85"
          fill="none"
          className={variantColors[variant]}
          strokeWidth="2"
        />
        <path
          d="M 25 85 L 15 85 L 15 75"
          fill="none"
          className={variantColors[variant]}
          strokeWidth="2"
        />
      </svg>

      {/* Rotating ring for scanning */}
      {animated && variant === "scanning" && (
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full animate-spin"
          style={{ animationDuration: "3s" }}
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            className="stroke-amber-500"
            strokeWidth="2"
            strokeDasharray="20 60"
          />
        </svg>
      )}
    </div>
  )
}

interface TronHUDFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

export function TronHUDFrame({
  label,
  children,
  className,
  ...props
}: TronHUDFrameProps) {
  return (
    <div
      className={cn(
        "relative border border-primary/30 bg-background/50 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Top left corner */}
      <div className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-primary" />
      {/* Top right corner */}
      <div className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-primary" />
      {/* Bottom left corner */}
      <div className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-primary" />
      {/* Bottom right corner */}
      <div className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-primary" />

      {/* Label */}
      {label && (
        <div className="absolute -top-3 left-4 bg-background px-2 text-[10px] uppercase tracking-widest text-primary">
          {label}
        </div>
      )}

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative p-4">{children}</div>
    </div>
  )
}

interface TronStatProps {
  label: string
  value: string | number
  unit?: string
  direction?: "up" | "down" | "neutral"
}

export function TronStat({ label, value, unit, direction }: TronStatProps) {
  return (
    <div className="flex items-center gap-2 font-mono">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span
        className={cn(
          "text-lg font-bold",
          direction === "up" && "text-green-500",
          direction === "down" && "text-red-500",
          direction === "neutral" && "text-primary"
        )}
      >
        {direction === "up" && "▲"}
        {direction === "down" && "▼"}
        {value}
        {unit && <span className="ml-1 text-sm opacity-70">{unit}</span>}
      </span>
    </div>
  )
}

export function TronSpeedIndicator({
  speed,
  maxSpeed = 200,
  className,
}: {
  speed: number
  maxSpeed?: number
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-mono text-3xl font-bold text-primary">{speed}</span>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          KM/H
        </span>
        <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${(speed / maxSpeed) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export function TronRegenIndicator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 font-mono text-sm tracking-widest text-cyan-500",
        className
      )}
    >
      <span className="animate-pulse">&gt;&gt;&gt;</span>
      <span>REGEN</span>
      <span className="animate-pulse">&lt;&lt;&lt;</span>
    </div>
  )
}
