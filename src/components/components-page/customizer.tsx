"use client";

import * as React from "react";
import { Settings } from "lucide-react";
import { themes, tronIntensities, useTheme } from "@/components/theme";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import { TronIntensitySwitcherCompact } from "@/components/theme/tron-intensity-switcher";

export function Customizer() {
  const { theme, tronIntensity } = useTheme();
  const currentTheme = themes.find((t) => t.id === theme);
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
              <div className="mb-2 block text-xs font-medium text-foreground">
                Theme
              </div>
              <ThemeSwitcher />
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

            <div>
              <div className="mb-2 block text-xs font-medium text-foreground">
                Current Theme
              </div>
              <div className="rounded border border-primary/20 bg-primary/5 p-3">
                <div className="mb-2 font-mono text-[10px] tracking-wider text-primary">
                  {currentTheme?.name.toUpperCase()}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {currentTheme?.god}
                </div>
                <div className="mt-2 h-8 w-full rounded border border-primary/30 bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
