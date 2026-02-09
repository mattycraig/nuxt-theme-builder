import { defineEventHandler, getRouterParam, createError } from "h3";
import { resolve, normalize } from "node:path";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const PAGES_DIR = resolve(process.cwd(), "app/pages");

export default defineEventHandler(async (event) => {
  const rawPath = getRouterParam(event, "path") ?? "";

  if (!rawPath || rawPath.includes("..") || rawPath.includes("\0")) {
    throw createError({ statusCode: 400, statusMessage: "Invalid path" });
  }

  const safePath = rawPath.replace(/[\\]/g, "/").replace(/\.vue$/, "");
  const candidates = [
    resolve(PAGES_DIR, `${safePath}.vue`),
    resolve(PAGES_DIR, safePath, "index.vue"),
  ];

  const resolvedFile = candidates.find((candidate) => {
    const normalized = normalize(candidate);
    return normalized.startsWith(PAGES_DIR) && existsSync(normalized);
  });

  if (!resolvedFile) {
    throw createError({
      statusCode: 404,
      statusMessage: "Source file not found",
    });
  }

  const content = await readFile(resolvedFile, "utf-8");

  event.node.res.setHeader("Content-Type", "text/plain; charset=utf-8");
  return content;
});
