#!/usr/bin/env tsx
/**
 * Generates registry JSON files for themes and intensities.
 * Output: public/r/theme-{name}.json and public/r/intensity-{name}.json
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const THEMES = [
  "tron",
  "ares",
  "clu",
  "athena",
  "aphrodite",
  "poseidon",
] as const;
const INTENSITIES = ["none", "light", "medium", "heavy"] as const;

const THEME_TITLES: Record<string, string> = {
  aphrodite: "Aphrodite (Pink)",
  ares: "Ares (Red)",
  athena: "Athena (Gold)",
  clu: "Clu (Orange)",
  poseidon: "Poseidon (Blue)",
  tron: "Tron (Cyan)",
};

const INTENSITY_TITLES: Record<string, string> = {
  heavy: "Heavy - Full HUD aesthetic",
  light: "Light - Subtle glows",
  medium: "Medium - Glowing borders with brackets",
  none: "None - No glow effects",
};

async function readCss(filePath: string): Promise<string> {
  return readFile(join(process.cwd(), "src/styles", filePath), "utf-8");
}

async function buildThemeFiles() {
  const baseCss = await readCss("themes/base.css");

  for (const theme of THEMES) {
    const themeCss = await readCss(`themes/${theme}.css`);
    const combined = `${baseCss}\n\n${themeCss}`;

    const registry = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      files: [
        {
          content: combined,
          path: "src/styles/thegridcn-theme.css",
          type: "registry:style",
        },
      ],
      name: `theme-${theme}`,
      title: `TheGridcn Theme: ${THEME_TITLES[theme]}`,
      type: "registry:style",
    };

    const outPath = join(process.cwd(), "public/r", `theme-${theme}.json`);
    await writeFile(outPath, `${JSON.stringify(registry, null, 2)}\n`);
    console.log(`  ✓ theme-${theme}.json`);
  }
}

async function buildIntensityFiles() {
  for (const intensity of INTENSITIES) {
    const css = await readCss(`intensity/${intensity}.css`);

    const registry = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      files: [
        {
          content: css,
          path: "src/styles/thegridcn-intensity.css",
          type: "registry:style",
        },
      ],
      name: `intensity-${intensity}`,
      title: `TheGridcn Intensity: ${INTENSITY_TITLES[intensity]}`,
      type: "registry:style",
    };

    const outPath = join(
      process.cwd(),
      "public/r",
      `intensity-${intensity}.json`
    );
    await writeFile(outPath, `${JSON.stringify(registry, null, 2)}\n`);
    console.log(`  ✓ intensity-${intensity}.json`);
  }
}

async function main() {
  console.log("📦 Building registry style files...");

  // Ensure output directory exists
  await mkdir(join(process.cwd(), "public/r"), { recursive: true });

  await buildThemeFiles();
  await buildIntensityFiles();

  console.log("✅ Registry style files generated!");
}

main().catch((err) => {
  console.error("❌ Failed to build registry styles:", err);
  process.exit(1);
});
