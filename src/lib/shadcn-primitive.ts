import { getShadcnInstallItems } from "@/lib/registry-name";
import {
  getComponentsJson,
  getRegistryStyleName,
  type RegistryPrimitive,
} from "@/registry/design-system";

export const SHADCN_PRIMITIVES = [
  {
    id: "radix" as const,
    label: "Radix UI",
    style: "radix-vega",
  },
  {
    id: "base" as const,
    label: "Base UI",
    style: "base-vega",
  },
] as const;

export const DEFAULT_SHADCN_PRIMITIVE: RegistryPrimitive = "radix";
export const SHADCN_PRIMITIVE_STORAGE_KEY = "thegridcn-primitive:v1";

const primitiveIds = new Set<RegistryPrimitive>(
  SHADCN_PRIMITIVES.map((item) => item.id)
);

export function isRegistryPrimitive(
  value: string | null
): value is RegistryPrimitive {
  return value !== null && primitiveIds.has(value as RegistryPrimitive);
}

export function getPrimitivePreset(primitive: RegistryPrimitive): string {
  return `@thegridcn/${getRegistryStyleName(primitive)}`;
}

export function getPrimitiveMeta(primitive: RegistryPrimitive) {
  return (
    SHADCN_PRIMITIVES.find((item) => item.id === primitive) ??
    SHADCN_PRIMITIVES[0]
  );
}

export function buildShadcnAddCommand(
  addPrefix: string,
  primitive: RegistryPrimitive,
  items: string[] = []
): string {
  const parts = [getPrimitivePreset(primitive), ...items];
  return `${addPrefix} ${parts.join(" ")}`;
}

export function buildComponentInstallCommand(
  packageManagerPrefix: string,
  primitive: RegistryPrimitive,
  componentId: string,
  extraItems: string[] = []
): string {
  return buildShadcnAddCommand(packageManagerPrefix, primitive, [
    ...getShadcnInstallItems(componentId),
    ...extraItems,
  ]);
}

export function downloadComponentsJson(primitive: RegistryPrimitive): void {
  const blob = new Blob([getComponentsJson(primitive)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "components.json";
  link.click();
  URL.revokeObjectURL(url);
}
