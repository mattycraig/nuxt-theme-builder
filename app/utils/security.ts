/**
 * Restricts source-code API access to preview-only route prefixes.
 * Prevents information disclosure of non-preview page sources.
 */
export function isAllowedSourcePath(safePath: string): boolean {
  return safePath.startsWith("blocks/") || safePath.startsWith("templates/");
}

/**
 * Validates that Shiki-generated HTML does not contain dangerous elements
 * (script, iframe, etc.), inline event handlers, or javascript: URIs.
 * Defense-in-depth: Shiki entity-encodes code content, so this only
 * catches structural injection in the highlight output itself.
 */
export function isSafeHighlightedHtml(html: string): boolean {
  const forbiddenPattern =
    /<\s*(script|iframe|object|embed|link|meta)\b|on\w+\s*=|javascript:/i;
  return !forbiddenPattern.test(html);
}
