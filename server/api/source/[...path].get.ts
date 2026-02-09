import { defineEventHandler, getRouterParam, createError } from "h3";
import sourceCodeMap from "#source-code-map";

const sources = sourceCodeMap as Record<string, string>;

export default defineEventHandler(async (event) => {
  const rawPath = getRouterParam(event, "path") ?? "";

  if (!rawPath || rawPath.includes("..") || rawPath.includes("\0")) {
    throw createError({ statusCode: 400, statusMessage: "Invalid path" });
  }

  const safePath = rawPath.replace(/[\\]/g, "/").replace(/\.vue$/, "");
  const candidates = [`${safePath}.vue`, `${safePath}/index.vue`];

  let content: string | undefined;
  for (const candidate of candidates) {
    if (sources[candidate]) {
      content = sources[candidate];
      break;
    }
  }

  if (!content) {
    throw createError({
      statusCode: 404,
      statusMessage: "Source file not found",
    });
  }

  event.node.res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return content;
});
