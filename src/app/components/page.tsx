"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { List, Settings, X } from "lucide-react";
import { TronHeader, TheGridcnLogo } from "@/components/layout";
import { UplinkHeader } from "@/components/thegridcn";
import {
  ItemExplorer,
  Preview,
  Customizer,
} from "@/components/components-page";
import {
  getAllComponents,
  getComponentById,
  type ComponentItem,
} from "@/lib/component-data";
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
    ? getComponentById(selectedComponentId) ?? null
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

      {/* Mobile floating buttons */}
      <div className="fixed bottom-6 left-4 right-4 z-40 flex items-center justify-between xl:hidden">
        {/* Explorer button */}
        <button
          onClick={() => setExplorerOpen(true)}
          className="flex items-center gap-2 rounded border border-primary/50 bg-background/90 px-4 py-3 font-mono text-xs tracking-wider text-primary shadow-lg shadow-primary/20 backdrop-blur-sm transition-all hover:bg-primary/10"
        >
          <List className="h-4 w-4" />
          <span>COMPONENTS</span>
        </button>

        {/* Customizer button */}
        <button
          onClick={() => setCustomizerOpen(true)}
          className="flex items-center gap-2 rounded border border-primary/50 bg-background/90 px-4 py-3 font-mono text-xs tracking-wider text-primary shadow-lg shadow-primary/20 backdrop-blur-sm transition-all hover:bg-primary/10"
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
          "fixed left-0 top-0 z-50 h-full w-72 transform border-r border-primary/30 bg-panel transition-transform duration-300 ease-in-out xl:hidden",
          explorerOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* CRT scanline effect */}
        <div
          className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]"
        />
        {/* Panel Header - Tron terminal style */}
        <div className="relative flex h-14 items-center justify-between border-b border-primary/20 px-4">
          {/* Top accent line */}
          <div className="absolute left-0 right-8 top-0 h-px bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

          <span className="font-mono text-[11px] tracking-[0.2em] text-foreground">
            REGISTRY: <span className="text-foreground/70">01.IDX</span>
          </span>

          <button
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
          "fixed right-0 top-0 z-50 h-full w-72 transform border-l border-primary/30 bg-panel transition-transform duration-300 ease-in-out xl:hidden",
          customizerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* CRT scanline effect */}
        <div
          className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]"
        />
        {/* Panel Header - Tron terminal style */}
        <div className="relative flex h-14 items-center justify-between border-b border-primary/20 px-4">
          {/* Top accent line */}
          <div className="absolute left-0 right-8 top-0 h-px bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

          <span className="font-mono text-[11px] tracking-[0.2em] text-foreground">
            CONFIG: <span className="text-foreground/70">02.SYS</span>
          </span>

          <button
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
      <footer
        className="relative z-10 border-t border-primary/30 bg-panel"
      >
        {/* CRT scanline effect */}
        <div
          className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]"
        />
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
                <div className="tracking-widest text-foreground">
                  TRON-INSPIRED
                </div>
                <div className="tracking-wider text-primary">
                  THEME SYSTEM
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {["Next.js", "React", "Tailwind", "shadcn/ui", "Three.js"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="border border-primary/30 bg-primary/5 px-2 py-1 font-mono text-[9px] tracking-wider text-foreground"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
            <span className="font-mono text-[9px] tracking-widest text-foreground">
              GRID YEAR {new Date().getFullYear()} • ALL PROGRAMS RESERVED
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </div>
      </footer>
    </div>
  );
}
