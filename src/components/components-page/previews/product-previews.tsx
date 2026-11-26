"use client";

import { useState } from "react";
import { BeforeAfter } from "@/components/thegridcn/before-after";
import { MetricTrend } from "@/components/thegridcn/metric-trend";
import { SoundAction } from "@/components/thegridcn/sound-action";
import { UsageMeter } from "@/components/thegridcn/usage-meter";

const trendWindows = {
  "7 days": {
    caption: "Down 21 ms over the last 7 days",
    samples: [61, 53, 58, 49, 50, 44, 40],
    value: "40 ms",
  },
  "24 hours": {
    caption: "Down 14 ms over the last 24 hours",
    samples: [54, 51, 53, 45, 49, 44, 43, 40],
    value: "40 ms",
  },
};
const windowOptions = ["24 hours", "7 days"] as const;
const control =
  "inline-flex min-h-11 items-center rounded border border-primary/30 px-3 font-mono text-primary text-xs hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 aria-pressed:bg-primary/15";

export function MetricTrendPreview() {
  const [window, setWindow] =
    useState<(typeof windowOptions)[number]>("24 hours");
  return (
    <div className="mx-auto max-w-xl space-y-3">
      <div className="flex flex-wrap gap-2">
        {windowOptions.map((option) => (
          <button
            aria-pressed={window === option}
            className={control}
            key={option}
            onClick={() => setWindow(option)}
            type="button"
          >
            {option}
          </button>
        ))}
      </div>
      <MetricTrend label="API latency · p95" {...trendWindows[window]} />
    </div>
  );
}

export function UsageMeterPreview() {
  const [used, setUsed] = useState(74);
  return (
    <div className="mx-auto max-w-xl space-y-3">
      <UsageMeter
        formatValue={(amount) => `${amount} GB`}
        label="Workspace storage"
        limit={100}
        used={used}
      />
      <div className="flex flex-wrap gap-2">
        <button
          className={control}
          disabled={used >= 110}
          onClick={() => setUsed(used + 12)}
          type="button"
        >
          Add 12 GB
        </button>
        <button className={control} onClick={() => setUsed(74)} type="button">
          Reset usage
        </button>
      </div>
    </div>
  );
}

export function BeforeAfterPreview() {
  return (
    <div className="mx-auto max-w-2xl">
      <BeforeAfter
        after={{
          alt: "Unified release overview with a deployment trend and three status metrics",
          src: "/effects-assets/release-after.svg",
        }}
        before={{
          alt: "Release overview with rows of individual build logs",
          src: "/effects-assets/release-before.svg",
        }}
        label="Compare release overview layouts"
      />
    </div>
  );
}

export function SoundActionPreview() {
  const [fail, setFail] = useState(false);
  return (
    <div className="mx-auto max-w-xl space-y-3 rounded-lg border border-primary/25 bg-background p-4">
      <p className="text-muted-foreground text-sm">
        Save a sample report. Enable site sound to hear the result.
      </p>
      <label className="flex min-h-11 items-center gap-2 text-sm">
        <input
          checked={fail}
          className="accent-primary"
          onChange={(event) => setFail(event.currentTarget.checked)}
          type="checkbox"
        />
        Simulate a failure
      </label>
      <SoundAction
        action={async () => {
          await new Promise((resolve) => setTimeout(resolve, 450));
          if (fail) {
            throw new Error("Simulated failure");
          }
        }}
        label="Save report"
        messages={{
          error: "Could not save report.",
          pending: "Saving report…",
          success: "Report saved.",
        }}
      />
    </div>
  );
}
