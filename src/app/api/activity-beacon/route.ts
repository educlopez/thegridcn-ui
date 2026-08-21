import { createHmac, randomUUID } from "node:crypto";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const BOT_USER_AGENT_PATTERN =
  /bot|crawler|spider|preview|lighthouse|pagespeed|slurp|facebookexternalhit|embedly|discord|slack|telegram|whatsapp|reddit/i;
const SITE_RELATIVE_PATH_PATTERN = /^\/(?!\/)[^\\]*$/;
const COUNTRY_CODE_PATTERN = /^[A-Z]{2}$/;
const MAX_FIELD_LENGTH = 500;
const ACTIVITY_ENDPOINT = "https://educalvolopez.com/api/activity";
const FORWARD_TIMEOUT_MS = 3000;

interface ActivityBeaconBody {
  path: string;
  title?: string;
}

function isActivityBeaconBody(value: unknown): value is ActivityBeaconBody {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const { path, title } = value as Record<string, unknown>;

  if (
    typeof path !== "string" ||
    path.length > MAX_FIELD_LENGTH ||
    !SITE_RELATIVE_PATH_PATTERN.test(path)
  ) {
    return false;
  }

  if (
    title !== undefined &&
    (typeof title !== "string" || title.length > MAX_FIELD_LENGTH)
  ) {
    return false;
  }

  return true;
}

function readGeo(request: NextRequest) {
  const cityHeader = request.headers.get("x-vercel-ip-city");
  const city = cityHeader ? decodeURIComponent(cityHeader) : undefined;

  const countryHeader = request.headers.get("x-vercel-ip-country");
  const country =
    countryHeader && COUNTRY_CODE_PATTERN.test(countryHeader)
      ? countryHeader
      : undefined;

  const region = request.headers.get("x-vercel-ip-country-region") ?? undefined;

  return { city, country, region };
}

function forwardActivity(body: string, secret: string): void {
  const signature = createHmac("sha256", secret).update(body).digest("hex");

  fetch(ACTIVITY_ENDPOINT, {
    body,
    headers: {
      "Content-Type": "application/json",
      "x-activity-signature": signature,
    },
    method: "POST",
    signal: AbortSignal.timeout(FORWARD_TIMEOUT_MS),
  }).catch(() => {
    // The forward is best-effort; the beacon response must never depend on it.
  });
}

export async function POST(request: NextRequest) {
  const secret = process.env.ACTIVITY_INGEST_HMAC_SECRET;

  if (!secret) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  if (BOT_USER_AGENT_PATTERN.test(userAgent)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isActivityBeaconBody(payload)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { path, title } = payload;
  const { city, country, region } = readGeo(request);

  const body = JSON.stringify({
    idempotency_key: `thegridcn:visit:${randomUUID()}`,
    meta: {
      ...(city ? { city } : {}),
      ...(country ? { country } : {}),
      path,
      ...(region ? { region } : {}),
      ...(title ? { title } : {}),
    },
    source: "thegridcn",
    speed: "signal",
    type: "visit",
  });

  forwardActivity(body, secret);

  return NextResponse.json({ ok: true });
}
