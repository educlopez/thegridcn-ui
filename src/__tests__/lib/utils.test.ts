import { describe, expect, it } from "vitest"
import { cn, groupComponentsByType } from "@/lib/utils"
import type { ComponentItem } from "@/lib/component-data"

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar")
  })

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz")
  })

  it("deduplicates tailwind conflicts", () => {
    expect(cn("p-2", "p-4")).toBe("p-4")
  })

  it("handles undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar")
  })
})

describe("groupComponentsByType", () => {
  const makeItem = (id: string, type: ComponentItem["type"]): ComponentItem => ({
    id,
    name: id,
    title: id,
    type,
    section: "test",
  })

  it("groups items by type", () => {
    const items = [makeItem("a", "button"), makeItem("b", "form"), makeItem("c", "button")]
    const result = groupComponentsByType(items)
    expect(result).toHaveLength(2)
    const buttonGroup = result.find((g) => g.type === "button")
    expect(buttonGroup?.items).toHaveLength(2)
    expect(buttonGroup?.title).toBe("Buttons")
  })

  it("returns empty array for empty input", () => {
    expect(groupComponentsByType([])).toEqual([])
  })

  it("preserves insertion order", () => {
    const items = [makeItem("a", "form"), makeItem("b", "button")]
    const result = groupComponentsByType(items)
    expect(result[0].type).toBe("form")
    expect(result[1].type).toBe("button")
  })

  it("maps type to correct label", () => {
    const items = [makeItem("a", "tron-movie")]
    const result = groupComponentsByType(items)
    expect(result[0].title).toBe("GridCN")
  })
})
