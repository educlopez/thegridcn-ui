"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  label?: string;
  max?: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  striped?: boolean;
  value: number;
  variant?: "default" | "success" | "warning" | "danger";
}

const variantColors: Record<string, { bar: string; glow: string }> = {
  danger: { bar: "bg-red-500", glow: "shadow-[0_0_8px_rgba(239,68,68,0.5)]" },
  default: { bar: "bg-primary", glow: "shadow-[0_0_8px_var(--primary)]" },
  success: {
    bar: "bg-green-500",
    glow: "shadow-[0_0_8px_rgba(34,197,94,0.5)]",
  },
  warning: {
    bar: "bg-amber-500",
    glow: "shadow-[0_0_8px_rgba(245,158,11,0.5)]",
  },
};

const sizeConfig: Record<string, { track: string; text: string }> = {
  lg: { text: "text-xs", track: "h-4" },
  md: { text: "text-[10px]", track: "h-2.5" },
  sm: { text: "text-[9px]", track: "h-1.5" },
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  variant = "default",
  size = "md",
  animated = true,
  striped = false,
  className,
  ...props
}: ProgressBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const colors = variantColors[variant];
  const sizeC = sizeConfig[size];

  // Animate fill from 0
  const [displayPct, setDisplayPct] = React.useState(animated ? 0 : pct);
  React.useEffect(() => {
    if (!animated) {
      setDisplayPct(pct);
      return;
    }
    const start = performance.now();
    const duration = 600;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayPct(pct * eased);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }, [pct, animated]);

  return (
    <div
      data-slot="tron-progress-bar"
      className={cn("relative", className)}
      {...props}
    >
      {/* Label row */}
      {label || showValue ? (
        <div className="mb-1.5 flex items-center justify-between">
          {label ? (
            <span
              className={cn(
                "font-mono text-foreground/50 uppercase tracking-widest",
                sizeC.text
              )}
            >
              {label}
            </span>
          ) : null}
          {showValue ? (
            <span
              className={cn(
                "font-mono text-foreground/60 tabular-nums",
                sizeC.text
              )}
            >
              {Math.round(displayPct)}%
            </span>
          ) : null}
        </div>
      ) : null}

      {/* Track */}
      <div
        className={cn(
          "relative overflow-hidden rounded-sm bg-foreground/10",
          sizeC.track
        )}
      >
        {/* Fill */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-sm transition-none",
            colors.bar,
            colors.glow
          )}
          style={{ width: `${displayPct}%` }}
        >
          {/* Stripe overlay */}
          {striped ? (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                animation: animated
                  ? "progressStripe 0.8s linear infinite"
                  : undefined,
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.3) 4px, rgba(255,255,255,0.3) 8px)",
              }}
            />
          ) : null}

          {/* Leading edge glow */}
          <div
            className={cn(
              "absolute top-0 right-0 h-full w-2",
              "bg-gradient-to-l from-white/30 to-transparent"
            )}
          />
        </div>

        {/* Scanline */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.05)_1px,rgba(0,0,0,0.05)_2px)]" />
      </div>

      <style jsx>{`
        @keyframes progressStripe {
          0% { background-position: 0 0; }
          100% { background-position: 16px 0; }
        }
      `}</style>
    </div>
  );
}
