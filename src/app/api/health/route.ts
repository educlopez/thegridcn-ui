import {
  corsHeaders,
  discoveryJson,
  discoveryOptions,
} from "@/lib/agent/discovery";

export function GET() {
  return discoveryJson({ status: "ok" });
}

export function HEAD() {
  return new Response(null, {
    headers: corsHeaders("application/json; charset=utf-8"),
  });
}

export function OPTIONS() {
  return discoveryOptions();
}
