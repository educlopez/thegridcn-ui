"use client";

import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import { GRID_SOUNDS, type GridSound, playGridSound } from "@/lib/grid-sounds";

export interface SoundSequenceStep {
  action: string;
  cue: GridSound;
  id: string;
  label: string;
}

export interface SoundSequenceProps {
  className?: string;
  onStep?: (step: SoundSequenceStep) => void;
  steps: readonly SoundSequenceStep[];
}

const actionClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded border border-primary/35 px-3 font-mono text-xs hover:border-primary/60 hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

/** Step through a flow. Audio follows the global opt-in and never autoplays. */
export function SoundSequence({
  className,
  onStep,
  steps,
}: SoundSequenceProps) {
  const [index, setIndex] = useState(0);
  const advance = useRef<HTMLButtonElement>(null);
  const step = steps[index];
  const complete = !step;
  if (steps.length === 0) {
    return null;
  }
  return (
    <div
      className={`min-w-0 rounded-lg border border-primary/25 bg-background px-3 py-4 sm:p-5 ${className ?? ""}`}
    >
      <ol className="grid gap-1.5">
        {steps.map((item, i) => (
          <li
            aria-current={i === index ? "step" : undefined}
            className="grid min-h-12 grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-2 rounded border border-transparent px-2 aria-[current=step]:border-primary/30 aria-[current=step]:bg-primary/10 sm:px-3"
            key={item.id}
          >
            {i < index ? (
              <Check aria-hidden="true" className="text-primary" size={15} />
            ) : (
              <span
                aria-hidden="true"
                className="font-mono text-muted-foreground text-xs tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            <span className="text-sm">
              {item.label}
              {i < index && <span className="sr-only">, completed</span>}
            </span>
            <span className="font-mono text-muted-foreground text-xs">
              {GRID_SOUNDS[item.cue].label}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-3 flex flex-wrap items-center gap-2 border-primary/20 border-t pt-3">
        <button
          className={`${actionClass} bg-primary/10 text-primary`}
          onClick={() => {
            if (!step) {
              setIndex(0);
              return;
            }
            onStep?.(step);
            playGridSound(step.cue);
            setIndex(index + 1);
          }}
          ref={advance}
          type="button"
        >
          {complete ? (
            <RotateCcw aria-hidden="true" size={14} />
          ) : (
            <ArrowRight aria-hidden="true" size={14} />
          )}
          {step?.action ?? "Start over"}
        </button>
        {!complete && index > 0 && (
          <button
            className={actionClass}
            onClick={() => {
              setIndex(0);
              advance.current?.focus();
            }}
            type="button"
          >
            Reset
          </button>
        )}
        <p className="ml-1 text-muted-foreground text-xs" role="status">
          {complete
            ? "Sequence complete."
            : `Step ${index + 1} of ${steps.length}`}
        </p>
      </div>
    </div>
  );
}
