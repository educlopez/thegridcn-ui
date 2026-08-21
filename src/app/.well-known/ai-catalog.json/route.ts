import { getAiCatalog } from "@/lib/agent/ai-catalog";
import { discoveryJson, discoveryOptions } from "@/lib/agent/discovery";

export const dynamic = "force-static";

export function GET() {
  return discoveryJson(getAiCatalog());
}

export function OPTIONS() {
  return discoveryOptions();
}
