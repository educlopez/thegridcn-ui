"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface KanbanCard {
  id: string
  title: string
  description?: string
  tag?: string
  tagVariant?: "default" | "success" | "warning" | "danger"
  assignee?: string
}

interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
  color?: string
}

interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: KanbanColumn[]
  title?: string
}

export function KanbanBoard({
  columns,
  title,
  className,
  ...props
}: KanbanBoardProps) {
  const tagColors: Record<string, string> = {
    default: "border-primary/30 bg-primary/10 text-primary",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    danger: "border-red-500/30 bg-red-500/10 text-red-400",
  }

  return (
    <div
      data-slot="tron-kanban-board"
      className={cn(
        "overflow-hidden rounded border border-primary/20 bg-card/60 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)]" />

      {/* Header */}
      {title && (
        <div className="border-b border-primary/15 px-4 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
            {title}
          </span>
        </div>
      )}

      {/* Columns */}
      <div className="flex gap-px overflow-x-auto bg-primary/5 p-3">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex min-w-[200px] flex-1 flex-col rounded bg-background/40"
          >
            {/* Column header */}
            <div className="flex items-center gap-2 px-3 py-2.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: column.color || "hsl(var(--primary))" }}
              />
              <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/50">
                {column.title}
              </span>
              <span className="ml-auto rounded border border-primary/15 bg-primary/5 px-1.5 py-0.5 font-mono text-[8px] text-foreground/25">
                {column.cards.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2 px-2 pb-2">
              {column.cards.map((card) => (
                <div
                  key={card.id}
                  className="group relative rounded border border-primary/15 bg-card/80 p-3 transition-all hover:border-primary/30 hover:shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.06)]"
                >
                  <h4 className="font-mono text-[10px] uppercase tracking-wider text-foreground/70 group-hover:text-foreground/90">
                    {card.title}
                  </h4>
                  {card.description && (
                    <p className="mt-1 font-mono text-[9px] leading-relaxed text-foreground/30">
                      {card.description}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    {card.tag && (
                      <span className={cn(
                        "rounded border px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-widest",
                        tagColors[card.tagVariant || "default"]
                      )}>
                        {card.tag}
                      </span>
                    )}
                    {card.assignee && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-mono text-[7px] text-primary">
                        {card.assignee.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Card corner ticks */}
                  <div className="pointer-events-none absolute left-0 top-0 h-1.5 w-1.5 border-l border-t border-primary/20 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="pointer-events-none absolute bottom-0 right-0 h-1.5 w-1.5 border-b border-r border-primary/20 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/40" />
    </div>
  )
}
