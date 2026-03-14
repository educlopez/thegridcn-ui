"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarNavItem {
  label: string
  href?: string
  icon?: React.ReactNode
  active?: boolean
  children?: SidebarNavItem[]
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarNavItem[]
  collapsed?: boolean
  onToggle?: () => void
  logo?: React.ReactNode
}

export function SidebarNav({
  items,
  collapsed = false,
  onToggle,
  logo,
  className,
  ...props
}: SidebarNavProps) {
  const [expandedSections, setExpandedSections] = React.useState<Set<number>>(
    new Set()
  )

  function toggleSection(idx: number) {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (prev.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <nav
      data-slot="tron-sidebar-nav"
      aria-label="Sidebar navigation"
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded border border-primary/30 bg-card/80 backdrop-blur-sm transition-all duration-300",
        collapsed ? "w-14" : "w-60",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Logo + Collapse toggle */}
      {(onToggle || logo) && (
        <div className="relative flex items-center border-b border-primary/20 p-2">
          {logo && !collapsed && (
            <div className="flex-1 pl-1">
              {logo}
            </div>
          )}
          {onToggle && (
            <button
              type="button"
              onClick={onToggle}
              className={cn(
                "flex items-center justify-center rounded p-1.5 transition-colors hover:bg-primary/10",
                (!logo || collapsed) && "w-full"
              )}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={cn(
                  "text-primary/60 transition-transform duration-300",
                  collapsed && "rotate-180"
                )}
              >
                <path
                  d="M10 3L5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Navigation items */}
      <div className="relative flex-1 overflow-y-auto py-2">
        {items.map((item, i) => {
          const hasChildren = item.children && item.children.length > 0
          const isExpanded = expandedSections.has(i)

          return (
            <div key={i}>
              {/* Parent item */}
              {hasChildren && !collapsed ? (
                <button
                  type="button"
                  onClick={() => toggleSection(i)}
                  className={cn(
                    "group flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-primary/5",
                    collapsed && "justify-center px-0"
                  )}
                >
                  {item.icon && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center text-foreground/40 transition-colors group-hover:text-primary/80">
                      {item.icon}
                    </span>
                  )}
                  {!collapsed && (
                    <>
                      <span className="flex-1 font-mono text-[10px] uppercase tracking-widest text-foreground/50 transition-colors group-hover:text-foreground/70">
                        {item.label}
                      </span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        className={cn(
                          "text-foreground/20 transition-transform duration-200",
                          isExpanded && "rotate-90"
                        )}
                      >
                        <path
                          d="M3.5 2l3.5 3-3.5 3"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
              ) : (
                <NavItem item={item} collapsed={collapsed} />
              )}

              {/* Children with slide animation */}
              {hasChildren && !collapsed && (
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    {item.children!.map((child, j) => (
                      <NavItem key={j} item={child} collapsed={false} nested />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
    </nav>
  )
}

/* ------------------------------------------------------------------ */

function NavItem({
  item,
  collapsed,
  nested = false,
}: {
  item: SidebarNavItem
  collapsed: boolean
  nested?: boolean
}) {
  const Tag = item.href ? "a" : "span"

  return (
    <Tag
      {...(item.href ? { href: item.href } : {})}
      className={cn(
        "group relative flex items-center gap-3 px-4 py-2.5 transition-colors",
        collapsed && "justify-center px-0",
        nested && "pl-10",
        item.active
          ? "bg-primary/10 text-primary"
          : "text-foreground/60 hover:bg-primary/5 hover:text-foreground/90"
      )}
    >
      {/* Active indicator bar */}
      {item.active && (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 bg-primary shadow-[0_0_6px_var(--color-primary)]" />
      )}

      {item.icon && (
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center transition-colors",
            item.active
              ? "text-primary drop-shadow-[0_0_4px_var(--color-primary)]"
              : "text-foreground/40 group-hover:text-primary/80"
          )}
        >
          {item.icon}
        </span>
      )}

      {!collapsed && (
        <span
          className={cn(
            "font-mono text-xs transition-colors",
            item.active
              ? "font-semibold text-primary"
              : "text-foreground/60 group-hover:text-foreground/90"
          )}
        >
          {item.label}
        </span>
      )}

      {/* Hover glow line */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-primary/0 transition-colors group-hover:bg-primary/20" />
    </Tag>
  )
}
