import { describe, it, expect } from "vitest";
import { isAllowedSourcePath, isSafeHighlightedHtml } from "~/utils/security";

describe("security utilities", () => {
  describe("isAllowedSourcePath", () => {
    describe("allowed paths", () => {
      it("should reject blocks/* paths", () => {
        expect(isAllowedSourcePath("blocks/hero")).toBe(false);
        expect(isAllowedSourcePath("blocks/cta")).toBe(false);
        expect(isAllowedSourcePath("blocks/features")).toBe(false);
        expect(isAllowedSourcePath("blocks/nested/component")).toBe(false);
      });

      it("should allow templates/* paths", () => {
        expect(isAllowedSourcePath("templates/dashboard")).toBe(true);
        expect(isAllowedSourcePath("templates/login")).toBe(true);
        expect(isAllowedSourcePath("templates/pricing")).toBe(true);
        expect(isAllowedSourcePath("templates/nested/page")).toBe(true);
      });

      it("should reject templates index path", () => {
        expect(isAllowedSourcePath("templates/")).toBe(false);
      });
    });

    describe("disallowed paths", () => {
      it("should reject components/* paths", () => {
        expect(isAllowedSourcePath("components/Button")).toBe(false);
        expect(isAllowedSourcePath("components/Card")).toBe(false);
      });

      it("should reject pages/* paths", () => {
        expect(isAllowedSourcePath("pages/index")).toBe(false);
        expect(isAllowedSourcePath("pages/about")).toBe(false);
      });

      it("should reject composables/* paths", () => {
        expect(isAllowedSourcePath("composables/useTheme")).toBe(false);
      });

      it("should reject stores/* paths", () => {
        expect(isAllowedSourcePath("stores/theme")).toBe(false);
      });

      it("should reject utils/* paths", () => {
        expect(isAllowedSourcePath("utils/helpers")).toBe(false);
      });

      it("should reject server/* paths", () => {
        expect(isAllowedSourcePath("server/api/example")).toBe(false);
      });

      it("should reject root-level files", () => {
        expect(isAllowedSourcePath("app.vue")).toBe(false);
        expect(isAllowedSourcePath("nuxt.config.ts")).toBe(false);
      });
    });

    describe("edge cases", () => {
      it("should handle empty string", () => {
        expect(isAllowedSourcePath("")).toBe(false);
      });

      it("should be case-sensitive", () => {
        expect(isAllowedSourcePath("Blocks/hero")).toBe(false);
        expect(isAllowedSourcePath("TEMPLATES/login")).toBe(false);
      });

      it("should handle paths without slashes", () => {
        expect(isAllowedSourcePath("blocks")).toBe(false);
        expect(isAllowedSourcePath("templates")).toBe(false);
      });

      it("should handle trailing slashes", () => {
        expect(isAllowedSourcePath("blocks/")).toBe(false);
        expect(isAllowedSourcePath("templates/")).toBe(false);
      });

      it("should handle multiple slashes", () => {
        expect(isAllowedSourcePath("blocks//hero")).toBe(false);
        expect(isAllowedSourcePath("templates//dashboard")).toBe(true);
      });
    });

    describe("directory traversal attempts", () => {
      it("rejects paths containing .. directory traversal", () => {
        expect(isAllowedSourcePath("templates/../../etc/passwd")).toBe(false);
        expect(isAllowedSourcePath("templates/../blocks/hero")).toBe(false);
      });

      it("rejects paths with null bytes", () => {
        expect(isAllowedSourcePath("templates/dashboard\0.vue")).toBe(false);
      });

      it("rejects blocks paths even with traversal", () => {
        expect(isAllowedSourcePath("blocks/../components/Button")).toBe(false);
        expect(isAllowedSourcePath("blocks/../../app.vue")).toBe(false);
      });
    });
  });

  describe("isSafeHighlightedHtml", () => {
    describe("safe HTML", () => {
      it("should allow valid highlighted code with spans", () => {
        const safeHtml =
          '<pre><code><span class="token keyword">const</span> x = 42;</code></pre>';
        expect(isSafeHighlightedHtml(safeHtml)).toBe(true);
      });

      it("should allow empty string", () => {
        expect(isSafeHighlightedHtml("")).toBe(true);
      });

      it("should allow code with syntax highlighting classes", () => {
        const safeHtml = `
          <pre class="shiki">
            <code>
              <span class="line">
                <span class="token keyword">function</span>
                <span class="token function">test</span>()
              </span>
            </code>
          </pre>
        `;
        expect(isSafeHighlightedHtml(safeHtml)).toBe(true);
      });

      it("should allow div elements for line numbers", () => {
        const safeHtml = '<div class="line-number">1</div>';
        expect(isSafeHighlightedHtml(safeHtml)).toBe(true);
      });
    });

    describe("dangerous HTML - script tags", () => {
      it("should reject <script> tags", () => {
        const dangerousHtml = '<script>alert("XSS")</script>';
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should reject <script> with attributes", () => {
        const dangerousHtml =
          '<script type="text/javascript">malicious()</script>';
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should reject <script> with whitespace", () => {
        const dangerousHtml = "<script >alert(1)</script>";
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should reject case variations of script", () => {
        expect(isSafeHighlightedHtml("<SCRIPT>bad()</SCRIPT>")).toBe(false);
        expect(isSafeHighlightedHtml("<ScRiPt>bad()</ScRiPt>")).toBe(false);
      });
    });

    describe("dangerous HTML - iframe tags", () => {
      it("should reject <iframe> tags", () => {
        const dangerousHtml = '<iframe src="evil.com"></iframe>';
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should reject <iframe> with various attributes", () => {
        const dangerousHtml =
          '<iframe srcdoc="<script>alert(1)</script>"></iframe>';
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });
    });

    describe("dangerous HTML - other forbidden tags", () => {
      it("should reject <object> tags", () => {
        const dangerousHtml = '<object data="evil.swf"></object>';
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should reject <embed> tags", () => {
        const dangerousHtml = '<embed src="evil.swf">';
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should reject <link> tags", () => {
        const dangerousHtml = '<link rel="stylesheet" href="evil.css">';
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should reject <meta> tags", () => {
        const dangerousHtml =
          '<meta http-equiv="refresh" content="0;url=evil">';
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should reject <svg> tags", () => {
        expect(isSafeHighlightedHtml('<svg onload="alert(1)">')).toBe(false);
      });

      it("should reject <img> tags", () => {
        expect(isSafeHighlightedHtml('<img src="x">')).toBe(false);
      });

      it("should reject <form> tags", () => {
        expect(isSafeHighlightedHtml('<form action="evil">')).toBe(false);
      });

      it("should reject <base> tags", () => {
        expect(isSafeHighlightedHtml('<base href="evil">')).toBe(false);
      });

      it("should reject <style> tags", () => {
        expect(isSafeHighlightedHtml("<style>body{display:none}</style>")).toBe(false);
      });

      it("should reject <input>, <button>, <textarea>, <select> tags", () => {
        expect(isSafeHighlightedHtml('<input type="text">')).toBe(false);
        expect(isSafeHighlightedHtml("<button>Click</button>")).toBe(false);
        expect(isSafeHighlightedHtml("<textarea></textarea>")).toBe(false);
        expect(isSafeHighlightedHtml("<select></select>")).toBe(false);
      });

      it("should reject <video>, <audio>, <source> tags", () => {
        expect(isSafeHighlightedHtml('<video src="x">')).toBe(false);
        expect(isSafeHighlightedHtml('<audio src="x">')).toBe(false);
        expect(isSafeHighlightedHtml('<source src="x">')).toBe(false);
      });

      it("should reject <math> tags", () => {
        expect(isSafeHighlightedHtml("<math><mi>x</mi></math>")).toBe(false);
      });
    });

    describe("dangerous HTML - inline event handlers", () => {
      it("should reject onclick handlers", () => {
        const dangerousHtml = '<span onclick="alert(1)">Click</span>';
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should reject onload handlers", () => {
        const dangerousHtml = '<img onload="alert(1)" src="x.jpg">';
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should reject onerror handlers", () => {
        const dangerousHtml = '<img onerror="alert(1)" src="invalid">';
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should reject various on* event handlers", () => {
        expect(isSafeHighlightedHtml('onmouseover="bad()"')).toBe(false);
        expect(isSafeHighlightedHtml('onfocus="bad()"')).toBe(false);
        expect(isSafeHighlightedHtml('onchange="bad()"')).toBe(false);
      });

      it("should reject event handlers with various spacing", () => {
        expect(isSafeHighlightedHtml('onclick ="bad()"')).toBe(false);
        expect(isSafeHighlightedHtml('onclick= "bad()"')).toBe(false);
        expect(isSafeHighlightedHtml("onclick = 'bad()'")).toBe(false);
      });
    });

    describe("dangerous HTML - javascript: URIs", () => {
      it("should reject javascript: in URIs", () => {
        const dangerousHtml = '<a href="javascript:alert(1)">Click</a>';
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should reject javascript: with case variations", () => {
        expect(isSafeHighlightedHtml('href="JAVASCRIPT:alert(1)"')).toBe(false);
        expect(isSafeHighlightedHtml('href="JaVaScRiPt:alert(1)"')).toBe(false);
      });

      it("should reject javascript: in various attributes", () => {
        expect(isSafeHighlightedHtml('src="javascript:alert(1)"')).toBe(false);
        expect(isSafeHighlightedHtml('action="javascript:alert(1)"')).toBe(
          false,
        );
      });

      it("should detect URL-encoded javascript: URIs", () => {
        expect(isSafeHighlightedHtml("javascript%3Aalert(1)")).toBe(false);
      });

      it("should detect entity-encoded javascript: URIs", () => {
        expect(isSafeHighlightedHtml("javascript&#58;alert(1)")).toBe(false);
        expect(isSafeHighlightedHtml("javascript&#x3a;alert(1)")).toBe(false);
      });

      it("should reject data: URIs", () => {
        expect(isSafeHighlightedHtml('src="data:text/html,<script>alert(1)</script>"')).toBe(false);
      });
    });

    describe("edge cases", () => {
      it("should allow legitimate code examples containing keywords", () => {
        // These should be allowed because they're just text content
        // The pattern looks for actual HTML structures
        const safeHtml =
          '<span class="token">const scriptName = "build";</span>';
        expect(isSafeHighlightedHtml(safeHtml)).toBe(true);
      });

      it("should handle multiline HTML", () => {
        const dangerousHtml = `
          <div>
            <script>
              alert('XSS');
            </script>
          </div>
        `;
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should handle HTML with CDATA sections", () => {
        const safeHtml = "<![CDATA[const x = 1;]]>";
        expect(isSafeHighlightedHtml(safeHtml)).toBe(true);
      });

      it("should handle heavily nested spans", () => {
        const safeHtml =
          '<span><span><span class="token">code</span></span></span>';
        expect(isSafeHighlightedHtml(safeHtml)).toBe(true);
      });
    });

    describe("defense in depth", () => {
      it("should catch attempts to hide malicious code", () => {
        // Even with Shiki entity-encoding, check for structural injection
        const dangerousHtml = "<!--><script>alert(1)</script><!-->";
        expect(isSafeHighlightedHtml(dangerousHtml)).toBe(false);
      });

      it("should verify output even with trusted input", () => {
        // Defense-in-depth: validate output structure
        // even though Shiki should produce safe output
        const potentiallyDangerous =
          "<pre><code><script>safe()</script></code></pre>";
        expect(isSafeHighlightedHtml(potentiallyDangerous)).toBe(false);
      });
    });
  });
});
