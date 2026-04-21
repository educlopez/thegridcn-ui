"use client"

import Link from "next/link"
import { selectableThemes, useTheme, type Theme } from "@/components/theme"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatusStrip } from "@/components/website"
import { cn } from "@/lib/utils"

const STATUS_STRIP_THEMES = [
  { label: "SECTION", value: "THEMES", highlighted: true },
  { label: "VARIANTS", value: "6 ACTIVE" },
  { label: "COLOR SPACE", value: "OKLCH" },
]

function ThemeCard({
  id,
  name,
  god,
  color,
}: {
  id: Theme
  name: string
  god: string
  color: string
}) {
  const { setTheme } = useTheme()

  const handleActivate = () => {
    setTheme(id)
  }

  return (
    <Link
      href={`/components?theme=${id}#data-card`}
      onClick={handleActivate}
      data-theme={id}
      className={cn(
        "group relative block cursor-pointer overflow-hidden border border-primary/30 bg-card/40 p-6 backdrop-blur-sm",
        "transition-all duration-300 hover:border-primary hover:bg-card/60",
        "hover:shadow-[0_0_40px_oklch(from_var(--primary)_l_c_h/0.25)]"
      )}
    >
      {/* Corner brackets */}
      <div className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-primary/50 transition-colors group-hover:border-primary" />
      <div className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-primary/50 transition-colors group-hover:border-primary" />
      <div className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-primary/50 transition-colors group-hover:border-primary" />
      <div className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-primary/50 transition-colors group-hover:border-primary" />

      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="h-4 w-4 rounded-full border border-primary/40"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 14px ${color}`,
            }}
            aria-hidden
          />
          <div>
            <div className="font-display text-lg font-bold tracking-[0.2em] text-primary">
              {name.toUpperCase()}
            </div>
            <div className="font-mono text-[10px] tracking-widest text-foreground/60">
              {god.toUpperCase()}
            </div>
          </div>
        </div>
        <span className="font-mono text-[9px] tracking-widest text-primary/70">
          {`//${id}`}
        </span>
      </div>

      {/* Divider */}
      <div className="mb-4 h-px w-full bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />

      {/* Preview surface */}
      <div className="mb-4 space-y-3 rounded border border-primary/20 bg-background/60 p-4">
        <div className="flex items-center gap-2">
          <Button size="sm" className="font-mono text-[10px] tracking-widest">
            EXECUTE
          </Button>
          <Badge variant="outline" className="font-mono text-[9px] tracking-widest">
            ACTIVE
          </Badge>
        </div>

        <div className="rounded border border-primary/30 bg-card/60 p-3">
          <div className="mb-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-foreground/60">
            <span>DATA.STREAM</span>
            <span className="text-primary">ONLINE</span>
          </div>
          <div className="flex items-end justify-between">
            <div className="font-display text-2xl font-bold text-primary">
              98.2
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="block w-1 bg-primary"
                  style={{
                    height: `${6 + i * 3}px`,
                    opacity: 0.3 + i * 0.12,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer action */}
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-primary/80 transition-colors group-hover:text-primary">
        <span>OPEN SUBJECT</span>
        <span className="inline-flex items-center gap-1">
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}

export function ThemeShowcaseSection() {
  return (
    <section
      id="theme-showcase"
      className="relative border-t border-primary/20 py-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <StatusStrip variant="default" items={STATUS_STRIP_THEMES} />

      <div className="container relative mx-auto px-4 pt-8">
        <div className="mb-16 text-center">
          <div className="mb-4 font-mono text-[10px] tracking-widest text-foreground/80">
            [ THEME DOSSIER ]
          </div>
          <h2 className="font-display text-3xl font-bold tracking-wider text-primary md:text-4xl lg:text-5xl [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)]">
            CHOOSE YOUR DEITY
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-foreground/80">
            Each theme is a self-contained palette. Hover a card to see the glow
            react, click to enter the grid under that program.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {selectableThemes.map((t) => (
            <ThemeCard
              key={t.id}
              id={t.id}
              name={t.name}
              god={t.god}
              color={t.color}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
