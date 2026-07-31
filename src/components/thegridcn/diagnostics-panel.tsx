"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DiagnosticMetric {
  label: string;
  status?: "ok" | "warning" | "critical";
  value: number;
}

interface DiagnosticsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  metrics: DiagnosticMetric[];
  status?: "online" | "offline" | "degraded";
  title?: string;
}

const statusDot: Record<string, string> = {
  degraded: "bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]",
  offline: "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]",
  online: "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]",
};

const statusLabel: Record<string, string> = {
  degraded: "text-amber-500",
  offline: "text-red-500",
  online: "text-green-500",
};

const metricStatusColor: Record<string, string> = {
  critical: "text-red-500",
  ok: "text-green-500",
  warning: "text-amber-500",
};

const metricBarColor: Record<string, string> = {
  critical: "bg-red-500",
  ok: "bg-green-500",
  warning: "bg-amber-500",
};

const metricBarGlow: Record<string, string> = {
  critical: "shadow-[0_0_6px_rgba(239,68,68,0.4)]",
  ok: "shadow-[0_0_6px_rgba(34,197,94,0.4)]",
  warning: "shadow-[0_0_6px_rgba(245,158,11,0.4)]",
};

function getMetricStatus(
  value: number,
  explicit?: "ok" | "warning" | "critical"
) {
  if (explicit) {
    return explicit;
  }
  if (value >= 80) {
    return "critical";
  }
  if (value >= 60) {
    return "warning";
  }
  return "ok";
}

export function DiagnosticsPanel({
  metrics,
  title = "DIAGNOSTICS",
  status = "online",
  className,
  ...props
}: DiagnosticsPanelProps) {
  const avgValue = metrics.length
    ? Math.round(metrics.reduce((sum, m) => sum + m.value, 0) / metrics.length)
    : 0;

  // Staggered bar fill animation
  const [filledBars, setFilledBars] = React.useState<boolean[]>(
    metrics.map(() => false)
  );

  React.useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    metrics.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => {
            setFilledBars((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          },
          150 + i * 120
        )
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [metrics.forEach]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      data-slot="tron-diagnostics-panel"
      data-status={status}
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {/* Horizontal scan sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          style={{ animation: "diagnosticScan 4s ease-in-out infinite" }}
        />
      </div>

      <style jsx>{`
        @keyframes diagnosticScan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { top: 100%; }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center gap-2 border-border/50 border-b px-4 py-2">
        <div
          className={cn(
            "h-2 w-2 animate-pulse rounded-full",
            statusDot[status]
          )}
        />
        <span className="text-[10px] text-foreground/80 uppercase tracking-widest">
          {title}
        </span>
        <span
          className={cn(
            "ml-auto font-mono text-[10px] uppercase tracking-widest",
            statusLabel[status]
          )}
        >
          {status}
        </span>
      </div>

      {/* Metrics */}
      <div className="space-y-3 p-4">
        {metrics.map((metric, i) => {
          const mStatus = getMetricStatus(metric.value, metric.status);
          const clamped = Math.max(0, Math.min(100, metric.value));
          const isFilled = filledBars[i];
          return (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-foreground/80 uppercase tracking-widest">
                  {metric.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-foreground/90 text-xs">
                    {Math.round(clamped)}%
                  </span>
                  <span
                    className={cn(
                      "text-[9px] uppercase tracking-widest",
                      metricStatusColor[mStatus],
                      mStatus === "critical" && "animate-pulse"
                    )}
                  >
                    {mStatus}
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700 ease-out",
                    metricBarColor[mStatus],
                    isFilled && metricBarGlow[mStatus]
                  )}
                  style={{ width: isFilled ? `${clamped}%` : "0%" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary bar */}
      <div className="border-border/50 border-t px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-foreground/60 uppercase tracking-widest">
            AVG LOAD
          </span>
          <span className="font-mono text-foreground/80 text-xs">
            {avgValue}%
          </span>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-primary/50 border-t-2 border-l-2" />
      <div className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-primary/50 border-t-2 border-r-2" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-primary/50 border-b-2 border-l-2" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-primary/50 border-r-2 border-b-2" />
    </div>
  );
}
