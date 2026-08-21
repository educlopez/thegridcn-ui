import { discoveryJson, discoveryOptions } from "@/lib/agent/discovery";
import { getOpenApiDocument } from "@/lib/agent/openapi";

export const dynamic = "force-static";

export function GET() {
  return discoveryJson(
    getOpenApiDocument(),
    "application/openapi+json; charset=utf-8"
  );
}

export function OPTIONS() {
  return discoveryOptions();
}
