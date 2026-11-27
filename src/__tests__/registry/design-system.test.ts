import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  DESIGN_SYSTEM_ITEMS,
  getRegistryBaseItem,
  getRegistryStyleName,
  mergeDesignSystemItems,
  REGISTRY_BASE_ITEMS,
  REGISTRY_FONTS,
} from "@/registry/design-system";

interface RegistryFileItem {
  files?: Array<{ path: string }>;
  name: string;
  registryDependencies?: string[];
  type: string;
}

const publishedRegistry = JSON.parse(
  readFileSync(path.join(process.cwd(), "registry.json"), "utf8")
) as { items: RegistryFileItem[] };

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

  it("installs Tron fonts from either base via this registry", () => {
    const fontNames = REGISTRY_FONTS.map((font) => font.name);

    expect(fontNames).toEqual([
      "font-rajdhani",
      "font-orbitron",
      "font-geist-mono",
    ]);

    for (const item of REGISTRY_BASE_ITEMS) {
      expect(item.registryDependencies).toEqual(
        fontNames.map((name) => `@thegridcn/${name}`)
      );
    }
  });

  it("does not publish bare dependencies that only exist in this registry", () => {
    const ownOnlyNames = new Set(
      publishedRegistry.items
        .filter((item) => {
          if (
            item.type === "registry:font" ||
            item.type === "registry:base" ||
            item.type === "registry:style"
          ) {
            return true;
          }
          return (item.files ?? []).some((file) =>
            file.path.includes("/thegridcn/")
          );
        })
        .map((item) => item.name)
    );

    const bareOwnOnlyDeps: string[] = [];
    for (const item of publishedRegistry.items) {
      for (const dependency of item.registryDependencies ?? []) {
        const bare = !(
          dependency.startsWith("@") || dependency.includes("://")
        );
        if (bare && ownOnlyNames.has(dependency)) {
          bareOwnOnlyDeps.push(`${item.name} -> ${dependency}`);
        }
      }
    }

    expect(bareOwnOnlyDeps).toEqual([]);

    const presets = publishedRegistry.items.filter(
      (item) => item.type === "registry:base"
    );
    expect(presets).toHaveLength(2);
    expect(presets.map((item) => item.name)).toEqual(
      expect.arrayContaining(["base-vega", "radix-vega"])
    );
    for (const preset of presets) {
      expect(preset.registryDependencies).toEqual([
        "@thegridcn/font-rajdhani",
        "@thegridcn/font-orbitron",
        "@thegridcn/font-geist-mono",
      ]);
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
