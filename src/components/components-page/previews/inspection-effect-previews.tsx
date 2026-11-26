"use client";

import { ArrowDownRight, ArrowUpRight, Radar } from "lucide-react";
import { useId, useRef, useState } from "react";
import { FocusLens } from "@/components/thegridcn/focus-lens";
import {
  ScanReveal,
  type ScanRevealHandle,
} from "@/components/thegridcn/scan-reveal";

const controlClass =
  "inline-flex min-h-11 items-center gap-2 rounded border border-primary/40 bg-primary/10 px-3 font-mono text-primary text-xs hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-pressed:bg-primary/25 disabled:opacity-60";

function EffectSlider({
  label,
  hint,
  onChange,
  value,
}: {
  hint: string;
  label: string;
  onChange: (value: number) => void;
  value: number;
}) {
  const id = useId();
  return (
    <div className="mb-4 grid gap-1 rounded border border-primary/20 bg-primary/5 px-3 py-2.5">
      <div className="flex items-center justify-between gap-2 font-mono text-xs">
        <label htmlFor={id}>{label}</label>
        <span aria-hidden="true" className="text-primary tabular-nums">
          {value}%
        </span>
      </div>
      <input
        aria-describedby={`${id}-hint`}
        aria-valuetext={`${value}%`}
        className="h-6 w-full cursor-pointer accent-primary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        id={id}
        max={200}
        min={0}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
        step={5}
        type="range"
        value={value}
      />
      <p className="text-muted-foreground text-xs" id={`${id}-hint`}>
        {hint}
      </p>
    </div>
  );
}

const telemetry = [
  { channel: "Grid core", jitter: "+0.208 ms", latency: "12.084 ms" },
  { channel: "Uplink relay", jitter: "+1.482 ms", latency: "26.712 ms" },
  { channel: "Edge terminal", jitter: "+0.316 ms", latency: "18.503 ms" },
  { channel: "Archive node", jitter: "+0.043 ms", latency: "08.061 ms" },
];

function LensDemo({
  direct,
  forceDom,
  variant = "glass",
}: {
  direct?: boolean;
  forceDom?: boolean;
  variant?: "glass" | "contrast";
}) {
  const [refraction, setRefraction] = useState(100);
  return (
    <div className="mx-auto w-full max-w-2xl">
      {!forceDom && (
        <EffectSlider
          hint={
            direct
              ? "Move the lens over the table to compare edge distortion."
              : "Turn on Inspect data to see the edge change as you drag."
          }
          label="Edge refraction"
          onChange={setRefraction}
          value={refraction}
        />
      )}
      <FocusLens
        activation={direct ? "direct" : "toggle"}
        edgeRefraction={refraction / 100}
        forceDom={forceDom}
        controlClassName={controlClass}
        sound="select"
        variant={variant}
        zoom={1.85}
      >
        <div className="overflow-hidden rounded-lg border border-primary/30 bg-background">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-primary/20 border-b px-3 py-4 sm:px-5">
            <h3 className="font-display text-base sm:text-lg">
              Telemetry samples
            </h3>
            <span className="font-mono text-muted-foreground text-xs">
              Window 04:16 UTC
            </span>
          </div>
          <table
            aria-label="Network telemetry samples"
            className="w-full table-fixed border-collapse text-left"
          >
            <thead className="border-primary/20 border-b bg-primary/5 font-mono text-muted-foreground text-xs">
              <tr>
                <th
                  className="w-[44%] px-3 py-3 font-medium sm:px-5"
                  scope="col"
                >
                  Endpoint
                </th>
                <th className="px-1 py-3 font-medium" scope="col">
                  Latency
                </th>
                <th className="px-1 py-3 font-medium" scope="col">
                  Jitter
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/15">
              {telemetry.map(({ channel, latency, jitter }) => (
                <tr key={channel}>
                  <th
                    className="px-3 py-3 font-medium text-xs sm:px-5 sm:text-sm"
                    scope="row"
                  >
                    {channel}
                  </th>
                  <td className="px-1 py-3 font-mono text-primary text-xs tabular-nums">
                    {latency}
                  </td>
                  <td className="px-1 py-3 font-mono text-muted-foreground text-xs tabular-nums">
                    {jitter}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FocusLens>
    </div>
  );
}

export function FocusLensPreview({
  direct,
  forceDom,
}: {
  direct?: boolean;
  forceDom?: boolean;
}) {
  return <LensDemo direct={direct} forceDom={forceDom} />;
}

export function ContrastLensPreview({
  direct,
  forceDom,
}: {
  direct?: boolean;
  forceDom?: boolean;
}) {
  return <LensDemo direct={direct} forceDom={forceDom} variant="contrast" />;
}

const routingMetrics = [
  { after: "18 ms", before: "42 ms", delta: "−24 ms", label: "Latency" },
  { after: "0.2%", before: "2.4%", delta: "−2.2 pp", label: "Packet loss" },
  {
    after: "3 / 3",
    before: "2 / 3",
    delta: "+1 route",
    label: "Healthy routes",
  },
];

function RevealDemo({
  forceDom,
  variant = "reveal",
}: {
  forceDom?: boolean;
  variant?: "reveal" | "pixel" | "prism" | "pulse";
}) {
  const ref = useRef<ScanRevealHandle>(null);
  const [rerouted, setRerouted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState("Baseline active.");
  const destination = useRef(false);
  const [strength, setStrength] = useState(100);

  function runReveal(silent = false) {
    const next = !rerouted;
    if (ref.current?.reveal(() => setRerouted(next), { silent })) {
      destination.current = next;
      setBusy(true);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {!forceDom && (
        <EffectSlider
          hint="Moving the slider previews the sweep silently. The button replays it with your sound setting."
          label={
            variant === "reveal"
              ? "Changed-number intensity"
              : "Effect intensity"
          }
          onChange={(value) => {
            setStrength(value);
            runReveal(true);
          }}
          value={strength}
        />
      )}
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          aria-disabled={busy}
          className={controlClass}
          onClick={() => runReveal()}
          type="button"
        >
          <Radar aria-hidden="true" size={16} />
          {busy
            ? "Revealing changes"
            : rerouted
              ? "Restore baseline"
              : "Apply reroute"}
        </button>
        <p className="text-muted-foreground text-sm" role="status">
          {log}
        </p>
      </div>
      <ScanReveal
        changeIntensity={strength / 100}
        duration={variant === "prism" ? 910 : 720}
        forceDom={forceDom}
        onComplete={() => {
          setBusy(false);
          setLog(
            destination.current ? "New route active." : "Baseline restored."
          );
        }}
        ref={ref}
        sound="confirm"
        variant={variant}
      >
        <section
          aria-labelledby="routing-snapshot"
          className="rounded-lg border border-primary/30 bg-background"
        >
          <header className="flex flex-wrap items-baseline justify-between gap-2 border-primary/20 border-b px-3 py-4 sm:px-5">
            <h3
              className="font-display text-base sm:text-lg"
              id="routing-snapshot"
            >
              Routing snapshot
            </h3>
            <span className="rounded border border-primary/35 px-2 py-1 font-mono text-primary text-xs">
              {rerouted ? "REROUTE" : "BASELINE"}
            </span>
          </header>
          <dl className="grid grid-cols-1 divide-y divide-primary/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {routingMetrics.map((metric, index) => {
              const Icon = index === 2 ? ArrowUpRight : ArrowDownRight;
              return (
                <div
                  className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 px-3 py-3 sm:grid-cols-1 sm:px-5 sm:py-5"
                  key={metric.label}
                >
                  <dt className="font-mono text-muted-foreground text-xs">
                    {metric.label}
                  </dt>
                  <dd className="font-mono text-foreground text-xl tabular-nums">
                    {rerouted ? metric.after : metric.before}
                  </dd>
                  <dd className="flex min-h-5 items-center gap-1 font-mono text-primary text-xs sm:mt-2">
                    {rerouted ? (
                      <>
                        <Icon aria-hidden="true" size={14} />
                        {metric.delta}
                      </>
                    ) : (
                      <span className="text-muted-foreground">Reference</span>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      </ScanReveal>
    </div>
  );
}

export function ScanRevealPreview({ forceDom }: { forceDom?: boolean }) {
  return <RevealDemo forceDom={forceDom} />;
}

export function PixelResolvePreview({ forceDom }: { forceDom?: boolean }) {
  return <RevealDemo forceDom={forceDom} variant="pixel" />;
}

export function PulseRevealPreview({ forceDom }: { forceDom?: boolean }) {
  return <RevealDemo forceDom={forceDom} variant="pulse" />;
}

export function PrismFoldPreview({ forceDom }: { forceDom?: boolean }) {
  return <RevealDemo forceDom={forceDom} variant="prism" />;
}
