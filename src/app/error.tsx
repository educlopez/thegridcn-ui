"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-6 font-mono text-[10px] tracking-widest text-foreground/50">
        [ SYSTEM MALFUNCTION ]
      </div>
      <h1 className="font-display text-6xl font-bold tracking-wider text-primary md:text-8xl [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)]">
        ERROR
      </h1>
      <p className="mt-4 font-display text-lg tracking-wider text-foreground/80">
        {error.message || "An unexpected error occurred on The Grid"}
      </p>
      <div className="mt-8">
        <button
          onClick={reset}
          className="border border-primary/30 bg-primary/10 px-6 py-2 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary/20"
        >
          Retry Program
        </button>
      </div>
    </div>
  )
}
