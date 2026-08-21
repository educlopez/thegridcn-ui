"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { SiteFooter, TronHeader } from "@/components/layout";
import { usePrimitive } from "@/components/registry/primitive-provider";
import { PrimitiveSwitcherCompact } from "@/components/registry/primitive-switcher";
import { ThemeShowcaseSection } from "@/components/showcase";
import {
  GridScanOverlay,
  Radar,
  Reticle,
  UplinkHeader,
} from "@/components/thegridcn";
import { themes, useTheme } from "@/components/theme";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DerezCountdown,
  DossierCard,
  GridMap,
  StatusStrip,
  ThemeDossierSelector,
} from "@/components/website";
import {
  buildComponentInstallCommand,
  downloadComponentsJson,
} from "@/lib/shadcn-primitive";

// Dynamic import for Three.js components (client-side only)
const Grid3D = dynamic(
  () => import("@/components/thegridcn/grid").then((mod) => mod.Grid3D),
  { ssr: false }
);

// Available components for terminal display
const availableComponents = [
  // 3D Components
  "grid-3d",
  "tunnel",
  "god-avatar",
  // Data Display
  "data-card",
  "status-bar",
  "video-player",
  "floating-panel",
  // Timers
  "timer",
  "countdown",
  "derez-timer",
  // HUD Elements
  "reticle",
  "hud-frame",
  "stat",
  "speed-indicator",
  "regen-indicator",
  "radar",
  "hud-corner-frame",
  // Feedback & Alerts
  "alert-banner",
  "anomaly-banner",
  "arrival-panel",
  // Navigation & Location
  "location-display",
  "uplink-header",
  "beam-marker",
  "timeline-bar",
  "video-progress",
  // Effects
  "circuit-background",
  "glow-container",
  "crt-effect",
  "grid-scan-overlay",
];

// Package manager commands
const packageManagers = [
  { command: "pnpm dlx", id: "pnpm" },
  { command: "npx", id: "npm" },
  { command: "yarn", id: "yarn" },
  { command: "bunx --bun", id: "bun" },
] as const;

// Map for O(1) package manager lookups
const packageManagerById = new Map(packageManagers.map((pm) => [pm.id, pm]));

// Map for O(1) theme lookups
const themeById = new Map(themes.map((t) => [t.id, t]));

// Static props extracted to avoid re-creation on every render
const RADAR_TARGETS = [
  { x: 30, y: 35 },
  { x: 70, y: 60 },
];

const STATUS_STRIP_FEATURES = [
  { highlighted: true, label: "SECTION", value: "CAPABILITIES" },
  { label: "MODULES", value: "6 ACTIVE" },
  { label: "INTEGRITY", value: "100%" },
];

const STATUS_STRIP_ARCHITECTURE = [
  { highlighted: true, label: "SECTION", value: "ARCHITECTURE" },
  { label: "FRAMEWORKS", value: "6 INTEGRATED" },
  { label: "BUILD", value: "OPTIMIZED" },
];

const STATUS_STRIP_FAQ = [
  { highlighted: true, label: "SECTION", value: "INTEL" },
  { label: "QUERIES", value: "9 INDEXED" },
  { label: "STATUS", value: "DECLASSIFIED" },
];

// Terminal install component
function TerminalInstall() {
  const router = useRouter();
  const [selectedPm, setSelectedPm] =
    React.useState<(typeof packageManagers)[number]["id"]>("pnpm");
  const [isOpen, setIsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollOffset, setScrollOffset] = React.useState(0);
  const listRef = React.useRef<HTMLDivElement>(null);
  const pmSelectorRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        pmSelectorRef.current &&
        !pmSelectorRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const VISIBLE_ITEMS = 5;

  const currentPm = packageManagerById.get(selectedPm) || packageManagers[0];
  const { primitive } = usePrimitive();
  const selectedComponent = availableComponents[selectedIndex];
  const command = buildComponentInstallCommand(
    `${currentPm.command} shadcn@latest add`,
    primitive,
    selectedComponent
  );
  const commandRest = command.slice(`${currentPm.command} `.length);

  const copyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Navigate to selected component
  const navigateToComponent = React.useCallback(() => {
    const component = availableComponents[selectedIndex];
    router.push(`/components#${component}`);
  }, [selectedIndex, router]);

  // Handle keyboard navigation
  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = Math.min(prev + 1, availableComponents.length - 1);
          // Adjust scroll offset if needed
          if (next >= scrollOffset + VISIBLE_ITEMS) {
            setScrollOffset(next - VISIBLE_ITEMS + 1);
          }
          return next;
        });
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          // Adjust scroll offset if needed
          if (next < scrollOffset) {
            setScrollOffset(next);
          }
          return next;
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        navigateToComponent();
      }
    },
    [scrollOffset, navigateToComponent]
  );

  // Handle wheel scroll on list - prevent page scroll completely
  const handleWheel = React.useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const direction = e.deltaY > 0 ? 1 : -1;
    setScrollOffset((prev) => {
      const next = Math.max(
        0,
        Math.min(prev + direction, availableComponents.length - VISIBLE_ITEMS)
      );
      return next;
    });
  }, []);

  React.useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      // Use passive: false to allow preventDefault
      listElement.addEventListener("wheel", handleWheel, { passive: false });
      listElement.addEventListener(
        "keydown",
        handleKeyDown as unknown as EventListener
      );
      return () => {
        listElement.removeEventListener("wheel", handleWheel);
        listElement.removeEventListener(
          "keydown",
          handleKeyDown as unknown as EventListener
        );
      };
    }
  }, [handleKeyDown, handleWheel]);

  const visibleComponents = availableComponents.slice(
    scrollOffset,
    scrollOffset + VISIBLE_ITEMS
  );
  const hasMoreAbove = scrollOffset > 0;
  const hasMoreBelow =
    scrollOffset + VISIBLE_ITEMS < availableComponents.length;

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative overflow-hidden border border-primary/30 bg-panel">
        {/* Corner brackets - Tron style */}
        <div className="absolute -top-px -left-px h-4 w-4 border-primary border-t-2 border-l-2" />
        <div className="absolute -top-px -right-px h-4 w-4 border-primary border-t-2 border-r-2" />
        <div className="absolute -bottom-px -left-px h-4 w-4 border-primary border-b-2 border-l-2" />
        <div className="absolute -right-px -bottom-px h-4 w-4 border-primary border-r-2 border-b-2" />

        {/* Scanline effect */}
        <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />

        {/* Header - Tron Ares style */}
        <div className="relative border-primary/30 border-b bg-primary/5 px-4 py-2">
          {/* Top accent line */}
          <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-primary via-primary/50 to-transparent" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Status indicator */}
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 animate-pulse bg-primary" />
                <div className="h-1.5 w-3 bg-primary/60" />
              </div>
              <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">
                TERMINAL-01.SYS
              </span>
            </div>

            <div className="flex items-center gap-4 font-mono text-[9px] tracking-wider">
              <span className="text-foreground/50">SEC:0</span>
              <span className="text-primary">[ ACTIVE ]</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative space-y-3 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <PrimitiveSwitcherCompact />
            <button
              type="button"
              onClick={() => downloadComponentsJson(primitive)}
              className="border border-primary/30 bg-primary/5 px-2 py-1 font-mono text-[9px] text-primary uppercase tracking-wider transition-colors hover:bg-primary/10"
            >
              components.json
            </button>
          </div>

          {/* Command line with package manager selector */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-sm">
            <span className="glow-text text-primary">$</span>

            {/* Package manager selector */}
            <div ref={pmSelectorRef} className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 border-primary/50 border-b border-dashed text-primary transition-colors hover:border-primary"
              >
                <span>{currentPm.command}</span>
                <svg
                  aria-hidden="true"
                  className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen ? (
                <div className="absolute top-full left-0 z-50 mt-1 min-w-[100px] border border-primary/30 bg-panel">
                  {packageManagers.map((pm) => (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => {
                        setSelectedPm(pm.id);
                        setIsOpen(false);
                      }}
                      className={`block w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-primary/10 ${
                        selectedPm === pm.id
                          ? "bg-primary/10 text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {pm.command}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <code className="min-w-0 truncate text-foreground">
              {commandRest}
            </code>

            {/* Copy button */}
            <button
              type="button"
              onClick={copyCommand}
              className="ml-auto text-foreground/80 transition-colors hover:text-primary"
              title="Copy command"
            >
              {copied ? (
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Interactive component selector */}
          <div className="border-primary/20 border-l-2 pl-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
                ◆ Select component to install{" "}
                <span className="text-foreground/60">(scroll to navigate)</span>
              </span>
              <span className="font-mono text-[10px] text-foreground/60">
                {selectedIndex + 1}/{availableComponents.length}
              </span>
            </div>

            {/* Scrollable list */}
            <div
              ref={listRef}
              className="relative select-none outline-none"
              onMouseEnter={() => listRef.current?.focus()}
              onMouseLeave={() => listRef.current?.blur()}
            >
              {/* Scroll up indicator - always reserve space */}
              <div
                className={`flex items-center gap-2 py-1 font-mono text-[11px] ${hasMoreAbove ? "text-foreground/40" : "invisible"}`}
              >
                <span>↑</span>
                <span>{scrollOffset} more</span>
              </div>

              {/* Visible items */}
              <div className="space-y-0.5">
                {visibleComponents.map((comp, idx) => {
                  const actualIndex = scrollOffset + idx;
                  const isSelected = actualIndex === selectedIndex;
                  return (
                    <Link
                      key={comp}
                      href={`/components#${comp}`}
                      onClick={() => setSelectedIndex(actualIndex)}
                      onMouseEnter={() => setSelectedIndex(actualIndex)}
                      className={`flex items-center gap-2 py-1 font-mono text-sm transition-colors ${
                        isSelected
                          ? "text-primary"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      <span
                        className={
                          isSelected ? "text-primary" : "text-foreground/40"
                        }
                      >
                        {isSelected ? "◆" : "◇"}
                      </span>
                      <span
                        className={
                          isSelected ? "underline underline-offset-2" : ""
                        }
                      >
                        {comp}
                      </span>
                      {isSelected && (
                        <span className="ml-auto text-[9px] text-primary/50">
                          [ENTER]
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Scroll down indicator - always reserve space */}
              <div
                className={`flex items-center gap-2 py-1 font-mono text-[11px] ${hasMoreBelow ? "text-foreground/40" : "invisible"}`}
              >
                <span>↓</span>
                <span>
                  {availableComponents.length - scrollOffset - VISIBLE_ITEMS}{" "}
                  more
                </span>
              </div>
            </div>
          </div>

          {/* Status line */}
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
            <span className="inline-block h-1.5 w-1.5 animate-pulse bg-primary" />
            <span className="text-primary">
              {availableComponents.length} COMPONENTS READY
            </span>
            <span className="text-foreground/60">+ ALL NATIVE SHADCN/UI</span>
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
      <div className="absolute -top-px -left-px h-4 w-4 border-primary/40 border-t-2 border-l-2 transition-colors group-hover:border-primary" />
      <div className="absolute -top-px -right-px h-4 w-4 border-primary/40 border-t-2 border-r-2 transition-colors group-hover:border-primary" />
      <div className="absolute -bottom-px -left-px h-4 w-4 border-primary/40 border-b-2 border-l-2 transition-colors group-hover:border-primary" />
      <div className="absolute -right-px -bottom-px h-4 w-4 border-primary/40 border-r-2 border-b-2 transition-colors group-hover:border-primary" />

      {/* Hover glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="mb-2 font-bold font-display text-foreground text-sm tracking-wider">
        {title}
      </h3>
      <p className="text-foreground/80 text-xs leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const { theme } = useTheme();
  const currentTheme = themeById.get(theme);

  return (
    <div className="relative min-h-screen bg-background">
      {/* 3D Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Grid3D
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
          <GridMap />
          <GridScanOverlay />

          {/* Uplink header bar - project info */}
          <UplinkHeader
            leftText={`THEME: ${currentTheme?.name.toUpperCase() || "ARES"} - ${currentTheme?.god.toUpperCase() || "GOD OF WAR"}`}
            rightText="COMPONENTS: 50+ MODULES • THEMES: 6 VARIANTS • STATUS: ACTIVE"
          />

          {/* HUD corner frames */}
          <div className="pointer-events-none absolute top-10 right-4 bottom-4 left-4 z-20 hidden lg:block">
            <div className="absolute top-0 left-0 h-24 w-24 border-primary/50 border-t-2 border-l-2" />
            <div className="absolute top-0 right-0 h-24 w-24 border-primary/50 border-t-2 border-r-2" />
            <div className="absolute bottom-0 left-0 h-24 w-24 border-primary/50 border-b-2 border-l-2" />
            <div className="absolute right-0 bottom-0 h-24 w-24 border-primary/50 border-r-2 border-b-2" />
          </div>

          {/* Main hero content */}
          <div className="container relative mx-auto px-4 py-12 md:py-20">
            {/* Central content with HUD frame */}
            <div className="relative mx-auto max-w-4xl">
              {/* Outer scanning frame */}
              <div className="absolute -inset-4 md:-inset-8">
                <div className="absolute inset-0 border border-primary/20" />
                <div className="absolute -top-1 -left-1 h-10 w-10 border-primary border-t-2 border-l-2" />
                <div className="absolute -top-1 -right-1 h-10 w-10 border-primary border-t-2 border-r-2" />
                <div className="absolute -bottom-1 -left-1 h-10 w-10 border-primary border-b-2 border-l-2" />
                <div className="absolute -right-1 -bottom-1 h-10 w-10 border-primary border-r-2 border-b-2" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-4 font-mono text-[10px] text-primary tracking-[0.5em]">
                  [ TARGET ACQUIRED ]
                </div>
              </div>

              {/* Scanning reticle */}
              <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-20">
                <Reticle size={500} variant="scanning" />
              </div>

              {/* Title content */}
              <div className="relative z-10 py-12 text-center md:py-16">
                <div className="mb-3 font-mono text-[10px] text-foreground/80 tracking-[0.5em]">
                  CLASSIFIED PROJECT
                </div>
                <h1 className="font-black font-display text-6xl text-primary tracking-[0.15em] [text-shadow:0_0_80px_oklch(from_var(--primary)_l_c_h/0.5),0_0_160px_oklch(from_var(--primary)_l_c_h/0.3)] md:text-8xl lg:text-[9rem]">
                  THE GRIDCN
                </h1>
                <div className="mt-4 font-mono text-primary text-sm tracking-[0.4em] md:text-base">
                  TRON THEME SYSTEM FOR SHADCN/UI
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="mx-auto mb-8 max-w-2xl text-center text-foreground/80 text-lg">
              An authentic <span className="text-primary">Tron: Ares</span>{" "}
              inspired theme featuring Greek god color schemes, movie UI
              components, and immersive 3D effects.
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/components"
                className="group relative overflow-hidden rounded border-2 border-primary bg-primary/20 px-10 py-4 font-bold font-mono text-primary text-sm tracking-wider transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_40px_var(--primary)]"
              >
                <span className="relative z-10">ENTER THE GRID</span>
                <div className="absolute inset-0 -z-10 translate-y-full bg-primary transition-transform group-hover:translate-y-0" />
              </Link>
              <Link
                href="https://github.com/educlopez/thegridcn-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded border border-primary/30 bg-transparent px-10 py-4 font-bold font-mono text-foreground/80 text-sm tracking-wider transition-all hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_var(--primary)]"
              >
                <span className="relative z-10">VIEW ON GITHUB</span>
              </Link>
            </div>

            {/* Install command */}
            <div className="mx-auto w-full max-w-2xl">
              <div className="mb-3 text-center font-mono text-[10px] text-foreground/80 tracking-widest">
                [ QUICK INSTALL ]
              </div>
              <TerminalInstall />
            </div>

            {/* Side panels - Dossier card style (left) */}
            <div className="pointer-events-none absolute top-1/3 left-0 hidden xl:block">
              <DossierCard
                category="RECORDED SUBJECT"
                name={currentTheme?.name.toUpperCase() || "ARES"}
                fields={[
                  {
                    label: "DEITY",
                    value: currentTheme?.god.toUpperCase() || "GOD OF WAR",
                  },
                  {
                    highlighted: true,
                    label: "PRIMARY COLOR",
                    value: currentTheme?.color || "#FF3333",
                  },
                  { label: "STATUS", value: "ACTIVE" },
                  { label: "COMPONENTS", value: "50+ LOADED" },
                ]}
                className="w-64"
              />
            </div>

            {/* Side panel - De-resolution timer and radar (right) */}
            <div className="pointer-events-none absolute top-1/3 right-0 hidden flex-col items-end gap-4 xl:flex">
              <DerezCountdown time="16:48" milliseconds="50" />
              <div className="rounded border border-primary/30 bg-background/80 p-4 backdrop-blur-md">
                <div className="mb-2 font-mono text-[9px] text-foreground/80 tracking-widest">
                  PROXIMITY SCAN
                </div>
                <Radar size={140} targets={RADAR_TARGETS} />
              </div>
            </div>
          </div>

          {/* Bottom scroll indicator */}
          <div className="absolute right-0 bottom-0 left-0">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="flex items-center justify-center gap-8 py-3">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary/50" />
              <div className="animate-bounce font-mono text-[9px] text-foreground/80 tracking-widest">
                ↓ SCROLL ↓
              </div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>
        </section>

        {/* Theme Selector */}
        <div id="themes">
          <ThemeDossierSelector />
        </div>

        {/* Theme Showcase grid */}
        <ThemeShowcaseSection />

        {/* Features Section */}
        <section
          id="features"
          className="relative border-primary/20 border-t py-24"
        >
          {/* Section background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
          <GridScanOverlay />

          {/* Status bar */}
          <StatusStrip variant="default" items={STATUS_STRIP_FEATURES} />

          <div className="container relative mx-auto px-4 pt-8">
            {/* Section header */}
            <div className="mb-16 text-center">
              <div className="mb-4 font-mono text-[10px] text-foreground/80 tracking-widest">
                [ SYSTEM CAPABILITIES ]
              </div>
              <h2 className="font-bold font-display text-3xl text-primary tracking-wider [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)] md:text-4xl lg:text-5xl">
                CORE FEATURES
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-foreground/80">
                Everything you need to build authentic Tron-inspired interfaces
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="6 THEME VARIANTS"
                description="Greek god-inspired color schemes: Ares, Tron, Clu, Athena, Aphrodite, and Poseidon."
                icon={
                  <svg
                    aria-hidden="true"
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
                    aria-hidden="true"
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
                    aria-hidden="true"
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
                    aria-hidden="true"
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
                    aria-hidden="true"
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
                    aria-hidden="true"
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
        <section className="relative border-primary/20 border-t py-24">
          {/* Status bar */}
          <StatusStrip variant="default" items={STATUS_STRIP_ARCHITECTURE} />

          <div className="container mx-auto px-4 pt-8">
            <div className="mb-12 text-center">
              <div className="mb-4 font-mono text-[10px] text-foreground/80 tracking-widest">
                [ SYSTEM ARCHITECTURE ]
              </div>
              <h2 className="font-bold font-display text-3xl text-primary tracking-wider [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)] md:text-4xl lg:text-5xl">
                TECH STACK
              </h2>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {[
                  { name: "React", status: "UI" },
                  { name: "Tailwind", status: "STYLE" },
                  { name: "shadcn/ui", status: "COMPONENTS" },
                  { name: "Three.js", status: "3D" },
                  { name: "TypeScript", status: "TYPES" },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="group relative overflow-hidden border border-border/50 bg-card/30 p-4 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/50"
                  >
                    {/* Corner decorations */}
                    <div className="absolute -top-px -left-px h-3 w-3 border-primary/40 border-t-2 border-l-2 transition-colors group-hover:border-primary" />
                    <div className="absolute -right-px -bottom-px h-3 w-3 border-primary/40 border-r-2 border-b-2 transition-colors group-hover:border-primary" />

                    <div className="text-center">
                      <div className="font-mono text-[8px] text-foreground/80 tracking-widest">
                        {tech.status}
                      </div>
                      <div className="font-bold font-display text-primary text-sm tracking-wider">
                        {tech.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative border-primary/20 border-t py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

          <StatusStrip variant="default" items={STATUS_STRIP_FAQ} />

          <div className="container relative mx-auto px-4 pt-8">
            <div className="mb-16 text-center">
              <div className="mb-4 font-mono text-[10px] text-foreground/80 tracking-widest">
                [ KNOWLEDGE BASE ]
              </div>
              <h2 className="font-bold font-display text-3xl text-primary tracking-wider [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)] md:text-4xl lg:text-5xl">
                FREQUENTLY ASKED
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-foreground/80">
                Common questions about The Gridcn component library
              </p>
            </div>

            <div className="relative mx-auto max-w-3xl overflow-hidden border border-primary/30 bg-panel">
              {/* Corner brackets */}
              <div className="absolute -top-px -left-px h-4 w-4 border-primary border-t-2 border-l-2" />
              <div className="absolute -top-px -right-px h-4 w-4 border-primary border-t-2 border-r-2" />
              <div className="absolute -bottom-px -left-px h-4 w-4 border-primary border-b-2 border-l-2" />
              <div className="absolute -right-px -bottom-px h-4 w-4 border-primary border-r-2 border-b-2" />

              {/* Scanline effect */}
              <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />

              {/* Header bar */}
              <div className="relative border-primary/30 border-b bg-primary/5 px-4 py-2">
                <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 animate-pulse bg-primary" />
                      <div className="h-1.5 w-3 bg-primary/60" />
                    </div>
                    <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">
                      FAQ-DATABASE.SYS
                    </span>
                  </div>
                  <div className="font-mono text-[9px] tracking-wider">
                    <span className="text-foreground/50">RECORDS:9</span>
                    <span className="ml-3 text-primary">[ ONLINE ]</span>
                  </div>
                </div>
              </div>

              {/* FAQ Content */}
              <div className="relative p-4 md:p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="what-is" className="border-primary/20">
                    <AccordionTrigger className="font-display text-foreground text-sm tracking-wider hover:text-primary hover:no-underline">
                      What is The Gridcn?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80">
                      The Gridcn is a Tron-inspired theme and component library
                      built on top of shadcn/ui. It provides 50+ pre-styled
                      components, 6 Greek god color themes, 3D effects powered
                      by Three.js, and HUD-style UI elements — all designed to
                      create immersive, futuristic interfaces with minimal
                      setup.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="install" className="border-primary/20">
                    <AccordionTrigger className="font-display text-foreground text-sm tracking-wider hover:text-primary hover:no-underline">
                      How do I install The Gridcn components?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80">
                      Pick Radix UI or Base UI in the terminal (or the
                      components explorer), then run the generated command. It
                      applies{" "}
                      <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
                        @thegridcn/radix-vega
                      </code>{" "}
                      or{" "}
                      <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
                        @thegridcn/base-vega
                      </code>{" "}
                      and the component. You can also download{" "}
                      <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
                        components.json
                      </code>
                      . Primitives come from shadcn; HUD and themes come from
                      The Gridcn.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="primitives"
                    className="border-primary/20"
                  >
                    <AccordionTrigger className="font-display text-foreground text-sm tracking-wider hover:text-primary hover:no-underline">
                      Radix UI or Base UI?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80">
                      Same model as other shadcn registries: one{" "}
                      <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
                        style
                      </code>{" "}
                      in{" "}
                      <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
                        components.json
                      </code>
                      .{" "}
                      <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
                        radix-vega
                      </code>{" "}
                      or{" "}
                      <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
                        base-vega
                      </code>
                      . Button, Dialog, and other primitives install from
                      official shadcn using that style. Gridcn HUD, themes, and
                      3D components layer on top of whichever library you chose.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="shadcn" className="border-primary/20">
                    <AccordionTrigger className="font-display text-foreground text-sm tracking-wider hover:text-primary hover:no-underline">
                      Do I need shadcn/ui already set up?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80">
                      Yes. The Gridcn extends shadcn/ui, so you need a project
                      with shadcn/ui initialized. If you don&apos;t have it yet,
                      run{" "}
                      <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
                        pnpm dlx shadcn@latest init
                      </code>{" "}
                      first. The Gridcn components will then integrate
                      seamlessly with your existing shadcn/ui setup and Tailwind
                      CSS configuration.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="themes" className="border-primary/20">
                    <AccordionTrigger className="font-display text-foreground text-sm tracking-wider hover:text-primary hover:no-underline">
                      What themes are available?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80">
                      Six Greek god-inspired themes:{" "}
                      <strong className="text-foreground">Ares</strong> (red),{" "}
                      <strong className="text-foreground">Tron</strong> (cyan),{" "}
                      <strong className="text-foreground">Clu</strong> (orange),{" "}
                      <strong className="text-foreground">Athena</strong>{" "}
                      (gold),{" "}
                      <strong className="text-foreground">Aphrodite</strong>{" "}
                      (pink), and{" "}
                      <strong className="text-foreground">Poseidon</strong>{" "}
                      (blue). Each theme uses oklch() color space for precise
                      color control and includes matching glow effects, borders,
                      and background tones.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="customize"
                    className="border-primary/20"
                  >
                    <AccordionTrigger className="font-display text-foreground text-sm tracking-wider hover:text-primary hover:no-underline">
                      Can I customize the themes or create my own?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80">
                      Absolutely. Themes are defined as CSS variables using the
                      oklch() color space, applied via a{" "}
                      <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
                        data-theme
                      </code>{" "}
                      attribute. You can override any variable in your own CSS
                      or create entirely new themes by defining a new set of
                      color tokens following the same pattern.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="3d" className="border-primary/20">
                    <AccordionTrigger className="font-display text-foreground text-sm tracking-wider hover:text-primary hover:no-underline">
                      Do the 3D components affect performance?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80">
                      The 3D components (Grid3D, Tunnel, GodAvatar) use Three.js
                      and are dynamically imported with{" "}
                      <code className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-primary text-xs">
                        ssr: false
                      </code>{" "}
                      so they don&apos;t impact server-side rendering or initial
                      bundle size. They only load on the client when needed. You
                      can also use the intensity system to control the level of
                      visual effects.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem
                    value="frameworks"
                    className="border-primary/20"
                  >
                    <AccordionTrigger className="font-display text-foreground text-sm tracking-wider hover:text-primary hover:no-underline">
                      Does it work with frameworks other than Next.js?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80">
                      The Gridcn components work with any React framework that
                      supports shadcn/ui — including Next.js, Vite, Remix, and
                      Astro. Since they&apos;re installed directly into your
                      project as source code (not a dependency), you have full
                      control and can adapt them to your stack.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="free" className="border-primary/20">
                    <AccordionTrigger className="font-display text-foreground text-sm tracking-wider hover:text-primary hover:no-underline">
                      Is The Gridcn free to use?
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/80">
                      Yes, The Gridcn is completely free and open source. You
                      can use it in personal and commercial projects. Components
                      are added to your codebase as source files, giving you
                      full ownership and the freedom to modify anything.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section className="relative border-primary/20 border-t py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

          <StatusStrip
            variant="default"
            items={[
              { label: "TEMPLATES", value: "2 AVAILABLE" },
              { label: "STATUS", value: "PRODUCTION READY" },
              { label: "TYPE", value: "FULL-PAGE LAYOUTS" },
            ]}
          />

          <div className="container relative mx-auto px-4 pt-8">
            <div className="mb-16 text-center">
              <div className="mb-4 font-mono text-[10px] text-foreground/80 tracking-widest">
                [ DEPLOYMENT BLUEPRINTS ]
              </div>
              <h2 className="font-bold font-display text-3xl text-primary tracking-wider [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)] md:text-4xl lg:text-5xl">
                TEMPLATES
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-foreground/80">
                Full-page layouts showing how The Gridcn components work
                together in real-world applications
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {/* Dashboard Template Card */}
              <Link
                href="/templates/dashboard"
                className="group relative overflow-hidden border border-primary/30 bg-card/30 p-6 backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-card/50 hover:shadow-[0_0_30px_rgba(var(--primary-rgb,0,180,255),0.08)]"
              >
                {/* Corner decorations */}
                <div className="absolute -top-px -left-px h-4 w-4 border-primary/40 border-t-2 border-l-2 transition-colors group-hover:border-primary" />
                <div className="absolute -right-px -bottom-px h-4 w-4 border-primary/40 border-r-2 border-b-2 transition-colors group-hover:border-primary" />

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 animate-pulse bg-primary" />
                    <div className="h-1.5 w-3 bg-primary/60" />
                  </div>
                  <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">
                    TEMPLATE-01
                  </span>
                </div>

                <h3 className="mb-2 font-bold font-display text-foreground text-xl tracking-wider transition-colors group-hover:text-primary">
                  DASHBOARD
                </h3>
                <p className="mb-4 text-foreground/60 text-sm">
                  Analytics dashboard with data cards, charts, metrics, sidebar
                  navigation, and real-time status indicators.
                </p>

                <div className="flex items-center gap-2 font-mono text-[10px] text-primary/70 tracking-widest transition-colors group-hover:text-primary">
                  <span>LAUNCH TEMPLATE</span>
                  <svg
                    aria-hidden="true"
                    className="h-3 w-3 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>

              {/* Landing Page Template Card */}
              <Link
                href="/templates/landing"
                className="group relative overflow-hidden border border-primary/30 bg-card/30 p-6 backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-card/50 hover:shadow-[0_0_30px_rgba(var(--primary-rgb,0,180,255),0.08)]"
              >
                {/* Corner decorations */}
                <div className="absolute -top-px -left-px h-4 w-4 border-primary/40 border-t-2 border-l-2 transition-colors group-hover:border-primary" />
                <div className="absolute -right-px -bottom-px h-4 w-4 border-primary/40 border-r-2 border-b-2 transition-colors group-hover:border-primary" />

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 animate-pulse bg-primary" />
                    <div className="h-1.5 w-3 bg-primary/60" />
                  </div>
                  <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">
                    TEMPLATE-02
                  </span>
                </div>

                <h3 className="mb-2 font-bold font-display text-foreground text-xl tracking-wider transition-colors group-hover:text-primary">
                  LANDING PAGE
                </h3>
                <p className="mb-4 text-foreground/60 text-sm">
                  Marketing landing page with hero section, feature grid,
                  testimonials, pricing cards, and call-to-action blocks.
                </p>

                <div className="flex items-center gap-2 font-mono text-[10px] text-primary/70 tracking-widest transition-colors group-hover:text-primary">
                  <span>LAUNCH TEMPLATE</span>
                  <svg
                    aria-hidden="true"
                    className="h-3 w-3 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Browse all link */}
            <div className="mt-10 text-center">
              <Link
                href="/templates"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded border border-primary/40 bg-primary/10 px-8 py-3 font-mono text-primary text-xs uppercase tracking-widest transition-all hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.15)]"
              >
                Browse All Templates
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative border-primary/20 border-t py-24">
          <GridScanOverlay />

          <div className="container relative mx-auto px-4 text-center">
            {/* Terminal-style CTA box */}
            <div className="relative mx-auto max-w-2xl overflow-hidden border border-primary/30 bg-panel">
              {/* Corner brackets - Tron style */}
              <div className="absolute -top-px -left-px h-4 w-4 border-primary border-t-2 border-l-2" />
              <div className="absolute -top-px -right-px h-4 w-4 border-primary border-t-2 border-r-2" />
              <div className="absolute -bottom-px -left-px h-4 w-4 border-primary border-b-2 border-l-2" />
              <div className="absolute -right-px -bottom-px h-4 w-4 border-primary border-r-2 border-b-2" />

              {/* Scanline effect */}
              <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />

              {/* Header bar */}
              <div className="relative border-primary/30 border-b bg-primary/5 px-4 py-2">
                <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-primary via-primary/50 to-transparent" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="h-1.5 w-1.5 animate-pulse bg-primary" />
                      <div className="h-1.5 w-3 bg-primary/60" />
                    </div>
                    <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">
                      AWAITING USER INPUT
                    </span>
                  </div>
                  <div className="font-mono text-[9px] tracking-wider">
                    <span className="text-primary">[ READY ]</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative px-8 py-12 md:px-16">
                <h2 className="mb-6 font-bold font-display text-4xl text-primary tracking-wider [text-shadow:0_0_40px_oklch(from_var(--primary)_l_c_h/0.4)] md:text-5xl">
                  READY TO ENTER?
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-foreground/80">
                  Explore all components, customize themes, and build immersive
                  digital experiences.
                </p>
                <Link
                  href="/components"
                  className="group relative inline-flex overflow-hidden rounded border-2 border-primary bg-primary px-12 py-4 font-bold font-mono text-primary-foreground text-sm tracking-wider transition-all hover:shadow-[0_0_40px_var(--primary)]"
                >
                  <span className="relative z-10">EXPLORE COMPONENTS</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
