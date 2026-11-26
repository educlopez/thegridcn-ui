"use client";

import { Volume2, VolumeX } from "lucide-react";
import { setGridSoundEnabled, useGridSoundPreference } from "@/lib/grid-sounds";
import { cn } from "@/lib/utils";

export function SoundToggle({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const preference = useGridSoundPreference();
  const enabled = preference === true;
  const Icon = enabled ? Volume2 : VolumeX;
  return (
    <button
      aria-label={compact ? "Site sound" : "Demo sound"}
      aria-pressed={enabled}
      disabled={preference === null}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded border border-primary/30 font-mono text-xs hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
        compact ? "min-w-11 text-primary" : "px-3",
        enabled && "bg-primary/10 text-primary",
        className
      )}
      onClick={() => setGridSoundEnabled(!enabled)}
      title={
        compact
          ? enabled
            ? "Mute site sound"
            : "Enable site sound"
          : undefined
      }
      type="button"
    >
      <Icon aria-hidden="true" size={16} />
      {!compact && (enabled ? "Sound on" : "Sound off")}
    </button>
  );
}
