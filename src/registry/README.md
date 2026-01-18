# Component Registry

This directory contains the auto-registry system for shadcn UI components. The registry automatically scans and registers all components in the `src/components/ui/` directory.

## Overview

The registry system provides:
- **Automatic component discovery**: Scans the `src/components/ui/` directory
- **Dependency tracking**: Automatically detects component dependencies
- **Registry index**: Generates a TypeScript registry index for programmatic access
- **shadcn UI compatibility**: Updates `components.json` with registry configuration

## Usage

### Update the Registry

To scan and update the registry with all components:

```bash
pnpm registry:update
```

This command will:
1. Scan all components in `src/components/ui/`
2. Extract dependencies and registry dependencies
3. Update `components.json` with the registry
4. Generate `src/registry/index.ts` with the registry index
5. Generate `registry.json` in shadcn UI registry format

### Using the Registry Programmatically

```typescript
import { 
  getRegistryEntry, 
  getAllRegistryEntries,
  getRegistryDependencies 
} from "@/registry"

// Get a specific component's registry entry
const buttonEntry = getRegistryEntry("button")

// Get all registered components
const allComponents = getAllRegistryEntries()

// Get component dependencies
const deps = getRegistryDependencies("alert-dialog")
// Returns: ["button"]
```

### Using Registry Utilities

```typescript
import {
  getComponentMetadata,
  getAllComponents,
  getComponentDependencies,
  isComponentRegistered,
  getComponentsThatDependOn,
  getDependencyTree,
  getComponentsInDependencyOrder
} from "@/registry/utils"

// Check if a component is registered
if (isComponentRegistered("button")) {
  // Component is available
}

// Get dependency tree (all transitive dependencies)
const tree = getDependencyTree("alert-dialog")
// Returns: ["button"]

// Get components in dependency order (dependencies first)
const ordered = getComponentsInDependencyOrder()
```

## Registry Structure

Each component entry in the registry contains:

```typescript
{
  name: string                    // Component name (e.g., "button")
  type: "components:ui"          // Component type
  registryDependencies?: string[] // Other components this depends on
  files: Array<{                 // Component files
    path: string                 // Relative path from project root
    content: string              // Full file content
    type: "registry:ui"
  }>
  dependencies?: string[]        // External npm dependencies
}
```

## How It Works

1. **Scanner** (`scanner.ts`): Scans the components directory and extracts metadata
2. **Dependency Extraction**: Parses imports to detect:
   - Registry dependencies (other components)
   - External dependencies (npm packages)
3. **Registry Generation**: Creates registry entries in shadcn UI format
4. **Index Generation**: Generates TypeScript index for programmatic access

## Adding New Components

When you add a new component to `src/components/ui/`:

1. Create your component file (e.g., `my-component.tsx`)
2. Run `pnpm registry:update` to register it
3. The component will be automatically added to the registry

## Registry Dependencies

Components that import other components from `@/components/ui/` will automatically have those listed as `registryDependencies`. For example:

- `alert-dialog` depends on `button`
- `dialog` has no registry dependencies
- `form` depends on `button`, `input`, `label`, etc.

## Registry Files

The registry system generates three files:

1. **`registry.json`**: shadcn UI registry format file that can be used with the shadcn UI CLI
   - Format: `{ $schema, name, homepage, items: [...] }`
   - Each item includes: `name`, `type`, `title`, `files`, and optional `registryDependencies`
   - This is the main registry file for sharing/publishing your component library

2. **`components.json`**: Updated with registry configuration for local use

3. **`src/registry/index.ts`**: TypeScript registry index for programmatic access

## Building the Registry

To build individual registry JSON files for serving:

```bash
pnpm registry:build
```

This command uses the `shadcn build` CLI to generate individual JSON files for each component in `public/r/[name].json`. These files can be served individually by the Next.js server.

**Note:** By default, the build script generates files in `public/r/`. You can change the output directory by passing the `--output` option:

```bash
pnpm registry:build --output public/registry
```

## Serving the Registry

### Development

When running the Next.js development server:

```bash
pnpm dev
```

Individual registry items are automatically served at:
- `http://localhost:3000/r/[name].json` (e.g., `http://localhost:3000/r/button.json`)

The route handler (`src/app/r/[name]/route.ts`) will:
1. First try to serve from `public/r/[name].json` (if built with `registry:build`)
2. Fallback to generating on-the-fly from `registry.json`

### Production

**Yes, the `public/r/` folder will be included in production!**

The production build process:

1. **Automatic build**: The `build` script now automatically runs `registry:build` first:
   ```bash
   pnpm build  # Runs: registry:build && next build
   ```

2. **Static files**: Files in `public/r/` are automatically included in the Next.js build and served as static assets

3. **Route handler**: The route handler at `/r/[name]/route.ts` serves the files:
   - First tries to read from `public/r/[name].json` (static files)
   - Falls back to generating from `registry.json` if static files don't exist

4. **Deployment**: After deployment, your registry will be available at:
   - `https://your-domain.com/r/button.json`
   - `https://your-domain.com/r/alert-dialog.json`
   - etc.

**Important**: Make sure to run `pnpm build` (which includes `registry:build`) before deploying to ensure all registry files are generated and included in the production bundle.

See [PRODUCTION.md](./PRODUCTION.md) for more details on production setup.

## Installing Components from Your Registry

### Using Individual Component URLs

You can install components directly using their individual JSON URLs:

```bash
npx shadcn@latest add http://localhost:3000/r/button.json
```

### Using the Registry File

You can also use the main registry file:

```bash
npx shadcn@latest add --registry ./registry.json button
```

### From a Published Registry

Once you deploy your registry to a public URL, others can install components:

```bash
npx shadcn@latest add https://your-domain.com/r/button.json
```

## Registry Item Format

Each registry item in `registry.json` follows the shadcn UI registry schema:

```json
{
  "name": "button",
  "type": "registry:component",
  "title": "Button",
  "description": "A button component with variants.",
  "files": [
    {
      "path": "src/components/ui/button.tsx",
      "type": "registry:component"
    }
  ],
  "registryDependencies": [],
  "dependencies": [
    "@radix-ui/react-slot@^1.2.4",
    "class-variance-authority@^0.7.1"
  ]
}
```

### Dependencies

- **`registryDependencies`**: Other components in your registry that this component depends on (e.g., `["button"]` for `alert-dialog`)
- **`dependencies`**: External npm packages with optional version specifiers (e.g., `"zod@^3.20.0"`)

The scanner automatically:
- Extracts dependency versions from `package.json` when `includeVersions` is enabled
- Detects registry dependencies from `@/components/ui/` imports
- Formats dependencies in the `name@version` format when versions are available

## Guidelines

When building components for the registry:

- **Component location**: Components are in `src/components/ui/` (not `registry/` directory)
- **Required properties**: `name`, `type`, `title`, and `files` are required
- **Descriptions**: Add JSDoc comments or descriptions to help LLMs understand components:
  ```tsx
  /**
   * A button component with multiple variants and sizes.
   */
  export function Button() { ... }
  ```
- **Registry dependencies**: Always list components this depends on in `registryDependencies`
- **Dependencies**: List all npm packages in `dependencies` with versions when possible
- **Imports**: Use `@/components/ui/` for component imports (automatically detected)

## Workflow

1. **Add a new component** to `src/components/ui/`
2. **Update the registry**: `pnpm registry:update`
3. **Build individual files** (optional): `pnpm registry:build`
4. **Test installation**: `npx shadcn@latest add http://localhost:3000/r/your-component.json`
5. **Deploy** your registry to make it publicly available
