"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TronTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  hours?: number
  minutes?: number
  seconds?: number
  label?: string
  sublabel?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "countdown" | "elapsed"
}

export function TronTimer({
  hours = 0,
  minutes = 0,
  seconds = 0,
  label = "ELAPSED",
  sublabel,
  size = "lg",
  variant = "default",
  className,
  ...props
}: TronTimerProps) {
  const formatNumber = (num: number) => String(num).padStart(2, "0")

  const sizeStyles = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
    xl: "text-8xl",
  }

  const variantStyles = {
    default: "text-primary",
    countdown: "text-red-500",
    elapsed: "text-foreground",
  }

  return (
    <div className={cn("text-center", className)} {...props}>
      <div className="flex items-baseline justify-center gap-1">
        <span
          className={cn(
            "font-mono font-light tracking-wider",
            sizeStyles[size],
            variantStyles[variant]
          )}
        >
          {formatNumber(hours)}:{formatNumber(minutes)}:{formatNumber(seconds)}
        </span>
        {label && (
          <span
            className={cn(
              "ml-2 font-mono uppercase tracking-[0.3em]",
              size === "xl" && "text-2xl",
              size === "lg" && "text-xl",
              size === "md" && "text-base",
              size === "sm" && "text-sm",
              "text-muted-foreground"
            )}
          >
            {label}
          </span>
        )}
      </div>
      {sublabel && (
        <div
          className={cn(
            "mt-2 font-mono tracking-wider text-muted-foreground/70",
            size === "xl" && "text-3xl",
            size === "lg" && "text-2xl",
            size === "md" && "text-lg",
            size === "sm" && "text-base"
          )}
        >
          {sublabel}
        </div>
      )}
    </div>
  )
}

interface TronCountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
  variant?: "default" | "danger" | "warning"
}

export function TronCountdown({
  value,
  label,
  variant = "default",
  className,
  ...props
}: TronCountdownProps) {
  const variantStyles = {
    default: {
      bg: "bg-primary/20",
      text: "text-primary",
      border: "border-primary/50",
    },
    danger: {
      bg: "bg-red-500/20",
      text: "text-red-500",
      border: "border-red-500/50",
    },
    warning: {
      bg: "bg-amber-500/20",
      text: "text-amber-500",
      border: "border-amber-500/50",
    },
  }

  const styles = variantStyles[variant]

  return (
    <div
      className={cn("flex items-center gap-3 font-mono", className)}
      {...props}
    >
      <span className="text-sm uppercase tracking-widest text-muted-foreground">
        {label}:
      </span>
      <span
        className={cn(
          "rounded border px-3 py-1 text-lg font-bold tracking-wider",
          styles.bg,
          styles.text,
          styles.border
        )}
      >
        {value}
      </span>
    </div>
  )
}

interface TronDerezTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  minutes: number
  seconds: number
  milliseconds?: number
}

export function TronDerezTimer({
  minutes,
  seconds,
  milliseconds = 0,
  className,
  ...props
}: TronDerezTimerProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-end rounded border border-primary/30 bg-primary/10 px-4 py-2",
        className
      )}
      {...props}
    >
      <div className="text-[10px] uppercase tracking-widest text-primary/70">
        TIME TO DE-RESOLUTION
      </div>
      <div className="flex items-baseline">
        <span className="font-mono text-4xl font-bold tracking-wider text-primary glow-text">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
        {milliseconds > 0 && (
          <span className="ml-1 font-mono text-lg text-primary/70">
            -{String(milliseconds).padStart(2, "0")}
          </span>
        )}
      </div>
    </div>
  )
}
