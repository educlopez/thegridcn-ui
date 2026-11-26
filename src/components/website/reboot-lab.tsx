"use client";

import { ArrowUpRight, RotateCcw, ScanLine } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useRef, useState } from "react";
import { FocusLens } from "@/components/thegridcn/focus-lens";
import {
  ScanReveal,
  type ScanRevealHandle,
} from "@/components/thegridcn/scan-reveal";
import { Shatter, type ShatterHandle } from "@/components/thegridcn/shatter";

const actionClass =
  "inline-flex min-h-11 items-center gap-2 rounded border border-primary/40 bg-primary/15 px-4 font-mono font-semibold text-primary text-xs hover:bg-primary/25 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4";

function TelemetryPanel({ online }: { online: boolean }) {
  return (
    <section
      aria-label="Relay telemetry"
      className="rounded-lg border border-primary/35 bg-background"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-primary/20 border-b px-4 py-4 sm:px-5">
        <div>
          <p className="font-mono text-primary text-xs tracking-widest">
            SECTOR 07 / UPLINK RELAY
          </p>
          <h3 className="mt-1 font-display text-lg sm:text-xl">
            Relay telemetry
          </h3>
        </div>
        <span className="rounded border border-primary/35 px-2.5 py-1 font-mono text-primary text-xs">
          {online ? "Verified" : "Standby"}
        </span>
      </header>
      <div className="relative bg-[radial-gradient(circle,oklch(from_var(--primary)_l_c_h/0.16)_1px,transparent_1px)] bg-[size:16px_16px] px-4 py-8 sm:px-5 sm:py-10">
        <svg
          aria-hidden="true"
          className="pointer-events-none h-14 w-full text-primary/65 sm:h-20"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 600 80"
        >
          <path
            d={
              online
                ? "M0 59H80L105 44 145 59 200 59 229 25 251 59H315L341 43 371 59H450L485 36 511 59H600"
                : "M0 59H58L86 30 112 59H172L196 51 218 59H266L297 10 321 59H390L421 46 452 59H476L508 29 528 59H600"
            }
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 75H600"
            stroke="currentColor"
            strokeDasharray="3 8"
            strokeOpacity=".45"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <dl className="grid grid-cols-3 divide-x divide-primary/20 border-primary/20 border-t">
        {[
          ["Latency", online ? "18 ms" : "42 ms"],
          ["Packet loss", online ? "0.2%" : "2.4%"],
          ["Active links", online ? "03 / 03" : "02 / 03"],
        ].map(([label, value]) => (
          <div className="min-w-0 px-3 py-4 sm:px-5" key={label}>
            <dt className="text-foreground/70 text-xs">{label}</dt>
            <dd className="mt-1 font-mono text-primary text-sm tabular-nums sm:text-xl">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function RebootLab() {
  const [online, setOnline] = useState(false);
  const [busy, setBusy] = useState(false);
  const scan = useRef<ScanRevealHandle>(null);

  function run() {
    if (!busy && scan.current?.reveal(() => setOnline(!online))) {
      setBusy(true);
    }
  }

  return (
    <section
      aria-labelledby="reboot-title"
      className="mt-14 grid scroll-mt-24 items-center gap-6 border-primary/25 border-y bg-background/70 px-4 py-7 sm:px-8 lg:grid-cols-[1fr_1.65fr] lg:gap-12"
      id="reboot"
    >
      <div>
        <p className="font-mono text-primary text-xs tracking-widest">
          PULSE REVEAL / LIVE HTML
        </p>
        <h3 className="mt-2 font-display text-2xl" id="reboot-title">
          See the signal change.
        </h3>
        <p className="mt-3 max-w-xs text-foreground/75 text-sm leading-relaxed">
          Verify a relay to switch routes. A pulse rolls across the chart and
          brings the new readings into view.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            aria-disabled={busy}
            className={actionClass}
            onClick={run}
            type="button"
          >
            <ScanLine aria-hidden="true" size={15} />
            {busy
              ? "Updating relay"
              : online
                ? "Restore baseline"
                : "Verify relay"}
          </button>
          <EffectLink id="pulse-reveal">View Pulse Reveal</EffectLink>
          <Link
            className="inline-flex min-h-11 items-center gap-2 font-mono text-primary text-xs underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
            href="/effects"
          >
            Explore all effects <ArrowUpRight aria-hidden="true" size={14} />
          </Link>
        </div>
        <p className="mt-2 text-foreground/70 text-xs" role="status">
          {busy
            ? "Updating relay telemetry."
            : online
              ? "Relay verified. New route active."
              : "Baseline active."}
        </p>
      </div>
      <ScanReveal
        duration={830}
        onComplete={() => setBusy(false)}
        ref={scan}
        sound="confirm"
        variant="pulse"
      >
        <TelemetryPanel online={online} />
      </ScanReveal>
    </section>
  );
}

function EffectLink({ children, id }: { children: ReactNode; id: string }) {
  return (
    <Link
      className="inline-flex min-h-11 items-center gap-2 font-mono text-primary text-xs underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
      href={`/components#${id}`}
    >
      {children} <ArrowUpRight aria-hidden="true" size={14} />
    </Link>
  );
}

export function StackInspector({ children }: { children: ReactNode }) {
  return (
    <div className="border-primary/25 border-t pt-2">
      <EffectLink id="contrast-lens">View Contrast Lens</EffectLink>
      <FocusLens
        controlClassName={actionClass}
        sound="select"
        variant="contrast"
      >
        {children}
      </FocusLens>
    </div>
  );
}

export function RebootTerminal({ children }: { children: ReactNode }) {
  const shatter = useRef<ShatterHandle>(null);
  const [state, setState] = useState<"idle" | "running" | "ready">("idle");

  return (
    <div className="mx-auto max-w-2xl">
      <Shatter
        onComplete={() => setState("ready")}
        ref={shatter}
        sound="confirm"
      >
        {children}
      </Shatter>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <button
          aria-disabled={state === "running"}
          className={actionClass}
          onClick={() => {
            if (shatter.current?.play()) {
              setState("running");
            }
          }}
          type="button"
        >
          <RotateCcw aria-hidden="true" size={15} />
          {state === "running" ? "Rebooting terminal" : "Reboot terminal"}
        </button>
        <EffectLink id="shatter">View Shatter</EffectLink>
      </div>
      <p className="sr-only" role="status">
        {state === "ready" ? "Terminal ready." : ""}
      </p>
    </div>
  );
}
