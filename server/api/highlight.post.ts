import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import { bundledThemes } from "shiki/themes";
import { bundledLanguages } from "shiki/langs";
import { z } from "zod";
import { isSafeHighlightedHtml } from "~/utils/security";

let highlighterPromise: Promise<HighlighterCore> | null = null;

const SUPPORTED_LANGS = [
  "vue",
  "typescript",
  "css",
  "json",
  "bash",
  "html",
  "javascript",
  "yaml",
  "ts",
  "js",
] as const;

const LANG_ALIAS: Record<string, string> = {
  ts: "typescript",
  js: "javascript",
};

const MAX_CODE_CHARS = 200_000;

const highlightRequestSchema = z.object({
  code: z.string().min(1).max(MAX_CODE_CHARS),
  lang: z.string().max(32).optional(),
});

// JS RegExp engine avoids WASM dependency that fails in Vercel serverless
function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [
        bundledThemes["github-light"],
        bundledThemes["github-dark"],
      ],
      langs: [
        bundledLanguages["vue"],
        bundledLanguages["typescript"],
        bundledLanguages["css"],
        bundledLanguages["json"],
        bundledLanguages["bash"],
        bundledLanguages["html"],
        bundledLanguages["javascript"],
        bundledLanguages["yaml"],
      ],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise!;
}

export default defineEventHandler(async (event) => {
  let body: { code: string; lang?: string } | null = null;

  try {
    body = await readBody<{ code: string; lang?: string }>(event);
  } catch (err) {
    console.error("[Highlight] Failed to parse request body:", err);
    throw createError({
      statusCode: 400,
      statusMessage: "Failed to parse request body.",
    });
  }

  const parsed = highlightRequestSchema.safeParse(body);
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  const { code, lang: requestedLang } = parsed.data;

  const rawLang = requestedLang || "vue";
  const lang = LANG_ALIAS[rawLang] || rawLang;

  if (!SUPPORTED_LANGS.includes(rawLang as (typeof SUPPORTED_LANGS)[number])) {
    throw createError({
      statusCode: 400,
      statusMessage: `Unsupported language: ${rawLang}`,
    });
  }

  try {
    const highlighter = await getHighlighter();

    const html = highlighter.codeToHtml(code, {
      lang,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    });

    if (!isSafeHighlightedHtml(html)) {
      throw createError({
        statusCode: 500,
        statusMessage: "Generated highlighted output failed safety checks.",
      });
    }

    return { html };
  } catch (err) {
    console.error("[Highlight] Syntax highlighting failed:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Syntax highlighting failed. Please try again.",
    });
  }
});
