"use client";

import {
  PerceptionField,
  type PerceptionSector,
} from "@/components/thegridcn/perception-field";

const sectors: PerceptionSector[] = [
  {
    description: "Trace a sample, decode an event or magnify live data.",
    entries: [
      { href: "/components#control-rods", label: "Control Rods" },
      { href: "/components#machine-readout", label: "Machine Readout" },
      { href: "/components#focus-lens", label: "Focus Lens" },
    ],
    id: "inspect",
    title: "Inspection",
  },
  {
    description: "Read the shape of a signal before opening its instruments.",
    entries: [
      { href: "/components#radar", label: "Radar" },
      { href: "/components#metric-trend", label: "Metric Trend" },
      { href: "/components#usage-meter", label: "Usage Meter" },
    ],
    id: "signal",
    title: "Telemetry",
  },
  {
    description: "Explore playable cues and feedback for intentional actions.",
    entries: [
      { href: "/components#sound-pad", label: "Sound Pad" },
      { href: "/components#sound-action", label: "Sound Action" },
      { href: "/components#sound-sequence", label: "Sound Sequence" },
    ],
    id: "sound",
    title: "Audio",
  },
];

export function GalleryAtlas({ forceDom }: { forceDom?: boolean }) {
  return (
    <PerceptionField sectors={sectors} sound="select" forceDom={forceDom} />
  );
}
