"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string
  hint?: string
  error?: string
  icon?: React.ReactNode
  size?: "sm" | "md" | "lg"
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    { label, hint, error, icon, size = "md", className, ...props },
    ref
  ) {
    return (
      <div data-slot="tron-text-input" className={cn("space-y-1", className)}>
        {label && (
          <label className="block font-mono text-[9px] uppercase tracking-widest text-foreground/40">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/25">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full rounded border bg-card/60 font-mono text-foreground/80 outline-none backdrop-blur-sm transition-all placeholder:text-foreground/20",
              "focus:border-primary/40 focus:shadow-[0_0_8px_rgba(var(--primary-rgb,0,180,255),0.1)]",
              error ? "border-red-500/40" : "border-primary/20",
              icon ? "pl-9" : "pl-3",
              size === "sm" && "py-1.5 pr-3 text-[10px]",
              size === "md" && "py-2 pr-3 text-xs",
              size === "lg" && "py-2.5 pr-3 text-sm",
              props.disabled && "cursor-not-allowed opacity-40"
            )}
            {...props}
          />
        </div>

        {(hint || error) && (
          <p className={cn(
            "font-mono text-[9px]",
            error ? "text-red-400" : "text-foreground/25"
          )}>
            {error || hint}
          </p>
        )}
      </div>
    )
  }
)
