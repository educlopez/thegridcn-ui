"use client";

import dynamic from "next/dynamic";
import * as React from "react";
import { selectableThemes, useTheme } from "@/components/theme";
import { cn } from "@/lib/utils";

// Dynamic import for 3D component to avoid SSR issues
const GodAvatar3D = dynamic(
  () =>
    import("@/components/website/god-avatar").then((mod) => mod.GodAvatar3D),
  { ssr: false }
);

interface ThemeDossierCardProps {
  godName: string;
  isActive: boolean;
  onClick: () => void;
  themeColor: string;
  themeId: string;
  themeName: string;
}

// Static theme descriptions - hoisted outside component to avoid recreation (rendering-hoist-jsx pattern)
const themeDescriptions: Record<
  string,
  { role: string; origin: string; power: string }
> = {
  aphrodite: { origin: "OLYMPUS", power: "ALLURE", role: "GODDESS OF LOVE" },
  ares: { origin: "OLYMPUS", power: "COMBAT MASTERY", role: "GOD OF WAR" },
  athena: {
    origin: "OLYMPUS",
    power: "STRATEGIC INSIGHT",
    role: "GODDESS OF WISDOM",
  },
  clu: { origin: "THE GRID", power: "TOTAL CONTROL", role: "SYSTEM ADMIN" },
  poseidon: {
    origin: "OLYMPUS",
    power: "OCEAN MASTERY",
    role: "GOD OF THE SEA",
  },
  tron: {
    origin: "ENCOM MAINFRAME",
    power: "SYSTEM DEFENSE",
    role: "SECURITY PROGRAM",
  },
};

const defaultDescription = {
  origin: "UNKNOWN",
  power: "UNKNOWN",
  role: "UNKNOWN",
};

// Memoized card component to prevent unnecessary re-renders (rerender-memo pattern)
const ThemeDossierCard = React.memo(function ThemeDossierCard({
  themeId,
  themeName,
  themeColor,
  godName,
  isActive,
  onClick,
}: ThemeDossierCardProps) {
  const desc = themeDescriptions[themeId] ?? defaultDescription;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full text-left transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      {/* Main card container */}
      <div
        className={cn(
          "relative overflow-hidden rounded border bg-card/80 backdrop-blur-sm transition-all duration-300",
          isActive
            ? "border-primary/80"
            : "border-border/50 hover:border-primary/50"
        )}
        style={{
          boxShadow: isActive
            ? `0 0 20px ${themeColor}40, inset 0 0 30px ${themeColor}10`
            : undefined,
        }}
      >
        {/* Corner brackets */}
        <div
          className="absolute -top-px -left-px h-4 w-4 border-t-2 border-l-2 transition-colors"
          style={{ borderColor: isActive ? themeColor : `${themeColor}60` }}
        />
        <div
          className="absolute -top-px -right-px h-4 w-4 border-t-2 border-r-2 transition-colors"
          style={{ borderColor: isActive ? themeColor : `${themeColor}60` }}
        />
        <div
          className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 transition-colors"
          style={{ borderColor: isActive ? themeColor : `${themeColor}60` }}
        />
        <div
          className="absolute -right-px -bottom-px h-4 w-4 border-r-2 border-b-2 transition-colors"
          style={{ borderColor: isActive ? themeColor : `${themeColor}60` }}
        />

        {/* Header bar with name */}
        <div
          className="border-b px-4 py-2 transition-colors"
          style={{
            backgroundColor: isActive ? `${themeColor}30` : `${themeColor}15`,
            borderColor: `${themeColor}40`,
          }}
        >
          <div className="flex items-center justify-between">
            <h3
              className="font-bold font-display text-lg tracking-widest"
              style={{ color: themeColor }}
            >
              {themeName.toUpperCase()}
            </h3>
            <div className="flex items-center gap-2">
              {isActive ? (
                <span
                  className="rounded px-2 py-0.5 font-bold font-mono text-[10px] tracking-wider"
                  style={{
                    backgroundColor: themeColor,
                    color: "#000",
                  }}
                >
                  ACTIVE
                </span>
              ) : null}
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: themeColor,
                  boxShadow: `0 0 10px ${themeColor}`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 p-4">
          {/* 3D Avatar */}
          <div className="row-span-4 flex items-start">
            <div
              className="relative overflow-hidden rounded border"
              style={{
                backgroundColor: `${themeColor}05`,
                borderColor: `${themeColor}50`,
              }}
            >
              <GodAvatar3D themeId={themeId} color={themeColor} size={64} />
            </div>
          </div>

          {/* Data fields */}
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] text-foreground/80 uppercase tracking-wider">
              DESIGNATION
            </span>
            <span className="font-mono text-foreground text-sm">
              {godName.toUpperCase()}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] text-foreground/80 uppercase tracking-wider">
              ROLE
            </span>
            <span className="font-mono text-foreground text-sm">
              {desc.role}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] text-foreground/80 uppercase tracking-wider">
              ORIGIN
            </span>
            <span className="font-mono text-foreground text-sm">
              {desc.origin}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] text-foreground/80 uppercase tracking-wider">
              PRIMARY
            </span>
            <span
              className="font-bold font-mono text-sm"
              style={{ color: themeColor }}
            >
              {themeColor.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Bottom banner */}
        <div
          className="border-t px-4 py-2 transition-colors"
          style={{
            backgroundColor: `${themeColor}20`,
            borderColor: `${themeColor}40`,
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="font-bold font-mono text-xs tracking-wider"
              style={{ color: themeColor }}
            >
              - {desc.power}
            </span>
            <span className="font-mono text-[10px] text-foreground/80">
              THEME:{themeId.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Scan line effect on hover */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100"
          )}
          style={{
            animation: "scan 2s linear infinite",
            background: `linear-gradient(180deg, transparent 0%, ${themeColor}10 50%, transparent 100%)`,
          }}
        />
      </div>
    </button>
  );
});

// Hoist static background style (rendering-hoist-jsx pattern)
const backgroundGridStyle = {
  backgroundImage:
    "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

export function ThemeDossierSelector() {
  const { theme, setTheme } = useTheme();

  // Memoize the theme cards to avoid recreation
  const themeCards = React.useMemo(
    () =>
      selectableThemes.map((t) => (
        <ThemeDossierCard
          key={t.id}
          themeId={t.id}
          themeName={t.name}
          themeColor={t.color}
          godName={t.god}
          isActive={theme === t.id}
          onClick={() => setTheme(t.id)}
        />
      )),
    [theme, setTheme]
  );

  return (
    <section className="relative py-16">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={backgroundGridStyle}
      />

      <div className="container relative mx-auto px-4">
        {/* Section header - styled like movie UI */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-primary" />
          <div className="relative">
            <div className="absolute -inset-2 rounded border border-primary/30" />
            <div className="absolute -top-2 -left-2 h-2 w-2 border-primary border-t border-l" />
            <div className="absolute -top-2 -right-2 h-2 w-2 border-primary border-t border-r" />
            <div className="absolute -bottom-2 -left-2 h-2 w-2 border-primary border-b border-l" />
            <div className="absolute -right-2 -bottom-2 h-2 w-2 border-primary border-r border-b" />
            <h2 className="bg-background px-4 py-2 font-bold font-display text-primary text-xl tracking-[0.2em] md:text-2xl">
              SELECT THEME
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/50 to-primary" />
        </div>

        {/* Subtitle */}
        <p className="mb-8 text-center font-mono text-foreground/80 text-sm">
          [ IDENTITY PROFILES • CLICK TO ACTIVATE ]
        </p>

        {/* Theme grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {themeCards}
        </div>

        {/* Bottom status bar */}
        <div className="mt-8 flex items-center justify-between border-primary/30 border-t pt-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-foreground/80 text-xs">
              SYSTEM STATUS: OPERATIONAL
            </span>
          </div>
          <div className="font-mono text-foreground/80 text-xs">
            {selectableThemes.length} THEMES AVAILABLE
          </div>
        </div>
      </div>

      {/* CSS for scan animation */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
  );
}
