"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export type AgentAvatarProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  seed: string
  size?: number
  animated?: boolean
  /** Base hue (0-360). Blue ≈ 200, Orange ≈ 30, Cyan ≈ 185 */
  hue?: number
  /** Show rotating outer ring */
  ring?: boolean
}

/* ── helpers ─────────────────────────────────────────── */

const hashSeed = (str: string): number => {
  let h = 0
  for (const c of str) h = ((h << 5) - h + c.charCodeAt(0)) | 0
  return Math.abs(h)
}

const createRng = (seed: number) => {
  let s = seed
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296
  }
}

/* ── ring layout ─────────────────────────────────────── */

const RINGS = [
  { r: 0.88, segments: 16, width: 0.065 },
  { r: 0.70, segments: 12, width: 0.07 },
  { r: 0.52, segments: 8,  width: 0.08 },
  { r: 0.34, segments: 6,  width: 0.09 },
]

type Segment = { ringIdx: number; segIdx: number; on: boolean; phase: number }

const generateSegments = (hash: number): Segment[] => {
  const rng = createRng(hash)
  const segments: Segment[] = []
  for (let ri = 0; ri < RINGS.length; ri++) {
    const count = RINGS[ri].segments
    for (let si = 0; si < count; si++) {
      segments.push({
        ringIdx: ri,
        segIdx: si,
        on: rng() > 0.35,
        phase: rng() * Math.PI * 2,
      })
    }
  }
  return segments
}

/* ── component ───────────────────────────────────────── */

export function AgentAvatar({
  seed,
  size = 64,
  animated = true,
  hue,
  ring = true,
  className,
  ...props
}: AgentAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  const hash = hashSeed(seed)
  const baseHue = hue ?? (hash % 360)
  const glowColor = `hsl(${baseHue}, 85%, 55%)`

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = size * dpr
    canvas.height = size * dpr
    ctx.scale(dpr, dpr)

    const segments = generateSegments(hash)
    const cx = size / 2
    const cy = size / 2
    const half = size / 2

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let shouldAnimate = animated && !motionQuery.matches

    const draw = (time: number) => {
      ctx.clearRect(0, 0, size, size)
      ctx.save()

      // Circular clip
      ctx.beginPath()
      ctx.arc(cx, cy, half, 0, Math.PI * 2)
      ctx.clip()

      // Dark background
      ctx.fillStyle = "#050508"
      ctx.fillRect(0, 0, size, size)

      // Subtle radial gradient background glow
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, half)
      bgGrad.addColorStop(0, `hsla(${baseHue}, 60%, 30%, 0.12)`)
      bgGrad.addColorStop(1, "transparent")
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, size, size)

      // Global rotation for outermost ring
      const globalRotation = shouldAnimate ? time * 0.0003 : 0

      // Draw ring segments
      for (const seg of segments) {
        const ringDef = RINGS[seg.ringIdx]
        const count = ringDef.segments
        const radius = ringDef.r * half
        const arcWidth = ringDef.width * half
        const gapAngle = 0.04 // gap between segments in radians
        const segAngle = (Math.PI * 2) / count - gapAngle

        // Outermost ring rotates
        const rotation = seg.ringIdx === 0 ? globalRotation : 0
        const startAngle = rotation + seg.segIdx * ((Math.PI * 2) / count)
        const endAngle = startAngle + segAngle

        if (!seg.on) {
          // Dim inactive segment
          ctx.beginPath()
          ctx.arc(cx, cy, radius, startAngle, endAngle)
          ctx.strokeStyle = `hsla(${baseHue}, 30%, 25%, 0.15)`
          ctx.lineWidth = arcWidth
          ctx.stroke()
          continue
        }

        // Pulsing brightness for active segments
        const pulse = shouldAnimate
          ? 0.6 + 0.4 * Math.sin(time * 0.002 + seg.phase)
          : 0.85
        const lightness = 45 + pulse * 25

        // Active segment with glow
        ctx.beginPath()
        ctx.arc(cx, cy, radius, startAngle, endAngle)
        ctx.strokeStyle = `hsla(${baseHue}, 90%, ${lightness}%, ${0.5 + pulse * 0.5})`
        ctx.lineWidth = arcWidth
        ctx.shadowColor = `hsla(${baseHue}, 90%, ${lightness}%, 0.6)`
        ctx.shadowBlur = arcWidth * 1.5
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // Radial spokes connecting rings
      const spokeCount = 8
      const rng = createRng(hash + 99)
      for (let i = 0; i < spokeCount; i++) {
        if (rng() < 0.4) continue
        const angle = (i / spokeCount) * Math.PI * 2
        const innerR = RINGS[RINGS.length - 1].r * half * 0.6
        const outerR = RINGS[0].r * half * 1.05
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR)
        ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR)
        ctx.strokeStyle = `hsla(${baseHue}, 60%, 45%, 0.12)`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Central core glow
      const coreRadius = half * 0.14
      const corePulse = shouldAnimate
        ? 0.7 + 0.3 * Math.sin(time * 0.003)
        : 0.85
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius * 2.5)
      coreGrad.addColorStop(0, `hsla(${baseHue}, 90%, 70%, ${corePulse * 0.5})`)
      coreGrad.addColorStop(1, "transparent")
      ctx.fillStyle = coreGrad
      ctx.beginPath()
      ctx.arc(cx, cy, coreRadius * 2.5, 0, Math.PI * 2)
      ctx.fill()

      // Core dot
      ctx.beginPath()
      ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${baseHue}, 85%, 65%, ${corePulse})`
      ctx.shadowColor = `hsla(${baseHue}, 90%, 60%, 0.8)`
      ctx.shadowBlur = coreRadius * 3
      ctx.fill()
      ctx.shadowBlur = 0

      ctx.restore()

      if (shouldAnimate) {
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    const handleMotionChange = () => {
      cancelAnimationFrame(rafRef.current)
      shouldAnimate = animated && !motionQuery.matches
      if (shouldAnimate) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        draw(0)
      }
    }

    motionQuery.addEventListener("change", handleMotionChange)

    if (shouldAnimate) {
      rafRef.current = requestAnimationFrame(draw)
    } else {
      draw(0)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      motionQuery.removeEventListener("change", handleMotionChange)
    }
  }, [seed, size, animated, hue, hash, baseHue])

  const ringSize = size + 8

  return (
    <div
      data-slot="tron-agent-avatar"
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: ring ? ringSize : size, height: ring ? ringSize : size }}
      {...props}
    >
      {ring && (
        <svg
          className="absolute inset-0"
          width={ringSize}
          height={ringSize}
          viewBox={`0 0 ${ringSize} ${ringSize}`}
          style={{ animation: animated ? "agentRingSpin 20s linear infinite" : undefined }}
        >
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={ringSize / 2 - 2}
            fill="none"
            stroke={glowColor}
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity="0.35"
          />
        </svg>
      )}

      {ring && (
        <div
          className="absolute rounded-full"
          style={{
            width: size + 2,
            height: size + 2,
            boxShadow: `0 0 10px ${glowColor}30, 0 0 20px ${glowColor}10`,
            animation: animated ? "agentGlowPulse 3s ease-in-out infinite" : undefined,
          }}
        />
      )}

      <canvas
        aria-label={`Avatar for ${seed}`}
        className="rounded-full"
        ref={canvasRef}
        role="img"
        style={{ width: size, height: size }}
      />

      <style jsx>{`
        @keyframes agentRingSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes agentGlowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
