// Registry configuration for design system

import type React from "react"

export type MenuAccentValue = "default" | "bold"
export type MenuColorValue = "default" | "inverted"
export type BaseColorName = "zinc" | "slate" | "stone" | "gray" | "neutral" | "red" | "rose" | "orange" | "green" | "blue" | "yellow" | "violet"
export type BaseName = "new-york" | "default"
export type StyleName = "new-york" | "default"
export type ThemeName = string
export type RadiusValue = "none" | "sm" | "default" | "md" | "lg" | "xl" | "full"
export type FontValue = string
export type IconLibraryName = "lucide-react" | "hugeicons" | "radix-icons"

export interface MenuAccent {
  value: MenuAccentValue
  label: string
}

export interface MenuColor {
  value: MenuColorValue
  label: string
}

export interface BaseColor {
  name: BaseColorName
  title: string
  cssVars?: {
    light?: Record<string, string>
    dark?: Record<string, string>
  }
}

export interface Base {
  name: BaseName
  title: string
}

export interface Style {
  name: StyleName
  title: string
  description?: string
  icon?: React.ReactElement
}

export interface Theme {
  name: ThemeName
  title: string
  cssVars?: {
    light?: Record<string, string>
    dark?: Record<string, string>
  }
}

export interface Radius {
  name: RadiusValue
  label: string
}

export interface IconLibrary {
  name: IconLibraryName
  title: string
}

export const MENU_ACCENTS: readonly MenuAccent[] = [
  { value: "default", label: "Default" },
  { value: "bold", label: "Bold" },
] as const

export const MENU_COLORS: readonly MenuColor[] = [
  { value: "default", label: "Default" },
  { value: "inverted", label: "Inverted" },
] as const

export const BASE_COLORS: readonly BaseColor[] = [
  { name: "zinc", title: "Zinc" },
  { name: "slate", title: "Slate" },
  { name: "stone", title: "Stone" },
  { name: "gray", title: "Gray" },
  { name: "neutral", title: "Neutral" },
  { name: "red", title: "Red" },
  { name: "rose", title: "Rose" },
  { name: "orange", title: "Orange" },
  { name: "green", title: "Green" },
  { name: "blue", title: "Blue" },
  { name: "yellow", title: "Yellow" },
  { name: "violet", title: "Violet" },
] as const

export const BASES: readonly Base[] = [
  { name: "new-york", title: "New York" },
  { name: "default", title: "Default" },
] as const

export const STYLES: readonly Style[] = [
  { name: "new-york", title: "New York", description: "New York style" },
  { name: "default", title: "Default", description: "Default style" },
] as const

export const THEMES: readonly Theme[] = [
  { name: "zinc", title: "Zinc" },
  { name: "slate", title: "Slate" },
  { name: "stone", title: "Stone" },
  { name: "gray", title: "Gray" },
  { name: "neutral", title: "Neutral" },
  { name: "red", title: "Red" },
  { name: "rose", title: "Rose" },
  { name: "orange", title: "Orange" },
  { name: "green", title: "Green" },
  { name: "blue", title: "Blue" },
  { name: "yellow", title: "Yellow" },
  { name: "violet", title: "Violet" },
] as const

export const RADII: readonly Radius[] = [
  { name: "none", label: "None" },
  { name: "sm", label: "Small" },
  { name: "default", label: "Default" },
  { name: "md", label: "Medium" },
  { name: "lg", label: "Large" },
  { name: "xl", label: "Extra Large" },
  { name: "full", label: "Full" },
] as const

export const iconLibraries: Record<string, IconLibrary> = {
  "lucide-react": { name: "lucide-react", title: "Lucide React" },
  hugeicons: { name: "hugeicons", title: "Hugeicons" },
  "radix-icons": { name: "radix-icons", title: "Radix Icons" },
} as const

export const DEFAULT_CONFIG = {
  base: "new-york" as BaseName,
  style: "new-york" as StyleName,
  theme: "zinc" as ThemeName,
  font: "Inter" as FontValue,
  baseColor: "zinc" as BaseColorName,
  menuAccent: "default" as MenuAccentValue,
  menuColor: "default" as MenuColorValue,
  iconLibrary: "lucide-react" as IconLibraryName,
} as const

export function getThemesForBaseColor(baseColor: BaseColorName): readonly Theme[] {
  // Return themes that match the base color or all themes if no match
  return THEMES.filter((theme) => theme.name === baseColor || !BASE_COLORS.find((bc) => bc.name === theme.name))
}
