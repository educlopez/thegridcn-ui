import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ComponentItem, ComponentType } from "./component-data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const typeLabels: Record<ComponentType, string> = {
  block: "Blocks",
  button: "Buttons",
  data: "Data Display",
  feedback: "Feedback",
  form: "Form",
  layout: "Layout",
  navigation: "Navigation",
  overlay: "Overlay",
  "tron-movie": "GridCN",
};

export function groupComponentsByType(
  items: ComponentItem[]
): { type: ComponentType; title: string; items: ComponentItem[] }[] {
  const groups = new Map<ComponentType, ComponentItem[]>();

  for (const item of items) {
    const existing = groups.get(item.type);
    if (existing) {
      existing.push(item);
    } else {
      groups.set(item.type, [item]);
    }
  }

  return Array.from(groups.entries()).map(([type, groupItems]) => ({
    items: groupItems,
    title: typeLabels[type] || type,
    type,
  }));
}
