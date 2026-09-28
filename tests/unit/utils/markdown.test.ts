import { describe, it, expect } from "vitest";
import { extractFaqEntries, sanitizeMarkdownInput } from "~/utils/markdown";

describe("sanitizeMarkdownInput", () => {
  it("escapes angle brackets to prevent inline HTML rendering", () => {
    const input = "Hello <script>alert(1)</script> <b>bold</b>";
    const output = sanitizeMarkdownInput(input);

    expect(output).toBe(
      "Hello &lt;script&gt;alert(1)&lt;/script&gt; &lt;b&gt;bold&lt;/b&gt;",
    );
  });

  it("preserves ampersands and pre-encoded entities to avoid double encoding", () => {
    const input = "Fish & Chips &amp; Salsa";
    const output = sanitizeMarkdownInput(input);

    expect(output).toBe("Fish & Chips &amp; Salsa");
  });

  it("keeps plain markdown content unchanged", () => {
    const input = "## Title\n\n- item 1\n- item 2\n\n`code`";
    const output = sanitizeMarkdownInput(input);

    expect(output).toBe(input);
  });

  it("is effectively idempotent", () => {
    const input = "<div>safe</div>";
    const once = sanitizeMarkdownInput(input);
    const twice = sanitizeMarkdownInput(once);

    expect(twice).toBe(once);
  });
});

describe("extractFaqEntries", () => {
  const markdown = [
    "## Intro",
    "",
    "### Not a question",
    "Ignored.",
    "",
    "## Frequently Asked Questions",
    "",
    "### Where is my theme stored?",
    "",
    "In a `theme` cookie. See [Help](/help){target=\"_blank\"} and **export** often.",
    "",
    "### Can I share a theme?",
    "",
    "Yes, as *JSON*.",
    "",
    "---",
    "",
    "## Next section",
    "",
    "### Also ignored",
    "Nope.",
  ].join("\n");

  it("returns the questions of the named section as plain text", () => {
    expect(extractFaqEntries(markdown, "Frequently Asked Questions")).toEqual([
      {
        question: "Where is my theme stored?",
        answer: "In a theme cookie. See Help and export often.",
      },
      { question: "Can I share a theme?", answer: "Yes, as JSON." },
    ]);
  });

  it("returns nothing when the section is missing", () => {
    expect(extractFaqEntries(markdown, "Troubleshooting")).toEqual([]);
  });

  it("covers every FAQ in the help page", async () => {
    const { default: helpMd } = await import("~/data/help.md?raw");
    const entries = extractFaqEntries(helpMd, "Frequently Asked Questions");
    expect(entries.length).toBeGreaterThanOrEqual(5);
    for (const entry of entries) {
      expect(entry.question).toMatch(/\?$/);
      expect(entry.answer).not.toMatch(/[`[\]]|\*\*/);
    }
  });
});
