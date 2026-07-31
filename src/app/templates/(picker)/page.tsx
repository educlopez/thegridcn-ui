"use client";

import {
  BarChart3,
  FileText,
  Globe,
  LayoutDashboard,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import { GlowContainer, UplinkHeader } from "@/components/thegridcn";

const TEMPLATES = [
  {
    description:
      "Full admin dashboard with collapsible sidebar, metric cards, charts, data table, activity feed, and widget cluster. Demonstrates 12+ components in a real-world layout.",
    href: "/templates/dashboard",
    icon: LayoutDashboard,
    name: "Dashboard",
  },
  {
    description:
      "Complete marketing landing page with hero section, feature grid, pricing cards, testimonials, comparison table, FAQ, and newsletter form. Demonstrates 12+ components in a conversion-focused layout.",
    href: "/templates/landing",
    icon: Globe,
    name: "Landing Page",
  },
  {
    description:
      "Full blog article page with two-column layout, table of contents sidebar, code blocks, author bio, newsletter CTA, and related articles. Perfect for content-driven sites.",
    href: "/templates/blog",
    icon: FileText,
    name: "Blog",
  },
  {
    description:
      "Split-panel authentication page with decorative branding panel, email/password form, social login buttons, and circuit background effects. Clean and secure feeling.",
    href: "/templates/login",
    icon: LogIn,
    name: "Login",
  },
  {
    description:
      "Data-rich analytics dashboard with tab navigation, KPI cards, area/bar/pie charts, heatmap, data tables, and real-time metrics. No sidebar — full-width chart-focused layout.",
    href: "/templates/analytics",
    icon: BarChart3,
    name: "Analytics",
  },
];

export default function TemplatesPickerPage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Uplink header bar */}
      <div className="relative z-10">
        <UplinkHeader
          leftText="UPLINK: TEMPLATE GALLERY CHANNEL 02"
          rightText="COMPOSITIONS: 5 LOADED"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="font-[family-name:var(--font-orbitron)] font-bold text-3xl text-primary tracking-wider [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)] sm:text-4xl">
            TEMPLATES
          </h1>
          <p className="mt-4 font-mono text-foreground/60 text-sm">
            Full-page compositions demonstrating thegridcn components in
            real-world layouts. Click to view full-screen.
          </p>
        </div>

        {/* Template cards grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                  <h2 className="font-[family-name:var(--font-orbitron)] font-semibold text-lg text-primary tracking-wider">
                    {template.name}
                  </h2>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-2 font-mono text-primary/60 text-xs tracking-widest transition-colors group-hover:text-primary">
                  <span>VIEW TEMPLATE</span>
                  <svg
                    aria-hidden="true"
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
  );
}
