"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface IdentityDiscProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  designation?: string
  id?: string
  accessLevel?: "user" | "admin" | "system"
  status?: "active" | "inactive" | "derezzed"
  avatar?: string
}

const statusGlow: Record<string, string> = {
  active: "drop-shadow(0 0 8px var(--primary))",
  inactive: "drop-shadow(0 0 4px rgba(107,114,128,0.5))",
  derezzed: "drop-shadow(0 0 8px rgba(239,68,68,0.6))",
}

const statusRing: Record<string, string> = {
  active: "stroke-primary",
  inactive: "stroke-gray-500",
  derezzed: "stroke-red-500",
}

const accessBadge: Record<string, { label: string; color: string }> = {
  user: { label: "USER", color: "text-primary border-primary/50" },
  admin: { label: "ADMIN", color: "text-amber-500 border-amber-500/50" },
  system: { label: "SYSTEM", color: "text-red-500 border-red-500/50" },
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function IdentityDisc({
  name,
  designation,
  id,
  accessLevel = "user",
  status = "active",
  avatar,
  className,
  ...props
}: IdentityDiscProps) {
  const dim = 180
  const center = dim / 2
  const glowId = React.useId()

  return (
    <div
      data-slot="tron-identity-disc"
      data-status={status}
      className={cn("inline-flex flex-col items-center gap-3", className)}
      {...props}
    >
      <style jsx>{`
        @keyframes discPulse {
          0%, 100% { filter: ${statusGlow[status]}; }
          50% { filter: ${statusGlow[status].replace(/\d+px/g, (m) => parseInt(m) * 2 + "px")}; }
        }
        @keyframes discGlitch {
          0%, 95%, 100% { opacity: 1; }
          96% { opacity: 0.3; }
          97% { opacity: 0.8; transform: translateX(1px); }
          98% { opacity: 0.4; transform: translateX(-1px); }
          99% { opacity: 0.9; }
        }
      `}</style>

      <div className="relative" style={{ width: dim, height: dim }}>
        <svg
          width={dim}
          height={dim}
          className="absolute inset-0"
          style={{
            animation: status === "active"
              ? "discPulse 3s ease-in-out infinite"
              : status === "derezzed"
                ? "discGlitch 2s steps(1) infinite"
                : undefined,
            filter: statusGlow[status],
          }}
        >
          <defs>
            <filter id={glowId}>
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer rotating ring (dashed) */}
          <circle
            cx={center}
            cy={center}
            r={center - 4}
            fill="none"
            strokeWidth={2}
            strokeDasharray="8 4"
            className={cn(statusRing[status], "animate-[spin_20s_linear_infinite]")}
            style={{ transformOrigin: "center" }}
          />

          {/* Counter-rotating middle ring (dotted) */}
          <circle
            cx={center}
            cy={center}
            r={center - 10}
            fill="none"
            strokeWidth={1}
            strokeDasharray="2 6"
            className={cn(statusRing[status], "animate-[spin_15s_linear_infinite_reverse]")}
            style={{ transformOrigin: "center" }}
            opacity={0.3}
          />

          {/* Static middle ring */}
          <circle
            cx={center}
            cy={center}
            r={center - 14}
            fill="none"
            strokeWidth={1}
            className={statusRing[status]}
            opacity={0.4}
          />

          {/* Tick marks */}
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i * 360) / 24
            const rad = (angle * Math.PI) / 180
            const innerR = center - 14
            const outerR = center - 8
            return (
              <line
                key={i}
                x1={center + innerR * Math.cos(rad)}
                y1={center + innerR * Math.sin(rad)}
                x2={center + outerR * Math.cos(rad)}
                y2={center + outerR * Math.sin(rad)}
                strokeWidth={1}
                className={statusRing[status]}
                opacity={i % 6 === 0 ? 0.8 : 0.3}
              />
            )
          })}

          {/* Inner ring with glow */}
          <circle
            cx={center}
            cy={center}
            r={center - 30}
            fill="none"
            strokeWidth={1.5}
            className={statusRing[status]}
            opacity={0.6}
            filter={`url(#${CSS.escape(glowId)})`}
          />

          {/* Arc accent (quarter arc, rotating) */}
          <circle
            cx={center}
            cy={center}
            r={center - 22}
            fill="none"
            strokeWidth={2}
            strokeDasharray={`${Math.PI * (center - 22) * 0.25} ${Math.PI * (center - 22) * 1.75}`}
            className={cn(statusRing[status], "animate-[spin_8s_linear_infinite]")}
            style={{ transformOrigin: "center" }}
            opacity={0.5}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center overflow-hidden rounded-full border border-primary/30 bg-card/90"
            style={{ width: dim - 64, height: dim - 64 }}
          >
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-display text-2xl font-bold tracking-wider text-primary">
                {getInitials(name)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Info below disc */}
      <div className="flex flex-col items-center gap-1">
        <span className="font-display text-sm font-bold uppercase tracking-wider">
          {name}
        </span>
        {designation && (
          <span className="text-[10px] uppercase tracking-widest text-foreground/60">
            {designation}
          </span>
        )}
        {id && (
          <span className="font-mono text-[10px] tracking-widest text-foreground/40">
            ID: {id}
          </span>
        )}
        <span
          className={cn(
            "mt-1 rounded border px-2 py-0.5 text-[9px] uppercase tracking-widest",
            accessBadge[accessLevel].color,
            status === "derezzed" && "animate-pulse"
          )}
        >
          {accessBadge[accessLevel].label}
        </span>
      </div>
    </div>
  )
}
