import { discoveryJson, discoveryOptions } from "@/lib/agent/discovery";
import { getAgentSkillsIndex } from "@/lib/agent/skills";

export const dynamic = "force-static";

export function GET() {
  return discoveryJson(getAgentSkillsIndex());
}

export function OPTIONS() {
  return discoveryOptions();
}
