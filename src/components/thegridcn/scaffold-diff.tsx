"use client";

import { type GridSound, playGridSound } from "@/lib/grid-sounds";
import { ConstructionSurface } from "./effects/construction-surface";

export interface ScaffoldRow {
  after: number;
  before: number;
  id: string;
  label: string;
  unit?: string;
}
export interface ScaffoldDiffProps {
  baseline: string;
  candidate: string;
  compared: boolean;
  forceDom?: boolean;
  onCompare: (value: boolean) => void;
  rows: readonly ScaffoldRow[];
  sound?: GridSound | false;
}
export function ScaffoldDiff({
  rows,
  compared,
  onCompare,
  baseline,
  candidate,
  sound,
  forceDom,
}: ScaffoldDiffProps) {
  const release = compared ? candidate : baseline;
  return (
    <section aria-label="Deployment comparison" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-muted-foreground text-xs">
          {baseline} → {candidate}
        </span>
        <button
          type="button"
          aria-pressed={compared}
          className="min-h-11 rounded border border-primary/40 px-3 font-mono text-primary text-sm hover:bg-primary/10 focus-visible:outline-2"
          onClick={() => {
            onCompare(!compared);
            if (sound) {
              playGridSound(sound);
            }
          }}
        >
          Compare deployments
        </button>
      </div>
      <table className="w-full table-fixed text-left font-mono text-xs tabular-nums">
        <caption className="sr-only">
          Readings for {release} and change from baseline
        </caption>
        <thead className="text-muted-foreground">
          <tr>
            <th className="w-2/5 py-2">Metric</th>
            <th>{release}</th>
            <th>Delta</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const delta = row.after - row.before;
            const value = compared ? row.after : row.before;
            return (
              <tr key={row.id} className="border-primary/20 border-t">
                <th scope="row" className="py-3 pr-1 font-normal">
                  {row.label}
                </th>
                <td>
                  <ConstructionSurface
                    forceDom={forceDom}
                    mode="scaffold"
                    revision={`${value} ${row.unit ?? ""}`}
                  >
                    <span>
                      {value} {row.unit}
                    </span>
                  </ConstructionSurface>
                </td>
                <td
                  className={
                    compared && delta ? "text-primary" : "text-muted-foreground"
                  }
                >
                  {compared
                    ? delta
                      ? `${delta > 0 ? "+" : ""}${Number(delta.toFixed(3))} ${row.unit ?? ""}`
                      : "Unchanged"
                    : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
