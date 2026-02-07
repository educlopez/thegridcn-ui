import { NextRequest, NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/lib/redis"
import {
  LEADERBOARD_KEY,
  scoreSubmissionSchema,
  type LeaderboardEntry,
} from "@/lib/leaderboard"

export async function GET() {
  if (!redis) {
    return NextResponse.json({ entries: [] })
  }

  const raw = await redis.zrange(LEADERBOARD_KEY, 0, 9, { rev: true, withScores: true })

  // @upstash/redis returns [member, score, member, score, ...] with auto-deserialized members
  const entries: LeaderboardEntry[] = []
  for (let i = 0; i < raw.length; i += 2) {
    const data = raw[i] as unknown as { alias: string; difficulty: string; date: string }
    const score = raw[i + 1] as unknown as number
    if (data && typeof data === "object" && "alias" in data) {
      entries.push({
        alias: data.alias,
        time: score,
        difficulty: data.difficulty,
        date: data.date,
      })
    }
  }

  return NextResponse.json({ entries })
}

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "60 s"),
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

  if (ratelimit) {
    const { success } = await ratelimit.limit(ip)
    if (!success) {
      return NextResponse.json(
        { error: "Too many submissions. Try again later." },
        { status: 429 }
      )
    }
  }

  const body = await request.json()
  const parsed = scoreSubmissionSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { alias, time, difficulty } = parsed.data
  const member = JSON.stringify({
    alias,
    difficulty,
    date: new Date().toISOString(),
  })

  await redis.zadd(LEADERBOARD_KEY, { score: time, member })

  // Trim to top 100
  const count = await redis.zcard(LEADERBOARD_KEY)
  if (count > 100) {
    await redis.zremrangebyrank(LEADERBOARD_KEY, 0, count - 101)
  }

  // Get rank (0-indexed from top)
  const rank = await redis.zrevrank(LEADERBOARD_KEY, member)

  return NextResponse.json({
    success: true,
    rank: rank !== null ? rank + 1 : null,
  })
}
