"use client";

import { type GridSound, playGridSound } from "@/lib/grid-sounds";
import { ConstructionSurface } from "./effects/construction-surface";

export interface RodSample {
  id: string;
  label: string;
  value: number;
}
export interface ControlRodsProps {
  ceiling?: number;
  forceDom?: boolean;
  label?: string;
  onPin: (id: string | null) => void;
  pinned: string | null;
  samples: readonly RodSample[];
  sound?: GridSound | false;
  unit?: string;
}

export function ControlRods({
  samples,
  pinned,
  onPin,
  unit = "",
  label = "Signal",
  ceiling,
  sound,
  forceDom,
}: ControlRodsProps) {
  const points = samples.filter((s) => Number.isFinite(s.value));
  if (!points.length) {
    return <p>No samples available.</p>;
  }
  const low = Math.min(0, ...points.map((p) => p.value));
  const high = Math.max(
    low + 1,
    Number.isFinite(ceiling) ? (ceiling ?? 0) : 0,
    ...points.map((p) => p.value)
  );
  const plot = points.map((p, i) => ({
    ...p,
    x: (100 * (i + 0.5)) / points.length,
    y: 88 - (68 * (p.value - low)) / (high - low),
  }));
  const selected = plot.find((p) => p.id === pinned);
  return (
    <section aria-label={label} className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
        <strong className="uppercase tracking-widest">{label}</strong>
        <span className="text-primary" role="status">
          {selected
            ? `Pinned · ${selected.label} · ${selected.value} ${unit}`
            : "Select a sample to pin its reading"}
        </span>
      </div>
      <div className="relative rounded border border-primary/30 bg-primary/5">
        <ConstructionSurface
          forceDom={forceDom}
          mode="rod"
          revision={selected ? `${selected.id}:${selected.value}` : ""}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="block h-36 w-full text-primary"
          >
            <path
              d="M0 20H100 M0 54H100 M0 88H100"
              stroke="currentColor"
              opacity=".18"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="3 4"
            />
            <polyline
              points={plot.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            {selected && (
              <path
                d={`M${selected.x} ${selected.y}V8H${selected.x > 50 ? 5 : 95}`}
                fill="none"
                stroke="currentColor"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>
          {selected && (
            <span
              aria-hidden="true"
              style={selected.x > 50 ? { left: "5%" } : { right: "5%" }}
              className="absolute top-1 rounded-sm border border-primary/50 bg-background px-1.5 font-mono text-primary text-xs"
            >
              {selected.label} / {selected.value} {unit}
            </span>
          )}
        </ConstructionSurface>
        <div className="absolute inset-0 flex">
          {plot.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-label={`${p.label}, ${p.value} ${unit}`}
              aria-pressed={p.id === pinned}
              className="group relative min-w-0 flex-1 rounded-sm hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary"
              onClick={() => {
                onPin(p.id === pinned ? null : p.id);
                if (sound && p.id !== pinned) {
                  playGridSound(sound);
                }
              }}
            >
              <span
                style={{ top: `${p.y}%` }}
                className="absolute left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-background group-aria-pressed:size-3 group-aria-pressed:bg-primary"
              />
            </button>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="flex justify-between font-mono text-muted-foreground text-xs"
      >
        <span>{points[0].label}</span>
        <span>{points.at(-1)?.label}</span>
      </div>
    </section>
  );
}
