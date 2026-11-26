"use client";

import { ArrowUpRight, Box, Layers3, ScanLine } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DeploymentPreview } from "@/components/components-page/previews/deployment-preview";
import {
  ContrastLensPreview,
  FocusLensPreview,
  PixelResolvePreview,
  PrismFoldPreview,
  PulseRevealPreview,
  ScanRevealPreview,
} from "@/components/components-page/previews/inspection-effect-previews";
import { MachineReadoutPreview } from "@/components/components-page/previews/machine-readout-preview";
import { protocolEffects } from "@/components/components-page/previews/protocol-previews";
import { ShatterPreview } from "@/components/components-page/previews/shatter-preview";
import { CopyButton } from "@/components/thegridcn/copy-button";
import { selectableThemes, useTheme } from "@/components/theme";
import { GalleryAtlas } from "@/components/website/gallery-atlas";
import { getShadcnInstallItems } from "@/lib/registry-name";

const collection = [
  {
    Demo: MachineReadoutPreview,
    description:
      "Decode a settlement event into the fields behind its human-readable summary.",
    group: "Inspect",
    id: "machine-readout",
    title: "Machine Readout",
  },
  {
    Demo: GalleryAtlas,
    description:
      "Move across a sector or select it to resolve a family into individual components.",
    group: "Inspect",
    id: "perception-field",
    title: "Perception Field",
  },
  {
    Demo: DeploymentPreview,
    description:
      "Pin a latency sample and compare the same instant across two releases.",
    group: "Inspect",
    id: "control-rods",
    title: "Control Rods + Scaffold Diff",
  },
  ...protocolEffects,
  {
    Demo: PrismFoldPreview,
    description:
      "A diagonal crease bends the old interface as it folds into the new state.",
    group: "Transform",
    id: "prism-fold",
    title: "Prism Fold",
  },
  {
    Demo: ShatterPreview,
    description:
      "Fracture the whole panel into thin glass and snap it back together.",
    group: "Transform",
    id: "shatter",
    title: "Shatter",
  },
  {
    Demo: FocusLensPreview,
    description: "Magnify text and move a refractive edge over a live table.",
    group: "Inspect",
    id: "focus-lens",
    title: "Focus Lens",
  },
  {
    Demo: ContrastLensPreview,
    description:
      "Lift faint details while keeping the center of the lens readable.",
    group: "Inspect",
    id: "contrast-lens",
    title: "Contrast Lens",
  },
  {
    Demo: ScanRevealPreview,
    description:
      "Distort the digits that change where the scan crosses an update.",
    group: "Reveal",
    id: "scan-reveal",
    title: "Scan Reveal",
  },
  {
    Demo: PixelResolvePreview,
    description: "Rebuild a panel in tiles to show the next state.",
    group: "Reveal",
    id: "pixel-resolve",
    title: "Pixel Resolve",
  },
  {
    Demo: PulseRevealPreview,
    description:
      "Propagate a data update from the center out with a radial pulse.",
    group: "Reveal",
    id: "pulse-reveal",
    title: "Pulse Reveal",
  },
] as const;
const groups = [
  { Icon: Box, label: "Transform" },
  { Icon: ScanLine, label: "Inspect" },
  { Icon: Layers3, label: "Reveal" },
] as const;
const renderers = [
  { label: "Auto", value: false },
  { label: "DOM only", value: true },
] as const;
const pressedClass =
  "inline-flex min-h-11 items-center rounded border border-primary/25 px-3 text-left text-sm hover:border-primary/60 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 aria-pressed:border-primary/60 aria-pressed:bg-primary/15 aria-pressed:text-primary";

export function EffectsWorkbench() {
  const { theme, setTheme } = useTheme();
  const [id, setId] =
    useState<(typeof collection)[number]["id"]>("control-rods");
  const [forceDom, setForceDom] = useState(false);
  const active = collection.find((item) => item.id === id) ?? collection[0];
  const { Demo } = active;
  const demoProps =
    active.group === "Inspect" ? { direct: true, forceDom } : { forceDom };
  const items =
    active.id === "control-rods"
      ? ["control-rods", "scaffold-diff"]
      : [active.id];
  const command = `npx shadcn@latest add ${items.flatMap(getShadcnInstallItems).join(" ")}`;
  return (
    <div className="grid min-w-0 gap-5 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
      <fieldset className="grid min-w-0 gap-3 sm:grid-cols-3 lg:grid-cols-1">
        <legend className="sr-only">Choose an effect</legend>
        {groups.map(({ label, Icon }) => (
          <div
            className="grid grid-cols-2 content-start gap-1.5 rounded border border-primary/20 bg-primary/5 p-2.5 sm:grid-cols-1"
            key={label}
          >
            <p className="col-span-full mb-1 flex items-center gap-2 px-1 font-mono text-muted-foreground text-xs">
              <Icon aria-hidden="true" className="text-primary" size={14} />
              {label}
            </p>
            {collection
              .filter((item) => item.group === label)
              .map((item) => (
                <button
                  aria-pressed={item.id === id}
                  className={pressedClass}
                  key={item.id}
                  onClick={() => setId(item.id)}
                  type="button"
                >
                  {item.title}
                </button>
              ))}
          </div>
        ))}
      </fieldset>

      <section
        aria-labelledby="live-effect"
        className="min-w-0 rounded-lg border border-primary/30 bg-background"
      >
        <header className="flex flex-wrap items-start justify-between gap-4 border-primary/25 border-b bg-primary/5 p-4 sm:p-5">
          <div>
            <p className="mb-1 font-mono text-primary text-xs tracking-widest">
              LIVE SURFACE
            </p>
            <h2 className="font-display text-xl sm:text-2xl" id="live-effect">
              {active.title}
            </h2>
            <p className="mt-2 max-w-md text-muted-foreground text-sm">
              {active.description}
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
            <label className="grid gap-1 font-mono text-muted-foreground text-xs">
              Theme
              <select
                className="min-h-11 rounded border border-primary/25 bg-background px-2 text-foreground text-sm focus-visible:outline-2 focus-visible:outline-primary"
                onChange={(event) => {
                  const choice = selectableThemes.find(
                    (item) => item.id === event.currentTarget.value
                  );
                  if (choice) {
                    setTheme(choice.id);
                  }
                }}
                value={theme}
              >
                {theme === "creator" && (
                  <option value="creator">Creator</option>
                )}
                {selectableThemes.map(({ id: themeId, name }) => (
                  <option key={themeId} value={themeId}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <fieldset className="min-w-0">
              <legend className="mb-1 font-mono text-muted-foreground text-xs">
                Renderer
              </legend>
              <div className="flex gap-1.5">
                {renderers.map(({ label, value }) => (
                  <button
                    aria-pressed={forceDom === value}
                    className={pressedClass}
                    key={label}
                    onClick={() => setForceDom(value)}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </header>
        <div className="min-w-0 p-3 sm:p-6">
          <Demo {...demoProps} key={`${active.id}-${forceDom}`} />
        </div>
        <footer className="grid min-w-0 gap-2 border-primary/25 border-t px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center justify-between gap-2 rounded border border-primary/20 bg-primary/5 pl-2.5">
            <code className="overflow-x-auto whitespace-nowrap font-mono text-xs">
              {command}
            </code>
            <CopyButton
              className="m-1 min-h-11 shrink-0 text-xs"
              value={command}
              variant="outline"
            />
          </div>
          <Link
            className="inline-flex min-h-11 w-fit items-center gap-2 text-primary text-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
            href={`/components#${active.id}`}
          >
            Open in Components <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </footer>
      </section>
    </div>
  );
}
