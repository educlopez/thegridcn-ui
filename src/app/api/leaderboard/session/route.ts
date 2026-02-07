import { NextRequest, NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/lib/redis"
import {
  SESSION_PREFIX,
  SESSION_TTL,
  createSessionToken,
} from "@/lib/leaderboard"

const VALID_DIFFICULTIES = new Set(["easy", "medium", "hard", "insane"])

const sessionRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      prefix: "ratelimit:session",
    })
  : null

export async function POST(request: NextRequest) {
  if (!redis) {
    return NextResponse.json(
      { error: "Leaderboard not configured" },
      { status: 503 }
    )
  }

  const ip = request.headers.get("x-forwarded-for") ?? "anonymous"

  if (sessionRatelimit) {
    const { success } = await sessionRatelimit.limit(ip)
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 }
      )
    }
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const { difficulty } = body as { difficulty?: string }

  if (!difficulty || !VALID_DIFFICULTIES.has(difficulty)) {
    return NextResponse.json(
      { error: "Invalid difficulty" },
      { status: 400 }
    )
  }

  const sessionId = crypto.randomUUID()
  const key = `${SESSION_PREFIX}${sessionId}`

  await redis.set(
    key,
    JSON.stringify({ difficulty, startTime: Date.now() }),
    { ex: SESSION_TTL }
  )

  const token = createSessionToken(sessionId)

  return NextResponse.json({ token })
}
