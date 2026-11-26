"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  GRID_SOUNDS,
  type GridSound,
  playGridSound,
  useGridSoundEnabled,
} from "@/lib/grid-sounds";

const attack = 0.004;
const floor = 0.001;
const bins = 40;

function getEnvelope(cue: GridSound) {
  const voices: readonly {
    delay?: number;
    level: number;
    tail: number;
  }[] = GRID_SOUNDS[cue].voices;
  const seconds = Math.max(...voices.map((v) => (v.delay ?? 0) + v.tail));
  const peak = voices.reduce((sum, voice) => sum + voice.level, 0);
  const points = Array.from({ length: bins }, (_, i) => {
    const time = i === 0 ? attack : (i / (bins - 1)) * seconds;
    const amplitude = voices.reduce((sum, voice) => {
      const offset = time - (voice.delay ?? 0);
      if (offset < 0 || offset > voice.tail) {
        return sum;
      }
      return (
        sum +
        (offset < attack
          ? floor * (voice.level / floor) ** (offset / attack)
          : voice.level *
            (floor / voice.level) **
              ((offset - attack) / (voice.tail - attack)))
      );
    }, 0);
    return Math.max(1, (amplitude / peak) * 14);
  });
  return { milliseconds: Math.round(seconds * 1000), points };
}

export interface SoundPadProps {
  className?: string;
  cue: GridSound;
}

/** A playable cue with an amplitude envelope and a silent default. */
export function SoundPad({ className, cue }: SoundPadProps) {
  const enabled = useGridSoundEnabled();
  const { milliseconds, points } = getEnvelope(cue);
  const { label } = GRID_SOUNDS[cue];
  const [playingCue, setPlayingCue] = useState<GridSound>();
  const active = enabled && playingCue === cue;
  const playhead = useRef<HTMLSpanElement>(null);
  const animation = useRef<Animation | null>(null);
  const timeout = useRef<number>(0);

  useEffect(
    () => () => {
      window.clearTimeout(timeout.current);
      animation.current?.cancel();
    },
    []
  );

  function preview() {
    playGridSound(cue);
    window.clearTimeout(timeout.current);
    animation.current?.cancel();
    setPlayingCue(cue);
    const duration = Math.max(180, milliseconds);
    if (!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      animation.current =
        playhead.current?.animate?.(
          [
            { opacity: 1, transform: "translateX(-100%)" },
            { opacity: 0.65, transform: "translateX(0)" },
          ],
          { duration }
        ) ?? null;
    }
    timeout.current = window.setTimeout(
      () => setPlayingCue(undefined),
      duration
    );
  }

  return (
    <button
      aria-label={`Play ${label}`}
      className={`group/pad w-full min-w-0 rounded border border-primary/30 bg-primary/5 px-3 py-2.5 text-left hover:border-primary/60 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:hover:border-primary/30 data-[playing=true]:border-primary data-[playing=true]:bg-primary/15 ${className ?? ""}`}
      data-playing={active}
      disabled={!enabled}
      onClick={preview}
      type="button"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 font-medium text-foreground text-sm">
          <Play
            aria-hidden="true"
            className="shrink-0 text-primary group-disabled/pad:text-muted-foreground"
            size={14}
          />
          {label}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 font-mono text-muted-foreground text-xs tabular-nums"
        >
          {milliseconds} ms
        </span>
      </span>
      <span
        aria-hidden="true"
        className="relative mt-2 block overflow-hidden rounded-sm bg-background/80 px-1"
      >
        <svg
          aria-hidden="true"
          className="block h-8 w-full text-primary/75"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 160 32"
        >
          {points.map((height, i) => {
            const x = i * 4 + 2;
            return (
              <path
                key={x}
                d={`M${x} ${16 - height}v${height * 2}`}
                stroke="currentColor"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        <span
          className="pointer-events-none absolute inset-0 border-primary border-r bg-primary/15 opacity-0 group-data-[playing=false]/pad:invisible"
          ref={playhead}
        />
      </span>
    </button>
  );
}
