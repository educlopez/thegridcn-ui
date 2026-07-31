import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

type ThemeKey = "ares" | "tron" | "clu" | "athena" | "aphrodite" | "poseidon";

interface ThemeConfig {
  accent: string;
  glow: string;
  name: string;
  subtitle: string;
}

const THEMES: Record<ThemeKey, ThemeConfig> = {
  aphrodite: {
    accent: "#f43f5e",
    glow: "rgba(244, 63, 94, 0.4)",
    name: "APHRODITE",
    subtitle: "Beauty. Grace. Allure.",
  },
  ares: {
    accent: "#ff3333",
    glow: "rgba(255, 51, 51, 0.4)",
    name: "ARES",
    subtitle: "War. Power. Dominance.",
  },
  athena: {
    accent: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.4)",
    name: "ATHENA",
    subtitle: "Wisdom. Strategy. Craft.",
  },
  clu: {
    accent: "#ff6600",
    glow: "rgba(255, 102, 0, 0.4)",
    name: "CLU",
    subtitle: "Order. Control. Perfection.",
  },
  poseidon: {
    accent: "#0066ff",
    glow: "rgba(0, 102, 255, 0.4)",
    name: "POSEIDON",
    subtitle: "Depth. Flow. Current.",
  },
  tron: {
    accent: "#00d4ff",
    glow: "rgba(0, 212, 255, 0.4)",
    name: "TRON",
    subtitle: "Program. Protocol. Precision.",
  },
};

function isValidTheme(key: string): key is ThemeKey {
  return key in THEMES;
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ theme: string }> }
) {
  const { theme } = await ctx.params;
  const themeKey: ThemeKey = isValidTheme(theme) ? theme : "tron";
  const cfg = THEMES[themeKey];

  // Tron-style grid pattern as data URI (subtle)
  const gridSize = 60;

  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Geist Mono', ui-monospace, monospace",
        height: "630px",
        position: "relative",
        width: "1200px",
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          backgroundImage: `linear-gradient(${cfg.accent}14 1px, transparent 1px), linear-gradient(90deg, ${cfg.accent}14 1px, transparent 1px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
          display: "flex",
          inset: 0,
          position: "absolute",
        }}
      />

      {/* Radial accent glow top-right */}
      <div
        style={{
          background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
          display: "flex",
          height: "600px",
          position: "absolute",
          right: "-200px",
          top: "-200px",
          width: "600px",
        }}
      />

      {/* Radial accent glow bottom-left */}
      <div
        style={{
          background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
          bottom: "-240px",
          display: "flex",
          height: "600px",
          left: "-240px",
          position: "absolute",
          width: "600px",
        }}
      />

      {/* Top bar: monospace eyebrow */}
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          padding: "48px 72px 0 72px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            alignItems: "center",
            color: "#9a9a9a",
            display: "flex",
            fontSize: "22px",
            gap: "12px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              background: cfg.accent,
              boxShadow: `0 0 16px ${cfg.accent}`,
              display: "flex",
              height: "10px",
              width: "10px",
            }}
          />
          shadcn/ui components
        </div>
        <div
          style={{
            color: cfg.accent,
            fontSize: "20px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
          }}
        >
          {`// ${cfg.name}`}
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 72px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: "#f5f5f5",
            display: "flex",
            fontSize: "160px",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            textShadow: `0 0 40px ${cfg.glow}`,
          }}
        >
          thegrid
          <span style={{ color: cfg.accent, display: "flex" }}>cn</span>
        </div>
        <div
          style={{
            color: "#bfbfbf",
            display: "flex",
            fontSize: "32px",
            letterSpacing: "0.05em",
            marginTop: "32px",
          }}
        >
          Tron-inspired shadcn/ui theme —{" "}
          <span
            style={{ color: cfg.accent, display: "flex", marginLeft: "12px" }}
          >
            {cfg.subtitle}
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 72px 48px 72px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: "#7a7a7a",
            display: "flex",
            fontSize: "20px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          thegridcn.com
        </div>
        <div
          style={{
            alignItems: "center",
            color: "#7a7a7a",
            display: "flex",
            fontSize: "18px",
            gap: "16px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "flex" }}>55+ components</span>
          <span style={{ color: cfg.accent, display: "flex" }}>·</span>
          <span style={{ display: "flex" }}>6 themes</span>
          <span style={{ color: cfg.accent, display: "flex" }}>·</span>
          <span style={{ display: "flex" }}>3D effects</span>
        </div>
      </div>

      {/* Accent corner lines */}
      <div
        style={{
          borderLeft: `2px solid ${cfg.accent}`,
          borderTop: `2px solid ${cfg.accent}`,
          display: "flex",
          height: "48px",
          left: "32px",
          position: "absolute",
          top: "32px",
          width: "48px",
        }}
      />
      <div
        style={{
          borderRight: `2px solid ${cfg.accent}`,
          borderTop: `2px solid ${cfg.accent}`,
          display: "flex",
          height: "48px",
          position: "absolute",
          right: "32px",
          top: "32px",
          width: "48px",
        }}
      />
      <div
        style={{
          borderBottom: `2px solid ${cfg.accent}`,
          borderLeft: `2px solid ${cfg.accent}`,
          bottom: "32px",
          display: "flex",
          height: "48px",
          left: "32px",
          position: "absolute",
          width: "48px",
        }}
      />
      <div
        style={{
          borderBottom: `2px solid ${cfg.accent}`,
          borderRight: `2px solid ${cfg.accent}`,
          bottom: "32px",
          display: "flex",
          height: "48px",
          position: "absolute",
          right: "32px",
          width: "48px",
        }}
      />
    </div>,
    {
      height: 630,
      width: 1200,
    }
  );
}
