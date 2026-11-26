import { memo } from "react";
import { RelaySoundSequence } from "@/components/sounds/relay-sound-sequence";
import { SoundPad } from "@/components/thegridcn/sound-pad";

export const SoundPadPreview = memo(function SoundPadPreview() {
  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <p className="text-muted-foreground text-sm">
        Enable site sound to preview the cues. Each pad shows the cue's
        envelope.
      </p>
      <div className="grid gap-2 min-[440px]:grid-cols-2">
        <SoundPad cue="boot" />
        <SoundPad cue="warning" />
      </div>
    </div>
  );
});

export const SoundSequencePreview = memo(function SoundSequencePreview() {
  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <p className="text-muted-foreground text-sm">
        Move through the actions. With site sound on, each step has its own cue.
      </p>
      <RelaySoundSequence />
    </div>
  );
});
