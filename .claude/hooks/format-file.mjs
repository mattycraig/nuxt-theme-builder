#!/usr/bin/env node
// PostToolUse (Edit|Write|MultiEdit): auto-fix the file Claude just changed
// with the same tools lint-staged uses at commit time. Remaining ESLint
// errors are fed back to Claude as context without blocking the edit.
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  ESLINT_BIN,
  ESLINT_EXTENSIONS,
  PRETTIER_BIN,
  PRETTIER_EXTENSIONS,
  projectDir,
  readInput,
  respond,
  runLocalBin,
  toProjectPath,
  truncate,
} from "./lib.mjs";

const input = await readInput();
const rel = toProjectPath(
  input.tool_response?.filePath ?? input.tool_input?.file_path,
);
if (!rel || !existsSync(join(projectDir, rel))) process.exit(0);

if (ESLINT_EXTENSIONS.test(rel)) {
  const result = runLocalBin(ESLINT_BIN, ["--fix", "--no-warn-ignored", rel]);
  if (result && result.status === 1) {
    respond({
      hookSpecificOutput: {
        hookEventName: "PostToolUse",
        additionalContext: `ESLint auto-fixed ${rel} but problems remain:\n${truncate(result.stdout)}`,
      },
    });
  }
} else if (PRETTIER_EXTENSIONS.test(rel)) {
  runLocalBin(PRETTIER_BIN, ["--write", "--log-level", "warn", rel]);
}
