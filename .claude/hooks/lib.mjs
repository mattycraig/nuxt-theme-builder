// Shared helpers for Claude Code hooks. Hooks are Node scripts (not bash + jq)
// so they behave the same on macOS, Linux, and Windows.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { isAbsolute, join, relative, resolve } from "node:path";

export const projectDir = resolve(
  process.env.CLAUDE_PROJECT_DIR || process.cwd(),
);

/** Parse the hook payload Claude Code sends on stdin. */
export async function readInput() {
  let raw = "";
  for await (const chunk of process.stdin) raw += chunk;
  try {
    return JSON.parse(raw || "{}");
  } catch {
    return {};
  }
}

/** Project-relative POSIX path, or null when the file is outside the project. */
export function toProjectPath(filePath) {
  if (!filePath) return null;
  const abs = isAbsolute(filePath) ? filePath : join(projectDir, filePath);
  const rel = relative(projectDir, abs).replaceAll("\\", "/");
  if (!rel || rel.startsWith("../") || isAbsolute(rel)) return null;
  return rel;
}

/** Run a locally installed CLI through node, avoiding pnpm/npx startup cost and .cmd shims. */
export function runLocalBin(binPath, args) {
  const bin = join(projectDir, binPath);
  if (!existsSync(bin)) return null;
  return spawnSync(process.execPath, [bin, ...args], {
    cwd: projectDir,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
}

export const ESLINT_BIN = "node_modules/eslint/bin/eslint.js";
export const PRETTIER_BIN = "node_modules/prettier/bin/prettier.cjs";

export const ESLINT_EXTENSIONS = /\.(ts|vue|js|mjs|cjs)$/;
export const PRETTIER_EXTENSIONS = /\.(json|md|ya?ml|css)$/;

/** Print a JSON hook response and exit successfully. */
export function respond(payload) {
  process.stdout.write(JSON.stringify(payload));
  process.exit(0);
}

/** Deny a PreToolUse call with a reason Claude sees and can act on. */
export function deny(reason) {
  respond({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: reason,
    },
  });
}

/** Trim long tool output so hook feedback stays readable in context. */
export function truncate(text, max = 4000) {
  const trimmed = text.trim();
  return trimmed.length > max
    ? `${trimmed.slice(0, max)}\n… (truncated)`
    : trimmed;
}
