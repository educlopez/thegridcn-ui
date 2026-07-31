"use client";

import dynamic from "next/dynamic";
import {
  selectableThemes,
  type Theme,
  themes,
  tronIntensities,
  useTheme,
} from "@/components/theme";
import { TronIntensitySwitcherCompact } from "@/components/theme/tron-intensity-switcher";
import { cn } from "@/lib/utils";

// Maps for O(1) lookups
const themeById = new Map<Theme, (typeof themes)[number]>(
  themes.map((t) => [t.id, t])
);
const intensityById = new Map(tronIntensities.map((i) => [i.id, i]));

// Dynamic import for 3D component to avoid SSR issues
const GodAvatar3D = dynamic(
  () =>
    import("@/components/website/god-avatar").then((mod) => mod.GodAvatar3D),
  { ssr: false }
);

// Tron-style section header component
function TronSectionHeader({
  code,
  title,
  highlight,
}: {
  code: string;
  title: string;
  highlight?: string;
}) {
  return (
    <div className="relative mb-4">
      {/* Top line with diagonal cut */}
      <div className="absolute -top-1 right-3 left-0 h-px bg-gradient-to-r from-foreground/50 to-transparent" />
      <div className="absolute -top-1 right-0 h-3 w-3">
        <div
          className="absolute top-0 right-0 h-px w-3 bg-foreground/50"
          style={{ transform: "rotate(-45deg)", transformOrigin: "right top" }}
        />
      </div>

      <div className="border-foreground/20 border-b pt-1 pb-2">
        <span className="font-mono text-[10px] text-foreground tracking-[0.15em]">
          {title}: <span className="text-primary">{highlight || code}</span>
        </span>
      </div>
    </div>
  );
}

// Tron-style data row
function TronDataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-foreground/15 border-b py-1.5">
      <span className="font-mono text-[9px] text-foreground/90 tracking-wider">
        {label}
      </span>
      <span className="font-mono text-[10px] text-primary tracking-wider">
        {value}
      </span>
    </div>
  );
}

// Info notice about install defaults
function InstallNotice({
  theme,
  intensity,
}: {
  theme: string;
  intensity: string;
}) {
  const isDefaultTheme = theme === "tron";
  const isDefaultIntensity = intensity === "light";
  const isDefault = isDefaultTheme && isDefaultIntensity;

  return (
    <div className="mb-6">
      <TronSectionHeader code="INF-001.X" title="INSTALL" highlight="INFO" />

      <div className="space-y-1.5 rounded border border-foreground/10 bg-foreground/5 p-2.5">
        <p className="font-mono text-[8px] text-foreground/70 leading-relaxed">
          DEFAULT: <span className="text-primary">TRON</span> +{" "}
          <span className="text-primary">LIGHT</span>. The install command
          updates automatically when you change settings.
        </p>
        {!isDefault && (
          <p className="font-mono text-[8px] text-foreground leading-relaxed">
            ACTIVE:{" "}
            <span
              className={cn(
                isDefaultTheme ? "text-foreground/50" : "text-primary"
              )}
            >
              {theme.toUpperCase()}
            </span>
            {" + "}
            <span
              className={cn(
                isDefaultIntensity ? "text-foreground/50" : "text-primary"
              )}
            >
              {intensity.toUpperCase()}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

interface CustomizerProps {
  isMobile?: boolean;
}

export function Customizer({ isMobile = false }: CustomizerProps) {
  const { theme, setTheme, tronIntensity } = useTheme();
  const currentTheme = themeById.get(theme);
  const currentIntensity = intensityById.get(tronIntensity);

  const content = (
    <div className="p-4">
      {/* Main Header - Tron terminal style with diagonal cut */}
      {!isMobile && (
        <div className="mb-4">
          {/* Panel Header - Tron style with diagonal cut */}
          <div className="relative">
            {/* Top line */}
            <div className="absolute -top-1 right-4 left-0 h-px bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />
            {/* Diagonal cut element */}
            <div className="absolute -top-1 right-0 h-4 w-4">
              <div
                className="absolute top-0 right-0 h-px w-4 bg-primary/40"
                style={{
                  transform: "rotate(-45deg)",
                  transformOrigin: "right top",
                }}
              />
            </div>

            <div className="border-primary/30 border-b pt-1 pb-2">
              <span className="font-mono text-[11px] text-foreground tracking-[0.2em]">
                CONFIG: <span className="text-foreground/70">02.SYS</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Install Info */}
      <InstallNotice theme={theme} intensity={tronIntensity} />

      {/* System Status Panel */}
      <div className="relative mb-6 rounded border border-foreground/15 bg-foreground/5 p-3">
        {/* Corner brackets */}
        <span className="absolute top-0 left-0 h-3 w-3 border-foreground/30 border-t-2 border-l-2" />
        <span className="absolute top-0 right-0 h-3 w-3 border-foreground/30 border-t-2 border-r-2" />
        <span className="absolute bottom-0 left-0 h-3 w-3 border-foreground/30 border-b-2 border-l-2" />
        <span className="absolute right-0 bottom-0 h-3 w-3 border-foreground/30 border-r-2 border-b-2" />

        <div className="mb-2 font-mono text-[9px] text-foreground tracking-widest">
          SYSTEM CONFIG
        </div>
        <TronDataRow
          label="THEME"
          value={currentTheme?.name.toUpperCase() || "—"}
        />
        <TronDataRow
          label="INTENSITY"
          value={currentIntensity?.name.toUpperCase() || "—"}
        />
        <TronDataRow label="STATUS" value="OPERATIONAL" />
      </div>

      {/* Theme Selection */}
      <div className="mb-6">
        <TronSectionHeader
          code="THM-006.V"
          title="IDENTITY"
          highlight="SELECT"
        />

        <div className="grid grid-cols-3 gap-2">
          {selectableThemes.map((t) => (
            <button
              type="button"
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={cn(
                "group relative flex flex-col items-center rounded border p-2 transition-all",
                theme === t.id
                  ? "border-primary bg-primary/10"
                  : "border-primary/20 bg-card/20 hover:border-primary/50 hover:bg-card/40"
              )}
            >
              {/* Corner accents for selected */}
              {theme === t.id && (
                <>
                  <span className="absolute top-0 left-0 h-2 w-2 border-primary border-t border-l" />
                  <span className="absolute top-0 right-0 h-2 w-2 border-primary border-t border-r" />
                  <span className="absolute bottom-0 left-0 h-2 w-2 border-primary border-b border-l" />
                  <span className="absolute right-0 bottom-0 h-2 w-2 border-primary border-r border-b" />
                </>
              )}

              <div
                className={cn(
                  "relative mb-1.5 overflow-hidden rounded",
                  theme === t.id ? "ring-1 ring-primary/50" : ""
                )}
                style={{ backgroundColor: `${t.color}10` }}
              >
                <GodAvatar3D themeId={t.id} color={t.color} size={52} />
              </div>
              <span
                className={cn(
                  "font-mono text-[8px] tracking-wider",
                  theme === t.id ? "text-primary" : "text-foreground"
                )}
              >
                {t.name.toUpperCase()}
              </span>
              {theme === t.id && (
                <span className="absolute -top-1 right-1 font-mono text-[7px] text-primary">
                  ●
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Intensity Control */}
      <div className="mb-6">
        <TronSectionHeader code="INT-004.G" title="GLOW" highlight="LEVEL" />

        <TronIntensitySwitcherCompact />

        <div className="mt-3 rounded border border-primary/15 bg-primary/5 p-2">
          <p className="font-mono text-[9px] text-foreground/80 leading-relaxed">
            {currentIntensity?.description}
          </p>
        </div>
      </div>

      {/* Footer Status - Terminal style */}
      <div className="mt-auto border-foreground/20 border-t pt-3">
        {/* Status bar with segments */}
        <div className="flex items-center gap-2 font-mono text-[8px]">
          <span className="text-foreground">SYS:</span>
          <span className="text-primary">OK</span>
          <span className="text-foreground/50">|</span>
          <span className="text-foreground">T:</span>
          <span className="text-primary">
            {currentTheme?.id.toUpperCase().slice(0, 3) || "---"}
          </span>
          <span className="text-foreground/50">|</span>
          <span className="text-foreground">I:</span>
          <span className="text-primary">
            {currentIntensity?.id.slice(0, 1).toUpperCase() || "-"}
          </span>
          <span className="ml-auto text-foreground/70">v1.0</span>
        </div>
        {/* Progress indicator */}
        <div className="mt-2 flex items-center gap-1">
          <div className="h-0.5 flex-1 bg-foreground/20">
            <div className="h-full w-full bg-primary" />
          </div>
          <span className="font-mono text-[7px] text-foreground/70">100%</span>
        </div>
      </div>
    </div>
  );

  // Mobile version - just render the content
  if (isMobile) {
    return content;
  }

  // Desktop version
  return (
    <div className="relative z-30 hidden h-full w-64 shrink-0 overflow-y-auto border-primary/30 border-l bg-panel xl:flex xl:flex-col">
      {/* CRT scanline effect */}
      <div className="crt-scanlines pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="relative flex-1">{content}</div>
    </div>
  );
}
