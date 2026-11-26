import {
  SoundSequence,
  type SoundSequenceStep,
} from "@/components/thegridcn/sound-sequence";

const relaySteps = [
  { action: "Boot relay", cue: "boot", id: "boot", label: "Relay startup" },
  {
    action: "Select channel",
    cue: "select",
    id: "select",
    label: "Channel selection",
  },
  {
    action: "Lock signal",
    cue: "confirm",
    id: "lock",
    label: "Signal confirmed",
  },
] satisfies readonly SoundSequenceStep[];

export function RelaySoundSequence() {
  return <SoundSequence steps={relaySteps} />;
}
