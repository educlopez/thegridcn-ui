"use client"

import * as React from "react"

export type Theme = "ares" | "tron" | "clu" | "athena" | "aphrodite" | "poseidon"
export type TronIntensity = "none" | "light" | "medium" | "heavy"

const STORAGE_KEY = "project-ares-theme"
const INTENSITY_KEY = "project-ares-theme-intensity"

// Theme data is static, so we define it outside the component to avoid recreation
export const themes: { id: Theme; name: string; god: string; color: string }[] = [
  { id: "tron", name: "Tron", god: "User", color: "#00d4ff" },
  { id: "ares", name: "Ares", god: "God of War", color: "#ff3333" },
  { id: "clu", name: "Clu", god: "Program", color: "#ff6600" },
  { id: "athena", name: "Athena", god: "Goddess of Wisdom", color: "#ffd700" },
  { id: "aphrodite", name: "Aphrodite", god: "Goddess of Love", color: "#ff1493" },
  { id: "poseidon", name: "Poseidon", god: "God of Sea", color: "#0066ff" },
]

// Set for O(1) theme lookups (js-set-map-lookups pattern)
const themeIds = new Set(themes.map((t) => t.id))
const intensityIds = new Set(["none", "light", "medium", "heavy"] as TronIntensity[])

export const tronIntensities: { id: TronIntensity; name: string; description: string }[] = [
  { id: "none", name: "Off", description: "Standard shadcn style" },
  { id: "light", name: "Light", description: "Subtle glows and enhanced borders" },
  { id: "medium", name: "Medium", description: "Glowing borders with corner brackets" },
  { id: "heavy", name: "Heavy", description: "Full Tron aesthetic with animations" },
]

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  tronIntensity: TronIntensity
  setTronIntensity: (intensity: TronIntensity) => void
}

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with defaults (matches server render to avoid hydration mismatch)
  // The inline script in layout.tsx already sets the correct data-theme attribute
  const [theme, setThemeState] = React.useState<Theme>("tron")
  const [tronIntensity, setIntensityState] = React.useState<TronIntensity>("medium")

  // Sync React state from localStorage after hydration completes
  // This is necessary because SSR renders with defaults, and we need to
  // update React state to match what the inline script already set on the DOM
  React.useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY)
    if (storedTheme && themeIds.has(storedTheme as Theme)) {
      setThemeState(storedTheme as Theme)
    }

    const storedIntensity = localStorage.getItem(INTENSITY_KEY)
    if (storedIntensity && intensityIds.has(storedIntensity as TronIntensity)) {
      setIntensityState(storedIntensity as TronIntensity)
    }
  }, [])

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }, [])

  const setTronIntensity = React.useCallback((newIntensity: TronIntensity) => {
    setIntensityState(newIntensity)
    localStorage.setItem(INTENSITY_KEY, newIntensity)

    if (newIntensity === "none") {
      document.documentElement.removeAttribute("data-tron-intensity")
    } else {
      document.documentElement.setAttribute("data-tron-intensity", newIntensity)
    }
  }, [])

  const value = React.useMemo(
    () => ({ theme, setTheme, tronIntensity, setTronIntensity }),
    [theme, setTheme, tronIntensity, setTronIntensity]
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
