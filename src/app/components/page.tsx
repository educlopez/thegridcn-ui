"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { TronHeader } from "@/components/layout";
import { TronUplinkHeader } from "@/components/tron-ui";
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

// Dynamic import for Three.js (client-side only)
const TronGrid3D = dynamic(
  () => import("@/components/tron-3d").then((mod) => mod.TronGrid3D),
  { ssr: false }
);

export default function ComponentsPage() {
  const [selectedComponentId, setSelectedComponentId] = React.useState<
    string | null
  >(null);

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

  const selectedComponent = selectedComponentId
    ? getComponentById(selectedComponentId) ?? null
    : null;

  const handleItemSelect = (item: ComponentItem) => {
    setSelectedComponentId(item.id);
    window.history.replaceState(null, "", `#${item.id}`);
  };

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

      {/* Uplink header bar */}
      <TronUplinkHeader
        leftText="UPLINK: COMPONENT DATABASE CHANNEL 01"
        rightText="REGISTRY ACCESS: FULL - 50+ MODULES LOADED"
      />

      {/* Main content */}
      <main className="relative z-10">
        <div className="flex min-h-[calc(100vh-88px)]">
          {/* Left Sidebar - Component Explorer */}
          <ItemExplorer
            currentItemId={selectedComponentId || undefined}
            onItemSelect={handleItemSelect}
          />

          {/* Main Preview Area */}
          <div className="flex flex-1 flex-col p-6">
            <Preview component={selectedComponent} />
          </div>

          {/* Right Sidebar - Customizer */}
          <Customizer />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-primary/30 bg-background/90 backdrop-blur-xl">
        <TronUplinkHeader
          leftText="SYSTEM: THE GRIDCN v1.0.0"
          rightText="UPTIME: 99.9% - END OF LINE"
        />

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
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
