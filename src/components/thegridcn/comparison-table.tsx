"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  features: { name: string; values: (boolean | string)[] }[]
  columns: { name: string; highlighted?: boolean }[]
  label?: string
}

export function ComparisonTable({
  features,
  columns,
  label,
  className,
  ...props
}: ComparisonTableProps) {
  // Stagger row reveal
  const [revealedRow, setRevealedRow] = React.useState(-1)
  React.useEffect(() => {
    let row = 0
    const interval = setInterval(() => {
      setRevealedRow(row)
      row++
      if (row >= features.length) clearInterval(interval)
    }, 60)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <div
      data-slot="tron-comparison-table"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {label && (
        <div className="border-b border-primary/20 px-4 py-2 text-[10px] uppercase tracking-widest text-foreground/50">
          {label}
        </div>
      )}

      <div className="relative overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr>
              <th className="border-b border-primary/20 px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                Feature
              </th>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={cn(
                    "border-b border-l border-primary/20 px-4 py-3 text-center font-mono text-[10px] uppercase tracking-widest",
                    col.highlighted
                      ? "bg-primary/5 text-primary"
                      : "text-foreground/50"
                  )}
                >
                  {col.name}
                  {col.highlighted && (
                    <div className="mx-auto mt-1 h-px w-8 bg-primary/40" />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {features.map((feature, ri) => (
              <tr
                key={ri}
                className={cn(
                  "transition-all duration-300",
                  ri <= revealedRow ? "opacity-100" : "translate-y-1 opacity-0",
                  ri % 2 === 0 ? "bg-transparent" : "bg-foreground/[0.02]"
                )}
              >
                <td className="border-b border-primary/10 px-4 py-2.5 font-mono text-xs text-foreground/70">
                  {feature.name}
                </td>
                {feature.values.map((val, ci) => (
                  <td
                    key={ci}
                    className={cn(
                      "border-b border-l border-primary/10 px-4 py-2.5 text-center font-mono text-xs",
                      columns[ci]?.highlighted && "bg-primary/5"
                    )}
                  >
                    {typeof val === "boolean" ? (
                      val ? (
                        <span className="inline-block text-primary">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline">
                            <path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      ) : (
                        <span className="inline-block text-foreground/20">—</span>
                      )
                    ) : (
                      <span className="text-foreground/60">{val}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
