"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Settings } from "lucide-react";
import { themes, tronIntensities, useTheme } from "@/components/theme";
import { TronIntensitySwitcherCompact } from "@/components/theme/tron-intensity-switcher";
import { cn } from "@/lib/utils";

// Dynamic import for 3D component to avoid SSR issues
const GodAvatar3D = dynamic(
  () => import("@/components/thegridcn/god-avatar").then((mod) => mod.GodAvatar3D),
  { ssr: false }
);

export function Customizer() {
  const { theme, setTheme, tronIntensity } = useTheme();
  const currentIntensity = tronIntensities.find((i) => i.id === tronIntensity);

  return (
    <div className="sticky top-[88px] z-30 hidden h-[calc(100vh-88px)] w-64 overflow-y-auto border-l border-primary/20 bg-background/50 backdrop-blur-sm xl:flex xl:flex-col">
      <div className="p-4">
        <div className="mb-4 flex items-center gap-2">
          <Settings className="h-4 w-4 text-primary" />
          <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
            CUSTOMIZER
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-3 text-xs font-medium text-foreground">
              Build your own Tron theme
            </div>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              Customize the theme, colors, and styling to match your vision.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-3 block text-xs font-medium text-foreground">
                Theme
              </div>
              <div className="grid grid-cols-3 gap-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "group flex flex-col items-center rounded border p-2 transition-all",
                      theme === t.id
                        ? "border-primary bg-primary/10"
                        : "border-border/50 bg-card/30 hover:border-primary/50 hover:bg-card/50"
                    )}
                  >
                    <div
                      className={cn(
                        "relative mb-1 overflow-hidden rounded",
                        theme === t.id ? "ring-1 ring-primary/50" : ""
                      )}
                      style={{ backgroundColor: `${t.color}10` }}
                    >
                      <GodAvatar3D themeId={t.id} color={t.color} size={56} />
                    </div>
                    <span
                      className={cn(
                        "font-mono text-[9px] tracking-wider",
                        theme === t.id ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {t.name.toUpperCase()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 block text-xs font-medium text-foreground">
                Tron Intensity
              </div>
              <TronIntensitySwitcherCompact />
              <p className="mt-2 text-[10px] text-muted-foreground">
                {currentIntensity?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
