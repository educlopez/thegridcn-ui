import { z } from "zod"

export const LEADERBOARD_KEY = "lightcycle:leaderboard"

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
})

export type ScoreSubmission = z.infer<typeof scoreSubmissionSchema>

export interface LeaderboardEntry {
  alias: string
  time: number
  difficulty: string
  date: string
  character?: string
}
