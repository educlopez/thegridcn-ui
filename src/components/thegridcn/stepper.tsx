"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface Step {
  label: string
  description?: string
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
}

export function Stepper({
  steps,
  currentStep,
  orientation = "horizontal",
  className,
  ...props
}: StepperProps) {
  const isVertical = orientation === "vertical"

  return (
    <div
      data-slot="tron-stepper"
      className={cn(
        "relative overflow-hidden rounded border border-primary/30 bg-card/80 p-4 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

      <div className={cn(
        "flex",
        isVertical ? "flex-col gap-0" : "items-start gap-0"
      )}>
        {steps.map((step, i) => {
          const isActive = i === currentStep
          const isCompleted = i < currentStep
          const isLast = i === steps.length - 1

          return (
            <div
              key={i}
              className={cn(
                "flex",
                isVertical ? "flex-row gap-3" : "flex-1 flex-col items-center gap-2"
              )}
            >
              <div className={cn(
                "flex",
                isVertical ? "flex-col items-center" : "w-full items-center"
              )}>
                {/* Step circle */}
                <div className={cn(
                  "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-bold transition-all duration-500",
                  isCompleted && "border-green-500 bg-green-500/20 text-green-500",
                  isActive && "border-primary bg-primary/20 text-primary shadow-[0_0_12px_var(--primary)]",
                  !isCompleted && !isActive && "border-foreground/20 text-foreground/30"
                )}>
                  {isCompleted ? (
                    <span className="text-green-500">&#10003;</span>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                  {isActive && (
                    <div className="absolute inset-0 animate-ping rounded-full border border-primary opacity-20" />
                  )}
                </div>

                {/* Connector line */}
                {!isLast && (
                  <div className={cn(
                    "relative overflow-hidden",
                    isVertical ? "mx-auto h-8 w-0.5" : "h-0.5 flex-1"
                  )}>
                    <div className={cn(
                      "absolute inset-0",
                      isCompleted ? "bg-green-500" : "bg-foreground/15"
                    )} />
                    {isActive && (
                      <div
                        className="absolute bg-primary"
                        style={{
                          animation: "stepperPulse 1.5s ease-in-out infinite",
                          ...(isVertical
                            ? { left: 0, right: 0, height: "40%", top: 0 }
                            : { top: 0, bottom: 0, width: "40%", left: 0 }),
                        }}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Label */}
              <div className={cn(
                "transition-opacity duration-300",
                isVertical ? "flex-1 pb-4" : "text-center",
                !isCompleted && !isActive && "opacity-40"
              )}>
                <div className={cn(
                  "text-[10px] font-bold uppercase tracking-wider",
                  isActive && "text-primary",
                  isCompleted && "text-foreground/70"
                )}>
                  {step.label}
                </div>
                {step.description && (
                  <div className="mt-0.5 text-[9px] leading-relaxed text-foreground/50">
                    {step.description}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes stepperPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>

      {/* Corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/50" />
    </div>
  )
}
