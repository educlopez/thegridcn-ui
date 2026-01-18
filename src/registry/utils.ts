/**
 * Registry utilities for working with the component registry
 */

import { getRegistryEntry, getAllRegistryEntries, getRegistryDependencies } from "./index"

/**
 * Get component metadata from registry
 */
export function getComponentMetadata(name: string) {
  return getRegistryEntry(name)
}

/**
 * Get all registered components
 */
export function getAllComponents() {
  return getAllRegistryEntries()
}

/**
 * Get component dependencies (other components this depends on)
 */
export function getComponentDependencies(name: string): string[] {
  return getRegistryDependencies(name)
}

/**
 * Check if a component is registered
 */
export function isComponentRegistered(name: string): boolean {
  return getRegistryEntry(name) !== undefined
}

/**
 * Get components that depend on a specific component
 */
export function getComponentsThatDependOn(name: string): string[] {
  const allComponents = getAllRegistryEntries()
  return allComponents
    .filter((component) => {
      const deps = component.registryDependencies || []
      return deps.includes(name)
    })
    .map((component) => component.name)
}

/**
 * Get the dependency tree for a component (all transitive dependencies)
 */
export function getDependencyTree(name: string, visited = new Set<string>()): string[] {
  if (visited.has(name)) {
    return [] // Circular dependency detected
  }

  visited.add(name)
  const entry = getRegistryEntry(name)
  if (!entry) {
    return []
  }

  const deps = entry.registryDependencies || []
  const allDeps: string[] = []

  for (const dep of deps) {
    allDeps.push(dep)
    const subDeps = getDependencyTree(dep, new Set(visited))
    allDeps.push(...subDeps)
  }

  return [...new Set(allDeps)]
}

/**
 * Get components in dependency order (dependencies first)
 */
export function getComponentsInDependencyOrder(): string[] {
  const allComponents = getAllRegistryEntries()
  const ordered: string[] = []
  const visited = new Set<string>()

  function visit(name: string) {
    if (visited.has(name)) {
      return
    }

    const entry = getRegistryEntry(name)
    if (!entry) {
      return
    }

    const deps = entry.registryDependencies || []
    for (const dep of deps) {
      visit(dep)
    }

    visited.add(name)
    ordered.push(name)
  }

  for (const component of allComponents) {
    visit(component.name)
  }

  return ordered
}
