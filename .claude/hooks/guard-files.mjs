#!/usr/bin/env node
// PreToolUse (Edit|Write|MultiEdit|NotebookEdit): block writes to files that
// must never be hand-edited — lockfile, secrets, and generated output.
import { deny, readInput, toProjectPath } from "./lib.mjs";

const input = await readInput();
const rel = toProjectPath(
  input.tool_input?.file_path ?? input.tool_input?.notebook_path,
);
if (!rel) process.exit(0);

const GENERATED_DIRS = [
  ".nuxt/",
  ".output/",
  ".nitro/",
  ".data/",
  "node_modules/",
  "coverage/",
  "playwright-report/",
  "tests/e2e/test-results/",
];

if (rel === "pnpm-lock.yaml") {
  deny(
    "pnpm-lock.yaml is generated. Edit package.json (or use `pnpm add` / `pnpm remove`) and run `pnpm install`.",
  );
}

if (/^\.env(\..+)?$/.test(rel) && rel !== ".env.example") {
  deny(
    `${rel} holds local secrets and must not be written by Claude. Document new variables in .env.example instead.`,
  );
}

const generatedDir = GENERATED_DIRS.find((dir) => rel.startsWith(dir));
if (generatedDir) {
  deny(
    `${generatedDir} is generated output. Change the source that produces it (nuxt.config.ts, app/, tests/) instead.`,
  );
}
