"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CRTEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Intensity of the scanlines effect */
  intensity?: "light" | "medium" | "heavy"
  /** Enable animated scan sweep line */
  animated?: boolean
  /** Line spacing in pixels */
  spacing?: number
  /** Use theme primary color for lines (gives cyan/colored tint) */
  colored?: boolean
}

/**
 * CRT monitor effect with scanlines, vignette, flicker, and scan sweep animation.
 * Wrap any content to give it a retro CRT monitor appearance.
 */
export function CRTEffect({
  children,
  className,
  intensity = "medium",
  animated = true,
  spacing = 3,
  colored = false,
  ...props
}: CRTEffectProps) {
  const opacityMap = {
    light: 0.08,
    medium: 0.15,
    heavy: 0.25,
  }

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {children}

      {/* Scanlines overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent ${spacing}px,
            ${colored ? 'hsl(var(--primary) / ' + opacityMap[intensity] + ')' : `rgba(0, 0, 0, ${opacityMap[intensity]})`} ${spacing}px,
            ${colored ? 'hsl(var(--primary) / ' + opacityMap[intensity] + ')' : `rgba(0, 0, 0, ${opacityMap[intensity]})`} ${spacing * 2}px
          )`,
        }}
      />

      {/* Flicker overlay for CRT effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 animate-flicker opacity-[0.02]"
        style={{
          background: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.1) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Animated scan sweep line */}
      {animated && (
        <div
          className="pointer-events-none absolute left-0 right-0 z-20 h-[2px] animate-scan-sweep"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)",
            boxShadow: "0 0 10px hsl(var(--primary) / 0.3), 0 0 20px hsl(var(--primary) / 0.2)",
          }}
        />
      )}

      {/* Vignette effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.3) 100%)",
        }}
      />

      <style jsx>{`
        @keyframes scan-sweep {
          0% {
            top: -2px;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes flicker {
          0%, 100% {
            opacity: 0.02;
          }
          50% {
            opacity: 0.04;
          }
        }

        .animate-scan-sweep {
          animation: scan-sweep 4s ease-in-out infinite;
        }

        .animate-flicker {
          animation: flicker 0.1s infinite;
        }
      `}</style>
    </div>
  )
}
