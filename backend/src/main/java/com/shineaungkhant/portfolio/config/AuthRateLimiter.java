package com.shineaungkhant.portfolio.config;

import java.util.concurrent.ConcurrentHashMap;

class AuthRateLimiter {

  static final int MAX_FAILURES = 8;
  static final long WINDOW_MS = 15 * 60 * 1000L;
  static final long LOCK_MS = 15 * 60 * 1000L;

  private final ConcurrentHashMap<String, Attempt> attempts = new ConcurrentHashMap<>();

  boolean isLocked(String key, long now) {
    Attempt attempt = attempts.get(key);
    return attempt != null && attempt.lockedUntil > now;
  }

  void recordFailure(String key, long now) {
    attempts.compute(key, (ignored, existing) -> {
      Attempt attempt = existing == null || now - existing.windowStart > WINDOW_MS ? new Attempt(now) : existing;
      attempt.failures += 1;
      if (attempt.failures >= MAX_FAILURES) {
        attempt.lockedUntil = now + LOCK_MS;
      }
      return attempt;
    });
    if (attempts.size() > 10_000) {
      attempts.entrySet().removeIf(entry -> entry.getValue().lockedUntil <= now && now - entry.getValue().windowStart > WINDOW_MS);
    }
  }

  void recordSuccess(String key) {
    attempts.remove(key);
  }

  private static final class Attempt {
    private final long windowStart;
    private int failures;
    private volatile long lockedUntil;

    private Attempt(long windowStart) {
      this.windowStart = windowStart;
    }
  }
}
