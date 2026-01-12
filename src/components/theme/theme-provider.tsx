"use client"

import * as React from "react"

export type Theme = "ares" | "tron" | "clu" | "athena" | "aphrodite" | "poseidon"

export const themes: { id: Theme; name: string; god: string; color: string }[] = [
  { id: "ares", name: "Ares", god: "God of War", color: "#ff3333" },
  { id: "tron", name: "Tron", god: "User", color: "#00d4ff" },
  { id: "clu", name: "Clu", god: "Program", color: "#ff6600" },
  { id: "athena", name: "Athena", god: "Goddess of Wisdom", color: "#ffd700" },
  { id: "aphrodite", name: "Aphrodite", god: "Goddess of Love", color: "#ff1493" },
  { id: "poseidon", name: "Poseidon", god: "God of Sea", color: "#0066ff" },
]

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "ares",
  setTheme: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "ares",
  storageKey = "project-ares-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(storageKey) as Theme | null
    if (stored && themes.some((t) => t.id === stored)) {
      setTheme(stored)
    }
  }, [storageKey])

  React.useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.setAttribute("data-theme", theme)
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey, mounted])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
