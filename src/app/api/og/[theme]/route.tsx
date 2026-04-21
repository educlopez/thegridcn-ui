import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

type ThemeKey = "ares" | "tron" | "clu" | "athena" | "aphrodite" | "poseidon"

interface ThemeConfig {
  name: string
  accent: string
  glow: string
  subtitle: string
}

const THEMES: Record<ThemeKey, ThemeConfig> = {
  ares: {
    name: "ARES",
    accent: "#ff3333",
    glow: "rgba(255, 51, 51, 0.4)",
    subtitle: "War. Power. Dominance.",
  },
  tron: {
    name: "TRON",
    accent: "#00d4ff",
    glow: "rgba(0, 212, 255, 0.4)",
    subtitle: "Program. Protocol. Precision.",
  },
  clu: {
    name: "CLU",
    accent: "#ff6600",
    glow: "rgba(255, 102, 0, 0.4)",
    subtitle: "Order. Control. Perfection.",
  },
  athena: {
    name: "ATHENA",
    accent: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.4)",
    subtitle: "Wisdom. Strategy. Craft.",
  },
  aphrodite: {
    name: "APHRODITE",
    accent: "#f43f5e",
    glow: "rgba(244, 63, 94, 0.4)",
    subtitle: "Beauty. Grace. Allure.",
  },
  poseidon: {
    name: "POSEIDON",
    accent: "#0066ff",
    glow: "rgba(0, 102, 255, 0.4)",
    subtitle: "Depth. Flow. Current.",
  },
}

function isValidTheme(key: string): key is ThemeKey {
  return key in THEMES
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ theme: string }> }
) {
  const { theme } = await ctx.params
  const themeKey: ThemeKey = isValidTheme(theme) ? theme : "tron"
  const cfg = THEMES[themeKey]

  // Tron-style grid pattern as data URI (subtle)
  const gridSize = 60

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0a",
          position: "relative",
          fontFamily: "'Geist Mono', ui-monospace, monospace",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${cfg.accent}14 1px, transparent 1px), linear-gradient(90deg, ${cfg.accent}14 1px, transparent 1px)`,
            backgroundSize: `${gridSize}px ${gridSize}px`,
            display: "flex",
          }}
        />

        {/* Radial accent glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Radial accent glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: "-240px",
            left: "-240px",
            width: "600px",
            height: "600px",
            background: `radial-gradient(circle, ${cfg.glow} 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Top bar: monospace eyebrow */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "48px 72px 0 72px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "22px",
              letterSpacing: "0.3em",
              color: "#9a9a9a",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                background: cfg.accent,
                boxShadow: `0 0 16px ${cfg.accent}`,
                display: "flex",
              }}
            />
            shadcn/ui components
          </div>
          <div
            style={{
              fontSize: "20px",
              letterSpacing: "0.35em",
              color: cfg.accent,
              textTransform: "uppercase",
            }}
          >
            {`// ${cfg.name}`}
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "160px",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "#f5f5f5",
              textShadow: `0 0 40px ${cfg.glow}`,
            }}
          >
            thegrid
            <span style={{ color: cfg.accent, display: "flex" }}>cn</span>
          </div>
          <div
            style={{
              marginTop: "32px",
              fontSize: "32px",
              color: "#bfbfbf",
              letterSpacing: "0.05em",
              display: "flex",
            }}
          >
            Tron-inspired shadcn/ui theme —{" "}
            <span style={{ color: cfg.accent, marginLeft: "12px", display: "flex" }}>
              {cfg.subtitle}
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 72px 48px 72px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: "20px",
              color: "#7a7a7a",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            thegridcn.com
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "18px",
              color: "#7a7a7a",
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
            position: "absolute",
            top: "32px",
            left: "32px",
            width: "48px",
            height: "48px",
            borderTop: `2px solid ${cfg.accent}`,
            borderLeft: `2px solid ${cfg.accent}`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "32px",
            right: "32px",
            width: "48px",
            height: "48px",
            borderTop: `2px solid ${cfg.accent}`,
            borderRight: `2px solid ${cfg.accent}`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            left: "32px",
            width: "48px",
            height: "48px",
            borderBottom: `2px solid ${cfg.accent}`,
            borderLeft: `2px solid ${cfg.accent}`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "32px",
            width: "48px",
            height: "48px",
            borderBottom: `2px solid ${cfg.accent}`,
            borderRight: `2px solid ${cfg.accent}`,
            display: "flex",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

