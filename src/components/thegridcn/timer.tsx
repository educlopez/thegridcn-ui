"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TimerProps extends React.HTMLAttributes<HTMLDivElement> {
  hours?: number
  minutes?: number
  seconds?: number
  label?: string
  sublabel?: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "countdown" | "elapsed"
}

export function Timer({
  hours = 0,
  minutes = 0,
  seconds = 0,
  label = "ELAPSED",
  sublabel,
  size = "lg",
  variant = "default",
  className,
  ...props
}: TimerProps) {
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
          data-slot="tron-timer-value"
          data-variant={variant}
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
              "text-foreground/80"
            )}
          >
            {label}
          </span>
        )}
      </div>
      {sublabel && (
        <div
          className={cn(
            "mt-2 font-mono tracking-wider text-foreground/60",
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
