/**
 * Map showcase component IDs to shadcn registry item names.
 * Keep in sync with THEGRIDCN_PREFIXED_NAMES in src/registry/scanner.ts.
 */
const SPECIAL_REGISTRY_NAMES: Record<string, string> = {
  "alert-banner": "thegridcn-alert",
  badge: "thegridcn-badge",
  "grid-3d": "grid",
  pagination: "thegridcn-pagination",
  select: "thegridcn-select",
  "sidebar-nav": "sidebar",
  skeleton: "thegridcn-skeleton",
  slider: "thegridcn-slider",
  tabs: "thegridcn-tabs",
  timeline: "thegridcn-timeline",
  toggle: "thegridcn-toggle",
  tooltip: "thegridcn-tooltip",
};

export function getRegistryName(componentId: string): string | null {
  if (SPECIAL_REGISTRY_NAMES[componentId]) {
    return SPECIAL_REGISTRY_NAMES[componentId];
  }

  if (componentId.endsWith("-example")) {
    return componentId.replace(/-example$/, "");
  }

  return componentId;
}

export function isOfficialShadcnPrimitive(componentId: string): boolean {
  return componentId.endsWith("-example");
}

export function getShadcnInstallItems(componentId: string): string[] {
  const name = getRegistryName(componentId);
  if (!name) {
    return [];
  }

  if (isOfficialShadcnPrimitive(componentId)) {
    return [name];
  }

  return [`@thegridcn/${name}`];
}
