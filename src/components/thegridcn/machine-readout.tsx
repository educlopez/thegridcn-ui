"use client";

import { useId, useState } from "react";
import { type GridSound, playGridSound } from "@/lib/grid-sounds";
import { ConstructionSurface } from "./effects/construction-surface";

export interface MachineRecord {
  context?: string;
  fields: readonly { key: string; value: string | number }[];
  id: string;
  summary: string;
}

export function MachineReadout({
  records,
  forceDom,
  sound,
  label = "Event stream",
}: {
  records: readonly MachineRecord[];
  forceDom?: boolean;
  sound?: GridSound | false;
  label?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const prefix = useId();
  return (
    <section
      aria-label={label}
      className="overflow-hidden rounded border border-primary/30 bg-background"
    >
      <header className="flex items-center justify-between border-primary/25 border-b bg-primary/5 p-4">
        <h3 className="font-display text-lg">{label}</h3>
        <span className="font-mono text-muted-foreground text-xs">
          {String(records.length).padStart(2, "0")} events
        </span>
      </header>
      {records.map((record, index) => {
        const expanded = active === record.id;
        const target = `${prefix}-${index}`;
        const signature = record.fields
          .map(({ key, value }) => `${key}:${value}`)
          .join("|");
        return (
          <div
            key={record.id}
            className="border-primary/15 border-b last:border-0"
          >
            <button
              className="flex min-h-14 w-full items-center gap-3 px-4 text-left hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2"
              type="button"
              aria-expanded={expanded}
              aria-controls={target}
              onClick={() => {
                setActive(expanded ? null : record.id);
                if (sound && !expanded) {
                  playGridSound(sound);
                }
              }}
            >
              <span
                aria-hidden="true"
                className="font-mono text-primary text-xs"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 grow">
                <strong className="block text-sm">{record.summary}</strong>
                {Boolean(record.context) && (
                  <span className="block font-mono text-muted-foreground text-xs">
                    {record.context}
                  </span>
                )}
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 56 22"
                className="hidden h-6 w-14 shrink-0 text-primary/70 sm:block"
              >
                {Array.from(signature.slice(0, 18), (char, i) => (
                  <path
                    key={String(i * 3)}
                    stroke="currentColor"
                    strokeWidth={1 + (char.charCodeAt(0) % 2)}
                    d={`M${i * 3 + 1} 21v-${4 + (char.charCodeAt(0) % 17)}`}
                  />
                ))}
              </svg>
              <span className="font-mono text-primary text-xs">
                {expanded ? "Close" : "Decode"}
              </span>
            </button>
            <div id={target}>
              <ConstructionSurface
                revision={expanded ? "decoded" : "encoded"}
                mode="decode"
                forceDom={forceDom || !expanded}
              >
                {expanded && (
                  <dl className="grid gap-px bg-primary/10 p-px sm:grid-cols-2">
                    {record.fields.map((field) => (
                      <div
                        className="min-w-0 bg-background px-4 py-3 font-mono text-xs"
                        key={field.key}
                      >
                        <dt className="text-muted-foreground">{field.key}</dt>
                        <dd className="mt-1 break-words text-primary">
                          {field.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </ConstructionSurface>
            </div>
          </div>
        );
      })}
      {records.length === 0 && (
        <p className="p-4 text-muted-foreground text-sm">No events.</p>
      )}
    </section>
  );
}
