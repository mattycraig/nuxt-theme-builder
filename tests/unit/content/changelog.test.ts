import { describe, it, expect } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PUBLIC_PRERENDER_ROUTES } from "~~/shared/constants/routes";

// Entries for /whats-new (content/changelog). The page sorts them by file
// name, so the name must start with the entry's date.
const root = resolve(__dirname, "../../..");
const changelogDir = resolve(root, "content/changelog");
const files = readdirSync(changelogDir).filter((f) => f.endsWith(".md"));
const knownRoutes = new Set<string>(PUBLIC_PRERENDER_ROUTES);

function frontmatter(file: string): string {
  const source = readFileSync(resolve(changelogDir, file), "utf8");
  return source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
}

describe("changelog entries", () => {
  it("has entries", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s is named after its date", (file) => {
    expect(file).toMatch(/^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md$/);
    const date = frontmatter(file).match(/^date:\s*"(\d{4}-\d{2}-\d{2})"/m)?.[1];
    expect(date).toBe(file.slice(0, 10));
  });

  it.each(files)("%s points at an image that exists", (file) => {
    const src = frontmatter(file).match(/^\s+src:\s*(\S+)/m)?.[1];
    if (src) {
      expect(src).toMatch(/^\/changelog\//);
      expect(existsSync(resolve(root, "public", src.slice(1)))).toBe(true);
    }
  });

  it.each(files)("%s links to pages that exist", (file) => {
    const links = [...frontmatter(file).matchAll(/^\s+to:\s*(\S+)/gm)].map(
      (m) => m[1]!,
    );
    for (const to of links) {
      expect(knownRoutes.has(to), to).toBe(true);
    }
  });
});
