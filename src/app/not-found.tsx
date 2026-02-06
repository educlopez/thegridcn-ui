import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="mb-6 font-mono text-[10px] tracking-widest text-foreground/50">
        [ SIGNAL LOST ]
      </div>
      <h1 className="font-display text-6xl font-bold tracking-wider text-primary md:text-8xl [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)]">
        404
      </h1>
      <p className="mt-4 font-display text-lg tracking-wider text-foreground/80">
        This sector does not exist on The Grid
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="border border-primary/30 bg-primary/10 px-6 py-2 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary/20"
        >
          Return Home
        </Link>
        <Link
          href="/components"
          className="border border-foreground/20 px-6 py-2 font-mono text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:border-primary/30 hover:text-primary"
        >
          Browse Components
        </Link>
      </div>
    </div>
  )
}
