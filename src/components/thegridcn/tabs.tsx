"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabItem {
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs: TabItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  variant?: "default" | "underline" | "pills"
  size?: "sm" | "md"
}

export function Tabs({
  tabs,
  value: controlledValue,
  defaultValue,
  onChange,
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || tabs[0]?.value || "")
  const active = controlledValue ?? internalValue

  function select(v: string) {
    if (!controlledValue) setInternalValue(v)
    onChange?.(v)
  }

  return (
    <div
      data-slot="tron-tabs"
      className={cn("space-y-3", className)}
      {...props}
    >
      {/* Tab list */}
      <div
        role="tablist"
        className={cn(
          "relative flex gap-1",
          variant === "default" && "rounded border border-primary/20 bg-card/80 p-1 backdrop-blur-sm",
          variant === "underline" && "border-b border-primary/20",
          variant === "pills" && "flex-wrap gap-2"
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.value === active
          return (
            <button
              key={tab.value}
              role="tab"
              type="button"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && select(tab.value)}
              className={cn(
                "relative flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest transition-all",
                tab.disabled && "cursor-not-allowed opacity-30",
                size === "sm" ? "px-2.5 py-1.5" : "px-3.5 py-2",
                variant === "default" && [
                  "rounded",
                  isActive
                    ? "bg-primary/15 text-primary shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.15)]"
                    : "text-foreground/40 hover:text-foreground/60",
                ],
                variant === "underline" && [
                  isActive
                    ? "text-primary"
                    : "text-foreground/40 hover:text-foreground/60",
                ],
                variant === "pills" && [
                  "rounded border",
                  isActive
                    ? "border-primary/40 bg-primary/10 text-primary shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.12)]"
                    : "border-primary/10 text-foreground/40 hover:border-primary/20 hover:text-foreground/60",
                ]
              )}
            >
              {tab.icon && <span className="flex h-3.5 w-3.5 items-center justify-center">{tab.icon}</span>}
              {tab.label}
              {/* Underline indicator */}
              {variant === "underline" && isActive && (
                <span className="absolute -bottom-px left-0 right-0 h-px bg-primary shadow-[0_0_6px_rgba(var(--primary-rgb,0,180,255),0.4)]" />
              )}
            </button>
          )
        })}
      </div>

      {/* Content */}
      {children}
    </div>
  )
}

interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  activeValue: string
}

export function TabPanel({ value, activeValue, className, children, ...props }: TabPanelProps) {
  if (value !== activeValue) return null
  return (
    <div role="tabpanel" className={cn("animate-in fade-in-0 duration-200", className)} {...props}>
      {children}
    </div>
  )
}
