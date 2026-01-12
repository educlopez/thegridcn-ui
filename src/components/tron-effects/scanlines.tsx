"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ScanlinesProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "light" | "medium" | "heavy"
  animated?: boolean
}

export function Scanlines({
  children,
  className,
  intensity = "light",
  animated = false,
  ...props
}: ScanlinesProps) {
  const opacityMap = {
    light: 0.03,
    medium: 0.06,
    heavy: 0.1,
  }

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {children}

      {/* Scanlines overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-50",
          animated && "animate-scanline"
        )}
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, ${opacityMap[intensity]}) 2px,
            rgba(0, 0, 0, ${opacityMap[intensity]}) 4px
          )`,
        }}
      />

      {/* Animated scan line */}
      {animated && (
        <div
          className="pointer-events-none absolute left-0 right-0 z-50 h-[2px] animate-scan-sweep bg-primary/20"
        />
      )}

      <style jsx>{`
        @keyframes scan-sweep {
          0% {
            top: -2px;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        .animate-scan-sweep {
          animation: scan-sweep 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
