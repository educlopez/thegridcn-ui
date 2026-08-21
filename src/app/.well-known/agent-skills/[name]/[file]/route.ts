import {
  discoveryMarkdown,
  discoveryNotFound,
  discoveryOptions,
} from "@/lib/agent/discovery";
import { AGENT_SKILLS, getSkillByName } from "@/lib/agent/skills";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return AGENT_SKILLS.map((skill) => ({
    file: "SKILL.md",
    name: skill.name,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string; name: string }> }
) {
  const { file, name } = await params;

  if (file !== "SKILL.md") {
    return discoveryNotFound();
  }

  const skill = getSkillByName(name);
  if (!skill) {
    return discoveryNotFound();
  }

  return discoveryMarkdown(skill.body);
}

export function OPTIONS() {
  return discoveryOptions();
}
