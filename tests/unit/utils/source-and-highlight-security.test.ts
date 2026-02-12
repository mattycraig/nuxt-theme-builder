import { describe, it, expect } from "vitest";
import { isAllowedSourcePath, isSafeHighlightedHtml } from "~/utils/security";

describe("source API allowlist", () => {
  it("allows blocks routes", () => {
    expect(isAllowedSourcePath("blocks/hero")).toBe(true);
  });

  it("allows templates routes", () => {
    expect(isAllowedSourcePath("templates/dashboard")).toBe(true);
  });

  it("rejects component routes", () => {
    expect(isAllowedSourcePath("components/button")).toBe(false);
  });

  it("rejects root-level page routes", () => {
    expect(isAllowedSourcePath("index")).toBe(false);
  });

  it("rejects empty path", () => {
    expect(isAllowedSourcePath("")).toBe(false);
  });

  it("rejects prefix-spoofed paths without trailing slash", () => {
    expect(isAllowedSourcePath("blocks")).toBe(false);
    expect(isAllowedSourcePath("templates")).toBe(false);
  });

  it("rejects paths that contain allowed prefix in a subdirectory", () => {
    expect(isAllowedSourcePath("other/blocks/hero")).toBe(false);
    expect(isAllowedSourcePath("../templates/dashboard")).toBe(false);
  });
});

describe("highlight HTML safety checks", () => {
  it("accepts expected highlighted markup", () => {
    const html = '<pre class="shiki"><code><span class="line">const x = 1;</span></code></pre>';
    expect(isSafeHighlightedHtml(html)).toBe(true);
  });

  it("rejects script tags", () => {
    expect(isSafeHighlightedHtml("<script>alert(1)</script>")).toBe(false);
  });

  it("rejects inline event handlers", () => {
    expect(isSafeHighlightedHtml('<div onclick="alert(1)">x</div>')).toBe(
      false,
    );
  });

  it("rejects javascript protocol", () => {
    expect(isSafeHighlightedHtml('<a href="javascript:alert(1)">x</a>')).toBe(
      false,
    );
  });

  it("rejects iframe, object, embed, link, and meta tags", () => {
    expect(isSafeHighlightedHtml("<iframe src=\"x\"></iframe>")).toBe(false);
    expect(isSafeHighlightedHtml("<object data=\"x\"></object>")).toBe(false);
    expect(isSafeHighlightedHtml("<embed src=\"x\">")).toBe(false);
    expect(isSafeHighlightedHtml("<link rel=\"stylesheet\" href=\"x\">")).toBe(false);
    expect(isSafeHighlightedHtml("<meta http-equiv=\"refresh\">")).toBe(false);
  });

  it("accepts empty string", () => {
    expect(isSafeHighlightedHtml("")).toBe(true);
  });
});
