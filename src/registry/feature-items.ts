/** Items whose install paths or extra source files cannot be inferred by the scanner. */
const productItems = [
  {
    description:
      "Decode readable events into their structured fields with a native HTML capture transition.",
    name: "machine-readout",
    registryDependencies: [
      "@thegridcn/grid-sounds",
      "@thegridcn/construction-surface",
    ],
    title: "Machine Readout",
  },
  {
    description:
      "Explore linked collections through locally subdividing sectors, with keyboard and touch controls.",
    name: "perception-field",
    registryDependencies: [
      "@thegridcn/grid-sounds",
      "@thegridcn/construction-surface",
    ],
    title: "Perception Field",
  },
  {
    description:
      "Pin an accessible time-series sample with a live HTML construction trace.",
    name: "control-rods",
    registryDependencies: [
      "@thegridcn/grid-sounds",
      "@thegridcn/construction-surface",
    ],
    title: "Control Rods",
  },
  {
    description:
      "Compare numeric snapshots and reconstruct only changed readings.",
    name: "scaffold-diff",
    registryDependencies: [
      "@thegridcn/grid-sounds",
      "@thegridcn/construction-surface",
    ],
    title: "Scaffold Diff",
  },
  {
    description:
      "An accessible pointer and keyboard slider to compare two images.",
    name: "before-after",
    title: "Before / After",
  },
  {
    description: "A compact KPI and dependency-free sparkline.",
    name: "metric-trend",
    title: "Metric Trend",
  },
  {
    description: "A quota meter with remaining or exceeded usage.",
    name: "usage-meter",
    title: "Usage Meter",
  },
  {
    description:
      "An async action with pending, success, and failure feedback and optional cues.",
    name: "sound-action",
    registryDependencies: ["@thegridcn/grid-sounds"],
    title: "Sound Action",
  },
] as const;

export const FEATURE_ITEMS = [
  {
    description:
      "Transient HTML-in-Canvas construction animation with a DOM fallback.",
    files: [
      {
        path: "src/components/thegridcn/effects/construction-surface.tsx",
        target: "@components/thegridcn/effects/construction-surface.tsx",
        type: "registry:lib",
      },
    ],
    name: "construction-surface",
    registryDependencies: ["@thegridcn/html-canvas-surface"],
    title: "Construction Surface",
    type: "registry:lib",
  },
  ...productItems.map((item) => ({
    ...item,
    files: [
      {
        path: `src/components/thegridcn/${item.name}.tsx`,
        target: `@components/thegridcn/${item.name}.tsx`,
        type: "registry:component" as const,
      },
    ],
    type: "registry:component" as const,
  })),
  {
    description:
      "A 3D glass fracture for any panel. Keeps its HTML and supports optional Grid Sounds.",
    files: [
      {
        path: "src/components/thegridcn/shatter.tsx",
        target: "@components/thegridcn/shatter.tsx",
        type: "registry:component",
      },
      {
        path: "src/components/thegridcn/effects/html-in-canvas.ts",
        target: "@components/thegridcn/effects/html-in-canvas.ts",
        type: "registry:component",
      },
      {
        path: "src/components/thegridcn/effects/shatter-renderer.ts",
        target: "@components/thegridcn/effects/shatter-renderer.ts",
        type: "registry:component",
      },
    ],
    name: "shatter",
    registryDependencies: [
      "@thegridcn/grid-sounds",
      "@thegridcn/html-canvas-surface",
    ],
    title: "Shatter",
    type: "registry:component",
  },
  {
    description:
      "Ten synthesized UI sounds, a persistent opt-in, and WAV export.",
    files: [
      {
        path: "src/lib/grid-sounds.ts",
        target: "@lib/grid-sounds.ts",
        type: "registry:lib",
      },
    ],
    name: "grid-sounds",
    title: "Grid Sounds",
    type: "registry:lib",
  },
  {
    dependencies: ["lucide-react"],
    description:
      "Audition a Grid Sounds cue with its amplitude envelope and duration.",
    files: [
      {
        path: "src/components/thegridcn/sound-pad.tsx",
        target: "@components/thegridcn/sound-pad.tsx",
        type: "registry:component",
      },
    ],
    name: "sound-pad",
    registryDependencies: ["@thegridcn/grid-sounds"],
    title: "Sound Pad",
    type: "registry:component",
  },
  {
    dependencies: ["lucide-react"],
    description:
      "Step through a sequence of actions with optional Grid Sounds cues.",
    files: [
      {
        path: "src/components/thegridcn/sound-sequence.tsx",
        target: "@components/thegridcn/sound-sequence.tsx",
        type: "registry:component",
      },
    ],
    name: "sound-sequence",
    registryDependencies: ["@thegridcn/grid-sounds"],
    title: "Sound Sequence",
    type: "registry:component",
  },
  {
    description:
      "Refract and magnify live data in WebGL, with pointer and keyboard controls and a DOM fallback.",
    files: [
      {
        path: "src/components/thegridcn/focus-lens.tsx",
        target: "@components/thegridcn/focus-lens.tsx",
        type: "registry:component",
      },
    ],
    name: "focus-lens",
    registryDependencies: [
      "@thegridcn/grid-sounds",
      "@thegridcn/html-canvas-surface",
    ],
    title: "Focus Lens",
    type: "registry:component",
  },
  {
    description:
      "Sweep a WebGL distortion across old and new HTML snapshots. Commits normally without canvas or with reduced motion.",
    files: [
      {
        path: "src/components/thegridcn/scan-reveal.tsx",
        target: "@components/thegridcn/scan-reveal.tsx",
        type: "registry:component",
      },
    ],
    name: "scan-reveal",
    registryDependencies: [
      "@thegridcn/grid-sounds",
      "@thegridcn/html-canvas-surface",
    ],
    title: "Scan Reveal",
    type: "registry:component",
  },
  {
    description:
      "Shared native HTML capture and DOM restoration for Gridcn effects.",
    files: [
      {
        path: "src/components/thegridcn/effects/inspection-webgl.ts",
        target: "@components/thegridcn/effects/inspection-webgl.ts",
        type: "registry:lib",
      },
      {
        path: "src/components/thegridcn/effects/html-canvas-surface.ts",
        target: "@components/thegridcn/effects/html-canvas-surface.ts",
        type: "registry:lib",
      },
    ],
    name: "html-canvas-surface",
    title: "HTML Canvas Surface",
    type: "registry:lib",
  },
] as const;

export type FeatureItem = (typeof FEATURE_ITEMS)[number];
