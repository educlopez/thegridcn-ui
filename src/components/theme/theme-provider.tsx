"use client"

import * as React from "react"

export type Theme = "ares" | "tron" | "clu" | "athena" | "aphrodite" | "poseidon"
export type TronIntensity = "none" | "light" | "medium" | "heavy"

export const themes: { id: Theme; name: string; god: string; color: string }[] = [
  { id: "ares", name: "Ares", god: "God of War", color: "#ff3333" },
  { id: "tron", name: "Tron", god: "User", color: "#00d4ff" },
  { id: "clu", name: "Clu", god: "Program", color: "#ff6600" },
  { id: "athena", name: "Athena", god: "Goddess of Wisdom", color: "#ffd700" },
  { id: "aphrodite", name: "Aphrodite", god: "Goddess of Love", color: "#ff1493" },
  { id: "poseidon", name: "Poseidon", god: "God of Sea", color: "#0066ff" },
]

export const tronIntensities: { id: TronIntensity; name: string; description: string }[] = [
  { id: "none", name: "Off", description: "Standard shadcn style" },
  { id: "light", name: "Light", description: "Subtle glows and enhanced borders" },
  { id: "medium", name: "Medium", description: "Glowing borders with corner brackets" },
  { id: "heavy", name: "Heavy", description: "Full Tron aesthetic with animations" },
]

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultIntensity?: TronIntensity
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  tronIntensity: TronIntensity
  setTronIntensity: (intensity: TronIntensity) => void
}

const initialState: ThemeProviderState = {
  theme: "ares",
  setTheme: () => null,
  tronIntensity: "medium",
  setTronIntensity: () => null,
}

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "ares",
  defaultIntensity = "medium",
  storageKey = "project-ares-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme)
  const [tronIntensity, setTronIntensity] = React.useState<TronIntensity>(defaultIntensity)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem(storageKey) as Theme | null
    if (storedTheme && themes.some((t) => t.id === storedTheme)) {
      setTheme(storedTheme)
    }
    const storedIntensity = localStorage.getItem(`${storageKey}-intensity`) as TronIntensity | null
    if (storedIntensity && tronIntensities.some((i) => i.id === storedIntensity)) {
      setTronIntensity(storedIntensity)
    }
  }, [storageKey])

  React.useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    root.setAttribute("data-theme", theme)
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey, mounted])

  React.useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement
    if (tronIntensity === "none") {
      root.removeAttribute("data-tron-intensity")
    } else {
      root.setAttribute("data-tron-intensity", tronIntensity)
    }
    localStorage.setItem(`${storageKey}-intensity`, tronIntensity)
  }, [tronIntensity, storageKey, mounted])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme)
    },
    tronIntensity,
    setTronIntensity: (intensity: TronIntensity) => {
      setTronIntensity(intensity)
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
