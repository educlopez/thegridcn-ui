"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CommandMenuItem {
  label: string
  description?: string
  icon?: React.ReactNode
  shortcut?: string
  onSelect?: () => void
  group?: string
}

interface CommandMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CommandMenuItem[]
  placeholder?: string
  label?: string
  /** Controlled open state */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandMenu({
  items,
  placeholder = "Type a command...",
  label,
  open: controlledOpen,
  onOpenChange,
  className,
  ...props
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Filter items
  const trimmed = query.trim().toLowerCase()
  const filtered = React.useMemo(() => {
    if (!trimmed) return items
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(trimmed) ||
        (item.description?.toLowerCase().includes(trimmed)) ||
        (item.group?.toLowerCase().includes(trimmed))
    )
  }, [items, trimmed])

  // Group items
  const groups = React.useMemo(() => {
    const map = new Map<string, CommandMenuItem[]>()
    for (const item of filtered) {
      const key = item.group || ""
      const arr = map.get(key) || []
      arr.push(item)
      map.set(key, arr)
    }
    return Array.from(map.entries())
  }, [filtered])

  // Keyboard navigation
  const [activeIdx, setActiveIdx] = React.useState(0)
  React.useEffect(() => setActiveIdx(0), [query])

  // Ctrl/Cmd+K to toggle
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(!open)
      }
      if (e.key === "Escape" && open) {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, setOpen])

  // Focus input on open
  React.useEffect(() => {
    if (open) {
      setQuery("")
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIdx((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIdx((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      filtered[activeIdx]?.onSelect?.()
      setOpen(false)
    }
  }

  if (!open) return null

  let flatIdx = -1

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      <div
        data-slot="tron-command-menu"
        className={cn(
          "fixed left-1/2 top-[20%] z-50 w-full max-w-md -translate-x-1/2 overflow-hidden rounded border border-primary/40 bg-card/95 shadow-[0_0_40px_rgba(var(--primary-rgb,0,180,255),0.08)] backdrop-blur-md",
          className
        )}
        {...props}
      >
        {/* Scanline */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

        {label && (
          <div className="border-b border-primary/20 px-4 py-2 text-[9px] uppercase tracking-widest text-foreground/30">
            {label}
          </div>
        )}

        {/* Search input */}
        <div className="relative border-b border-primary/20">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-transparent py-3 pl-10 pr-4 font-mono text-sm text-foreground outline-none placeholder:text-foreground/25"
          />
        </div>

        {/* Results */}
        <div className="max-h-64 overflow-y-auto py-1">
          {groups.map(([group, groupItems]) => (
            <div key={group}>
              {group && (
                <div className="px-4 pb-1 pt-2 text-[9px] uppercase tracking-widest text-foreground/25">
                  {group}
                </div>
              )}
              {groupItems.map((item) => {
                flatIdx++
                const idx = flatIdx
                return (
                  <button
                    key={`${group}-${item.label}`}
                    type="button"
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2 text-left transition-colors",
                      idx === activeIdx
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-primary/5"
                    )}
                    onClick={() => { item.onSelect?.(); setOpen(false) }}
                    onMouseEnter={() => setActiveIdx(idx)}
                  >
                    {item.icon && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center text-foreground/30">
                        {item.icon}
                      </span>
                    )}
                    <div className="flex-1">
                      <div className="font-mono text-xs">{item.label}</div>
                      {item.description && (
                        <div className="text-[10px] text-foreground/30">{item.description}</div>
                      )}
                    </div>
                    {item.shortcut && (
                      <kbd className="rounded border border-primary/20 bg-primary/5 px-1.5 py-0.5 font-mono text-[9px] text-foreground/30">
                        {item.shortcut}
                      </kbd>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="py-6 text-center font-mono text-[10px] uppercase tracking-widest text-foreground/25">
              No results found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-primary/20 px-4 py-2">
          <span className="font-mono text-[8px] text-foreground/20">
            <kbd className="rounded border border-primary/15 bg-primary/5 px-1 py-0.5">↑↓</kbd> navigate
          </span>
          <span className="font-mono text-[8px] text-foreground/20">
            <kbd className="rounded border border-primary/15 bg-primary/5 px-1 py-0.5">↵</kbd> select
          </span>
          <span className="font-mono text-[8px] text-foreground/20">
            <kbd className="rounded border border-primary/15 bg-primary/5 px-1 py-0.5">esc</kbd> close
          </span>
        </div>

        {/* Corner decorations */}
        <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
        <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
      </div>
    </>
  )
}
