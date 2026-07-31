import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Crumb {
  href?: string;
  label: string;
}

export function DocShell({
  crumbs,
  title,
  subtitle,
  children,
  className,
}: {
  crumbs: Crumb[];
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.2em]"
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
          <span className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-primary border-t border-l" />
          <span className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-primary border-t border-r" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-primary border-b border-l" />
          <span className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-primary border-r border-b" />

          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">
            <span className="mr-2 inline-block h-1.5 w-1.5 bg-primary align-middle" />
            GRIDCN {/* DOCS */}
          </div>
          <h1 className="mt-3 font-display text-3xl text-foreground uppercase tracking-[0.12em] md:text-4xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-3 max-w-2xl text-foreground/70 text-sm">
              {subtitle}
            </p>
          ) : null}
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
}
