"use client"

import * as React from "react"
import { useTheme, themes, type Theme } from "./theme-provider"
import { cn } from "@/lib/utils"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={cn(
            "group relative flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-300",
            "hover:glow-sm",
            theme === t.id
              ? "border-primary bg-primary/10 glow-sm"
              : "border-border bg-card hover:border-primary/50"
          )}
        >
          <span
            className="h-3 w-3 rounded-full transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: t.color,
              boxShadow: theme === t.id ? `0 0 10px ${t.color}` : "none",
            }}
          />
          <span className="text-sm font-medium">{t.name}</span>
        </button>
      ))}
    </div>
  )
}

export function ThemeSwitcherCompact() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex gap-1">
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={`${t.name} - ${t.god}`}
          className={cn(
            "relative h-8 w-8 rounded-full border-2 transition-all duration-300",
            "hover:scale-110",
            theme === t.id ? "scale-110" : "opacity-70 hover:opacity-100"
          )}
          style={{
            backgroundColor: t.color,
            borderColor: theme === t.id ? t.color : "transparent",
            boxShadow: theme === t.id ? `0 0 15px ${t.color}, 0 0 30px ${t.color}40` : "none",
          }}
        >
          {theme === t.id && (
            <span className="absolute inset-0 animate-ping rounded-full opacity-30" style={{ backgroundColor: t.color }} />
          )}
        </button>
      ))}
    </div>
  )
}

export function ThemeSwitcherDropdown() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const currentTheme = themes.find((t) => t.id === theme)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 transition-all hover:border-primary hover:glow-sm"
      >
        <span
          className="h-3 w-3 rounded-full"
          style={{
            backgroundColor: currentTheme?.color,
            boxShadow: `0 0 8px ${currentTheme?.color}`,
          }}
        />
        <span className="font-medium">{currentTheme?.name}</span>
        <svg
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-lg border border-border bg-card p-2 shadow-lg">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-all",
                  theme === t.id ? "bg-primary/10" : "hover:bg-muted"
                )}
              >
                <span
                  className="h-4 w-4 rounded-full"
                  style={{
                    backgroundColor: t.color,
                    boxShadow: theme === t.id ? `0 0 8px ${t.color}` : "none",
                  }}
                />
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.god}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
