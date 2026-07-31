"use client";

import { ArrowRight, List, Settings, X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import * as React from "react";
import {
  Customizer,
  ItemExplorer,
  Preview,
} from "@/components/components-page";
import { TheGridcnLogo, TronHeader } from "@/components/layout";
import { UplinkHeader } from "@/components/thegridcn";
import { type ComponentItem, getComponentById } from "@/lib/component-data";
import { cn } from "@/lib/utils";

// Dynamic import for Three.js (client-side only)
const Grid3D = dynamic(
  () => import("@/components/thegridcn/grid").then((mod) => mod.Grid3D),
  { ssr: false }
);

export default function ComponentsPage() {
  const [selectedComponentId, setSelectedComponentId] = React.useState<
    string | null
  >(null);
  const [explorerOpen, setExplorerOpen] = React.useState(false);
  const [customizerOpen, setCustomizerOpen] = React.useState(false);

  // Get component from URL hash or default
  React.useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const component = getComponentById(hash);
      if (component) {
        setSelectedComponentId(component.id);
      }
    } else {
      // Default to data-card component
      const dataCard = getComponentById("data-card");
      if (dataCard) {
        setSelectedComponentId(dataCard.id);
        window.history.replaceState(null, "", `#${dataCard.id}`);
      }
    }
  }, []);

  // Close panels when selecting a component
  const handleItemSelect = (item: ComponentItem) => {
    setSelectedComponentId(item.id);
    window.history.replaceState(null, "", `#${item.id}`);
    setExplorerOpen(false);
  };

  // Prevent scroll when panels are open
  React.useEffect(() => {
    if (explorerOpen || customizerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [explorerOpen, customizerOpen]);

  const selectedComponent = selectedComponentId
    ? (getComponentById(selectedComponentId) ?? null)
    : null;

  return (
    <div className="relative min-h-screen bg-background">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Grid3D
          className="h-full w-full"
          enableParticles
          enableBeams={false}
          cameraAnimation={false}
        />
      </div>

      {/* Header */}
      <TronHeader />

      {/* Uplink header bar */}
      <div className="relative z-10">
        <UplinkHeader
          leftText="UPLINK: COMPONENT DATABASE CHANNEL 01"
          rightText="REGISTRY ACCESS: FULL - 50+ MODULES LOADED"
        />
      </div>

      {/* Templates CTA Banner */}
      <div className="relative z-10 border-primary/20 border-b bg-card/60 backdrop-blur-sm">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="hidden h-1.5 w-1.5 animate-pulse bg-primary sm:block" />
            <p className="text-center font-mono text-[11px] text-foreground/80 tracking-wider sm:text-left">
              <span className="text-primary">NEW:</span> See these components in
              action with our <span className="text-foreground">Dashboard</span>{" "}
              and <span className="text-foreground">Landing Page</span>{" "}
              templates
            </p>
          </div>
          <Link
            href="/templates"
            className="group flex shrink-0 items-center gap-2 rounded border border-primary/50 bg-primary/10 px-4 py-1.5 font-mono text-[10px] text-primary uppercase tracking-widest transition-all hover:bg-primary/20 hover:shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)]"
          >
            View Templates
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Mobile floating buttons */}
      <div className="fixed right-4 bottom-6 left-4 z-40 flex items-center justify-between xl:hidden">
        {/* Explorer button */}
        <button
          type="button"
          onClick={() => setExplorerOpen(true)}
          className="flex items-center gap-2 rounded border border-primary/50 bg-background/90 px-4 py-3 font-mono text-primary text-xs tracking-wider shadow-lg shadow-primary/20 backdrop-blur-sm transition-all hover:bg-primary/10"
        >
          <List className="h-4 w-4" />
          <span>COMPONENTS</span>
        </button>

        {/* Customizer button */}
        <button
          type="button"
          onClick={() => setCustomizerOpen(true)}
          className="flex items-center gap-2 rounded border border-primary/50 bg-background/90 px-4 py-3 font-mono text-primary text-xs tracking-wider shadow-lg shadow-primary/20 backdrop-blur-sm transition-all hover:bg-primary/10"
        >
          <Settings className="h-4 w-4" />
          <span>THEME</span>
        </button>
      </div>

      {/* Mobile Explorer Panel Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity xl:hidden",
          explorerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setExplorerOpen(false)}
      />

      {/* Mobile Explorer Panel */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 transform border-primary/30 border-r bg-panel transition-transform duration-300 ease-in-out xl:hidden",
          explorerOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* CRT scanline effect */}
        <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />
        {/* Panel Header - Tron terminal style */}
        <div className="relative flex h-14 items-center justify-between border-primary/20 border-b px-4">
          {/* Top accent line */}
          <div className="absolute top-0 right-8 left-0 h-px bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

          <span className="font-mono text-[11px] text-foreground tracking-[0.2em]">
            REGISTRY: <span className="text-foreground/70">01.IDX</span>
          </span>

          <button
            type="button"
            onClick={() => setExplorerOpen(false)}
            className="flex items-center justify-center text-foreground/50 transition-colors hover:text-primary"
            aria-label="Close panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Explorer Content - use the same content as ItemExplorer */}
        <div className="relative h-[calc(100%-3.5rem)] overflow-y-auto">
          <ItemExplorer
            currentItemId={selectedComponentId || undefined}
            onItemSelect={handleItemSelect}
            isMobile
          />
        </div>
      </div>

      {/* Mobile Customizer Panel Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity xl:hidden",
          customizerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setCustomizerOpen(false)}
      />

      {/* Mobile Customizer Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-72 transform border-primary/30 border-l bg-panel transition-transform duration-300 ease-in-out xl:hidden",
          customizerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* CRT scanline effect */}
        <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />
        {/* Panel Header - Tron terminal style */}
        <div className="relative flex h-14 items-center justify-between border-primary/20 border-b px-4">
          {/* Top accent line */}
          <div className="absolute top-0 right-8 left-0 h-px bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

          <span className="font-mono text-[11px] text-foreground tracking-[0.2em]">
            CONFIG: <span className="text-foreground/70">02.SYS</span>
          </span>

          <button
            type="button"
            onClick={() => setCustomizerOpen(false)}
            className="flex items-center justify-center text-foreground/50 transition-colors hover:text-primary"
            aria-label="Close panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Customizer Content */}
        <div className="relative h-[calc(100%-3.5rem)] overflow-y-auto">
          <Customizer isMobile />
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 overflow-x-hidden">
        <h1 className="sr-only">Tron-Inspired UI Components for shadcn/ui</h1>
        <div className="flex h-[calc(100vh-88px)]">
          {/* Left Sidebar - Component Explorer (Desktop) */}
          <ItemExplorer
            currentItemId={selectedComponentId || undefined}
            onItemSelect={handleItemSelect}
          />

          {/* Main Preview Area */}
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden p-4 pb-24 md:p-6 xl:pb-6">
            <Preview component={selectedComponent} />
          </div>

          {/* Right Sidebar - Customizer (Desktop) */}
          <Customizer />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-primary/30 border-t bg-panel">
        {/* CRT scanline effect */}
        <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />
        <UplinkHeader
          leftText="SYSTEM: THE GRIDCN v1.0.0"
          rightText="UPTIME: 99.9% - END OF LINE"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <TheGridcnLogo size="lg" />
              <div className="h-8 w-px bg-primary/40" />
              <div className="font-mono text-[10px]">
                <div className="text-foreground tracking-widest">
                  TRON-INSPIRED
                </div>
                <div className="text-primary tracking-wider">THEME SYSTEM</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {["Next.js", "React", "Tailwind", "shadcn/ui", "Three.js"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="border border-primary/30 bg-primary/5 px-2 py-1 font-mono text-[9px] text-foreground tracking-wider"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
            <span className="font-mono text-[9px] text-foreground tracking-widest">
              GRID YEAR {new Date().getFullYear()} • ALL PROGRAMS RESERVED
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </div>
      </footer>
    </div>
  );
}
