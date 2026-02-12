import { describe, it, expect } from "vitest";
import { sanitizeMarkdownInput } from "~/utils/markdown";

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
