import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Route handler to serve individual registry item JSON files
 * Matches: /r/[name].json
 *
 * This allows the shadcn CLI to fetch individual components:
 * npx shadcn@latest add http://localhost:3000/r/button.json
 *
 * Note: In production, Next.js will serve static files from public/r/ automatically.
 * This route handler provides a fallback if files don't exist in public/r/.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;

    // Remove .json extension if present
    const componentName = name.replace(/\.json$/, "");

    const publicPath = join(
      process.cwd(),
      "public",
      "r",
      `${componentName}.json`
    );
    if (existsSync(publicPath)) {
      const content = await readFile(publicPath, "utf-8");
      return NextResponse.json(JSON.parse(content), {
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
          "Content-Type": "application/json",
        },
      });
    }

    const registryPath = join(process.cwd(), "registry.json");
    if (existsSync(registryPath)) {
      const registryContent = await readFile(registryPath, "utf-8");
      const registry = JSON.parse(registryContent);

      const item = registry.items?.find(
        (item: { name: string }) => item.name === componentName
      );

      if (item) {
        return NextResponse.json(item, {
          headers: {
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
            "Content-Type": "application/json",
          },
        });
      }
    }

    return NextResponse.json(
      { error: `Registry item "${componentName}" not found` },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error serving registry item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
