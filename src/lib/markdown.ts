import fs from "node:fs"
import path from "node:path"
import { Marked } from "marked"
import { codeToHtml } from "shiki"
import { tronTheme } from "./shiki-tron-theme"

type RenderOptions = {
  highlightCode?: boolean
}

export async function renderMarkdownFile(
  relativePath: string,
  options: RenderOptions = {},
): Promise<string> {
  const absolute = path.join(process.cwd(), relativePath)
  const raw = fs.readFileSync(absolute, "utf-8")
  return renderMarkdown(raw, options)
}

export async function renderMarkdown(
  source: string,
  options: RenderOptions = {},
): Promise<string> {
  const { highlightCode = true } = options

  const marked = new Marked({
    async: true,
    gfm: true,
    breaks: false,
  })

  marked.use({
    async: true,
    async walkTokens(token) {
      if (!highlightCode) return
      if (token.type !== "code") return
      const lang = (token as { lang?: string }).lang || "text"
      const safeLang = isKnownLang(lang) ? lang : "text"
      try {
        const html = await codeToHtml(token.text, {
          lang: safeLang,
          theme: tronTheme,
        })
        ;(token as { type: string }).type = "html"
        ;(token as unknown as { text: string }).text = wrapShiki(html)
      } catch {
        // leave as-is; marked will render generic code block
      }
    },
  })

  return marked.parse(source) as Promise<string>
}

function wrapShiki(html: string): string {
  return `<div class="gridcn-shiki">${html}</div>`
}

const KNOWN_LANGS = new Set([
  "bash",
  "sh",
  "shell",
  "zsh",
  "tsx",
  "ts",
  "typescript",
  "jsx",
  "js",
  "javascript",
  "json",
  "css",
  "html",
  "yaml",
  "yml",
  "md",
  "markdown",
  "diff",
  "text",
  "plaintext",
])

function isKnownLang(lang: string) {
  return KNOWN_LANGS.has(lang.toLowerCase())
}
