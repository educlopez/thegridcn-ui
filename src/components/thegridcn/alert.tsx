"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "warning" | "danger" | "info" | "success"
  animated?: boolean
}

export function Alert({
  children,
  variant = "warning",
  animated = true,
  className,
  ...props
}: AlertProps) {
  const variantStyles = {
    warning: "bg-amber-500/90 text-black border-amber-400",
    danger: "bg-red-500/90 text-white border-red-400",
    info: "bg-cyan-500/90 text-black border-cyan-400",
    success: "bg-green-500/90 text-black border-green-400",
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        "border-y-2 px-6 py-2",
        "font-mono text-sm font-bold uppercase tracking-[0.2em]",
        variantStyles[variant],
        animated && "animate-pulse",
        className
      )}
      {...props}
    >
      {/* Left bracket decoration */}
      <span className="absolute -left-1 top-1/2 -translate-y-1/2 text-lg">
        [
      </span>

      {children}

      {/* Right bracket decoration */}
      <span className="absolute -right-1 top-1/2 -translate-y-1/2 text-lg">
        ]
      </span>
    </div>
  )
}

interface AlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  variant?: "warning" | "danger" | "info"
}

export function AlertBanner({
  title,
  subtitle,
  variant = "warning",
  className,
  ...props
}: AlertBannerProps) {
  const variantStyles = {
    warning: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/50",
      text: "text-amber-500",
    },
    danger: {
      bg: "bg-red-500/10",
      border: "border-red-500/50",
      text: "text-red-500",
    },
    info: {
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/50",
      text: "text-cyan-500",
    },
  }

  const styles = variantStyles[variant]

  return (
    <div
      data-slot="tron-alert-banner"
      data-variant={variant}
      className={cn(
        "relative overflow-hidden rounded-sm border",
        styles.bg,
        styles.border,
        className
      )}
      {...props}
    >
      {/* Animated scan line */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute h-[2px] w-full animate-[scan_2s_linear_infinite]",
            variant === "warning" && "bg-amber-500/50",
            variant === "danger" && "bg-red-500/50",
            variant === "info" && "bg-cyan-500/50"
          )}
        />
      </div>

      <div className="relative px-4 py-3">
        {subtitle && (
          <div className="mb-1 text-[10px] uppercase tracking-widest text-foreground/80">
            {subtitle}
          </div>
        )}
        <div
          className={cn(
            "font-mono text-lg font-bold uppercase tracking-widest",
            styles.text
          )}
        >
          {title}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: -2px;
          }
          100% {
            top: 100%;
          }
        }
      `}</style>
    </div>
  )
}
