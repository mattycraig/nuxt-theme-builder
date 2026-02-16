/**
 * Restricts source-code API access to preview-only route prefixes.
 * Prevents information disclosure of non-preview page sources.
 * Also rejects directory traversal and null-byte sequences.
 */
export function isAllowedSourcePath(safePath: string): boolean {
  if (safePath.includes("..") || safePath.includes("\0")) {
    return false;
  }
  return safePath.startsWith("templates/") && safePath !== "templates/";
}

/**
 * Validates that Shiki-generated HTML does not contain dangerous elements
 * (script, iframe, svg, img, form, style, etc.), inline event handlers,
 * javascript: URIs (including entity-encoded variants), or data: URIs.
 * Defense-in-depth: Shiki entity-encodes code content, so this only
 * catches structural injection in the highlight output itself.
 */
export function isSafeHighlightedHtml(html: string): boolean {
  const forbiddenTagPattern =
    /<\s*(script|iframe|object|embed|link|meta|svg|img|form|base|style|body|video|audio|source|input|button|textarea|select|math)\b/i;
  const eventHandlerPattern = /on\w+\s*=/i;
  const jsUriPattern = /javascript\s*:/i;
  const encodedJsUriPattern = /j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*(?::|&#58;|&#x3a;|%3a)/i;
  const dataUriPattern = /data\s*:/i;
  return (
    !forbiddenTagPattern.test(html) &&
    !eventHandlerPattern.test(html) &&
    !jsUriPattern.test(html) &&
    !encodedJsUriPattern.test(html) &&
    !dataUriPattern.test(html)
  );
}
