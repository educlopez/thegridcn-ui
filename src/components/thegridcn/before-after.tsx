"use client";

import { useId, useState } from "react";

interface ComparisonImage {
  alt: string;
  src: string;
}

export interface BeforeAfterProps {
  after: ComparisonImage;
  before: ComparisonImage;
  label: string;
}

/** Compare a pair of static images with a native pointer and keyboard slider. */
export function BeforeAfter({ after, before, label }: BeforeAfterProps) {
  const id = useId();
  const [position, setPosition] = useState(50);
  return (
    <figure className="min-w-0 overflow-hidden rounded-lg border border-primary/25 bg-background">
      <div className="relative isolate aspect-video overflow-hidden bg-primary/5">
        {
          // biome-ignore lint/performance/noImgElement: Registry consumers do not need Next.js.
          <img
            alt={`Before: ${before.alt}`}
            className="absolute inset-0 z-10 h-full w-full object-cover"
            height={360}
            src={before.src}
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            width={640}
          />
        }
        {
          // biome-ignore lint/performance/noImgElement: Registry consumers do not need Next.js.
          <img
            alt={`After: ${after.alt}`}
            className="absolute inset-0 h-full w-full object-cover"
            height={360}
            src={after.src}
            width={640}
          />
        }
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 z-20 w-px bg-primary shadow-[0_0_10px_var(--primary)]"
          style={{ left: `${position}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute top-2 left-2 z-20 rounded border border-primary/25 bg-background/90 px-2 py-1 font-mono text-xs"
        >
          Before
        </span>
        <span
          aria-hidden="true"
          className="absolute top-2 right-2 z-20 rounded border border-primary/25 bg-background/90 px-2 py-1 font-mono text-xs"
        >
          After
        </span>
      </div>
      <figcaption className="space-y-1 border-primary/25 border-t p-3">
        <label className="font-medium text-sm" htmlFor={id}>
          {label}
        </label>
        <input
          aria-valuetext={`${position}% before, ${100 - position}% after`}
          className="block h-11 w-full cursor-ew-resize accent-primary focus-visible:outline-2 focus-visible:outline-primary"
          id={id}
          max={100}
          min={0}
          onChange={(event) => setPosition(event.currentTarget.valueAsNumber)}
          type="range"
          value={position}
        />
      </figcaption>
    </figure>
  );
}
