import { promises as fs } from "node:fs";
import path from "node:path";
import { type NextRequest, NextResponse } from "next/server";

const VALID_TEMPLATES = [
  "dashboard",
  "landing",
  "blog",
  "login",
  "analytics",
] as const;

type TemplateSlug = (typeof VALID_TEMPLATES)[number];

function isValidTemplate(slug: string): slug is TemplateSlug {
  return (VALID_TEMPLATES as readonly string[]).includes(slug);
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!isValidTemplate(slug)) {
    return NextResponse.json(
      {
        error: `Invalid template. Valid options: ${VALID_TEMPLATES.join(", ")}`,
      },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "src/components/thegridcn/templates",
      `${slug}-template.tsx`
    );
    const content = await fs.readFile(filePath, "utf-8");

    return NextResponse.json({
      content,
      fileName: `${slug}-template.tsx`,
      slug,
    });
  } catch {
    return NextResponse.json(
      { error: "Template source not found" },
      { status: 404 }
    );
  }
}
