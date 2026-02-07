import { z } from "zod"
import crypto from "crypto"

export const LEADERBOARD_KEY = "lightcycle:leaderboard"
export const SESSION_PREFIX = "game:session:"
export const SESSION_TTL = 1800 // 30 minutes

const SESSION_SECRET =
  process.env.GAME_SESSION_SECRET || "lightcycle-dev-secret-change-in-prod"

// Minimum realistic times per difficulty (seconds)
export const MIN_TIMES: Record<string, number> = {
  easy: 5,
  medium: 5,
  hard: 3,
  insane: 3,
}

function hmacSign(data: string): string {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(data)
    .digest("hex")
}

export function createSessionToken(sessionId: string): string {
  const signature = hmacSign(sessionId)
  return `${sessionId}.${signature}`
}

export function verifySessionToken(token: string): string | null {
  const dotIndex = token.indexOf(".")
  if (dotIndex === -1) return null
  const sessionId = token.slice(0, dotIndex)
  const signature = token.slice(dotIndex + 1)
  if (!sessionId || !signature) return null
  const expected = hmacSign(sessionId)
  if (expected.length !== signature.length) return null
  if (
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  )
    return null
  return sessionId
}

const BLOCKED_ALIASES = new Set([
  "ASS", "FUK", "FUC", "FCK", "FAG", "FAT", "FKU",
  "CUM", "CUN", "COK", "COC", "CNT",
  "DIK", "DIE", "DIC",
  "GAY", "GFY",
  "JIZ", "JEW",
  "KKK", "KYS",
  "NIG", "NGA", "NGR",
  "PIS", "PUS",
  "RAP", "RIM",
  "SEX", "SHT", "SLT", "STD", "SUK", "SUC",
  "TIT", "TWT",
  "WTF", "WOP",
])

export const scoreSubmissionSchema = z.object({
  alias: z
    .string()
    .length(3, "Alias must be exactly 3 characters")
    .regex(/^[A-Z]{3}$/, "Alias must be 3 uppercase letters")
    .refine((val) => !BLOCKED_ALIASES.has(val), "That alias is not allowed"),
  time: z.number().min(1).max(9999),
  difficulty: z.string(),
  character: z.string().max(30).optional(),
  token: z.string().min(1, "Session token is required"),
})

export type ScoreSubmission = z.infer<typeof scoreSubmissionSchema>

export interface LeaderboardEntry {
  alias: string
  time: number
  difficulty: string
  date: string
  character?: string
}
