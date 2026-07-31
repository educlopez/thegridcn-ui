import { describe, expect, it } from "vitest";
import {
  selectableThemes,
  themes,
  tronIntensities,
} from "@/components/theme/theme-provider";

describe("themes", () => {
  it("includes all six greek god themes plus creator", () => {
    const ids = themes.map((t) => t.id);
    expect(ids).toContain("ares");
    expect(ids).toContain("tron");
    expect(ids).toContain("clu");
    expect(ids).toContain("athena");
    expect(ids).toContain("aphrodite");
    expect(ids).toContain("poseidon");
    expect(ids).toContain("creator");
  });

  it("each theme has id, name, god, and hex color", () => {
    for (const t of themes) {
      expect(t.id).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.god).toBeTruthy();
      expect(t.color).toMatch(/^#[0-9a-fA-F]{3,6}$/);
    }
  });
});

describe("selectableThemes", () => {
  it("excludes creator theme", () => {
    expect(selectableThemes.find((t) => t.id === "creator")).toBeUndefined();
  });

  it("contains all themes except creator", () => {
    expect(selectableThemes).toHaveLength(themes.length - 1);
  });
});

describe("tronIntensities", () => {
  it("has four levels in order", () => {
    expect(tronIntensities.map((i) => i.id)).toEqual([
      "none",
      "light",
      "medium",
      "heavy",
    ]);
  });

  it("each intensity has id, name, and description", () => {
    for (const i of tronIntensities) {
      expect(i.id).toBeTruthy();
      expect(i.name).toBeTruthy();
      expect(i.description).toBeTruthy();
    }
  });
});
