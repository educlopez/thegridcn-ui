"use client";

import { useEffect, useRef, useState } from "react";
import {
  type GridSound,
  playGridSound,
  prepareGridSound,
} from "@/lib/grid-sounds";

export interface SoundActionProps {
  action: () => Promise<unknown> | unknown;
  failureCue?: GridSound | false;
  label: string;
  messages?: { error?: string; pending?: string; success?: string };
  successCue?: GridSound | false;
}

type Status = "idle" | "pending" | "success" | "error";

/** Give an async action visible feedback and optional, globally muted cues. */
export function SoundAction({
  action,
  failureCue = "error",
  label,
  messages,
  successCue = "confirm",
}: SoundActionProps) {
  const [status, setStatus] = useState<Status>("idle");
  const current = useRef<symbol | undefined>(undefined);
  useEffect(
    () => () => {
      current.current = undefined;
    },
    []
  );

  async function run() {
    if (current.current) {
      return;
    }
    const attempt = Symbol("sound-action");
    current.current = attempt;
    if (failureCue || successCue) {
      prepareGridSound();
    }
    setStatus("pending");
    let outcome: "error" | "success" = "success";
    try {
      await action();
    } catch {
      outcome = "error";
    }
    if (current.current !== attempt) {
      return;
    }
    current.current = undefined;
    setStatus(outcome);
    const cue = outcome === "success" ? successCue : failureCue;
    if (cue) {
      playGridSound(cue);
    }
  }

  const detail =
    status === "idle"
      ? ""
      : (messages?.[status] ??
        {
          error: "Action failed. Try again.",
          pending: "Working…",
          success: "Action complete.",
        }[status]);
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <button
        aria-disabled={status === "pending"}
        className="inline-flex min-h-11 items-center justify-center rounded border border-primary/40 bg-primary/10 px-3 font-mono text-primary text-xs hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 aria-disabled:opacity-65"
        onClick={run}
        type="button"
      >
        {label}
      </button>
      <p
        className={
          status === "error"
            ? "text-amber-400 text-sm"
            : "text-muted-foreground text-sm"
        }
        role="status"
      >
        {detail}
      </p>
    </div>
  );
}
