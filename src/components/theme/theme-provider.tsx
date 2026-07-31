"use client";

import * as React from "react";

export type Theme =
  | "ares"
  | "tron"
  | "clu"
  | "athena"
  | "aphrodite"
  | "poseidon"
  | "creator";
export type TronIntensity = "none" | "light" | "medium" | "heavy";

const STORAGE_KEY = "project-ares-theme";
const INTENSITY_KEY = "project-ares-theme-intensity";

// Theme data is static, so we define it outside the component to avoid recreation
export const themes: { id: Theme; name: string; god: string; color: string }[] =
  [
    { color: "#00d4ff", god: "User", id: "tron", name: "Tron" },
    { color: "#ff3333", god: "God of War", id: "ares", name: "Ares" },
    { color: "#ff6600", god: "Program", id: "clu", name: "Clu" },
    {
      color: "#ffd700",
      god: "Goddess of Wisdom",
      id: "athena",
      name: "Athena",
    },
    {
      color: "#ff1493",
      god: "Goddess of Love",
      id: "aphrodite",
      name: "Aphrodite",
    },
    { color: "#0066ff", god: "God of Sea", id: "poseidon", name: "Poseidon" },
    { color: "#ffffff", god: "Architect", id: "creator", name: "Creator" },
  ];

// Selectable themes — excludes hidden themes like "creator"
export const selectableThemes = themes.filter((t) => t.id !== "creator");

// Set for O(1) theme lookups (js-set-map-lookups pattern)
const themeIds = new Set(themes.map((t) => t.id));
const intensityIds = new Set([
  "none",
  "light",
  "medium",
  "heavy",
] as TronIntensity[]);

export const tronIntensities: {
  id: TronIntensity;
  name: string;
  description: string;
}[] = [
  { description: "Standard shadcn style", id: "none", name: "Off" },
  {
    description: "Subtle glows and enhanced borders",
    id: "light",
    name: "Light",
  },
  {
    description: "Glowing borders with corner brackets",
    id: "medium",
    name: "Medium",
  },
  {
    description: "Full Tron aesthetic with animations",
    id: "heavy",
    name: "Heavy",
  },
];

interface ThemeProviderState {
  setTheme: (theme: Theme) => void;
  setTronIntensity: (intensity: TronIntensity) => void;
  theme: Theme;
  tronIntensity: TronIntensity;
}

const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with defaults (matches server render to avoid hydration mismatch)
  // The inline script in layout.tsx already sets the correct data-theme attribute
  const [theme, setThemeState] = React.useState<Theme>("tron");
  const [tronIntensity, setIntensityState] =
    React.useState<TronIntensity>("medium");

  // Sync React state from localStorage after hydration completes
  // This is necessary because SSR renders with defaults, and we need to
  // update React state to match what the inline script already set on the DOM
  React.useEffect(() => {
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    if (storedTheme && themeIds.has(storedTheme as Theme)) {
      setThemeState(storedTheme as Theme);
    }

    const storedIntensity = localStorage.getItem(INTENSITY_KEY);
    if (storedIntensity && intensityIds.has(storedIntensity as TronIntensity)) {
      setIntensityState(storedIntensity as TronIntensity);
    }
  }, []);

  const setTheme = React.useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }, []);

  const setTronIntensity = React.useCallback((newIntensity: TronIntensity) => {
    setIntensityState(newIntensity);
    localStorage.setItem(INTENSITY_KEY, newIntensity);

    if (newIntensity === "none") {
      document.documentElement.removeAttribute("data-tron-intensity");
    } else {
      document.documentElement.setAttribute(
        "data-tron-intensity",
        newIntensity
      );
    }
  }, []);

  const value = React.useMemo(
    () => ({ setTheme, setTronIntensity, theme, tronIntensity }),
    [theme, setTheme, tronIntensity, setTronIntensity]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
