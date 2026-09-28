type Bucket = {
  failures: number;
  windowStart: number;
  lockedUntil: number;
};

const WINDOW_MS = 15 * 60 * 1000;
const LOCK_MS = 15 * 60 * 1000;
const MAX_FAILURES = 8;

const buckets = new Map<string, Bucket>();

export function loginAllowed(key: string, now = Date.now()) {
  const existing = buckets.get(key);
  return !existing || existing.lockedUntil <= now;
}

export function recordLoginFailure(key: string, now = Date.now()) {
  const existing = buckets.get(key);
  const current =
    !existing || now - existing.windowStart > WINDOW_MS
      ? { failures: 0, windowStart: now, lockedUntil: 0 }
      : existing;
  current.failures += 1;
  if (current.failures >= MAX_FAILURES) {
    current.lockedUntil = now + LOCK_MS;
  }
  buckets.set(key, current);
  if (buckets.size > 10_000) {
    for (const [name, bucket] of buckets) {
      if (bucket.lockedUntil <= now && now - bucket.windowStart > WINDOW_MS) buckets.delete(name);
    }
  }
}

export function recordLoginSuccess(key: string) {
  buckets.delete(key);
}
