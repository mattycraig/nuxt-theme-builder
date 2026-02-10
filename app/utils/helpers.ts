/**
 * Type-safe Object.entries that preserves key types.
 * Eliminates the need for `as unknown as Record<string, string>` casts.
 */
export function typedEntries<T extends Record<string, unknown>>(
  obj: T,
): [keyof T & string, T[keyof T & string]][] {
  return Object.entries(obj) as [keyof T & string, T[keyof T & string]][];
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Validate postMessage navigation paths — allow only clean relative paths.
 * Returns the sanitized pathname or null if the path is invalid/unsafe.
 */
export function sanitizeNavigationPath(raw: string): string | null {
  if (typeof raw !== "string") return null;
  try {
    const url = new URL(raw, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    const pathname = url.pathname;
    if (/[^a-zA-Z0-9/_-]/.test(pathname)) return null;
    return pathname;
  } catch {
    return null;
  }
}

/**
 * Trigger a browser file download from a string content.
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string = "text/plain",
) {
  if (typeof document === "undefined") return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Format a timestamp into a human-readable relative time string.
 */
export function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}
