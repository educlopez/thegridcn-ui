"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card"
  width?: number | string
  height?: number | string
  lines?: number
}

export function Skeleton({
  variant = "text",
  width,
  height,
  lines = 1,
  className,
  ...props
}: SkeletonProps) {
  if (variant === "card") {
    return (
      <div
        data-slot="tron-skeleton"
        className={cn(
          "relative overflow-hidden rounded border border-primary/15 bg-card/50 p-4",
          className
        )}
        style={{ width, height }}
        {...props}
      >
        {/* Sweep animation */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ animation: "skeletonSweep 2s ease-in-out infinite" }}
        >
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
        </div>

        <div className="space-y-3">
          <div className="h-3 w-2/5 rounded-sm bg-primary/10" />
          <div className="h-2 w-full rounded-sm bg-foreground/5" />
          <div className="h-2 w-4/5 rounded-sm bg-foreground/5" />
          <div className="h-2 w-3/5 rounded-sm bg-foreground/5" />
        </div>

        <style jsx>{`
          @keyframes skeletonSweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}</style>
      </div>
    )
  }

  if (variant === "circular") {
    const dim = typeof width === "number" ? width : 40
    return (
      <div
        data-slot="tron-skeleton"
        className={cn(
          "relative overflow-hidden rounded-full border border-primary/15 bg-primary/5",
          className
        )}
        style={{ width: dim, height: dim }}
        {...props}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ animation: "skeletonSweep 2s ease-in-out infinite" }}
        >
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary/8 to-transparent" />
        </div>
        <style jsx>{`
          @keyframes skeletonSweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}</style>
      </div>
    )
  }

  if (variant === "rectangular") {
    return (
      <div
        data-slot="tron-skeleton"
        className={cn(
          "relative overflow-hidden rounded border border-primary/15 bg-primary/5",
          className
        )}
        style={{ width: width || "100%", height: height || 80 }}
        {...props}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ animation: "skeletonSweep 2s ease-in-out infinite" }}
        >
          <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary/8 to-transparent" />
        </div>
        <style jsx>{`
          @keyframes skeletonSweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}</style>
      </div>
    )
  }

  // Text variant
  return (
    <div
      data-slot="tron-skeleton"
      className={cn("space-y-2", className)}
      style={{ width }}
      {...props}
    >
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-sm bg-primary/5"
          style={{
            height: height || 10,
            width: i === lines - 1 && lines > 1 ? "60%" : "100%",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              animation: `skeletonSweep 2s ease-in-out infinite`,
              animationDelay: `${i * 100}ms`,
            }}
          >
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary/8 to-transparent" />
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes skeletonSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  )
}
