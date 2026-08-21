export type MenuAccentValue = "subtle" | "bold";
export type MenuColorValue =
  | "default"
  | "inverted"
  | "default-translucent"
  | "inverted-translucent";
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
export type BaseName = "radix" | "base";
export type StyleName = "vega";
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
export type IconLibraryName = "lucide" | "hugeicons" | "radix";

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
  { label: "Subtle", value: "subtle" },
  { label: "Bold", value: "bold" },
] as const;

export const MENU_COLORS: readonly MenuColor[] = [
  { label: "Default", value: "default" },
  { label: "Inverted", value: "inverted" },
  { label: "Default Translucent", value: "default-translucent" },
  { label: "Inverted Translucent", value: "inverted-translucent" },
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
  { name: "radix", title: "Radix UI" },
  { name: "base", title: "Base UI" },
] as const;

export const STYLES: readonly Style[] = [
  {
    description: "Vega — the New York look used by The Gridcn",
    name: "vega",
    title: "Vega",
  },
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
  lucide: { name: "lucide", title: "Lucide" },
  radix: { name: "radix", title: "Radix Icons" },
} as const;

export const DEFAULT_CONFIG = {
  base: "radix" as BaseName,
  baseColor: "neutral" as BaseColorName,
  font: "rajdhani" as FontValue,
  iconLibrary: "lucide" as IconLibraryName,
  menuAccent: "subtle" as MenuAccentValue,
  menuColor: "default" as MenuColorValue,
  style: "vega" as StyleName,
  theme: "neutral" as ThemeName,
} as const;

export function getThemesForBaseColor(
  baseColor: BaseColorName
): readonly Theme[] {
  return THEMES.filter(
    (theme) =>
      theme.name === baseColor ||
      !BASE_COLORS.find((bc) => bc.name === theme.name)
  );
}
