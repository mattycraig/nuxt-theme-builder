/**
 * Encodes angle brackets in AI-generated content before MDC rendering
 * to prevent inline HTML (e.g. `<script>`) from being interpreted as DOM.
 * Intentionally does NOT encode `&` to avoid double-encoding entities.
 */
export function sanitizeMarkdownInput(value: string): string {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
