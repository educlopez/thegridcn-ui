/**
 * shadcn 4.18 design-system items.
 *
 * A single `components.json` can only hold one `{library}-{style}` value.
 * This registry therefore ships two `registry:base` presets so consumers can
 * configure Radix (`radix-vega`) or Base UI (`base-vega`). Vega is the New
 * York look this project already uses.
 *
 * Themes and HUD components are CSS-based and work with either primitive.
 * Copied `src/components/ui` items still import `@radix-ui/*`.
 */

export const THEGRIDCN_REGISTRY_URL = "https://thegridcn.com/r/{name}.json";

export const REGISTRY_BASES = ["radix", "base"] as const;
export const REGISTRY_STYLES = ["vega"] as const;

export type RegistryPrimitive = (typeof REGISTRY_BASES)[number];
export type RegistryVisualStyle = (typeof REGISTRY_STYLES)[number];
export type RegistryStyleName = `${RegistryPrimitive}-${RegistryVisualStyle}`;

const SHARED_CONFIG = {
  aliases: {
    components: "@/components",
    hooks: "@/hooks",
    lib: "@/lib",
    ui: "@/components/ui",
    utils: "@/lib/utils",
  },
  iconLibrary: "lucide",
  menuAccent: "subtle",
  menuColor: "default",
  registries: {
    "@thegridcn": THEGRIDCN_REGISTRY_URL,
  },
  rsc: true,
  rtl: false,
  tailwind: {
    baseColor: "neutral",
    css: "src/app/globals.css",
    cssVariables: true,
    prefix: "",
  },
  tsx: true,
} as const;

export const REGISTRY_FONTS = [
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    description: "Rajdhani body font used by The Gridcn.",
    font: {
      family: "'Rajdhani', sans-serif",
      import: "Rajdhani",
      provider: "google" as const,
      subsets: ["latin"],
      variable: "--font-sans",
      weight: ["300", "400", "500", "600", "700"],
    },
    name: "font-rajdhani",
    title: "Rajdhani",
    type: "registry:font" as const,
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    description: "Orbitron display/heading font used by The Gridcn.",
    font: {
      family: "'Orbitron', sans-serif",
      import: "Orbitron",
      provider: "google" as const,
      subsets: ["latin"],
      variable: "--font-heading",
      weight: ["400", "500", "600", "700", "800", "900"],
    },
    name: "font-orbitron",
    title: "Orbitron",
    type: "registry:font" as const,
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    description: "Geist Mono code font used by The Gridcn.",
    font: {
      family: "'Geist Mono Variable', monospace",
      import: "Geist_Mono",
      provider: "google" as const,
      subsets: ["latin"],
      variable: "--font-mono",
    },
    name: "font-geist-mono",
    title: "Geist Mono",
    type: "registry:font" as const,
  },
] as const;

const FONT_REGISTRY_DEPENDENCIES = REGISTRY_FONTS.map((item) => item.name);

const RADIX_VEGA_DOCS = `Configures components.json for Radix UI + Vega (the New York look).

Registers the @thegridcn namespace and installs Rajdhani, Orbitron, and Geist Mono.

This site and the copied src/components/ui items use Radix primitives. After this preset, add a theme (theme-ares) and any HUD components.`;

const BASE_VEGA_DOCS = `Configures components.json for Base UI + Vega (the New York look).

Registers the @thegridcn namespace and installs Rajdhani, Orbitron, and Geist Mono.

Theme CSS, intensity styles, and HUD/thegridcn components are CSS-based and work with Base UI. @thegridcn/button and other ui/ items still copy Radix source — keep your own Base UI primitives for those, or use @thegridcn/radix-vega instead.`;

export const REGISTRY_BASE_ITEMS = [
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    config: {
      ...SHARED_CONFIG,
      style: "radix-vega",
    },
    description:
      "The Gridcn on Radix UI with Vega (New York) style, aliases, fonts, and the @thegridcn registry.",
    docs: RADIX_VEGA_DOCS,
    extends: "none",
    name: "radix-vega",
    registryDependencies: FONT_REGISTRY_DEPENDENCIES,
    title: "The Gridcn (Radix / Vega)",
    type: "registry:base" as const,
  },
  {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    config: {
      ...SHARED_CONFIG,
      style: "base-vega",
    },
    description:
      "The Gridcn on Base UI with Vega (New York) style, aliases, fonts, and the @thegridcn registry.",
    docs: BASE_VEGA_DOCS,
    extends: "none",
    name: "base-vega",
    registryDependencies: FONT_REGISTRY_DEPENDENCIES,
    title: "The Gridcn (Base UI / Vega)",
    type: "registry:base" as const,
  },
] as const;

export const DESIGN_SYSTEM_ITEMS = [...REGISTRY_FONTS, ...REGISTRY_BASE_ITEMS];

export type DesignSystemItem = (typeof DESIGN_SYSTEM_ITEMS)[number];

export function getRegistryStyleName(
  primitive: RegistryPrimitive,
  style: RegistryVisualStyle = "vega"
): RegistryStyleName {
  return `${primitive}-${style}`;
}

export function getRegistryBaseItem(primitive: RegistryPrimitive) {
  const style = getRegistryStyleName(primitive);
  const item = REGISTRY_BASE_ITEMS.find((entry) => entry.name === style);
  if (!item) {
    throw new Error(`Missing registry:base item for ${style}`);
  }
  return item;
}

export function mergeDesignSystemItems<T extends { name: string }>(
  items: T[]
): Array<T | DesignSystemItem> {
  const reserved = new Set<string>(
    DESIGN_SYSTEM_ITEMS.map((item) => item.name)
  );
  const kept = items.filter((item) => !reserved.has(item.name));
  return [...kept, ...DESIGN_SYSTEM_ITEMS];
}
