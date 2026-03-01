"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: { label: string; onClick?: () => void }
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="tron-empty-state"
      className={cn(
        "relative flex flex-col items-center justify-center rounded border border-dashed border-primary/20 bg-card/40 px-8 py-12 text-center backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {icon ? (
        <span className="mb-4 flex h-12 w-12 items-center justify-center text-foreground/15">
          {icon}
        </span>
      ) : (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-4 text-foreground/15">
          <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M20 24h8M24 20v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}

      <h3 className="font-mono text-xs uppercase tracking-widest text-foreground/40">
        {title}
      </h3>

      {description && (
        <p className="mt-1.5 max-w-xs font-mono text-[10px] leading-relaxed text-foreground/25">
          {description}
        </p>
      )}

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-4 rounded border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-primary transition-all hover:bg-primary/20 hover:shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.15)]"
        >
          {action.label}
        </button>
      )}

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-1 top-1 h-2.5 w-2.5 border-l border-t border-primary/20" />
      <div className="pointer-events-none absolute right-1 top-1 h-2.5 w-2.5 border-r border-t border-primary/20" />
      <div className="pointer-events-none absolute bottom-1 left-1 h-2.5 w-2.5 border-b border-l border-primary/20" />
      <div className="pointer-events-none absolute bottom-1 right-1 h-2.5 w-2.5 border-b border-r border-primary/20" />
    </div>
  )
}
