"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarGroupUser {
  name: string
  avatar?: string | React.ReactNode
  status?: "online" | "offline" | "away"
}

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  users: AvatarGroupUser[]
  max?: number
  size?: "sm" | "md" | "lg"
}

const sizeConfig: Record<string, { dim: number; text: string; ring: string; badge: string }> = {
  sm: { dim: 28, text: "text-[9px]", ring: "ring-1", badge: "h-2 w-2" },
  md: { dim: 36, text: "text-[10px]", ring: "ring-2", badge: "h-2.5 w-2.5" },
  lg: { dim: 44, text: "text-xs", ring: "ring-2", badge: "h-3 w-3" },
}

const statusColors: Record<string, string> = {
  online: "bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]",
  offline: "bg-foreground/30",
  away: "bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.6)]",
}

export function AvatarGroup({
  users,
  max = 5,
  size = "md",
  className,
  ...props
}: AvatarGroupProps) {
  const visible = users.slice(0, max)
  const remaining = users.length - max
  const config = sizeConfig[size]

  function getInitials(name: string) {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
  }

  // Stagger reveal
  const [revealedIdx, setRevealedIdx] = React.useState(-1)
  React.useEffect(() => {
    let idx = 0
    const total = visible.length + (remaining > 0 ? 1 : 0)
    const interval = setInterval(() => {
      setRevealedIdx(idx)
      idx++
      if (idx >= total) clearInterval(interval)
    }, 80)
    return () => clearInterval(interval)
  }, [visible.length, remaining])

  return (
    <div
      data-slot="tron-avatar-group"
      className={cn("flex items-center", className)}
      {...props}
    >
      {visible.map((user, i) => (
        <div
          key={i}
          className={cn(
            "relative shrink-0 rounded-full ring-background transition-all duration-300",
            config.ring,
            i > 0 && "-ml-2",
            i <= revealedIdx ? "scale-100 opacity-100" : "scale-75 opacity-0"
          )}
          style={{ width: config.dim, height: config.dim }}
          title={user.name}
        >
          {user.avatar ? (
            typeof user.avatar === "string" ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full rounded-full border border-primary/30 object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-primary/30">
                {user.avatar}
              </div>
            )
          ) : (
            <div className={cn(
              "flex h-full w-full items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono font-medium text-primary/80",
              config.text
            )}>
              {getInitials(user.name)}
            </div>
          )}

          {/* Status indicator */}
          {user.status && (
            <div className={cn(
              "absolute bottom-0 right-0 rounded-full ring-1 ring-background",
              config.badge,
              statusColors[user.status]
            )} />
          )}
        </div>
      ))}

      {/* Overflow count */}
      {remaining > 0 && (
        <div
          className={cn(
            "relative -ml-2 flex shrink-0 items-center justify-center rounded-full border border-primary/30 bg-card font-mono text-foreground/60 ring-background transition-all duration-300",
            config.ring, config.text,
            visible.length <= revealedIdx ? "scale-100 opacity-100" : "scale-75 opacity-0"
          )}
          style={{ width: config.dim, height: config.dim }}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}
