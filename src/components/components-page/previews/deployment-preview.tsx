"use client";

import { useState } from "react";
import { ControlRods } from "@/components/thegridcn/control-rods";
import { ScaffoldDiff } from "@/components/thegridcn/scaffold-diff";

const readings = [
  { after: 36, before: 38, label: "14:29" },
  { after: 42, before: 51, label: "14:30" },
  { after: 39, before: 44, label: "14:31" },
  { after: 46, before: 182, label: "14:32" },
  { after: 49, before: 75, label: "14:33" },
  { after: 41, before: 48, label: "14:34" },
  { after: 38, before: 42, label: "14:35" },
] as const;

export function DeploymentPreview({ forceDom }: { forceDom?: boolean }) {
  const [pin, setPin] = useState<string | null>(null);
  const [compared, setCompared] = useState(false);
  const selected = readings.find((p) => p.label === pin);
  const peak = readings.reduce((a, b) => (a.before > b.before ? a : b));
  const sample = selected ?? peak;
  return (
    <div className="overflow-hidden rounded-lg border border-primary/30 bg-background">
      <header className="space-y-2 border-primary/25 border-b bg-primary/5 p-4">
        <p className="font-mono text-primary text-xs tracking-widest">
          OBSERVABILITY / 07
        </p>
        <h3 className="font-display text-xl">Deployment telemetry</h3>
        <p className="text-muted-foreground text-sm">
          Pin the 14:32 spike, then compare releases. The rod stays attached to
          the same minute.
        </p>
      </header>
      <div className="space-y-6 p-4">
        <ControlRods
          samples={readings.map((p) => ({
            id: p.label,
            label: p.label,
            value: compared ? p.after : p.before,
          }))}
          ceiling={200}
          pinned={pin}
          onPin={setPin}
          label="API latency"
          unit="ms"
          sound="select"
          forceDom={forceDom}
        />
        <ScaffoldDiff
          rows={[
            {
              after: sample.after,
              before: sample.before,
              id: "latency",
              label: selected
                ? `Pinned · ${selected.label}`
                : `Peak · ${peak.label}`,
              unit: "ms",
            },
            { after: 2, before: 8, id: "errors", label: "Failed requests" },
            { after: 4, before: 4, id: "replicas", label: "Replicas" },
          ]}
          compared={compared}
          onCompare={setCompared}
          baseline="v2.8.0"
          candidate="v2.8.1"
          sound="confirm"
          forceDom={forceDom}
        />
      </div>
    </div>
  );
}
