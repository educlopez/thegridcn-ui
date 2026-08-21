import { type NextRequest, NextResponse } from "next/server";
import { prefersMarkdown } from "@/lib/agent/accept";
import { getHomepageLinkHeader } from "@/lib/agent/link-header";
import {
  getMarkdownForPath,
  isMarkdownDocumentPath,
} from "@/lib/agent/markdown";

export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  if (!isMarkdownDocumentPath(pathname)) {
    return NextResponse.next();
  }

  if (!prefersMarkdown(request.headers.get("accept"))) {
    return NextResponse.next();
  }

  const page = getMarkdownForPath(pathname);
  return new NextResponse(request.method === "HEAD" ? null : page.body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: getHomepageLinkHeader(),
      "x-markdown-tokens": String(page.tokens),
    },
  });
}

export const config = {
  matcher: ["/", "/((?!api/|r/|_next/|\\.well-known/).*)"],
};
