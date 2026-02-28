"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface LogoCloudProps extends React.HTMLAttributes<HTMLDivElement> {
  logos: { name: string; icon?: React.ReactNode }[]
  label?: string
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
}

export function LogoCloud({
  logos,
  label,
  speed = "normal",
  pauseOnHover = true,
  className,
  ...props
}: LogoCloudProps) {
  const durations = { slow: "40s", normal: "25s", fast: "15s" }
  const dur = durations[speed]

  return (
    <div
      data-slot="tron-logo-cloud"
      className={cn(
        "relative overflow-hidden rounded border border-primary/20 bg-card/80 py-6 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      {label && (
        <div className="mb-4 text-center text-[10px] uppercase tracking-widest text-foreground/40">
          {label}
        </div>
      )}

      {/* Marquee wrapper */}
      <div
        className={cn("group flex gap-8", pauseOnHover && "[&:hover_>.marquee-track]:pause")}
      >
        {/* Two copies for seamless loop */}
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="marquee-track flex shrink-0 items-center gap-8"
            style={{
              animation: `logoScroll ${dur} linear infinite`,
            }}
          >
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-2 rounded border border-primary/10 bg-primary/5 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-foreground/50 transition-colors hover:border-primary/30 hover:text-foreground/70"
              >
                {logo.icon && <span className="text-primary/60">{logo.icon}</span>}
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes logoScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 2rem)); }
        }
        .marquee-track.pause,
        [class*="pause"] .marquee-track {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-card/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-card/80 to-transparent" />

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/40" />
    </div>
  )
}
