"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { themes, useTheme } from "@/components/theme";
import {
  TronReticle,
  TronThemeDossierSelector,
  TronStatusStrip,
  TronGridScanOverlay,
  TronRadar,
  TronUplinkHeader,
  TronDerezCountdown,
  TronDossierCard,
  TronGridMap,
} from "@/components/tron-ui";
import { TronHeader } from "@/components/layout";

// Dynamic import for Three.js components (client-side only)
const TronGrid3D = dynamic(
  () => import("@/components/tron-3d").then((mod) => mod.TronGrid3D),
  { ssr: false }
);

// Terminal install component
function TerminalInstall() {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative overflow-hidden border border-primary/30 bg-background/50 backdrop-blur-sm">
        {/* Corner brackets - Tron style */}
        <div className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-primary" />
        <div className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-primary" />
        <div className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-primary" />

        {/* Grid pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Scanline effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, var(--primary), var(--primary) 1px, transparent 1px, transparent 3px)",
          }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between border-b border-primary/30 bg-primary/5 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              TERMINAL
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-4">
          <div className="flex items-start gap-2 font-mono text-sm">
            <span className="text-primary glow-text">$</span>
            <code className="flex-1 break-all text-foreground">
              install theme
            </code>
          </div>
          <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 animate-pulse bg-primary" />
            <span className="text-primary">COMING SOON</span>
          </div>
        </div>
      </div>

      {/* Glow effect - Tron style */}
      <div className="absolute -inset-1 -z-10 bg-primary/10 blur-xl" />
    </div>
  );
}

// Feature card component
function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded border border-border/50 bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/50">
      {/* Corner decorations */}
      <div className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-primary/40 transition-colors group-hover:border-primary" />
      <div className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-primary/40 transition-colors group-hover:border-primary" />
      <div className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-primary/40 transition-colors group-hover:border-primary" />
      <div className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-primary/40 transition-colors group-hover:border-primary" />

      {/* Hover glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-2 font-display text-sm font-bold tracking-wider text-foreground">
        {title}
      </h3>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const { theme } = useTheme();
  const currentTheme = themes.find((t) => t.id === theme);

  return (
    <div className="relative min-h-screen bg-background">
      {/* 3D Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <TronGrid3D
          className="h-full w-full"
          enableParticles
          enableBeams
          cameraAnimation
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/50 to-background" />
      </div>

      {/* Header */}
      <TronHeader />

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero section */}
        <section className="relative min-h-[100vh] overflow-hidden">
          {/* Grid map overlay */}
          <TronGridMap />
          <TronGridScanOverlay />

          {/* Uplink header bar - project info */}
          <TronUplinkHeader
            leftText={`THEME: ${currentTheme?.name.toUpperCase() || "ARES"} - ${currentTheme?.god.toUpperCase() || "GOD OF WAR"}`}
            rightText="COMPONENTS: 50+ MODULES • THEMES: 6 VARIANTS • STATUS: ACTIVE"
          />

          {/* HUD corner frames */}
          <div className="pointer-events-none absolute left-4 right-4 top-10 bottom-4 z-20 hidden lg:block">
            <div className="absolute left-0 top-0 h-24 w-24 border-l-2 border-t-2 border-primary/50" />
            <div className="absolute right-0 top-0 h-24 w-24 border-r-2 border-t-2 border-primary/50" />
            <div className="absolute bottom-0 left-0 h-24 w-24 border-b-2 border-l-2 border-primary/50" />
            <div className="absolute bottom-0 right-0 h-24 w-24 border-b-2 border-r-2 border-primary/50" />
          </div>

          {/* Main hero content */}
          <div className="container relative mx-auto px-4 py-12 md:py-20">
            {/* Central content with HUD frame */}
            <div className="relative mx-auto max-w-4xl">
              {/* Outer scanning frame */}
              <div className="absolute -inset-4 md:-inset-8">
                <div className="absolute inset-0 border border-primary/20" />
                <div className="absolute -left-1 -top-1 h-10 w-10 border-l-2 border-t-2 border-primary" />
                <div className="absolute -right-1 -top-1 h-10 w-10 border-r-2 border-t-2 border-primary" />
                <div className="absolute -bottom-1 -left-1 h-10 w-10 border-b-2 border-l-2 border-primary" />
                <div className="absolute -bottom-1 -right-1 h-10 w-10 border-b-2 border-r-2 border-primary" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-4 font-mono text-[10px] tracking-[0.5em] text-primary">
                  [ TARGET ACQUIRED ]
                </div>
              </div>

              {/* Scanning reticle */}
              <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-20">
                <TronReticle size={500} variant="scanning" />
              </div>

              {/* Title content */}
              <div className="relative z-10 py-12 text-center md:py-16">
                <div className="mb-3 font-mono text-[10px] tracking-[0.5em] text-muted-foreground">
                  CLASSIFIED PROJECT
                </div>
                <h1 className="font-display text-6xl font-black tracking-[0.15em] text-primary md:text-8xl lg:text-[9rem] [text-shadow:0_0_80px_oklch(from_var(--primary)_l_c_h/0.5),0_0_160px_oklch(from_var(--primary)_l_c_h/0.3)]">
                  THE GRIDCN
                </h1>
                <div className="mt-4 font-mono text-sm tracking-[0.4em] text-primary md:text-base">
                  TRON THEME SYSTEM FOR SHADCN/UI
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-muted-foreground">
              An authentic <span className="text-primary">Tron: Ares</span>{" "}
              inspired theme featuring Greek god color schemes, movie UI
              components, and immersive 3D effects.
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/components"
                className="group relative overflow-hidden rounded border-2 border-primary bg-primary/20 px-10 py-4 font-mono text-sm font-bold tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_40px_var(--primary)]"
              >
                <span className="relative z-10">ENTER THE GRID</span>
                <div className="absolute inset-0 -z-10 translate-y-full bg-primary transition-transform group-hover:translate-y-0" />
              </Link>
              <Link
                href="https://github.com/educlopez/thegridcn-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded border border-primary/30 bg-transparent px-10 py-4 font-mono text-sm font-bold tracking-wider text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_var(--primary)]"
              >
                <span className="relative z-10">VIEW ON GITHUB</span>
              </Link>
            </div>

            {/* Install command */}
            <div className="mx-auto w-full max-w-2xl">
              <div className="mb-3 text-center font-mono text-[10px] tracking-widest text-muted-foreground">
                [ QUICK INSTALL ]
              </div>
              <TerminalInstall />
            </div>

            {/* Side panels - Dossier card style (left) */}
            <div className="pointer-events-none absolute left-0 top-1/3 hidden xl:block">
              <TronDossierCard
                category="RECORDED SUBJECT"
                name={currentTheme?.name.toUpperCase() || "ARES"}
                fields={[
                  {
                    label: "DEITY",
                    value: currentTheme?.god.toUpperCase() || "GOD OF WAR",
                  },
                  {
                    label: "PRIMARY COLOR",
                    value: currentTheme?.color || "#FF3333",
                    highlighted: true,
                  },
                  { label: "STATUS", value: "ACTIVE" },
                  { label: "COMPONENTS", value: "50+ LOADED" },
                ]}
                className="w-64"
              />
            </div>

            {/* Side panel - De-resolution timer and radar (right) */}
            <div className="pointer-events-none absolute right-0 top-1/3 hidden flex-col items-end gap-4 xl:flex">
              <TronDerezCountdown time="16:48" milliseconds="50" />
              <div className="rounded border border-primary/30 bg-background/80 p-4 backdrop-blur-md">
                <div className="mb-2 font-mono text-[9px] tracking-widest text-muted-foreground">
                  PROXIMITY SCAN
                </div>
                <TronRadar
                  size={140}
                  targets={[
                    { x: 30, y: 35 },
                    { x: 70, y: 60 },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Bottom scroll indicator */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="flex items-center justify-center gap-8 py-3">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary/50" />
              <div className="animate-bounce font-mono text-[9px] tracking-widest text-muted-foreground">
                ↓ SCROLL ↓
              </div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>
        </section>

        {/* Theme Selector */}
        <div id="themes">
          <TronThemeDossierSelector />
        </div>

        {/* Features Section */}
        <section
          id="features"
          className="relative border-t border-primary/20 py-24"
        >
          {/* Section background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
          <TronGridScanOverlay />

          {/* Status bar */}
          <TronStatusStrip
            variant="default"
            items={[
              { label: "SECTION", value: "CAPABILITIES", highlighted: true },
              { label: "MODULES", value: "6 ACTIVE" },
              { label: "INTEGRITY", value: "100%" },
            ]}
          />

          <div className="container relative mx-auto px-4 pt-8">
            {/* Section header */}
            <div className="mb-16 text-center">
              <div className="mb-4 font-mono text-[10px] tracking-widest text-muted-foreground">
                [ SYSTEM CAPABILITIES ]
              </div>
              <h2 className="font-display text-3xl font-bold tracking-wider text-primary md:text-4xl lg:text-5xl [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)]">
                CORE FEATURES
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Everything you need to build authentic Tron-inspired interfaces
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="6 THEME VARIANTS"
                description="Greek god-inspired color schemes: Ares, Tron, Clu, Athena, Aphrodite, and Poseidon."
                icon={
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                }
              />
              <FeatureCard
                title="50+ COMPONENTS"
                description="Complete shadcn/ui library with authentic Tron styling and glow effects."
                icon={
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                }
              />
              <FeatureCard
                title="MOVIE UI ELEMENTS"
                description="Data cards, HUD elements, timers, alerts, and radar components from the film."
                icon={
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                }
              />
              <FeatureCard
                title="THREE.JS EFFECTS"
                description="Immersive 3D grid, particles, and light beams that react to your theme."
                icon={
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                    />
                  </svg>
                }
              />
              <FeatureCard
                title="GLOW UTILITIES"
                description="CSS utilities for neon glows, scanlines, and pulsing animations."
                icon={
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                }
              />
              <FeatureCard
                title="TYPESCRIPT"
                description="Full type safety with comprehensive TypeScript definitions."
                icon={
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="relative border-t border-primary/20 py-24">
          {/* Status bar */}
          <TronStatusStrip
            variant="default"
            items={[
              { label: "SECTION", value: "ARCHITECTURE", highlighted: true },
              { label: "FRAMEWORKS", value: "6 INTEGRATED" },
              { label: "BUILD", value: "OPTIMIZED" },
            ]}
          />

          <div className="container mx-auto px-4 pt-8">
            <div className="mb-12 text-center">
              <div className="mb-4 font-mono text-[10px] tracking-widest text-muted-foreground">
                [ SYSTEM ARCHITECTURE ]
              </div>
              <h2 className="font-display text-3xl font-bold tracking-wider text-primary md:text-4xl lg:text-5xl [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)]">
                TECH STACK
              </h2>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {[
                  { name: "Next.js", version: "16", status: "CORE" },
                  { name: "React", version: "19", status: "UI" },
                  { name: "Tailwind", version: "4", status: "STYLE" },
                  {
                    name: "shadcn/ui",
                    version: "Latest",
                    status: "COMPONENTS",
                  },
                  { name: "Three.js", version: "R182", status: "3D" },
                  { name: "TypeScript", version: "5", status: "TYPES" },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="group relative overflow-hidden border border-border/50 bg-card/30 p-4 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/50"
                  >
                    {/* Corner decorations */}
                    <div className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-primary/40 transition-colors group-hover:border-primary" />
                    <div className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-primary/40 transition-colors group-hover:border-primary" />

                    <div className="text-center">
                      <div className="font-mono text-[8px] tracking-widest text-muted-foreground">
                        {tech.status}
                      </div>
                      <div className="font-display text-sm font-bold tracking-wider text-primary">
                        {tech.name}
                      </div>
                      <div className="font-mono text-[10px] text-foreground">
                        v{tech.version}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative border-t border-primary/20 py-24">
          <TronGridScanOverlay />

          <div className="container relative mx-auto px-4 text-center">
            {/* HUD frame around CTA */}
            <div className="relative mx-auto inline-block">
              <div className="absolute -inset-8 border border-primary/20 md:-inset-12">
                <div className="absolute -left-1 -top-1 h-6 w-6 border-l-2 border-t-2 border-primary/60" />
                <div className="absolute -right-1 -top-1 h-6 w-6 border-r-2 border-t-2 border-primary/60" />
                <div className="absolute -bottom-1 -left-1 h-6 w-6 border-b-2 border-l-2 border-primary/60" />
                <div className="absolute -bottom-1 -right-1 h-6 w-6 border-b-2 border-r-2 border-primary/60" />
              </div>

              <div className="relative px-8 py-12 md:px-16">
                <div className="mb-2 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                  AWAITING USER INPUT
                </div>
                <h2 className="mb-6 font-display text-4xl font-bold tracking-wider text-primary md:text-5xl [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)]">
                  READY TO ENTER?
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                  Explore all components, customize themes, and build immersive
                  digital experiences.
                </p>
                <Link
                  href="/components"
                  className="group relative inline-flex overflow-hidden rounded border-2 border-primary bg-primary px-12 py-4 font-mono text-sm font-bold tracking-wider text-primary-foreground transition-all hover:shadow-[0_0_40px_var(--primary)]"
                >
                  <span className="relative z-10">EXPLORE COMPONENTS</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/30 bg-background/90 backdrop-blur-xl">
        {/* Footer uplink bar */}
        <TronUplinkHeader
          leftText="SYSTEM: THE GRIDCN v1.0.0"
          rightText="UPTIME: 99.9% - END OF LINE"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Logo section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-2 border border-primary/30">
                  <div className="absolute -left-px -top-px h-2 w-2 border-l border-t border-primary" />
                  <div className="absolute -right-px -top-px h-2 w-2 border-r border-t border-primary" />
                  <div className="absolute -bottom-px -left-px h-2 w-2 border-b border-l border-primary" />
                  <div className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-primary" />
                </div>
                <span className="font-display text-xl font-bold tracking-wider text-primary">
                  THE GRIDCN
                </span>
              </div>
              <div className="h-8 w-px bg-primary/30" />
              <div className="font-mono text-[10px]">
                <div className="tracking-widest text-muted-foreground">
                  TRON-INSPIRED
                </div>
                <div className="tracking-wider text-foreground">
                  THEME SYSTEM
                </div>
              </div>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["Next.js", "React", "Tailwind", "shadcn/ui", "Three.js"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="border border-border/30 bg-card/20 px-2 py-1 font-mono text-[9px] tracking-wider text-muted-foreground"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Bottom copyright line */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/20" />
            <span className="font-mono text-[9px] tracking-widest text-muted-foreground">
              GRID YEAR {new Date().getFullYear()} • ALL PROGRAMS RESERVED
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/20" />
          </div>
        </div>
      </footer>
    </div>
  );
}
