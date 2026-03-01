"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DropdownItem {
  label: string
  icon?: React.ReactNode
  shortcut?: string
  onSelect?: () => void
  disabled?: boolean
  variant?: "default" | "danger"
  separator?: boolean
}

interface DropdownProps {
  items: DropdownItem[]
  align?: "left" | "right"
  children: React.ReactNode
  className?: string
}

export function Dropdown({ items, align = "left", children, className }: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  // Close on Escape
  React.useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open])

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {children}
      </div>

      {open && (
        <div
          data-slot="tron-dropdown"
          className={cn(
            "absolute z-50 mt-1 min-w-[180px] overflow-hidden rounded border border-primary/30 bg-card/95 py-1 shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.08)] backdrop-blur-md",
            align === "left" ? "left-0" : "right-0"
          )}
        >
          {/* Scanline */}
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

          {items.map((item, i) =>
            item.separator ? (
              <div key={i} className="my-1 border-t border-primary/15" />
            ) : (
              <button
                key={i}
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  item.onSelect?.()
                  setOpen(false)
                }}
                className={cn(
                  "relative flex w-full items-center gap-2.5 px-3 py-1.5 text-left font-mono text-[10px] uppercase tracking-widest transition-colors",
                  item.disabled && "cursor-not-allowed opacity-30",
                  item.variant === "danger"
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-foreground/60 hover:bg-primary/10 hover:text-primary"
                )}
              >
                {item.icon && (
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center text-foreground/30">
                    {item.icon}
                  </span>
                )}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <kbd className="rounded border border-primary/15 bg-primary/5 px-1 py-0.5 text-[8px] text-foreground/25">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            )
          )}

          {/* Corner decorations */}
          <div className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-primary/40" />
          <div className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-primary/40" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-primary/40" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-primary/40" />
        </div>
      )}
    </div>
  )
}
