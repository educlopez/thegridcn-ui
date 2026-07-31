// Registry configuration for design system

import type React from "react";

export type MenuAccentValue = "default" | "bold";
export type MenuColorValue = "default" | "inverted";
export type BaseColorName =
  | "zinc"
  | "slate"
  | "stone"
  | "gray"
  | "neutral"
  | "red"
  | "rose"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "violet";
export type BaseName = "new-york" | "default";
export type StyleName = "new-york" | "default";
export type ThemeName = string;
export type RadiusValue =
  | "none"
  | "sm"
  | "default"
  | "md"
  | "lg"
  | "xl"
  | "full";
export type FontValue = string;
export type IconLibraryName = "lucide-react" | "hugeicons" | "radix-icons";

export interface MenuAccent {
  label: string;
  value: MenuAccentValue;
}

export interface MenuColor {
  label: string;
  value: MenuColorValue;
}

export interface BaseColor {
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  name: BaseColorName;
  title: string;
}

export interface Base {
  name: BaseName;
  title: string;
}

export interface Style {
  description?: string;
  icon?: React.ReactElement;
  name: StyleName;
  title: string;
}

export interface Theme {
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  name: ThemeName;
  title: string;
}

export interface Radius {
  label: string;
  name: RadiusValue;
}

export interface IconLibrary {
  name: IconLibraryName;
  title: string;
}

export const MENU_ACCENTS: readonly MenuAccent[] = [
  { label: "Default", value: "default" },
  { label: "Bold", value: "bold" },
] as const;

export const MENU_COLORS: readonly MenuColor[] = [
  { label: "Default", value: "default" },
  { label: "Inverted", value: "inverted" },
] as const;

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
] as const;

export const BASES: readonly Base[] = [
  { name: "new-york", title: "New York" },
  { name: "default", title: "Default" },
] as const;

export const STYLES: readonly Style[] = [
  { description: "New York style", name: "new-york", title: "New York" },
  { description: "Default style", name: "default", title: "Default" },
] as const;

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
] as const;

export const RADII: readonly Radius[] = [
  { label: "None", name: "none" },
  { label: "Small", name: "sm" },
  { label: "Default", name: "default" },
  { label: "Medium", name: "md" },
  { label: "Large", name: "lg" },
  { label: "Extra Large", name: "xl" },
  { label: "Full", name: "full" },
] as const;

export const iconLibraries: Record<string, IconLibrary> = {
  hugeicons: { name: "hugeicons", title: "Hugeicons" },
  "lucide-react": { name: "lucide-react", title: "Lucide React" },
  "radix-icons": { name: "radix-icons", title: "Radix Icons" },
} as const;

export const DEFAULT_CONFIG = {
  base: "new-york" as BaseName,
  baseColor: "zinc" as BaseColorName,
  font: "Inter" as FontValue,
  iconLibrary: "lucide-react" as IconLibraryName,
  menuAccent: "default" as MenuAccentValue,
  menuColor: "default" as MenuColorValue,
  style: "new-york" as StyleName,
  theme: "zinc" as ThemeName,
} as const;

export function getThemesForBaseColor(
  baseColor: BaseColorName
): readonly Theme[] {
  // Return themes that match the base color or all themes if no match
  return THEMES.filter(
    (theme) =>
      theme.name === baseColor ||
      !BASE_COLORS.find((bc) => bc.name === theme.name)
  );
}
