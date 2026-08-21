import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import type { PackageJson } from "type-fest";

export interface ComponentDependency {
  name: string;
  type: "dependency" | "devDependency" | "peerDependency";
}

export interface ComponentFile {
  content: string;
  path: string;
  type: "component" | "utils" | "types";
}

export interface ComponentRegistryEntry {
  dependencies?: string[];
  devDependencies?: string[];
  files: Array<{
    path: string;
    content: string;
    type: "registry:ui" | "registry:component";
  }>;
  name: string;
  peerDependencies?: string[];
  registryDependencies?: string[];
  type: "components:ui" | "registry:component";
}

/**
 * Gets dependency version from package.json
 */
async function getDependencyVersion(
  depName: string,
  packageJsonPath: string = join(process.cwd(), "package.json")
): Promise<string | undefined> {
  try {
    const packageJsonContent = await readFile(packageJsonPath, "utf-8");
    const packageJson: PackageJson = JSON.parse(packageJsonContent);
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
      ...packageJson.peerDependencies,
    };
    return allDeps[depName] as string | undefined;
  } catch {}
}

/**
 * Scans a component file and extracts its dependencies
 */
export async function extractDependencies(
  filePath: string,
  content: string,
  includeVersions = false
): Promise<{
  dependencies: string[];
  registryDependencies: string[];
}> {
  const dependencies: string[] = [];
  const registryDependencies: string[] = [];

  // Extract imports - handle both named and default imports
  const importRegex =
    /import\s+(?:.*?\s+from\s+)?["'](@?[^"']+)["']|from\s+["'](@?[^"']+)["']/g;
  const matches = content.matchAll(importRegex);

  // Collect all import paths first, then process them
  const importPaths: string[] = [];
  for (const match of matches) {
    const importPath = match[1] || match[2];
    if (importPath) {
      importPaths.push(importPath);
    }
  }

  // Process imports
  for (const importPath of importPaths) {
    // Check if it's a local component import (registry dependency)
    if (importPath.startsWith("@/components/ui/")) {
      const componentName = basename(importPath, extname(importPath));
      const currentComponentName = basename(filePath, extname(filePath));
      if (componentName !== currentComponentName) {
        registryDependencies.push(componentName);
      }
    }
    // Check if it's a Radix UI dependency
    else if (importPath.startsWith("@radix-ui/")) {
      // Only add unique dependencies
      if (!dependencies.some((d) => d.startsWith(importPath))) {
        if (includeVersions) {
          const version = await getDependencyVersion(importPath);
          dependencies.push(version ? `${importPath}@${version}` : importPath);
        } else {
          dependencies.push(importPath);
        }
      }
    }
    // Check for other external dependencies that should be tracked
    else if (
      importPath === "lucide-react" ||
      importPath === "class-variance-authority" ||
      importPath === "clsx" ||
      importPath === "tailwind-merge" ||
      importPath === "cmdk" ||
      importPath === "date-fns" ||
      importPath === "embla-carousel-react" ||
      importPath === "input-otp" ||
      importPath === "react-day-picker" ||
      importPath === "recharts" ||
      importPath === "sonner" ||
      importPath === "vaul" ||
      importPath === "zod" ||
      importPath === "react-hook-form" ||
      importPath === "react-resizable-panels" ||
      importPath === "three" ||
      importPath === "@react-three/fiber" ||
      importPath === "@react-three/drei" ||
      importPath.startsWith("@react-three/")
    ) {
      // These are handled by the project dependencies, but we track them
      if (!dependencies.some((d) => d.startsWith(importPath))) {
        if (includeVersions) {
          const version = await getDependencyVersion(importPath);
          dependencies.push(version ? `${importPath}@${version}` : importPath);
        } else {
          dependencies.push(importPath);
        }
      }
    }
    // Skip local imports (utils, hooks, etc.) as they're part of the project
    else if (importPath.startsWith("@/")) {
    }
  }

  return {
    dependencies: [...new Set(dependencies)],
    registryDependencies: [...new Set(registryDependencies)],
  };
}

/**
 * Scans a single component directory and returns all component files
 */
async function scanComponentDirectory(
  componentsDir: string
): Promise<ComponentFile[]> {
  const components: ComponentFile[] = [];

  if (!existsSync(componentsDir)) {
    return components;
  }

  const files = await readdir(componentsDir, { withFileTypes: true });

  for (const file of files) {
    if (
      file.isFile() &&
      file.name.endsWith(".tsx") &&
      !file.name.endsWith(".test.tsx")
    ) {
      const filePath = join(componentsDir, file.name);
      const content = await readFile(filePath, "utf-8");

      components.push({
        content,
        path: filePath,
        type: "component",
      });
    }
  }

  return components;
}

/**
 * Scans all component directories and returns all component files
 */
export async function scanComponents(
  componentsDirs?: string[]
): Promise<ComponentFile[]> {
  // Default directories to scan
  const defaultDirs = [
    join(process.cwd(), "src/components/ui"),
    join(process.cwd(), "src/components/thegridcn"),
  ];

  const dirsToScan = componentsDirs || defaultDirs;
  const allComponents: ComponentFile[] = [];

  for (const dir of dirsToScan) {
    const components = await scanComponentDirectory(dir);
    allComponents.push(...components);
  }

  return allComponents;
}

/**
 * thegridcn filenames that collide with shadcn/ui base components (and
 * timeline, which is published under a prefixed name). Keep this in sync with
 * `getRegistryName` in src/components/components-page/preview.tsx.
 */
const THEGRIDCN_PREFIXED_NAMES = new Set([
  "alert",
  "badge",
  "pagination",
  "select",
  "skeleton",
  "slider",
  "tabs",
  "timeline",
  "toggle",
  "tooltip",
]);

/**
 * Determines the registry type based on component path
 */
function getRegistryType(
  componentPath: string
): "components:ui" | "registry:component" {
  if (componentPath.includes("/thegridcn/")) {
    return "registry:component";
  }
  return "components:ui";
}

function registryItemName(componentPath: string, fileName: string): string {
  if (
    componentPath.includes("/thegridcn/") &&
    THEGRIDCN_PREFIXED_NAMES.has(fileName)
  ) {
    return `thegridcn-${fileName}`;
  }
  return fileName;
}

/**
 * Generates registry entries for all components
 */
export async function generateRegistryEntries(
  componentsDirs?: string[],
  includeVersions = false
): Promise<ComponentRegistryEntry[]> {
  const components = await scanComponents(componentsDirs);
  const entries: ComponentRegistryEntry[] = [];

  for (const component of components) {
    const fileName = basename(component.path, ".tsx");
    const componentName = registryItemName(component.path, fileName);
    const { dependencies, registryDependencies } = await extractDependencies(
      component.path,
      component.content,
      includeVersions
    );

    // Convert file path to relative path from project root
    // Use forward slashes for consistency across platforms
    const relativePath = component.path
      .replace(process.cwd(), "")
      .replace(/\\/g, "/")
      .replace(/^\//, "");

    const registryType = getRegistryType(component.path);

    entries.push({
      dependencies: dependencies.length > 0 ? dependencies : undefined,
      files: [
        {
          content: component.content,
          path: relativePath,
          type:
            registryType === "components:ui"
              ? "registry:ui"
              : "registry:component",
        },
      ],
      name: componentName,
      registryDependencies:
        registryDependencies.length > 0 ? registryDependencies : undefined,
      type: registryType,
    });
  }

  return entries.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Generates a registry index object compatible with shadcn UI registry format
 */
export async function generateRegistryIndex(
  componentsDirs?: string[]
): Promise<Record<string, ComponentRegistryEntry>> {
  const entries = await generateRegistryEntries(componentsDirs);
  const index: Record<string, ComponentRegistryEntry> = {};

  for (const entry of entries) {
    index[entry.name] = entry;
  }

  return index;
}

/**
 * Registry item for shadcn UI registry.json format
 */
export interface RegistryItem {
  dependencies?: string[];
  description?: string;
  files: Array<{
    path: string;
    type: "registry:component";
  }>;
  name: string;
  registryDependencies?: string[];
  title: string;
  type: "registry:component";
}

/**
 * Shadcn UI registry.json format
 */
export interface ShadcnRegistry {
  $schema: string;
  homepage?: string;
  items: RegistryItem[];
  name: string;
}

/**
 * Converts component name to title (e.g., "alert-dialog" -> "Alert Dialog")
 */
function componentNameToTitle(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Extracts description from component file content
 */
function extractDescription(content: string): string | undefined {
  // Look for JSDoc comments with @description or first line
  // Use [\s\S] instead of . with s flag for ES2017 compatibility
  const jsdocMatch = content.match(
    /\/\*\*\s*\n\s*\*\s*(?:@description\s+)?([\s\S]+?)(?:\s*\n\s*\*\/|\s*\n\s*\*\s*@)/
  );
  if (jsdocMatch) {
    const desc = jsdocMatch[1].trim();
    // Remove @description tag if present
    return desc.replace(/^@description\s+/, "").trim();
  }

  // Look for multi-line JSDoc
  const multilineJsdoc = content.match(/\/\*\*\s*\n([\s\S]*?)\s*\*\//);
  if (multilineJsdoc) {
    const lines = multilineJsdoc[1]
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s*/, "").trim())
      .filter((line) => line && !line.startsWith("@"));
    if (lines.length > 0) {
      return lines[0];
    }
  }

  // Look for single-line comments before export or function
  const commentMatch = content.match(/\/\/\s*(.+?)\s*\n\s*(?:export|function)/);
  if (commentMatch) {
    return commentMatch[1].trim();
  }
}

/**
 * Generates shadcn UI registry.json format
 */
export async function generateShadcnRegistry(
  componentsDirs?: string[],
  options?: {
    name?: string;
    homepage?: string;
    includeVersions?: boolean;
  }
): Promise<ShadcnRegistry> {
  const entries = await generateRegistryEntries(
    componentsDirs,
    options?.includeVersions
  );
  const items: RegistryItem[] = [];

  for (const entry of entries) {
    const fileContent = entry.files[0]?.content || "";
    const description = extractDescription(fileContent);

    // All items in shadcn registry format use "registry:component" type
    const itemType = "registry:component" as const;

    items.push({
      dependencies:
        entry.dependencies && entry.dependencies.length > 0
          ? entry.dependencies
          : undefined,
      description,
      files: entry.files.map((file) => ({
        path: file.path,
        type: itemType,
      })),
      name: entry.name,
      registryDependencies:
        entry.registryDependencies && entry.registryDependencies.length > 0
          ? entry.registryDependencies
          : undefined,
      title: componentNameToTitle(entry.name),
      type: itemType,
    });
  }

  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    homepage: options?.homepage,
    items: items.sort((a, b) => a.name.localeCompare(b.name)),
    name: options?.name || "thegridcn",
  };
}
