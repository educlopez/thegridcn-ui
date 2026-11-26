"use client";

import { useRef, useState } from "react";
import {
  ScanReveal,
  type ScanRevealHandle,
} from "@/components/thegridcn/scan-reveal";
import { type GridProtocol, gridProtocols } from "@/lib/grid-protocols";

function Diagram({
  variant,
  online,
}: {
  variant: GridProtocol["variant"];
  online: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className="h-24 w-full text-primary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 280 90"
    >
      {variant === "lightcycle" && (
        <>
          <path
            d="M4 66H58V30H126V54H190V16H276"
            opacity={online ? 0.2 : 1}
            strokeWidth="3"
          />
          <path
            d="M4 66H98V74H158V32H228V16H276"
            opacity={online ? 1 : 0.2}
            strokeWidth="3"
          />
          <circle cx="276" cy="16" r="4" fill="currentColor" />
        </>
      )}
      {variant === "disc" && (
        <g transform="translate(140 45)">
          <circle r="39" strokeDasharray="58 4" />
          <circle
            r="31"
            strokeWidth="5"
            strokeDasharray={online ? "140 5" : "16 7"}
          />
          <circle r="17" strokeDasharray="2 4" />
          <path d={online ? "M-8 0l6 6 12-14" : "M-7 0H7"} strokeWidth="3" />
        </g>
      )}
      {variant === "rez" &&
        Array.from({ length: 31 }, (_, i) => {
          const h = 14 + Math.abs(Math.sin(i * 1.71)) * (online ? 60 : 12);
          return (
            <path
              key={String(i * 8)}
              d={`M${20 + i * 8} 77v-${h}`}
              strokeWidth="5"
              strokeDasharray={online ? undefined : "2 3"}
            />
          );
        })}
      {variant === "gate" && (
        <g strokeWidth="2">
          <path d="M20 76V29L40 9H240L260 29V76Z" opacity=".35" />
          <path
            transform={online ? "translate(-40 0)" : undefined}
            d="M79 68V29l12-12h48v17l-9 12 9 12v10Z"
          />
          <path
            transform={online ? "translate(40 0)" : undefined}
            d="M201 68V29l-12-12h-46v17l-9 12 9 12v10Z"
          />
        </g>
      )}
    </svg>
  );
}

function ProtocolDemo({
  spec,
  forceDom,
}: {
  spec: GridProtocol;
  forceDom?: boolean;
}) {
  const ref = useRef<ScanRevealHandle>(null);
  const [online, setOnline] = useState(false);
  const [busy, setBusy] = useState(false);
  const state = online ? 1 : 0;
  return (
    <div className="mx-auto grid max-w-2xl gap-4">
      <ScanReveal
        duration={900}
        forceDom={forceDom}
        onComplete={() => setBusy(false)}
        ref={ref}
        sound={spec.cue}
        variant={spec.variant}
      >
        <div className="overflow-hidden rounded border border-primary/40 bg-background">
          <div className="flex justify-between gap-3 border-primary/25 border-b px-4 py-3 font-mono text-primary text-xs uppercase tracking-widest">
            <span>{spec.label}</span>
            <span>GRID / 82</span>
          </div>
          <div className="grid items-center gap-3 bg-primary/5 p-5 sm:grid-cols-2">
            <Diagram online={online} variant={spec.variant} />
            <div role="status">
              <strong className="block font-display text-xl">
                {spec.states[state]}
              </strong>
              <span className="font-mono text-muted-foreground text-sm">
                {spec.values[state]}
              </span>
            </div>
          </div>
        </div>
      </ScanReveal>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-disabled={busy}
          className="min-h-11 rounded border border-primary/40 bg-primary/10 px-4 font-mono text-primary text-sm hover:bg-primary/20 focus-visible:outline-2"
          onClick={() => {
            if (ref.current?.reveal(() => setOnline(!online))) {
              setBusy(true);
            }
          }}
        >
          {online ? spec.undo : spec.action}
        </button>
        <code className="text-muted-foreground text-xs">
          variant="{spec.variant}"
        </code>
      </div>
    </div>
  );
}

export const protocolEffects = gridProtocols.map((spec) => ({
  ...spec,
  Demo: (props: { forceDom?: boolean }) => (
    <ProtocolDemo {...props} spec={spec} />
  ),
}));
