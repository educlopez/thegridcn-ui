"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DataTableColumn<T> {
  key: keyof T & string
  label: string
  sortable?: boolean
  align?: "left" | "center" | "right"
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface DataTableProps<T extends Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn<T>[]
  data: T[]
  label?: string
  striped?: boolean
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  label,
  striped = true,
  className,
  ...props
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc")

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal == null || bVal == null) return 0
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [data, sortKey, sortDir])

  // Stagger row reveal
  const [revealedRow, setRevealedRow] = React.useState(-1)
  React.useEffect(() => {
    let row = 0
    const interval = setInterval(() => {
      setRevealedRow(row)
      row++
      if (row >= sortedData.length) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [sortedData.length])

  const alignClass = (align?: string) =>
    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"

  return (
    <div
      data-slot="tron-data-table"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {label && (
        <div className="border-b border-primary/20 px-4 py-2 text-[10px] uppercase tracking-widest text-foreground/50">
          {label}
        </div>
      )}

      <div className="relative overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "border-b border-primary/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-foreground/40",
                    alignClass(col.align),
                    col.sortable && "cursor-pointer select-none hover:text-primary transition-colors"
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="text-primary">
                        {sortDir === "asc" ? (
                          <path d="M4 1l3 5H1l3-5z" fill="currentColor" />
                        ) : (
                          <path d="M4 7L1 2h6L4 7z" fill="currentColor" />
                        )}
                      </svg>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, ri) => (
              <tr
                key={ri}
                className={cn(
                  "transition-all duration-200",
                  ri <= revealedRow ? "opacity-100" : "translate-y-1 opacity-0",
                  striped && ri % 2 === 1 && "bg-foreground/[0.02]",
                  "hover:bg-primary/5"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "border-b border-primary/10 px-4 py-2.5 font-mono text-xs text-foreground/70",
                      alignClass(col.align)
                    )}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
