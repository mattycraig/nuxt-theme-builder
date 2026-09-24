#!/usr/bin/env node
// SessionStart: install dependencies in Claude Code on the web so lint,
// typecheck, and tests work immediately. Local sessions are left alone.
//
// Stdout from a SessionStart hook is added to Claude's context, so install
// logs go to stderr and only a one-line status goes to stdout.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { projectDir } from "./lib.mjs";

if (process.env.CLAUDE_CODE_REMOTE !== "true") process.exit(0);

const shell = process.platform === "win32";

function run(cmd, args) {
  return spawnSync(cmd, args, {
    cwd: projectDir,
    stdio: ["ignore", process.stderr, process.stderr],
    shell,
  }).status;
}

if (run("pnpm", ["--version"]) !== 0) {
  run("corepack", ["enable", "pnpm"]);
}

// Frozen install keeps pnpm-lock.yaml untouched; postinstall runs `nuxt prepare`,
// which generates .nuxt/ (required by eslint.config.mjs and typecheck).
const status = run("pnpm", [
  "install",
  "--frozen-lockfile",
  "--prefer-offline",
]);

if (status === 0 && existsSync(join(projectDir, ".nuxt"))) {
  console.log(
    "Dependencies installed and .nuxt/ generated — pnpm lint, typecheck, and test are ready.",
  );
} else {
  console.log(
    "WARNING: `pnpm install --frozen-lockfile` failed (lockfile out of sync with package.json, or a network error). " +
      "Run `pnpm install` before lint/typecheck/test.",
  );
}
