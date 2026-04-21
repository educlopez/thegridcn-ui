import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Crumb = { label: string; href?: string }

export function DocShell({
  crumbs,
  title,
  subtitle,
  children,
  className,
}: {
  crumbs: Crumb[]
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
        >
          {crumbs.map((c, i) => (
            <span key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight
                  className="h-3 w-3 text-primary/60"
                  aria-hidden="true"
                />
              )}
              {c.href ? (
                <Link
                  href={c.href}
                  className="transition-colors hover:text-primary"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="text-foreground">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <header className="relative mb-10 border border-primary/30 bg-primary/5 p-6">
          <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-primary" />
          <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-primary" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-primary" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-primary" />

          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            <span className="mr-2 inline-block h-1.5 w-1.5 bg-primary align-middle" />
            GRIDCN // DOCS
          </div>
          <h1 className="mt-3 font-display text-3xl uppercase tracking-[0.12em] text-foreground md:text-4xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-sm text-foreground/70">
              {subtitle}
            </p>
          ) : null}
        </header>

        <div>{children}</div>
      </div>
    </div>
  )
}
