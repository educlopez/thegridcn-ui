import { NextRequest, NextResponse } from "next/server"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/lib/redis"
import {
  LEADERBOARD_KEY,
  scoreSubmissionSchema,
  type LeaderboardEntry,
} from "@/lib/leaderboard"

export async function GET(request: NextRequest) {
  if (!redis) {
    return NextResponse.json({ entries: [] })
  }

  const difficulty = request.nextUrl.searchParams.get("difficulty") ?? "medium"

  // Fetch up to 100 entries ascending (fastest time first), then filter by difficulty
  const raw = await redis.zrange(LEADERBOARD_KEY, 0, 99, { withScores: true })

  const entries: LeaderboardEntry[] = []
  for (let i = 0; i < raw.length; i += 2) {
    const data = raw[i] as unknown as { alias: string; difficulty: string; date: string; character?: string }
    const score = raw[i + 1] as unknown as number
    if (data && typeof data === "object" && "alias" in data) {
      if (data.difficulty !== difficulty) continue
      entries.push({
        alias: data.alias,
        time: score,
        difficulty: data.difficulty,
        date: data.date,
        ...(data.character && { character: data.character }),
      })
      if (entries.length >= 10) break
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

  const { alias, time, difficulty, character } = parsed.data
  const member = JSON.stringify({
    alias,
    difficulty,
    date: new Date().toISOString(),
    ...(character && { character }),
  })

  await redis.zadd(LEADERBOARD_KEY, { score: time, member })

  // Trim to 100 fastest — remove slowest entries (highest scores)
  const count = await redis.zcard(LEADERBOARD_KEY)
  if (count > 100) {
    await redis.zremrangebyrank(LEADERBOARD_KEY, 100, -1)
  }

  // Get rank ascending (lowest time = rank 1 = fastest win)
  const rank = await redis.zrank(LEADERBOARD_KEY, member)

  return NextResponse.json({
    success: true,
    rank: rank !== null ? rank + 1 : null,
  })
}
