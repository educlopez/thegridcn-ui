import {
  discoveryJson,
  discoveryMarkdown,
  discoveryNotFound,
  discoveryOptions,
} from "@/lib/agent/discovery";
import { getAgentSkillsIndex, getSkillByName } from "@/lib/agent/skills";

export const dynamic = "force-static";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const segments = (await params).path ?? [];

  if (segments.length === 1 && segments[0] === "index.json") {
    return discoveryJson(getAgentSkillsIndex());
  }

  if (segments.length === 2 && segments[1] === "SKILL.md") {
    const skill = getSkillByName(segments[0] ?? "");
    if (!skill) {
      return discoveryNotFound();
    }
    return discoveryMarkdown(skill.body);
  }

  return discoveryNotFound();
}

export function OPTIONS() {
  return discoveryOptions();
}
