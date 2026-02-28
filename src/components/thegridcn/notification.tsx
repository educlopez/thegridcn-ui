"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  variant?: "info" | "success" | "warning" | "error"
  timestamp?: string
  dismissible?: boolean
  onDismiss?: () => void
}

const variantStyles: Record<string, { border: string; icon: string; text: string; glow: string }> = {
  info: {
    border: "border-primary/50",
    icon: "text-primary",
    text: "text-primary",
    glow: "shadow-[inset_0_0_20px_rgba(var(--primary-rgb,0,180,255),0.05)]",
  },
  success: {
    border: "border-green-500/50",
    icon: "text-green-500",
    text: "text-green-500",
    glow: "shadow-[inset_0_0_20px_rgba(34,197,94,0.05)]",
  },
  warning: {
    border: "border-amber-500/50",
    icon: "text-amber-500",
    text: "text-amber-500",
    glow: "shadow-[inset_0_0_20px_rgba(245,158,11,0.05)]",
  },
  error: {
    border: "border-red-500/50",
    icon: "text-red-500",
    text: "text-red-500",
    glow: "shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]",
  },
}

const variantIcon: Record<string, string> = {
  info: "◈",
  success: "✓",
  warning: "△",
  error: "✕",
}

export function Notification({
  title,
  description,
  variant = "info",
  timestamp,
  dismissible = false,
  onDismiss,
  className,
  ...props
}: NotificationProps) {
  const styles = variantStyles[variant]
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  function handleDismiss() {
    setVisible(false)
    setTimeout(() => onDismiss?.(), 300)
  }

  return (
    <div
      data-slot="tron-notification"
      className={cn(
        "relative overflow-hidden rounded border bg-card/90 backdrop-blur-sm transition-all duration-300",
        styles.border,
        styles.glow,
        visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Left accent line */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-0.5", styles.icon.replace("text-", "bg-"))} />

      <div className="flex items-start gap-3 px-4 py-3">
        {/* Icon */}
        <span className={cn("mt-0.5 shrink-0 font-mono text-sm", styles.icon)}>
          {variantIcon[variant]}
        </span>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              {title}
            </span>
            {timestamp && (
              <span className="ml-auto shrink-0 font-mono text-[9px] text-foreground/40">
                {timestamp}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-0.5 text-xs leading-relaxed text-foreground/70">
              {description}
            </p>
          )}
        </div>

        {/* Dismiss */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="shrink-0 text-foreground/40 transition-colors hover:text-foreground/80"
          >
            <span className="font-mono text-xs">✕</span>
          </button>
        )}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/30" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/30" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/30" />
    </div>
  )
}
