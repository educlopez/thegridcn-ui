"use client";

import { useId, useState } from "react";
import { type GridSound, playGridSound } from "@/lib/grid-sounds";
import { ConstructionSurface } from "./effects/construction-surface";

export interface PerceptionSector {
  description: string;
  entries: readonly { label: string; href: string }[];
  id: string;
  title: string;
}

export function PerceptionField({
  sectors,
  forceDom,
  sound,
  label = "Component atlas",
}: {
  sectors: readonly PerceptionSector[];
  forceDom?: boolean;
  sound?: GridSound | false;
  label?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const prefix = useId();
  return (
    <section aria-label={label} className="grid gap-2 md:grid-cols-3">
      {sectors.map((sector, index) => {
        const open = (pinned ?? active) === sector.id;
        const target = `${prefix}-${index}`;
        return (
          <div
            key={sector.id}
            className="relative min-w-0 overflow-hidden rounded border border-primary/25 bg-background"
            onPointerEnter={(e) => {
              const focused = document.activeElement;
              if (
                e.pointerType === "mouse" &&
                pinned === null &&
                !(
                  focused?.matches("a") &&
                  e.currentTarget.parentElement?.contains(focused)
                )
              ) {
                setActive(sector.id);
              }
            }}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-pressed={pinned === sector.id}
              aria-controls={target}
              className="flex min-h-20 w-full items-center justify-between gap-2 border-primary/20 border-b bg-primary/5 p-3 text-left focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2"
              onClick={() => {
                const next = pinned === sector.id ? null : sector.id;
                setActive(null);
                setPinned(next);
                if (sound && next !== null) {
                  playGridSound(sound);
                }
              }}
            >
              <span>
                <span className="block font-mono text-muted-foreground text-xs tracking-widest">
                  SECTOR / {String(index + 1).padStart(2, "0")}
                </span>
                <strong className="mt-1 block font-display text-base">
                  {sector.title}
                </strong>
              </span>
              <span className="font-mono text-primary text-xs">
                {String(sector.entries.length).padStart(2, "0")}
              </span>
            </button>
            <div id={target}>
              <ConstructionSurface
                forceDom={forceDom || !open}
                mode="field"
                revision={open ? "detail" : "overview"}
              >
                <div className="min-h-40 p-3">
                  {open ? (
                    <ul className="grid gap-1">
                      {sector.entries.map((entry) => (
                        <li key={entry.href}>
                          <a
                            className="flex min-h-11 items-center justify-between gap-2 rounded-sm border border-primary/25 px-2 text-sm hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary"
                            href={entry.href}
                          >
                            {entry.label}
                            <span aria-hidden="true" className="text-primary">
                              →
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <div
                        aria-hidden="true"
                        className="mb-3 grid h-12 grid-cols-6 gap-1"
                      >
                        {sector.entries.map((entry) => (
                          <div
                            key={entry.href}
                            className="relative col-span-2 overflow-hidden border border-primary/25 bg-primary/5"
                          >
                            <svg
                              aria-hidden="true"
                              className="h-full w-full text-primary/60"
                              preserveAspectRatio="none"
                              viewBox="0 0 40 24"
                            >
                              <path
                                d={`M0 ${6 + (entry.label.length % 12)}H40 M${8 + (entry.href.length % 19)} 0V24`}
                                fill="none"
                                stroke="currentColor"
                                vectorEffect="non-scaling-stroke"
                              />
                              <rect
                                x="2"
                                y="2"
                                width={2 + (entry.label.length % 5)}
                                height="2"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {sector.description}
                      </p>
                    </>
                  )}
                </div>
              </ConstructionSurface>
            </div>
          </div>
        );
      })}
    </section>
  );
}
