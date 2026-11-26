"use client";

import { Download } from "lucide-react";
import { useId, useState } from "react";
import { SoundPad } from "@/components/thegridcn/sound-pad";
import {
  GRID_SOUNDS,
  type GridSound,
  renderGridSoundWav,
  useGridSoundEnabled,
} from "@/lib/grid-sounds";
import { SoundToggle } from "./sound-toggle";

const soundNames: GridSound[] = [
  "activate",
  "select",
  "confirm",
  "warning",
  "error",
  "boot",
  "ignition",
  "disc-lock",
  "materialize",
  "gate-shift",
];
const featuredSounds = ["boot", "select", "confirm"] as const;
const actionClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded border border-primary/30 px-3 font-mono text-xs hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50";

export function SoundDeck({ sampler = false }: { sampler?: boolean }) {
  const heading = useId();
  const enabled = useGridSoundEnabled();
  const [exporting, setExporting] = useState<GridSound>();
  const [message, setMessage] = useState("");

  async function download(name: GridSound) {
    setExporting(name);
    setMessage("");
    try {
      const url = URL.createObjectURL(await renderGridSoundWav(name));
      const link = document.createElement("a");
      link.href = url;
      link.download = `grid-${name}.wav`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setMessage("WAV export is unavailable in this browser.");
    } finally {
      setExporting(undefined);
    }
  }

  return (
    <section
      aria-labelledby={heading}
      className="overflow-hidden rounded-lg border border-primary/25"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-primary/25 border-b bg-primary/5 p-4 sm:p-5">
        <div>
          <h2 className="font-display text-lg" id={heading}>
            Sound bank
          </h2>
          <p className="mt-1 text-muted-foreground text-sm">
            {enabled
              ? "Sound is on for demos across the site."
              : sampler
                ? "Turn sound on to preview the cues."
                : "Turn sound on to audition cues. WAV downloads work while muted."}
          </p>
        </div>
        <SoundToggle />
      </div>
      <ul
        className={
          sampler
            ? "grid gap-2 p-3 sm:grid-cols-3"
            : "grid gap-x-4 gap-y-5 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3"
        }
      >
        {(sampler ? featuredSounds : soundNames).map((name) => {
          const sound = GRID_SOUNDS[name];
          return (
            <li className="flex min-w-0 flex-col" key={name}>
              <SoundPad cue={name} />
              {!sampler && (
                <div className="mt-2 flex flex-1 items-start justify-between gap-2">
                  <p className="max-w-52 text-muted-foreground text-xs leading-relaxed">
                    {sound.description}
                  </p>
                  <button
                    aria-label={`Download ${sound.label} WAV`}
                    className={actionClass}
                    disabled={Boolean(exporting)}
                    onClick={() => download(name)}
                    type="button"
                  >
                    <Download aria-hidden="true" size={15} /> WAV
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <p
        aria-live="polite"
        className={message ? "px-5 pb-4 text-sm" : "sr-only"}
      >
        {message}
      </p>
    </section>
  );
}
