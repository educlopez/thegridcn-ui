#!/usr/bin/env tsx
/**
 * Enhances individual registry JSON files with dependencies from registry.json
 * This ensures that when users install components, dependencies are included
 */

import { readFile, writeFile, readdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

async function enhanceRegistryFiles() {
  console.log("🔧 Enhancing registry files with dependencies...")

  try {
    // Load the main registry.json
    const registryPath = join(process.cwd(), "registry.json")
    if (!existsSync(registryPath)) {
      console.error("❌ registry.json not found")
      process.exit(1)
    }

    const registryContent = await readFile(registryPath, "utf-8")
    const registry = JSON.parse(registryContent)

    // Create a map of component name to registry entry
    const componentMap = new Map()
    for (const item of registry.items || []) {
      componentMap.set(item.name, item)
    }

    // Read all JSON files in public/r
    const publicRPath = join(process.cwd(), "public", "r")
    if (!existsSync(publicRPath)) {
      console.warn("⚠️  public/r directory not found. Run 'pnpm registry:build' first.")
      return
    }

    const files = await readdir(publicRPath)
    const jsonFiles = files.filter((f) => f.endsWith(".json") && f !== "registry.json")

    let updatedCount = 0

    for (const file of jsonFiles) {
      const filePath = join(publicRPath, file)
      const componentName = file.replace(".json", "")

      // Read the existing file
      const fileContent = await readFile(filePath, "utf-8")
      const componentData = JSON.parse(fileContent)

      // Get the registry entry for this component
      const registryEntry = componentMap.get(componentName)

      if (registryEntry) {
        // Enhance the file with dependencies and registryDependencies from registry.json
        // This ensures dependencies are always present even if shadcn build didn't include them
        const hasDeps = componentData.dependencies && componentData.dependencies.length > 0
        const hasRegistryDeps = componentData.registryDependencies && componentData.registryDependencies.length > 0
        const needsDeps = registryEntry.dependencies && registryEntry.dependencies.length > 0
        const needsRegistryDeps = registryEntry.registryDependencies && registryEntry.registryDependencies.length > 0

        // Only update if we need to add missing dependencies
        if ((needsDeps && !hasDeps) || (needsRegistryDeps && !hasRegistryDeps)) {
          const enhanced = {
            ...componentData,
            ...(registryEntry.dependencies && registryEntry.dependencies.length > 0 && {
              dependencies: registryEntry.dependencies,
            }),
            ...(registryEntry.registryDependencies && registryEntry.registryDependencies.length > 0 && {
              registryDependencies: registryEntry.registryDependencies,
            }),
          }

          await writeFile(
            filePath,
            JSON.stringify(enhanced, null, 2) + "\n",
            "utf-8"
          )
          updatedCount++
          console.log(`   ✓ Enhanced ${componentName} with dependencies`)
        }
      } else {
        console.warn(`   ⚠️  No registry entry found for ${componentName}`)
      }
    }

    console.log(`✅ Enhanced ${updatedCount} registry files with dependencies`)
  } catch (error) {
    console.error("❌ Failed to enhance registry files:", error)
    process.exit(1)
  }
}

enhanceRegistryFiles()
