#!/usr/bin/env node
// PreToolUse (Bash): block commands that bypass the repo's safety rails —
// skipping git hooks, pushing to or force-pushing the default branch, and
// using a package manager other than pnpm.
import { spawnSync } from "node:child_process";
import { deny, projectDir, readInput } from "./lib.mjs";

const input = await readInput();
// Match against the command with quoted strings blanked out, so text inside
// commit messages, grep patterns, or echo arguments can't trigger a rule.
const command = String(input.tool_input?.command ?? "").replace(
  /'[^']*'|"(?:[^"\\]|\\.)*"/g,
  '""',
);
if (!command) process.exit(0);

const PROTECTED_BRANCHES = /^(master|main)$/;

if (/\bgit\b[^;&|]*\s--no-verify\b/.test(command)) {
  deny(
    "Don't bypass git hooks. Husky runs lint-staged and commitlint; fix the reported problem instead of using --no-verify.",
  );
}

const push = command.match(/\bgit\s+push\b([^;&|]*)/);
if (push) {
  const args = push[1];
  if (/\s(--force|-f)(\s|$)/.test(args)) {
    deny(
      "Force-pushing rewrites shared history. Use `git push --force-with-lease` on your own feature branch only.",
    );
  }

  const namesProtected = args
    .split(/\s+/)
    .some((arg) => PROTECTED_BRANCHES.test(arg.replace(/^.*:/, "")));

  const current = spawnSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
    cwd: projectDir,
    encoding: "utf8",
  }).stdout?.trim();
  const hasRefspec = args
    .split(/\s+/)
    .filter((arg) => arg && !arg.startsWith("-")).length > 1;
  const pushesCurrentProtected =
    !hasRefspec && PROTECTED_BRANCHES.test(current ?? "");

  if (namesProtected || pushesCurrentProtected) {
    deny(
      "Don't push directly to master. Push a feature branch and open a pull request so CI runs first.",
    );
  }
}

if (
  /(^|[;&|(]\s*|\s)(npm\s+(install|i|ci|add|uninstall|remove)\b|yarn(\s|$)|bun\s+(install|add)\b)/.test(
    command,
  )
) {
  deny(
    "This repo uses pnpm (enforced by packageManager in package.json). Use `pnpm install`, `pnpm add`, or `pnpm remove`.",
  );
}
