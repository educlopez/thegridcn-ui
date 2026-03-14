"use client"

import * as React from "react"
import { HeroSection } from "@/components/thegridcn/hero-section"
import { LogoCloud } from "@/components/thegridcn/logo-cloud"
import { BentoGrid } from "@/components/thegridcn/bento-grid"
import { StatsCounter } from "@/components/thegridcn/stats-counter"
import { PricingCard } from "@/components/thegridcn/pricing-card"
import { ComparisonTable } from "@/components/thegridcn/comparison-table"
import { CTABanner } from "@/components/thegridcn/cta-banner"
import { FAQ } from "@/components/thegridcn/faq"
import { NewsletterForm } from "@/components/thegridcn/newsletter-form"
import { Footer } from "@/components/thegridcn/footer"
import { AgentAvatar } from "@/components/thegridcn/agent-avatar"
import {
  Zap,
  Shield,
  Palette,
  Layers,
  Monitor,
  Code,
  Globe,
  Lock,
  Cpu,
  Menu,
  X,
} from "lucide-react"

/* ─────────────────────────────────────────────
 * Mock Data Constants
 * ───────────────────────────────────────────── */

const LANDING_NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
]

const LANDING_LOGOS = [
  { name: "Encom", icon: <Globe className="h-3.5 w-3.5" /> },
  { name: "Flynn Industries", icon: <Cpu className="h-3.5 w-3.5" /> },
  { name: "Digitech", icon: <Monitor className="h-3.5 w-3.5" /> },
  { name: "Nexus Corp", icon: <Shield className="h-3.5 w-3.5" /> },
  { name: "Gridworks", icon: <Layers className="h-3.5 w-3.5" /> },
  { name: "Voxel Labs", icon: <Code className="h-3.5 w-3.5" /> },
  { name: "CyberCore", icon: <Zap className="h-3.5 w-3.5" /> },
  { name: "DataStream", icon: <Lock className="h-3.5 w-3.5" /> },
]

const LANDING_FEATURES = [
  {
    title: "Lightning Performance",
    description:
      "Built with React 19 and Next.js 16 for blazing-fast server-side rendering and edge-ready deployments.",
    icon: <Zap className="h-4 w-4" />,
    span: "2x1" as const,
    variant: "highlight" as const,
  },
  {
    title: "6 Theme Systems",
    description:
      "Greek god-inspired color schemes — Ares, Tron, Clu, Athena, Aphrodite, and Poseidon — all using oklch() color space.",
    icon: <Palette className="h-4 w-4" />,
    span: "1x1" as const,
    variant: "default" as const,
  },
  {
    title: "55+ Components",
    description:
      "A comprehensive library of Tron-inspired UI primitives, from data tables to 3D grids and animated gauges.",
    icon: <Layers className="h-4 w-4" />,
    span: "1x1" as const,
    variant: "default" as const,
  },
  {
    title: "Cyber Security",
    description:
      "Enterprise-grade patterns with secure-by-default components, ARIA-compliant accessibility, and CSP-ready styling.",
    icon: <Shield className="h-4 w-4" />,
    span: "1x1" as const,
    variant: "default" as const,
  },
  {
    title: "Developer Experience",
    description:
      "TypeScript-first APIs, full IntelliSense support, and copy-paste-ready components with zero config.",
    icon: <Code className="h-4 w-4" />,
    span: "1x1" as const,
    variant: "default" as const,
  },
]

const LANDING_STATS = [
  { value: 55, label: "Components", suffix: "+" },
  { value: 6, label: "Theme Systems" },
  { value: 100, label: "TypeScript Coverage", suffix: "%" },
  { value: 4800, label: "GitHub Stars", suffix: "+" },
]

const LANDING_PRICING_FREE_FEATURES = [
  { text: "All 55+ UI components", included: true },
  { text: "6 theme systems", included: true },
  { text: "Community support", included: true },
  { text: "MIT License", included: true },
  { text: "Template examples", included: false },
  { text: "Priority updates", included: false },
  { text: "Custom theme builder", included: false },
  { text: "Dedicated support", included: false },
]

const LANDING_PRICING_PRO_FEATURES = [
  { text: "All 55+ UI components", included: true },
  { text: "6 theme systems", included: true },
  { text: "Priority support", included: true },
  { text: "MIT License", included: true },
  { text: "Dashboard & landing templates", included: true },
  { text: "Priority updates", included: true },
  { text: "Custom theme builder", included: false },
  { text: "Dedicated support", included: false },
]

const LANDING_PRICING_ENTERPRISE_FEATURES = [
  { text: "All 55+ UI components", included: true },
  { text: "6 theme systems", included: true },
  { text: "24/7 dedicated support", included: true },
  { text: "MIT License", included: true },
  { text: "All templates + source", included: true },
  { text: "Priority updates", included: true },
  { text: "Custom theme builder", included: true },
  { text: "Dedicated support channel", included: true },
]

const LANDING_TESTIMONIALS = [
  {
    quote:
      "The Gridcn transformed our product dashboard. The Tron aesthetic gives our platform a futuristic edge that users love.",
    author: "Aria Chen",
    role: "CTO at Nexus Corp",
    rating: 5,
  },
  {
    quote:
      "We shipped our redesign in half the time. The component library is incredibly well-thought-out and the theme system is pure gold.",
    author: "Marcus Webb",
    role: "Lead Engineer at Digitech",
    rating: 5,
  },
  {
    quote:
      "Finally a UI kit that doesn't look like everything else on the web. Our clients are blown away by the visual quality.",
    author: "Elena Rossi",
    role: "Design Director at Voxel Labs",
    rating: 4,
  },
]

const LANDING_COMPARISON_COLUMNS = [
  { name: "The Gridcn", highlighted: true },
  { name: "Standard UI Kit" },
  { name: "Custom Build" },
]

const LANDING_COMPARISON_FEATURES = [
  { name: "Tron-inspired aesthetic", values: [true, false, false] as (boolean | string)[] },
  { name: "6 theme systems", values: [true, false, false] as (boolean | string)[] },
  { name: "55+ components", values: [true, "30+", "Varies"] as (boolean | string)[] },
  { name: "TypeScript-first", values: [true, true, false] as (boolean | string)[] },
  { name: "Dark mode optimized", values: [true, "Partial", false] as (boolean | string)[] },
  { name: "3D components", values: [true, false, false] as (boolean | string)[] },
  { name: "Animated effects", values: [true, "Basic", false] as (boolean | string)[] },
  { name: "oklch() color space", values: [true, false, false] as (boolean | string)[] },
  { name: "Copy-paste ready", values: [true, true, false] as (boolean | string)[] },
  { name: "Time to ship", values: ["Days", "Weeks", "Months"] as (boolean | string)[] },
]

const LANDING_FAQ_ITEMS = [
  {
    question: "What is The Gridcn?",
    answer:
      "The Gridcn is a Tron: Ares inspired UI component library built on top of shadcn/ui. It features Greek god-themed color schemes, 3D effects, and movie-accurate Tron aesthetics — all built with Next.js, React, TypeScript, and Tailwind CSS.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes! The core component library is completely free and open-source under the MIT license. You can use it in personal and commercial projects without any restrictions.",
  },
  {
    question: "How do I install it?",
    answer:
      "You can install individual components via the shadcn/ui CLI or copy them directly from the source. Each component is self-contained and ready to drop into your Next.js project.",
  },
  {
    question: "Does it work with existing shadcn/ui components?",
    answer:
      "Absolutely. The Gridcn extends shadcn/ui — all base primitives remain fully compatible. You can mix and match standard and Tron-themed components in the same project.",
  },
  {
    question: "How does the theme system work?",
    answer:
      "Themes are powered by CSS custom properties using the oklch() color space. Switch themes by setting a data-theme attribute on your HTML element. Theme state persists automatically via localStorage.",
  },
  {
    question: "Can I create custom themes?",
    answer:
      "Yes. The theme system is designed to be extensible. Define your own oklch() color variables following the existing pattern and add a new data-theme entry in your CSS.",
  },
]

const LANDING_FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/components" },
      { label: "Templates", href: "/templates" },
      { label: "Themes", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Getting Started", href: "#" },
      { label: "Examples", href: "#" },
      { label: "API Reference", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "#", external: true },
      { label: "Discord", href: "#", external: true },
      { label: "Twitter", href: "#", external: true },
      { label: "Blog", href: "#" },
    ],
  },
]

const LANDING_FOOTER_SOCIALS = [
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
      </svg>
    ),
  },
]

/* ─────────────────────────────────────────────
 * Landing Template Component
 * ───────────────────────────────────────────── */

export function LandingTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Sticky Navbar ─────────────────────────── */}
      <nav className="sticky top-0 z-40 border-b border-primary/20 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-primary/40 bg-primary/10">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
              The Gridcn
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 md:flex">
            {LANDING_NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              className="rounded border border-primary bg-primary/20 px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-primary shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)] transition-all duration-300 hover:bg-primary/30"
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-8 w-8 items-center justify-center rounded border border-primary/30 text-foreground/60 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-primary/10 bg-background/95 px-6 py-4 backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-3">
              {LANDING_NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-xs uppercase tracking-widest text-foreground/60 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded border border-primary bg-primary/20 px-4 py-2 text-center font-mono text-[10px] uppercase tracking-widest text-primary"
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero Section ──────────────────────────── */}
      <section className="relative px-6 py-12 md:py-0">
        {/* Subtle circuit-like background pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb,0,180,255),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb,0,180,255),0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="mx-auto max-w-6xl">
          <HeroSection
            title="Build the Future Grid"
            subtitle="Tron-Inspired Component Library"
            description="A premium collection of 55+ UI components with 6 Greek god-themed color systems, 3D effects, and movie-accurate Tron aesthetics. Built for React 19 and Next.js 16."
            badge="NEW — v2.0 Released"
            align="center"
            className="border-0 bg-transparent px-0 md:px-0 md:py-28 lg:py-36"
          >
            <a
              href="#pricing"
              className="rounded border border-primary bg-primary/20 px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest text-primary shadow-[0_0_16px_rgba(var(--primary-rgb,0,180,255),0.2)] transition-all duration-300 hover:bg-primary/30"
            >
              Get Started
            </a>
            <a
              href="/components"
              className="rounded border border-primary/30 px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest text-foreground/60 transition-colors hover:border-primary/50 hover:text-primary"
            >
              View Components
            </a>
          </HeroSection>
        </div>
      </section>

      {/* ── Logo Cloud ────────────────────────────── */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <LogoCloud
            logos={LANDING_LOGOS}
            label="Trusted by teams building the future"
            speed="slow"
          />
        </div>
      </section>

      {/* ── Features (BentoGrid) ──────────────────── */}
      <section id="features" className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
              Capabilities
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-foreground md:text-3xl">
              Everything You Need
            </h2>
            <div className="mx-auto mt-3 flex justify-center gap-1">
              <div className="h-px w-12 bg-primary/60" />
              <div className="h-px w-6 bg-primary/30" />
              <div className="h-px w-3 bg-primary/15" />
            </div>
          </div>

          <BentoGrid items={LANDING_FEATURES} columns={3} />
        </div>
      </section>

      {/* ── Stats Counter ─────────────────────────── */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <StatsCounter items={LANDING_STATS} columns={4} />
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────── */}
      <section id="pricing" className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
              Pricing
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-foreground md:text-3xl">
              Choose Your Access Level
            </h2>
            <div className="mx-auto mt-3 flex justify-center gap-1">
              <div className="h-px w-12 bg-primary/60" />
              <div className="h-px w-6 bg-primary/30" />
              <div className="h-px w-3 bg-primary/15" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <PricingCard
              title="Free"
              price="$0"
              period="/forever"
              description="Perfect for personal projects and exploration."
              features={LANDING_PRICING_FREE_FEATURES}
              ctaText="Get Started"
            />
            <PricingCard
              title="Pro"
              price="$29"
              period="/mo"
              description="For teams building production applications."
              features={LANDING_PRICING_PRO_FEATURES}
              ctaText="Upgrade to Pro"
              highlighted
              badge="POPULAR"
              className="md:-mt-4 md:mb-[-16px]"
            />
            <PricingCard
              title="Enterprise"
              price="$99"
              period="/mo"
              description="Full access with dedicated support and custom themes."
              features={LANDING_PRICING_ENTERPRISE_FEATURES}
              ctaText="Contact Sales"
            />
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────── */}
      <section id="testimonials" className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
              Testimonials
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-foreground md:text-3xl">
              Loved by Developers
            </h2>
            <div className="mx-auto mt-3 flex justify-center gap-1">
              <div className="h-px w-12 bg-primary/60" />
              <div className="h-px w-6 bg-primary/30" />
              <div className="h-px w-3 bg-primary/15" />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {LANDING_TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded border border-primary/20 bg-card/80 p-5 backdrop-blur-sm"
              >
                {/* Scanline overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />

                {/* Quote mark */}
                <div className="mb-3 font-display text-2xl leading-none text-primary/30">&quot;</div>

                {/* Quote text */}
                <p className="text-sm leading-relaxed text-foreground/80">{t.quote}</p>

                {/* Rating */}
                {t.rating !== undefined && (
                  <div className="mt-3 flex gap-0.5">
                    {Array.from({ length: 5 }, (_, j) => (
                      <span
                        key={j}
                        className={j < t.rating ? "text-xs text-primary" : "text-xs text-foreground/15"}
                      >
                        ◆
                      </span>
                    ))}
                  </div>
                )}

                {/* Author with AgentAvatar */}
                <div className="mt-4 flex items-center gap-3 border-t border-border/30 pt-4">
                  <AgentAvatar seed={t.author} size={36} animated={false} ring={false} />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-foreground">
                      {t.author}
                    </div>
                    {t.role && (
                      <div className="text-[10px] uppercase tracking-widest text-foreground/40">
                        {t.role}
                      </div>
                    )}
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-primary/30" />
                <div className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-primary/30" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary/30" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ──────────────────────── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
              Comparison
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-foreground md:text-3xl">
              How We Compare
            </h2>
            <div className="mx-auto mt-3 flex justify-center gap-1">
              <div className="h-px w-12 bg-primary/60" />
              <div className="h-px w-6 bg-primary/30" />
              <div className="h-px w-3 bg-primary/15" />
            </div>
          </div>

          <ComparisonTable
            columns={LANDING_COMPARISON_COLUMNS}
            features={LANDING_COMPARISON_FEATURES}
            label="Feature Matrix"
          />
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <CTABanner
            title="Ready to Enter the Grid?"
            description="Join thousands of developers building futuristic interfaces with The Gridcn. Free, open-source, and endlessly customizable."
            primaryAction={{ label: "Get Started Free" }}
            secondaryAction={{ label: "View on GitHub" }}
            variant="highlight"
          />
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <section id="faq" className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
              FAQ
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-wider text-foreground md:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-3 flex justify-center gap-1">
              <div className="h-px w-12 bg-primary/60" />
              <div className="h-px w-6 bg-primary/30" />
              <div className="h-px w-3 bg-primary/15" />
            </div>
          </div>

          <FAQ items={LANDING_FAQ_ITEMS} multiple />
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <NewsletterForm
            title="Stay Connected to the Grid"
            description="Get notified about new components, theme updates, and major releases. No spam — just signal."
            buttonText="Subscribe"
          />
        </div>
      </section>

      {/* ── Footer ────────────────────────────────── */}
      <Footer
        logo={
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded border border-primary/30 bg-primary/10">
              <Zap className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-display text-xs font-bold uppercase tracking-wider text-foreground/80">
              The Gridcn
            </span>
          </div>
        }
        columns={LANDING_FOOTER_COLUMNS}
        socials={LANDING_FOOTER_SOCIALS}
        copyright={`\u00A9 ${new Date().getFullYear()} The Gridcn. All rights reserved.`}
      />
    </div>
  )
}
