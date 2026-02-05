"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
  variant?: "default" | "danger" | "warning"
}

export function Countdown({
  value,
  label,
  variant = "default",
  className,
  ...props
}: CountdownProps) {
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
      <span className="text-sm uppercase tracking-widest text-foreground/80">
        {label}:
      </span>
      <span
        data-slot="tron-countdown-value"
        data-variant={variant}
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
