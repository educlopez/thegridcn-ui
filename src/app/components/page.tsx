"use client"

import dynamic from "next/dynamic"
import { themes, useTheme } from "@/components/theme"
import {
  ButtonsSection,
  FormsSection,
  DataDisplaySection,
  FeedbackSection,
  NavigationSection,
  LayoutSection,
  OverlaysSection,
  TronMovieSection,
} from "@/components/showcase"
import { TronHeader } from "@/components/layout"
import {
  TronStatusStrip,
  TronGridScanOverlay,
  TronGridMap,
  TronUplinkHeader,
  TronMovieTimer,
  TronAnomalyAlert,
  TronTimelineBar,
} from "@/components/tron-ui"
import { cn } from "@/lib/utils"

// Dynamic import for Three.js (client-side only)
const TronGrid3D = dynamic(
  () => import("@/components/tron-3d").then((mod) => mod.TronGrid3D),
  { ssr: false }
)

const sections = [
  { id: "tron-ares-movie-ui", name: "Tron: Ares", count: 12 },
  { id: "buttons-actions", name: "Buttons", count: 8 },
  { id: "form-controls", name: "Forms", count: 10 },
  { id: "data-display", name: "Data", count: 9 },
  { id: "feedback", name: "Feedback", count: 6 },
  { id: "navigation", name: "Navigation", count: 7 },
  { id: "layout", name: "Layout", count: 5 },
  { id: "overlays", name: "Overlays", count: 6 },
]

export default function ComponentsPage() {
  const { theme } = useTheme()
  const currentTheme = themes.find((t) => t.id === theme)

  return (
    <div className="relative min-h-screen bg-background">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <TronGrid3D
          className="h-full w-full"
          enableParticles
          enableBeams={false}
          cameraAnimation={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      {/* Header */}
      <TronHeader />

      {/* Uplink header bar - movie accurate */}
      <TronUplinkHeader
        leftText="UPLINK: COMPONENT DATABASE CHANNEL 01"
        rightText="REGISTRY ACCESS: FULL - 50+ MODULES LOADED"
      />

      {/* Section navigation bar */}
      <div className="sticky top-[88px] z-40 border-b border-primary/30 bg-background/80 backdrop-blur-xl">
        <nav className="container mx-auto flex gap-1 overflow-x-auto px-4 py-2">
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                "group relative flex items-center gap-2 whitespace-nowrap px-3 py-2 font-mono text-[10px] tracking-widest transition-all",
                "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              {/* Index number */}
              <span className="text-[8px] text-primary/50 group-hover:text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.name.toUpperCase()}
              {/* Count badge */}
              <span className="hidden rounded border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[8px] text-primary/60 group-hover:border-primary/40 sm:inline">
                {section.count}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <main className="relative z-10">
        {/* Page header */}
        <section className="relative overflow-hidden">
          <TronGridMap />
          <TronGridScanOverlay />

          <div className="container mx-auto px-4 py-8 text-center">
            {/* Elapsed timer */}
            <div className="mb-4 flex justify-center">
              <TronMovieTimer
                primary="00:00:00"
                label="SESSION"
                className="scale-75 md:scale-100"
              />
            </div>

            {/* ANOMALY banner */}
            <div className="mb-6 flex justify-center">
              <TronAnomalyAlert text="DATABASE ACCESSED" />
            </div>

            {/* HUD frame */}
            <div className="relative mx-auto inline-block">
              <div className="absolute -inset-6 border border-primary/20 md:-inset-10">
                <div className="absolute -left-1 -top-1 h-6 w-6 border-l-2 border-t-2 border-primary" />
                <div className="absolute -right-1 -top-1 h-6 w-6 border-r-2 border-t-2 border-primary" />
                <div className="absolute -bottom-1 -left-1 h-6 w-6 border-b-2 border-l-2 border-primary" />
                <div className="absolute -bottom-1 -right-1 h-6 w-6 border-b-2 border-r-2 border-primary" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-3 font-mono text-[9px] tracking-[0.4em] text-primary">
                  [ REGISTRY ONLINE ]
                </div>
              </div>

              <div className="relative px-8 py-6 md:px-12">
                <div className="mb-2 font-mono text-[10px] tracking-[0.5em] text-muted-foreground">
                  COMPONENT REGISTRY • REV 1.0
                </div>
                <h1
                  className="font-display text-4xl font-bold tracking-wider md:text-5xl lg:text-6xl"
                  style={{
                    color: currentTheme?.color,
                    textShadow: `0 0 60px ${currentTheme?.color}40`,
                  }}
                >
                  COMPONENT LIBRARY
                </h1>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                  Explore all shadcn/ui components styled with the Project Ares theme system.
                </p>
              </div>
            </div>

            {/* Timeline bar */}
            <div className="mx-auto mt-8 max-w-3xl">
              <TronTimelineBar
                progress={12.5}
                markers={[
                  { id: "TRON", position: 12.5, active: true },
                  { id: "BTN", position: 25 },
                  { id: "FORM", position: 37.5 },
                  { id: "DATA", position: 50 },
                  { id: "FEED", position: 62.5 },
                  { id: "NAV", position: 75 },
                  { id: "LAY", position: 87.5 },
                  { id: "OVR", position: 100 },
                ]}
                leftLabel="8 SECTIONS"
                rightLabel="50+ COMPONENTS"
              />
            </div>
          </div>
        </section>

        {/* Component sections */}
        <div className="container mx-auto px-4 pb-24">
          <TronMovieSection />
          <ButtonsSection />
          <FormsSection />
          <DataDisplaySection />
          <FeedbackSection />
          <NavigationSection />
          <LayoutSection />
          <OverlaysSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/30 bg-background/90 backdrop-blur-xl">
        {/* Footer uplink bar */}
        <TronUplinkHeader
          leftText="SYSTEM: PROJECT ARES v1.0.0"
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
                <span className="font-display text-xl font-bold tracking-wider text-primary">ARES</span>
              </div>
              <div className="h-8 w-px bg-primary/30" />
              <div className="font-mono text-[10px]">
                <div className="tracking-widest text-muted-foreground">TRON-INSPIRED</div>
                <div className="tracking-wider text-foreground">THEME SYSTEM</div>
              </div>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["Next.js", "React", "Tailwind", "shadcn/ui", "Three.js"].map((tech) => (
                <span
                  key={tech}
                  className="border border-border/30 bg-card/20 px-2 py-1 font-mono text-[9px] tracking-wider text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
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
  )
}
