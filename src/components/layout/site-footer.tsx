import Link from "next/link";
import { TheGridcnLogo } from "@/components/layout/thegridcn-logo";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";

interface FooterLink {
  description?: string;
  external?: boolean;
  href: string;
  label: string;
}

interface FooterColumn {
  links: FooterLink[];
  title: string;
}

const navigateColumn: FooterColumn = {
  links: [
    { href: "/components", label: "Components" },
    { href: "/templates", label: "Templates" },
    { href: "/templates/dashboard", label: "Dashboard Template" },
    { href: "/templates/landing", label: "Landing Template" },
    { href: "/templates/blog", label: "Blog Template" },
    { href: "/templates/analytics", label: "Analytics Template" },
    { href: "/templates/login", label: "Login Template" },
    { href: "/game", label: "Game" },
  ],
  title: "NAVIGATE",
};

const developColumn: FooterColumn = {
  links: [
    { href: "/docs/install", label: "Install Guide" },
    { href: "/tokens", label: "Tokens" },
    { href: "/changelog", label: "Changelog" },
    { href: "/contributing", label: "Contributing" },
    {
      external: true,
      href: "https://github.com/educlopez/thegridcn-ui",
      label: "GitHub",
    },
  ],
  title: "DEVELOP",
};

const byEduardoColumn: FooterColumn = {
  links: [
    {
      description: "Beautiful React components with smooth animations",
      external: true,
      href: "https://smoothui.dev",
      label: "smoothui.dev",
    },
    {
      description: "Daily design & dev inspiration",
      external: true,
      href: "https://sparkbites.dev",
      label: "sparkbites.dev",
    },
    {
      description: "Level up your coding workflow",
      external: true,
      href: "https://codevator.dev",
      label: "codevator.dev",
    },
    {
      description: "Claude skill for crafting UI",
      external: true,
      href: "https://skills.smoothui.dev",
      label: "ui-craft",
    },
    {
      description: "@educalvolpz",
      external: true,
      href: "https://x.com/educalvolpz",
      label: "Twitter / X",
    },
  ],
  title: "BY THE MAKER",
};

interface FooterLinkListProps {
  column: FooterColumn;
}

function FooterLinkList({ column }: FooterLinkListProps) {
  return (
    <div>
      <h3 className="mb-4 font-mono text-muted-foreground text-xs uppercase tracking-[0.2em]">
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
  );
}

function FooterLinkItem({ link }: { link: FooterLink }) {
  const linkClass =
    "group inline-flex flex-col text-sm text-foreground/80 transition-[color,text-shadow] duration-200 hover:text-primary hover:[text-shadow:0_0_8px_var(--primary)] focus-visible:text-primary focus-visible:outline-none focus-visible:[text-shadow:0_0_8px_var(--primary)]";

  const content = (
    <>
      <span>{link.label}</span>
      {link.description ? (
        <span className="font-mono text-[10px] text-muted-foreground/70 uppercase tracking-wider group-hover:text-muted-foreground">
          {link.description}
        </span>
      ) : null}
    </>
  );

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
    );
  }

  return (
    <Link href={link.href} className={linkClass} title={link.description}>
      {content}
    </Link>
  );
}

interface StatusMetric {
  label: string;
  value: string;
}

const statusMetrics: StatusMetric[] = [
  { label: "COMPONENTS", value: "115" },
  { label: "THEMES", value: "6" },
  { label: "VERSION", value: "v0.1.0" },
];

function StatusHUD() {
  return (
    <div className="relative border border-primary/30 bg-primary/5 p-4">
      <div className="pointer-events-none absolute top-0 left-0 h-2 w-2 border-primary/60 border-t border-l" />
      <div className="pointer-events-none absolute top-0 right-0 h-2 w-2 border-primary/60 border-t border-r" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-primary/60 border-b border-l" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-2 w-2 border-primary/60 border-r border-b" />

      <div className="mb-3 flex items-center justify-between font-mono text-[10px] text-primary uppercase tracking-[0.2em]">
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
            <dt className="text-muted-foreground tracking-wider">
              {metric.label}
            </dt>
            <span className="h-px flex-1 bg-border/60" aria-hidden="true" />
            <dd className="text-foreground tracking-widest">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-border border-t bg-background">
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
            <p className="max-w-xs text-foreground/70 text-sm leading-relaxed">
              Greek gods meet the Grid. shadcn/ui themes with Tron DNA.
            </p>
            <StatusHUD />
            <div className="space-y-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
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
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
            GRID YEAR {year} &middot; ALL PROGRAMS RESERVED
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
        </div>
      </div>
    </footer>
  );
}
