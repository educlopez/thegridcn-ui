"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";

export interface AnomalyBannerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  subtitle?: string;
  title?: string;
}

export function AnomalyBanner({
  title = "ANOMALY FOUND",
  subtitle,
  animated = true,
  className,
  ...props
}: AnomalyBannerProps) {
  return (
    <div className={cn("relative w-full", className)} {...props}>
      {/* Top line with brackets */}
      <div className="flex items-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
        <span className="px-4 font-mono text-[10px] text-amber-500/70 tracking-[0.5em]">
          [ ALERT ]
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
      </div>

      {/* Main content */}
      <div className="relative my-4 overflow-hidden">
        {/* Scan line effect */}
        {animated ? (
          <div
            className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent"
            style={{
              animation: "tron-anomaly-scan 2s linear infinite",
            }}
          />
        ) : null}

        <div className="text-center">
          {subtitle ? (
            <div className="mb-2 font-mono text-amber-500/60 text-sm tracking-[0.3em]">
              {subtitle}
            </div>
          ) : null}
          <h2
            data-slot="tron-anomaly-title"
            className={cn(
              "font-black font-display text-4xl text-amber-500 tracking-[0.2em] md:text-5xl lg:text-6xl",
              animated && "animate-pulse"
            )}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Bottom line */}
      <div className="flex items-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
        <div className="mx-4 flex gap-2">
          {[...new Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 w-1.5 bg-amber-500",
                animated && "animate-pulse",
                i % 2 === 0 ? "opacity-100" : "opacity-50"
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
      </div>

      <style jsx>{`
        @keyframes tron-anomaly-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  );
}
