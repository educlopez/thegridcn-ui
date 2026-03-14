"use client"

import Link from "next/link"
import { LayoutDashboard, Globe } from "lucide-react"
import { GlowContainer } from "@/components/thegridcn"
import { UplinkHeader } from "@/components/thegridcn"

const TEMPLATES = [
  {
    name: "Dashboard",
    description:
      "Full admin dashboard with collapsible sidebar, metric cards, charts, data table, activity feed, and widget cluster. Demonstrates 12+ components in a real-world layout.",
    href: "/templates/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Landing Page",
    description:
      "Complete marketing landing page with hero section, feature grid, pricing cards, testimonials, comparison table, FAQ, and newsletter form. Demonstrates 12+ components in a conversion-focused layout.",
    href: "/templates/landing",
    icon: Globe,
  },
]

export default function TemplatesPickerPage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Uplink header bar */}
      <div className="relative z-10">
        <UplinkHeader
          leftText="UPLINK: TEMPLATE GALLERY CHANNEL 02"
          rightText="COMPOSITIONS: 2 LOADED"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="font-[family-name:var(--font-orbitron)] text-3xl font-bold tracking-wider text-primary sm:text-4xl [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)]">
            TEMPLATES
          </h1>
          <p className="mt-4 font-mono text-sm text-foreground/60">
            Full-page compositions demonstrating thegridcn components in
            real-world layouts. Click to view full-screen.
          </p>
        </div>

        {/* Template cards grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {TEMPLATES.map((template) => (
            <Link key={template.href} href={template.href} className="group">
              <GlowContainer
                intensity="md"
                hover
                className="flex h-full flex-col gap-4 p-6 transition-all duration-300 group-hover:border-primary/60"
              >
                {/* Icon / Preview area */}
                <div className="flex h-40 items-center justify-center rounded border border-primary/20 bg-primary/5">
                  <template.icon className="h-16 w-16 text-primary/40 transition-all duration-300 group-hover:text-primary/70 group-hover:drop-shadow-[0_0_12px_var(--primary)]" />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="font-[family-name:var(--font-orbitron)] text-lg font-semibold tracking-wider text-primary">
                    {template.name}
                  </h2>
                  <p className="text-sm leading-relaxed text-foreground/60">
                    {template.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-2 font-mono text-xs tracking-widest text-primary/60 transition-colors group-hover:text-primary">
                  <span>VIEW TEMPLATE</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path
                      d="M6 3l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </GlowContainer>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
