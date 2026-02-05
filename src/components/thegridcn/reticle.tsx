"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ReticleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
  animated?: boolean
  variant?: "default" | "locked" | "scanning"
}

export function Reticle({
  size = 120,
  animated = true,
  variant = "default",
  className,
  ...props
}: ReticleProps) {
  const variantColors = {
    default: "stroke-primary",
    locked: "stroke-red-500",
    scanning: "stroke-amber-500",
  }

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        viewBox="0 0 100 100"
        className={cn(
          "h-full w-full",
          animated && variant === "scanning" && "animate-pulse"
        )}
      >
        {/* Outer circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className={cn(variantColors[variant], "opacity-30")}
          strokeWidth="1"
        />

        {/* Inner circle */}
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          className={cn(variantColors[variant], "opacity-50")}
          strokeWidth="1"
        />

        {/* Center dot */}
        <circle
          cx="50"
          cy="50"
          r="3"
          className={cn(
            variantColors[variant].replace("stroke-", "fill-"),
            "opacity-80"
          )}
        />

        {/* Crosshairs */}
        <line
          x1="50"
          y1="5"
          x2="50"
          y2="20"
          className={variantColors[variant]}
          strokeWidth="1"
        />
        <line
          x1="50"
          y1="80"
          x2="50"
          y2="95"
          className={variantColors[variant]}
          strokeWidth="1"
        />
        <line
          x1="5"
          y1="50"
          x2="20"
          y2="50"
          className={variantColors[variant]}
          strokeWidth="1"
        />
        <line
          x1="80"
          y1="50"
          x2="95"
          y2="50"
          className={variantColors[variant]}
          strokeWidth="1"
        />

        {/* Corner brackets */}
        <path
          d="M 15 25 L 15 15 L 25 15"
          fill="none"
          className={variantColors[variant]}
          strokeWidth="2"
        />
        <path
          d="M 75 15 L 85 15 L 85 25"
          fill="none"
          className={variantColors[variant]}
          strokeWidth="2"
        />
        <path
          d="M 85 75 L 85 85 L 75 85"
          fill="none"
          className={variantColors[variant]}
          strokeWidth="2"
        />
        <path
          d="M 25 85 L 15 85 L 15 75"
          fill="none"
          className={variantColors[variant]}
          strokeWidth="2"
        />
      </svg>

      {/* Rotating ring for scanning */}
      {animated && variant === "scanning" && (
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full animate-spin"
          style={{ animationDuration: "3s" }}
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            className="stroke-amber-500"
            strokeWidth="2"
            strokeDasharray="20 60"
          />
        </svg>
      )}
    </div>
  )
}
