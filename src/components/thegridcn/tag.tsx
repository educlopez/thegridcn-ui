"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "outline"
  size?: "sm" | "md"
  glow?: boolean
  dismissible?: boolean
  onDismiss?: () => void
}

const variantStyles: Record<string, string> = {
  default: "border-primary/50 bg-primary/15 text-primary",
  success: "border-green-500/50 bg-green-500/15 text-green-500",
  warning: "border-amber-500/50 bg-amber-500/15 text-amber-500",
  danger: "border-red-500/50 bg-red-500/15 text-red-500",
  outline: "border-foreground/30 bg-transparent text-foreground/80",
}

const variantGlow: Record<string, string> = {
  default: "shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.3)]",
  success: "shadow-[0_0_8px_rgba(34,197,94,0.3)]",
  warning: "shadow-[0_0_8px_rgba(245,158,11,0.3)]",
  danger: "shadow-[0_0_8px_rgba(239,68,68,0.3)]",
  outline: "",
}

const sizeStyles: Record<string, string> = {
  sm: "px-2 py-0.5 text-[9px]",
  md: "px-3 py-1 text-[10px]",
}

export function Tag({
  variant = "default",
  size = "sm",
  glow = false,
  dismissible = false,
  onDismiss,
  className,
  children,
  ...props
}: TagProps) {
  return (
    <span
      data-slot="tron-tag"
      className={cn(
        "inline-flex items-center gap-1.5 rounded border font-mono uppercase tracking-widest transition-all duration-200",
        variantStyles[variant],
        sizeStyles[size],
        glow && variantGlow[variant],
        className
      )}
      {...props}
    >
      {children}
      {dismissible && (
        <button
          onClick={onDismiss}
          className="ml-0.5 opacity-60 transition-opacity hover:opacity-100"
        >
          &#10005;
        </button>
      )}
    </span>
  )
}
