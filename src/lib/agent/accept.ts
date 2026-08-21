const Q_HEADER_SPLIT = /,(?![^;]*=)/;

function parseAccept(header: string): Map<string, number> {
  const types = new Map<string, number>();

  for (const part of header.split(Q_HEADER_SPLIT)) {
    const [rawType, ...params] = part.trim().split(";");
    const type = rawType?.trim().toLowerCase();
    if (!type) {
      continue;
    }

    let quality = 1;
    for (const param of params) {
      const [key, value] = param.trim().split("=");
      if (key !== "q" || !value) {
        continue;
      }
      const parsed = Number.parseFloat(value);
      if (!Number.isNaN(parsed)) {
        quality = parsed;
      }
    }

    types.set(type, quality);
  }

  return types;
}

function bestQuality(types: Map<string, number>, names: string[]): number {
  let best = -1;
  for (const name of names) {
    const quality = types.get(name);
    if (quality !== undefined && quality > best) {
      best = quality;
    }
  }
  return best;
}

/**
 * True when the client prefers a markdown representation over HTML/JSON.
 * Browsers never send text/markdown, so this stays off for normal page loads.
 */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) {
    return false;
  }

  const types = parseAccept(accept);
  const markdown = bestQuality(types, ["text/markdown", "text/x-markdown"]);
  if (markdown <= 0) {
    return false;
  }

  const html = bestQuality(types, ["text/html", "application/xhtml+xml"]);
  const json = bestQuality(types, ["application/json", "application/ld+json"]);
  const competing = Math.max(html, json);

  return competing < 0 ? true : markdown >= competing;
}

export function estimateMarkdownTokens(body: string): number {
  return Math.max(1, Math.ceil(body.length / 4));
}
