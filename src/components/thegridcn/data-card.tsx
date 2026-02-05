"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DataFieldProps {
  label: string
  value: string
  highlight?: boolean
}

function DataField({ label, value, highlight = false }: DataFieldProps) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] uppercase tracking-widest text-foreground/80">
        {label}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-primary">|</span>
        <span
          className={cn(
            "font-mono text-sm uppercase tracking-wide",
            highlight && "bg-primary/20 px-2 py-0.5"
          )}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  fields: { label: string; value: string; highlight?: boolean }[]
  status?: "active" | "inactive" | "alert"
}

export function DataCard({
  title,
  subtitle,
  fields,
  status = "active",
  className,
  ...props
}: DataCardProps) {
  const statusColors = {
    active: "border-primary/50",
    inactive: "border-muted",
    alert: "border-destructive/50",
  }

  return (
    <div
      data-slot="tron-data-card"
      data-status={status}
      className={cn(
        "relative overflow-hidden rounded border bg-card/80 backdrop-blur-sm",
        statusColors[status],
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Header */}
      {(title || subtitle) && (
        <div className="border-b border-border/50 px-4 py-2">
          {subtitle && (
            <div className="text-[10px] uppercase tracking-widest text-foreground/80">
              {subtitle}
            </div>
          )}
          {title && (
            <div className="flex items-center gap-2">
              <span className="text-primary">|</span>
              <h3 className="text-lg font-bold uppercase tracking-wider">
                {title}
              </h3>
            </div>
          )}
        </div>
      )}

      {/* Fields */}
      <div className="space-y-3 p-4">
        {fields.map((field, index) => (
          <DataField
            key={index}
            label={field.label}
            value={field.value}
            highlight={field.highlight}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
