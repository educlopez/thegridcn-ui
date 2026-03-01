"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AnnouncementBarProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  action?: { label: string; onClick?: () => void }
  variant?: "default" | "highlight" | "warning"
  dismissible?: boolean
  icon?: React.ReactNode
}

export function AnnouncementBar({
  text,
  action,
  variant = "default",
  dismissible = true,
  icon,
  className,
  ...props
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = React.useState(false)

  if (dismissed) return null

  return (
    <div
      data-slot="tron-announcement-bar"
      className={cn(
        "relative flex items-center justify-center gap-3 overflow-hidden px-4 py-2 font-mono text-xs",
        variant === "default" && "border-b border-primary/30 bg-primary/5 text-foreground/80",
        variant === "highlight" && "border-b border-primary/50 bg-primary/10 text-primary",
        variant === "warning" && "border-b border-amber-500/30 bg-amber-500/5 text-amber-400/90",
        className
      )}
      {...props}
    >
      {/* Scanline */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Animated border glow */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px">
        <div
          className={cn(
            "h-full w-1/4 bg-gradient-to-r from-transparent to-transparent",
            variant === "warning" ? "via-amber-500/40" : "via-primary/40"
          )}
          style={{ animation: "announceSweep 5s ease-in-out infinite" }}
        />
      </div>

      <style jsx>{`
        @keyframes announceSweep {
          0%, 100% { margin-left: -10%; }
          50% { margin-left: 86%; }
        }
      `}</style>

      <div className="relative flex items-center justify-center gap-3">
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="text-center tracking-wide">{text}</span>
        {action && (
          <button
            onClick={action.onClick}
            className={cn(
              "shrink-0 rounded border px-2.5 py-0.5 text-[10px] uppercase tracking-widest transition-colors",
              variant === "warning"
                ? "border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
                : "border-primary/40 text-primary hover:bg-primary/10"
            )}
          >
            {action.label}
          </button>
        )}
      </div>

      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/30 transition-colors hover:text-foreground/60"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
