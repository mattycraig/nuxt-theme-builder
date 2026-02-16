const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_STORE_MAX_KEYS = 10_000;

export interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export type RateLimitStore = Map<string, RateLimitEntry>;

export function compactRateLimitMap(
  store: RateLimitStore,
  now: number,
  maxKeys = RATE_LIMIT_STORE_MAX_KEYS,
): void {
  if (store.size < maxKeys) return;
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function checkRateLimit(
  store: RateLimitStore,
  ip: string,
  now = Date.now(),
  window = RATE_LIMIT_WINDOW,
  max = RATE_LIMIT_MAX,
): boolean {
  compactRateLimitMap(store, now);
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + window });
    return true;
  }

  if (entry.count >= max) return false;

  entry.count++;
  return true;
}
