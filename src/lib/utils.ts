import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ComponentItem, ComponentType } from "./component-data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const typeLabels: Record<ComponentType, string> = {
  block: "Blocks",
  "tron-movie": "GridCN",
  overlay: "Overlay",
  feedback: "Feedback",
  layout: "Layout",
  data: "Data Display",
  navigation: "Navigation",
  button: "Buttons",
  form: "Form",
}

export function groupComponentsByType(
  items: ComponentItem[]
): { type: ComponentType; title: string; items: ComponentItem[] }[] {
  const groups = new Map<ComponentType, ComponentItem[]>()

  for (const item of items) {
    const existing = groups.get(item.type)
    if (existing) {
      existing.push(item)
    } else {
      groups.set(item.type, [item])
    }
  }

  return Array.from(groups.entries()).map(([type, groupItems]) => ({
    type,
    title: typeLabels[type] || type,
    items: groupItems,
  }))
}
