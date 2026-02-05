"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface HUDCornerFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  size?: number
}

export function HUDCornerFrame({
  position,
  size = 60,
  className,
  ...props
}: HUDCornerFrameProps) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  }

  const borderClasses = {
    "top-left": "border-l-2 border-t-2",
    "top-right": "border-r-2 border-t-2",
    "bottom-left": "border-l-2 border-b-2",
    "bottom-right": "border-r-2 border-b-2",
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute border-primary/60",
        positionClasses[position],
        borderClasses[position],
        className
      )}
      style={{ width: size, height: size }}
      {...props}
    />
  )
}
