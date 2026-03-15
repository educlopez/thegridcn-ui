"use client"

import * as React from "react"
import {
  Calendar,
  Clock,
  Share2,
  BookOpen,
  ArrowRight,
  Hash,
  ChevronUp,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react"
import { BreadcrumbNav } from "@/components/thegridcn/breadcrumb-nav"
import { AgentAvatar } from "@/components/thegridcn/agent-avatar"
import { NewsletterForm } from "@/components/thegridcn/newsletter-form"
import { GlowContainer } from "@/components/thegridcn/glow-container"
import { TronCodeBlock } from "@/components/thegridcn/code-block"

/* ─────────────────────────────────────────────
   MOCK DATA
   ───────────────────────────────────────────── */

const BLOG_BREADCRUMBS = [
  { label: "Home", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Building Interfaces in the Grid", active: true },
]

const ARTICLE_TAGS = [
  "Grid Architecture",
  "UI Engineering",
  "Tron Systems",
  "TypeScript",
  "React",
]

const TABLE_OF_CONTENTS = [
  { label: "Introduction", href: "#introduction" },
  { label: "Grid Architecture", href: "#grid-architecture" },
  { label: "Building Components", href: "#building-components" },
  { label: "Data Flow Patterns", href: "#data-flow" },
  { label: "Visual Design Principles", href: "#visual-design" },
  { label: "Performance Optimization", href: "#performance" },
  { label: "Conclusion", href: "#conclusion" },
]

const RELATED_ARTICLES = [
  {
    title: "Deploying to the Grid: A Comprehensive Guide",
    excerpt: "Learn how to deploy your applications across the Grid network with zero-downtime strategies.",
    date: "Mar 8, 2026",
    readTime: "6 min read",
    slug: "#",
  },
  {
    title: "Theme Systems: From Ares to Poseidon",
    excerpt: "Deep dive into oklch() color spaces and how each Greek god theme transforms the interface.",
    date: "Feb 22, 2026",
    readTime: "9 min read",
    slug: "#",
  },
  {
    title: "3D Components in Production",
    excerpt: "Practical patterns for using Three.js components in server-rendered Next.js applications.",
    date: "Feb 10, 2026",
    readTime: "11 min read",
    slug: "#",
  },
]

const CODE_EXAMPLE = `import { GlowContainer } from "@/components/thegridcn/glow-container"
import { StatCard } from "@/components/thegridcn/stat-card"
import { Gauge } from "@/components/thegridcn/gauge"

export function GridDashboard() {
  return (
    <GlowContainer intensity="md" pulse>
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          title="Network Nodes"
          value={2847}
          unit="active"
          trend="up"
          trendValue="+12.4%"
        />
        <Gauge
          value={94.7}
          label="Grid Uptime"
          unit="%"
          variant="success"
        />
      </div>
    </GlowContainer>
  )
}`

const AUTHOR = {
  name: "Zara Flynn",
  role: "Senior Grid Architect at Encom",
  bio: "Zara has been building interfaces within the Grid for over a decade. She specializes in high-performance rendering pipelines and real-time data visualization. Previously led the UI infrastructure team at Flynn Industries.",
}

const ARTICLE = {
  title: "Building Interfaces in the Grid",
  subtitle: "A deep dive into constructing resilient, high-performance UI systems for Grid-connected applications",
  date: "March 12, 2026",
  readTime: "8 min read",
  views: "4,291",
}

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */

export function BlogTemplate() {
  const [showScrollTop, setShowScrollTop] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("introduction")

  React.useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 400)

      // Track active section
      const sections = TABLE_OF_CONTENTS.map((item) => item.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Top Bar ─────────────────────────────────── */}
      <div className="border-b border-primary/20 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded border border-primary/40 bg-primary/10">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-[family-name:var(--font-orbitron)] text-[11px] font-semibold uppercase tracking-wider text-primary">
              Grid Blog
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-foreground/40 sm:block">
              Transmission #{ARTICLE.views}
            </span>
            <div className="h-4 w-px bg-primary/20" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
              {ARTICLE.date}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Breadcrumbs */}
        <BreadcrumbNav items={BLOG_BREADCRUMBS} />

        <div className="mt-8 flex flex-col gap-10 lg:flex-row">
          {/* ── Article Column ────────────────────── */}
          <article className="min-w-0 flex-1">
            {/* Article Header */}
            <header className="mb-8">
              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {ARTICLE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary/70 transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Hash className="h-2.5 w-2.5" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="font-[family-name:var(--font-orbitron)] text-2xl font-bold uppercase tracking-wider text-foreground md:text-3xl lg:text-4xl">
                {ARTICLE.title}
              </h1>

              {/* Subtitle */}
              <p className="mt-3 text-sm leading-relaxed text-foreground/60 md:text-base">
                {ARTICLE.subtitle}
              </p>

              {/* Author + Meta */}
              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-primary/10 pt-6">
                <div className="flex items-center gap-3">
                  <AgentAvatar seed={AUTHOR.name} size={40} animated={false} ring={false} />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                      {AUTHOR.name}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-foreground/40">
                      {AUTHOR.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-foreground/40">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest">
                    <Calendar className="h-3 w-3" />
                    {ARTICLE.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest">
                    <Clock className="h-3 w-3" />
                    {ARTICLE.readTime}
                  </span>
                </div>
              </div>
            </header>

            {/* Hero Image Placeholder */}
            <div className="relative mb-10 overflow-hidden rounded border border-primary/20">
              <div className="aspect-[21/9] bg-gradient-to-br from-primary/10 via-background to-primary/5">
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb,0,180,255),0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb,0,180,255),0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />
                {/* Center label */}
                <div className="flex h-full items-center justify-center">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary/40">
                    // Hero Image — Grid Interface Render
                  </span>
                </div>
              </div>
              {/* Corner decorations */}
              <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/40" />
              <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/40" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/40" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/40" />
            </div>

            {/* ── Article Body ─────────────────────── */}
            <div className="prose-gridcn space-y-8">
              {/* Section: Introduction */}
              <section id="introduction">
                <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-bold uppercase tracking-wider text-foreground md:text-xl">
                  Introduction
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  The Grid is more than a digital frontier. It is a living ecosystem of interconnected interfaces,
                  data streams, and visual protocols that demand precision engineering. Building interfaces
                  within this system requires understanding not just how components render, but how they
                  communicate, adapt, and persist across distributed nodes.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  In this transmission, we will explore the foundational patterns for constructing
                  resilient UI systems that operate seamlessly within the Grid&apos;s architecture.
                  From component composition to real-time data binding, every pattern has been
                  battle-tested across thousands of active Grid nodes.
                </p>
              </section>

              {/* Section: Grid Architecture */}
              <section id="grid-architecture">
                <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-bold uppercase tracking-wider text-foreground md:text-xl">
                  Grid Architecture
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  The Grid operates on a distributed rendering model. Each node maintains its own
                  component tree while synchronizing state through a central relay system. This
                  architecture enables interfaces to remain responsive even when individual nodes
                  experience latency spikes or temporary disconnections.
                </p>

                <h3 className="mt-6 font-[family-name:var(--font-orbitron)] text-sm font-semibold uppercase tracking-wider text-foreground/90">
                  Core Principles
                </h3>

                {/* Bullet list */}
                <ul className="mt-3 space-y-2 pl-4">
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/60" />
                    <span><strong className="text-foreground/90">Isolation</strong> — Each component operates within its own rendering boundary, preventing cascade failures across the interface.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/60" />
                    <span><strong className="text-foreground/90">Reactivity</strong> — State changes propagate through observable streams, ensuring all connected components update in deterministic order.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/60" />
                    <span><strong className="text-foreground/90">Resilience</strong> — Components implement graceful degradation, maintaining partial functionality even during network partitions.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/60" />
                    <span><strong className="text-foreground/90">Composability</strong> — Primitives combine through well-defined interfaces, enabling complex layouts from simple building blocks.</span>
                  </li>
                </ul>
              </section>

              {/* Section: Building Components */}
              <section id="building-components">
                <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-bold uppercase tracking-wider text-foreground md:text-xl">
                  Building Components
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  Every Grid interface begins with a component. Components in the Grid are self-contained
                  units that encapsulate rendering logic, state management, and visual theming. The
                  recommended approach uses a layered composition pattern where primitives are wrapped
                  in themed containers.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  Below is an example of a typical Grid dashboard component that combines stat cards
                  with a gauge visualization inside a glow container:
                </p>

                {/* Code Block */}
                <div className="mt-4">
                  <TronCodeBlock
                    code={CODE_EXAMPLE}
                    language="tsx"
                    filename="grid-dashboard.tsx"
                  />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                  The <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] text-primary">GlowContainer</code> provides
                  the characteristic luminescent border effect, while the inner components handle
                  their own data binding and state transitions.
                </p>
              </section>

              {/* Section: Data Flow */}
              <section id="data-flow">
                <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-bold uppercase tracking-wider text-foreground md:text-xl">
                  Data Flow Patterns
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  Data within the Grid flows through a unidirectional pipeline. Sensors emit raw
                  telemetry, processors transform it into typed payloads, and renderers consume
                  the final output. This separation ensures that each layer can be independently
                  scaled, tested, and replaced without affecting the overall system.
                </p>

                {/* Blockquote / Callout */}
                <div className="mt-6">
                  <GlowContainer intensity="sm" hover={false} className="border-l-2 border-l-primary/60">
                    <div className="flex gap-3">
                      <div className="mt-0.5 text-primary/60">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6.5 3H3.5C3.22 3 3 3.22 3 3.5V6.5C3 6.78 3.22 7 3.5 7H5L4 10H6L7 7V3.5C7 3.22 6.78 3 6.5 3ZM12.5 3H9.5C9.22 3 9 3.22 9 3.5V6.5C9 6.78 9.22 7 9.5 7H11L10 10H12L13 7V3.5C13 3.22 12.78 3 12.5 3Z" fill="currentColor" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm italic leading-relaxed text-foreground/80">
                          The Grid does not distinguish between UI state and system state.
                          Every pixel is a reflection of the underlying data topology.
                          When you change the data, the interface responds — not because it
                          is instructed to, but because it is connected to.
                        </p>
                        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-primary/50">
                          — Kevin Flynn, Grid Architecture Manifesto
                        </p>
                      </div>
                    </div>
                  </GlowContainer>
                </div>

                {/* Numbered list */}
                <h3 className="mt-6 font-[family-name:var(--font-orbitron)] text-sm font-semibold uppercase tracking-wider text-foreground/90">
                  Implementation Steps
                </h3>
                <ol className="mt-3 space-y-2 pl-4">
                  {[
                    "Define your data schema using TypeScript interfaces with strict null checks enabled.",
                    "Create observable streams for each data source using the Grid relay protocol.",
                    "Bind streams to component props using the useGridStream() hook pattern.",
                    "Implement error boundaries at each stream consumption point for resilience.",
                    "Add telemetry collectors to monitor data flow latency across nodes.",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/70">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-primary/30 bg-primary/10 font-mono text-[10px] font-bold text-primary">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Section: Visual Design */}
              <section id="visual-design">
                <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-bold uppercase tracking-wider text-foreground md:text-xl">
                  Visual Design Principles
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  The Grid aesthetic is defined by three visual pillars: luminescence, geometry, and depth.
                  Every interface element should feel as though it exists within a three-dimensional
                  space, illuminated by the ambient glow of the Grid itself.
                </p>

                {/* Inline image placeholder */}
                <div className="relative mt-6 overflow-hidden rounded border border-primary/20">
                  <div className="aspect-[16/7] bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb,0,180,255),0.08),transparent_70%)]" />
                    <div className="flex h-full items-center justify-center">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-primary/40">
                        // Diagram — Grid Visual Layer Hierarchy
                      </span>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/30" />
                  <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/30" />
                  <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30" />
                  <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/30" />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                  Color is applied through CSS custom properties using the oklch() color space,
                  which provides perceptually uniform color transitions. Each theme — from the
                  aggressive reds of Ares to the calm blues of Poseidon — maintains consistent
                  contrast ratios and luminance values.
                </p>
              </section>

              {/* Section: Performance */}
              <section id="performance">
                <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-bold uppercase tracking-wider text-foreground md:text-xl">
                  Performance Optimization
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  Performance within the Grid is not optional — it is a survival requirement. Components
                  that render too slowly are automatically deprioritized by the Grid scheduler. The
                  following techniques ensure your interfaces remain in the fast path:
                </p>

                <ul className="mt-3 space-y-2 pl-4">
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/60" />
                    <span><strong className="text-foreground/90">Dynamic imports</strong> — Lazy-load heavy components like 3D visualizations with <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] text-primary">next/dynamic</code> and <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] text-primary">ssr: false</code>.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/60" />
                    <span><strong className="text-foreground/90">Virtualization</strong> — Render only visible rows in data-heavy tables using windowing techniques.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/60" />
                    <span><strong className="text-foreground/90">Memoization</strong> — Cache expensive computations with <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] text-primary">React.useMemo</code> and prevent unnecessary re-renders.</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/60" />
                    <span><strong className="text-foreground/90">CSS containment</strong> — Use <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] text-primary">contain: layout paint</code> on isolated widget boundaries to limit browser reflow scope.</span>
                  </li>
                </ul>
              </section>

              {/* Section: Conclusion */}
              <section id="conclusion">
                <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-bold uppercase tracking-wider text-foreground md:text-xl">
                  Conclusion
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  Building interfaces in the Grid is an exercise in balancing aesthetics with
                  engineering discipline. The patterns outlined in this guide provide a foundation,
                  but the Grid rewards experimentation. Each node you deploy, each component you
                  compose, adds to the evolving topology of the system.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  The Grid is alive. Build accordingly.
                </p>
              </section>
            </div>

            {/* ── Article Footer ───────────────────── */}
            <footer className="mt-12 space-y-8">
              {/* Share buttons */}
              <div className="flex items-center justify-between border-t border-primary/10 pt-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                  Share this transmission
                </span>
                <div className="flex items-center gap-2">
                  {[
                    { icon: <Twitter className="h-3.5 w-3.5" />, label: "Twitter" },
                    { icon: <Linkedin className="h-3.5 w-3.5" />, label: "LinkedIn" },
                    { icon: <Link2 className="h-3.5 w-3.5" />, label: "Copy link" },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      type="button"
                      aria-label={`Share on ${btn.label}`}
                      className="flex h-8 w-8 items-center justify-center rounded border border-primary/20 text-foreground/40 transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {btn.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Author bio card */}
              <div className="relative overflow-hidden rounded border border-primary/20 bg-card/80 p-5 backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
                <div className="relative flex flex-col gap-4 sm:flex-row">
                  <AgentAvatar seed={AUTHOR.name} size={56} animated ring />
                  <div className="flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-primary/50">
                      About the Author
                    </div>
                    <div className="mt-1 text-sm font-bold uppercase tracking-wider text-foreground">
                      {AUTHOR.name}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-foreground/40">
                      {AUTHOR.role}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-foreground/60">
                      {AUTHOR.bio}
                    </p>
                  </div>
                </div>
                {/* Corner decorations */}
                <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/30" />
                <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/30" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/30" />
              </div>

              {/* Newsletter */}
              <NewsletterForm
                title="Subscribe to Grid Transmissions"
                description="Get notified when new articles are published. No spam — only signal from within the Grid."
                buttonText="Subscribe"
              />

              {/* Related articles */}
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-primary/10" />
                  <span className="font-[family-name:var(--font-orbitron)] text-xs font-semibold uppercase tracking-wider text-foreground/50">
                    Related Transmissions
                  </span>
                  <div className="h-px flex-1 bg-primary/10" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {RELATED_ARTICLES.map((article) => (
                    <a
                      key={article.title}
                      href={article.slug}
                      className="group relative overflow-hidden rounded border border-primary/20 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.08)]"
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
                      <div className="relative">
                        <div className="flex items-center gap-3 text-foreground/40">
                          <span className="font-mono text-[10px] uppercase tracking-widest">
                            {article.date}
                          </span>
                          <span className="font-mono text-[10px]">/</span>
                          <span className="font-mono text-[10px] uppercase tracking-widest">
                            {article.readTime}
                          </span>
                        </div>
                        <h3 className="mt-2 font-[family-name:var(--font-orbitron)] text-xs font-bold uppercase tracking-wider text-foreground transition-colors group-hover:text-primary">
                          {article.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-foreground/50">
                          {article.excerpt}
                        </p>
                        <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-primary/60 transition-colors group-hover:text-primary">
                          Read more
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </div>
                      {/* Corner decorations */}
                      <div className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l-2 border-t-2 border-primary/20 transition-colors group-hover:border-primary/40" />
                      <div className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2 border-primary/20 transition-colors group-hover:border-primary/40" />
                    </a>
                  ))}
                </div>
              </div>
            </footer>
          </article>

          {/* ── Sidebar Column ────────────────────── */}
          <aside className="w-full shrink-0 space-y-6 lg:sticky lg:top-20 lg:w-72 lg:self-start">
            {/* Table of Contents */}
            <div className="relative overflow-hidden rounded border border-primary/20 bg-card/80 p-4 backdrop-blur-sm">
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
              <div className="relative">
                <div className="mb-3 flex items-center gap-2">
                  <Share2 className="h-3.5 w-3.5 text-primary/60" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                    Table of Contents
                  </span>
                </div>
                <nav className="space-y-0.5">
                  {TABLE_OF_CONTENTS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 rounded px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
                        activeSection === item.href.slice(1)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/50 hover:bg-primary/5 hover:text-foreground/80"
                      }`}
                    >
                      <div className={`h-1 w-1 rounded-full ${
                        activeSection === item.href.slice(1) ? "bg-primary" : "bg-foreground/20"
                      }`} />
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
              {/* Corner decorations */}
              <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/30" />
              <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/30" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/30" />
            </div>

            {/* Author Info Card */}
            <div className="relative overflow-hidden rounded border border-primary/20 bg-card/80 p-4 backdrop-blur-sm">
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
              <div className="relative flex flex-col items-center text-center">
                <AgentAvatar seed={AUTHOR.name} size={48} animated ring />
                <div className="mt-3 text-xs font-bold uppercase tracking-wider text-foreground">
                  {AUTHOR.name}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-foreground/40">
                  {AUTHOR.role}
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-foreground/50">
                  Grid interface specialist with 10+ years building high-performance distributed UIs.
                </p>
                <button
                  type="button"
                  className="mt-3 w-full rounded border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-primary transition-colors hover:bg-primary/20"
                >
                  View all posts
                </button>
              </div>
              {/* Corner decorations */}
              <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/30" />
              <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/30" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/30" />
            </div>

            {/* Related Articles (sidebar version) */}
            <div className="relative overflow-hidden rounded border border-primary/20 bg-card/80 p-4 backdrop-blur-sm">
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
              <div className="relative">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                  Related Transmissions
                </div>
                <div className="space-y-3">
                  {RELATED_ARTICLES.map((article) => (
                    <a
                      key={article.title}
                      href={article.slug}
                      className="group block border-b border-primary/10 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="font-mono text-[10px] text-foreground/30">
                        {article.date}
                      </div>
                      <div className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-foreground/70 transition-colors group-hover:text-primary">
                        {article.title}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              {/* Corner decorations */}
              <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/30" />
              <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/30" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/30" />
            </div>
          </aside>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded border border-primary/30 bg-background/90 text-primary/60 shadow-lg backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
