import Link from "next/link"
import { TheGridcnLogo } from "@/components/layout/thegridcn-logo"
import { UplinkHeader } from "@/components/thegridcn/uplink-header"

type FooterLink = {
  label: string
  href: string
  external?: boolean
  description?: string
}

type FooterColumn = {
  title: string
  links: FooterLink[]
}

const navigateColumn: FooterColumn = {
  title: "NAVIGATE",
  links: [
    { label: "Components", href: "/components" },
    { label: "Templates", href: "/templates" },
    { label: "Dashboard Template", href: "/templates/dashboard" },
    { label: "Landing Template", href: "/templates/landing" },
    { label: "Blog Template", href: "/templates/blog" },
    { label: "Analytics Template", href: "/templates/analytics" },
    { label: "Login Template", href: "/templates/login" },
    { label: "Game", href: "/game" },
  ],
}

const developColumn: FooterColumn = {
  title: "DEVELOP",
  links: [
    { label: "Install Guide", href: "/docs/install" },
    { label: "Tokens", href: "/tokens" },
    { label: "Changelog", href: "/changelog" },
    { label: "Contributing", href: "/contributing" },
    {
      label: "GitHub",
      href: "https://github.com/educlopez/thegridcn-ui",
      external: true,
    },
  ],
}

const byEduardoColumn: FooterColumn = {
  title: "BY THE MAKER",
  links: [
    {
      label: "smoothui.dev",
      href: "https://smoothui.dev",
      external: true,
      description: "Beautiful React components with smooth animations",
    },
    {
      label: "sparkbites.dev",
      href: "https://sparkbites.dev",
      external: true,
      description: "Daily design & dev inspiration",
    },
    {
      label: "codevator.dev",
      href: "https://codevator.dev",
      external: true,
      description: "Level up your coding workflow",
    },
    {
      label: "ui-craft",
      href: "https://skills.smoothui.dev",
      external: true,
      description: "Claude skill for crafting UI",
    },
    {
      label: "Twitter / X",
      href: "https://x.com/educalvolpz",
      external: true,
      description: "@educalvolpz",
    },
  ],
}

type FooterLinkListProps = {
  column: FooterColumn
}

function FooterLinkList({ column }: FooterLinkListProps) {
  return (
    <div>
      <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span aria-hidden="true">{"// "}</span>
        {column.title}
      </h3>
      <ul className="space-y-2.5">
        {column.links.map((link) => (
          <li key={`${column.title}-${link.label}`}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function FooterLinkItem({ link }: { link: FooterLink }) {
  const linkClass =
    "group inline-flex flex-col text-sm text-foreground/80 transition-[color,text-shadow] duration-200 hover:text-primary hover:[text-shadow:0_0_8px_var(--primary)] focus-visible:text-primary focus-visible:outline-none focus-visible:[text-shadow:0_0_8px_var(--primary)]"

  const content = (
    <>
      <span>{link.label}</span>
      {link.description && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70 group-hover:text-muted-foreground">
          {link.description}
        </span>
      )}
    </>
  )

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        title={link.description}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={link.href} className={linkClass} title={link.description}>
      {content}
    </Link>
  )
}

type StatusMetric = {
  label: string
  value: string
}

const statusMetrics: StatusMetric[] = [
  { label: "COMPONENTS", value: "115" },
  { label: "THEMES", value: "6" },
  { label: "VERSION", value: "v0.1.0" },
]

function StatusHUD() {
  return (
    <div className="relative border border-primary/30 bg-primary/5 p-4">
      <div className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-primary/60" />
      <div className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-primary/60" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-primary/60" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-primary/60" />

      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
        <span>SYSTEM STATUS</span>
        <span className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            style={{ boxShadow: "0 0 6px var(--primary)" }}
          />
          ONLINE
        </span>
      </div>

      <dl className="space-y-1.5">
        {statusMetrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center gap-2 font-mono text-[11px]"
          >
            <dt className="tracking-wider text-muted-foreground">
              {metric.label}
            </dt>
            <span
              className="h-px flex-1 bg-border/60"
              aria-hidden="true"
            />
            <dd className="tracking-widest text-foreground">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <UplinkHeader
        leftText="SYSTEM: THE GRIDCN v0.1.0"
        rightText="UPTIME: 99.9% - END OF LINE"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center">
              <TheGridcnLogo size="md" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-foreground/70">
              Greek gods meet the Grid. shadcn/ui themes with Tron DNA.
            </p>
            <StatusHUD />
            <div className="space-y-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <p>&copy; {year} Eduardo Calvo</p>
              <p>Built with Next.js 16 &middot; Tailwind 4 &middot; React 19</p>
            </div>
          </div>

          <FooterLinkList column={navigateColumn} />
          <FooterLinkList column={developColumn} />
          <FooterLinkList column={byEduardoColumn} />
        </div>

        <div className="mt-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            GRID YEAR {year} &middot; ALL PROGRAMS RESERVED
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>
    </footer>
  )
}
