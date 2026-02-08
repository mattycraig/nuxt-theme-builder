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
