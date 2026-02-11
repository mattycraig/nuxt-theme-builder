import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

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

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: [
        "vue",
        "typescript",
        "css",
        "json",
        "bash",
        "html",
        "javascript",
        "yaml",
      ],
    });
  }
  return highlighterPromise;
}

export default defineEventHandler(async (event) => {
  let body: { code: string; lang?: string } | null = null;

  try {
    body = await readBody<{ code: string; lang?: string }>(event);
  } catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: `Failed to parse request body: ${err instanceof Error ? err.message : String(err)}`,
    });
  }

  if (!body?.code) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing code in request body",
    });
  }

  const rawLang = body.lang || "vue";
  const lang = LANG_ALIAS[rawLang] || rawLang;

  if (!SUPPORTED_LANGS.includes(rawLang as (typeof SUPPORTED_LANGS)[number])) {
    throw createError({
      statusCode: 400,
      statusMessage: `Unsupported language: ${rawLang}`,
    });
  }

  try {
    const highlighter = await getHighlighter();

    const html = highlighter.codeToHtml(body.code, {
      lang,
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    });

    return { html };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `Highlight failed: ${err instanceof Error ? err.message : String(err)}`,
    });
  }
});
