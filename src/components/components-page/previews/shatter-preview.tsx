"use client";

import { ScanLine } from "lucide-react";
import { useRef, useState } from "react";
import { Shatter, type ShatterHandle } from "@/components/thegridcn/shatter";
import { cn } from "@/lib/utils";

const nodes = ["Grid core", "Uplink relay", "Edge terminal"];

export function ShatterPreview({ forceDom }: { forceDom?: boolean }) {
  const ref = useRef<ShatterHandle>(null);
  const [status, setStatus] = useState<"ready" | "scanning" | "verified">(
    "ready"
  );
  const scanning = status === "scanning";
  return (
    <Shatter
      className="mx-auto w-full max-w-3xl"
      forceDom={forceDom}
      onComplete={() => setStatus("verified")}
      ref={ref}
      sound="confirm"
    >
      <section
        aria-label="Signal diagnostics"
        className="rounded-lg border border-primary/35 bg-background"
      >
        <header className="flex flex-wrap items-center justify-between gap-3 border-primary/20 border-b p-4">
          <div>
            <p className="font-mono text-muted-foreground text-xs tracking-widest">
              SECTOR 07
            </p>
            <h3 className="mt-1 font-display text-lg">Signal diagnostics</h3>
          </div>
          <p className="font-mono text-primary text-xs">
            LINKS {status === "verified" ? "03" : "02"} / 03
          </p>
        </header>
        <ul
          aria-label="Network nodes"
          className="relative grid grid-cols-3 items-center gap-2 border-primary/20 border-b bg-[radial-gradient(circle_at_center,oklch(from_var(--primary)_l_c_h/0.15)_1px,transparent_1px)] bg-[size:16px_16px] py-12 text-center sm:py-16"
        >
          <li
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[16.5%] top-[calc(50%-18px)] h-px bg-primary/35"
          />
          {nodes.map((node, i) => (
            <li className="relative min-w-0 px-1" key={node}>
              <span
                aria-hidden="true"
                className={cn(
                  "mx-auto mb-3 block size-6 rotate-45 border bg-background",
                  i === 1 && status !== "verified"
                    ? "border-muted-foreground border-dashed"
                    : "border-primary bg-primary/15"
                )}
              />
              <strong className="block text-xs sm:text-sm">{node}</strong>
              <span className="font-mono text-muted-foreground text-xs">
                {i === 1
                  ? {
                      ready: "Standby",
                      scanning: "Scanning",
                      verified: "Verified",
                    }[status]
                  : "Online"}
              </span>
            </li>
          ))}
        </ul>
        <footer className="flex flex-wrap items-center justify-between gap-3 p-4">
          <p className="text-muted-foreground text-sm" role="status">
            {status === "verified"
              ? "Scan complete. Uplink relay verified."
              : scanning
                ? "Scanning sector 07…"
                : "Awaiting scan."}
          </p>
          <button
            aria-disabled={scanning}
            className="inline-flex min-h-11 items-center gap-2 rounded border border-primary bg-primary px-3 font-mono font-semibold text-primary-foreground text-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 aria-disabled:opacity-70"
            onClick={() => {
              if (ref.current?.play()) {
                setStatus("scanning");
              }
            }}
            type="button"
          >
            <ScanLine aria-hidden="true" size={16} />
            {scanning ? "Scanning" : "Run scan"}
          </button>
        </footer>
      </section>
    </Shatter>
  );
}
