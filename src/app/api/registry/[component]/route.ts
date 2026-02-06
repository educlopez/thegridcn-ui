import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

// Valid themes and intensities
const VALID_THEMES = ["tron", "ares", "clu", "athena", "aphrodite", "poseidon"] as const
const VALID_INTENSITIES = ["none", "light", "medium", "heavy"] as const

type Theme = (typeof VALID_THEMES)[number]
type Intensity = (typeof VALID_INTENSITIES)[number]

// Read CSS file content
async function readCssFile(filePath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), "src/styles", filePath)
    return await fs.readFile(fullPath, "utf-8")
  } catch {
    return ""
  }
}

// Read component registry JSON
async function readComponentRegistry(
  componentName: string
): Promise<Record<string, unknown> | null> {
  try {
    const filePath = path.join(process.cwd(), "public/r", `${componentName}.json`)
    const content = await fs.readFile(filePath, "utf-8")
    return JSON.parse(content)
  } catch {
    return null
  }
}

// Generate combined CSS based on theme and intensity
async function generateCss(theme: Theme, intensity: Intensity): Promise<string> {
  const cssPromises = [
    readCssFile(`themes/base.css`),
    readCssFile(`themes/${theme}.css`),
  ]

  if (intensity !== "none") {
    cssPromises.push(readCssFile(`intensity/${intensity}.css`))
  }

  const cssFiles = await Promise.all(cssPromises)
  return cssFiles.filter(Boolean).join("\n\n")
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ component: string }> }
) {
  const { component } = await params
  const searchParams = request.nextUrl.searchParams

  // Get theme and intensity from query params
  const theme = (searchParams.get("theme") || "tron") as Theme
  const intensity = (searchParams.get("intensity") || "medium") as Intensity

  // Validate theme
  if (!VALID_THEMES.includes(theme)) {
    return NextResponse.json(
      { error: `Invalid theme. Valid options: ${VALID_THEMES.join(", ")}` },
      { status: 400 }
    )
  }

  // Validate intensity
  if (!VALID_INTENSITIES.includes(intensity)) {
    return NextResponse.json(
      { error: `Invalid intensity. Valid options: ${VALID_INTENSITIES.join(", ")}` },
      { status: 400 }
    )
  }

  // Handle styles-only request
  if (component === "styles") {
    const css = await generateCss(theme, intensity)
    return NextResponse.json({
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: `thegridcn-styles-${theme}-${intensity}`,
      title: `TheGridcn Styles (${theme}, ${intensity})`,
      type: "registry:style",
      files: [
        {
          path: "src/styles/thegridcn.css",
          content: css,
          type: "registry:style",
        },
      ],
    })
  }

  // Start CSS generation and component registry read in parallel
  const [registry, css] = await Promise.all([
    readComponentRegistry(component),
    generateCss(theme, intensity),
  ])

  if (!registry) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 })
  }

  // Clone registry and add CSS file
  const files = (registry.files as Array<{ path: string; content: string; type: string }>) || []

  // Add CSS file to the registry
  const enhancedRegistry = {
    ...registry,
    files: [
      ...files,
      {
        path: "src/styles/thegridcn.css",
        content: css,
        type: "registry:style",
      },
    ],
  }

  return NextResponse.json(enhancedRegistry)
}
