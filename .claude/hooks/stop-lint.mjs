#!/usr/bin/env node
// Stop: before Claude finishes, lint every uncommitted .ts/.vue/.js file.
// If errors remain, block the stop once so Claude fixes them; the
// stop_hook_active flag prevents an endless loop.
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  ESLINT_BIN,
  ESLINT_EXTENSIONS,
  projectDir,
  readInput,
  respond,
  runLocalBin,
  truncate,
} from "./lib.mjs";

const input = await readInput();
if (input.stop_hook_active) process.exit(0);

function git(args) {
  const result = spawnSync("git", args, { cwd: projectDir, encoding: "utf8" });
  return result.status === 0 ? result.stdout.split("\n").filter(Boolean) : [];
}

const changed = [
  ...new Set([
    ...git(["diff", "--name-only", "--diff-filter=ACMR", "HEAD"]),
    ...git(["ls-files", "--others", "--exclude-standard"]),
  ]),
].filter((file) => ESLINT_EXTENSIONS.test(file) && existsSync(join(projectDir, file)));

if (changed.length === 0) process.exit(0);

const result = runLocalBin(ESLINT_BIN, ["--no-warn-ignored", ...changed]);
if (result?.status === 1) {
  respond({
    decision: "block",
    reason: `ESLint reports errors in files changed this session. Fix them (\`pnpm lint:fix\` handles auto-fixable ones) before finishing:\n${truncate(result.stdout)}`,
  });
}
