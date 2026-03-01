"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

interface BreadcrumbNavProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: "chevron" | "slash" | "dot"
}

function SeparatorIcon({ type }: { type: string }) {
  if (type === "slash") {
    return <span className="text-foreground/20 font-mono text-[10px]">/</span>
  }
  if (type === "dot") {
    return <span className="h-1 w-1 rounded-full bg-foreground/20" />
  }
  // chevron
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-foreground/20">
      <path d="M3.5 2l3.5 3-3.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BreadcrumbNav({
  items,
  separator = "chevron",
  className,
  ...props
}: BreadcrumbNavProps) {
  return (
    <nav
      data-slot="tron-breadcrumb"
      aria-label="Breadcrumb"
      className={cn(
        "inline-flex items-center gap-2 rounded border border-primary/20 bg-card/80 px-3 py-1.5 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span className="flex items-center">
              <SeparatorIcon type={separator} />
            </span>
          )}
          {item.active ? (
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
              {item.label}
            </span>
          ) : item.href ? (
            <a
              href={item.href}
              className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
