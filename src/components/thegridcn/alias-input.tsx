"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AliasInputProps {
  onSubmit: (alias: string) => void
  onCancel: () => void
}

export function AliasInput({ onSubmit, onCancel }: AliasInputProps) {
  const [chars, setChars] = React.useState(["A", "A", "A"])
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  React.useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    const char = value.slice(-1).toUpperCase()
    if (!/^[A-Z]$/.test(char)) return

    const next = [...chars]
    next[index] = char
    setChars(next)

    if (index < 2) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (chars[index] !== "" && index > 0) {
        const next = [...chars]
        next[index] = "A"
        setChars(next)
        inputRefs.current[index - 1]?.focus()
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === "ArrowRight" && index < 2) {
      inputRefs.current[index + 1]?.focus()
    }
    if (e.key === "Enter") {
      onSubmit(chars.join(""))
    }
    if (e.key === "Escape") {
      onCancel()
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="font-mono text-[10px] tracking-[0.3em] text-primary/70">
        ENTER YOUR ALIAS
      </span>

      <div className="flex items-center gap-2">
        {chars.map((char, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el }}
            type="text"
            value={char}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
            maxLength={2}
            className={cn(
              "h-12 w-10 border bg-black/50 text-center font-mono text-xl font-bold tracking-widest text-primary caret-transparent",
              "border-primary/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50",
              "transition-all"
            )}
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onSubmit(chars.join(""))}
          className="border border-primary/50 bg-primary/10 px-5 py-2 font-mono text-[10px] tracking-[0.3em] text-primary transition-all hover:border-primary hover:bg-primary/20"
        >
          SUBMIT
        </button>
        <button
          onClick={onCancel}
          className="border border-muted-foreground/30 px-5 py-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground/60 transition-all hover:border-muted-foreground/50 hover:text-muted-foreground"
        >
          SKIP
        </button>
      </div>

      <span className="font-mono text-[8px] tracking-widest text-muted-foreground/40">
        ENTER TO CONFIRM / ESC TO SKIP
      </span>
    </div>
  )
}
