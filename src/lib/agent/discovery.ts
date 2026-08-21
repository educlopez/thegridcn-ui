import { NextResponse } from "next/server";

export const DISCOVERY_CACHE_CONTROL =
  "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400";

export function corsHeaders(contentType?: string): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers": "Accept, Content-Type",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": DISCOVERY_CACHE_CONTROL,
  };

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  return headers;
}

export function discoveryResponse(
  body: string,
  contentType: string,
  status = 200
): NextResponse {
  return new NextResponse(body, {
    headers: corsHeaders(contentType),
    status,
  });
}

export function discoveryJson(
  data: unknown,
  contentType = "application/json; charset=utf-8"
): NextResponse {
  return discoveryResponse(`${JSON.stringify(data, null, 2)}\n`, contentType);
}

export function discoveryMarkdown(body: string): NextResponse {
  return discoveryResponse(body, "text/markdown; charset=utf-8");
}

export function discoveryOptions(): NextResponse {
  return new NextResponse(null, {
    headers: corsHeaders(),
    status: 204,
  });
}

export function discoveryNotFound(): NextResponse {
  return discoveryResponse(
    `${JSON.stringify({ error: "Not found" })}\n`,
    "application/json; charset=utf-8",
    404
  );
}
