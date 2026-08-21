import { describe, expect, it } from "vitest";
import {
  DESIGN_SYSTEM_ITEMS,
  getRegistryBaseItem,
  getRegistryStyleName,
  mergeDesignSystemItems,
  REGISTRY_BASE_ITEMS,
  REGISTRY_FONTS,
} from "@/registry/design-system";

describe("design-system registry items", () => {
  it("maps primitives to shadcn 4.18 style names", () => {
    expect(getRegistryStyleName("radix")).toBe("radix-vega");
    expect(getRegistryStyleName("base")).toBe("base-vega");
  });

  it("ships registry:base presets for Radix and Base UI", () => {
    const radix = getRegistryBaseItem("radix");
    const base = getRegistryBaseItem("base");

    expect(REGISTRY_BASE_ITEMS).toHaveLength(2);
    expect(radix.type).toBe("registry:base");
    expect(base.type).toBe("registry:base");
    expect(radix.config.style).toBe("radix-vega");
    expect(base.config.style).toBe("base-vega");
    expect(radix.config.registries["@thegridcn"]).toContain("/r/{name}.json");
    expect(base.config.registries["@thegridcn"]).toBe(
      radix.config.registries["@thegridcn"]
    );
  });

  it("installs Tron fonts from either base", () => {
    const fontNames = REGISTRY_FONTS.map((font) => font.name);

    expect(fontNames).toEqual([
      "font-rajdhani",
      "font-orbitron",
      "font-geist-mono",
    ]);

    for (const item of REGISTRY_BASE_ITEMS) {
      expect(item.registryDependencies).toEqual(fontNames);
    }
  });

  it("merges design-system items without duplicating names", () => {
    const merged = mergeDesignSystemItems([
      { name: "button" },
      { name: "radix-vega" },
    ]);
    const names = merged.map((item) => item.name);

    expect(names).toEqual([
      "button",
      "font-rajdhani",
      "font-orbitron",
      "font-geist-mono",
      "radix-vega",
      "base-vega",
    ]);
    expect(DESIGN_SYSTEM_ITEMS.length).toBe(5);
  });
});
