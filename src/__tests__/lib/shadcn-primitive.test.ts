import { describe, expect, it } from "vitest";
import {
  getRegistryName,
  getShadcnInstallItems,
  isOfficialShadcnPrimitive,
} from "@/lib/registry-name";
import {
  buildComponentInstallCommand,
  buildShadcnAddCommand,
  getPrimitivePreset,
} from "@/lib/shadcn-primitive";
import { getComponentsJson } from "@/registry/design-system";

describe("shadcn primitive install commands", () => {
  it("prefixes the matching registry:base preset", () => {
    expect(getPrimitivePreset("radix")).toBe("@thegridcn/radix-vega");
    expect(getPrimitivePreset("base")).toBe("@thegridcn/base-vega");
    expect(buildShadcnAddCommand("npx shadcn@latest add", "base")).toBe(
      "npx shadcn@latest add @thegridcn/base-vega"
    );
  });

  it("installs official shadcn primitives so Base UI follows components.json style", () => {
    expect(isOfficialShadcnPrimitive("button-example")).toBe(true);
    expect(getShadcnInstallItems("button-example")).toEqual(["button"]);
    expect(
      buildComponentInstallCommand(
        "pnpm dlx shadcn@latest add",
        "base",
        "button-example"
      )
    ).toBe("pnpm dlx shadcn@latest add @thegridcn/base-vega button");
  });

  it("installs HUD items from the @thegridcn registry", () => {
    expect(getRegistryName("grid-3d")).toBe("grid");
    expect(getShadcnInstallItems("data-card")).toEqual([
      "@thegridcn/data-card",
    ]);
    expect(
      buildComponentInstallCommand(
        "npx shadcn@latest add",
        "radix",
        "data-card",
        ["@thegridcn/theme-ares"]
      )
    ).toBe(
      "npx shadcn@latest add @thegridcn/radix-vega @thegridcn/data-card @thegridcn/theme-ares"
    );
  });

  it("builds a downloadable components.json for each primitive", () => {
    const radix = JSON.parse(getComponentsJson("radix"));
    const base = JSON.parse(getComponentsJson("base"));

    expect(radix.style).toBe("radix-vega");
    expect(base.style).toBe("base-vega");
    expect(radix.registries["@thegridcn"]).toContain("/r/{name}.json");
    expect(base.registries["@thegridcn"]).toBe(radix.registries["@thegridcn"]);
  });
});
