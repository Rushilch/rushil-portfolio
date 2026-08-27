export interface RateLimiterOptions {
  windowMs: number;
  maxRequests: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterMs?: number;
}

export class SlidingWindowRateLimiter {
  private windowMs: number;
  private maxRequests: number;
  private hits: Map<string, number[]> = new Map();

  constructor(options: RateLimiterOptions = { windowMs: 10 * 60 * 1000, maxRequests: 5 }) {
    this.windowMs = options.windowMs;
    this.maxRequests = options.maxRequests;
  }

  public check(identifier: string, now: number = Date.now()): RateLimitResult {
    const timestamps = this.hits.get(identifier) || [];
    const validTimestamps = timestamps.filter((t) => now - t < this.windowMs);

    if (validTimestamps.length >= this.maxRequests) {
      const oldestValid = validTimestamps[0];
      const retryAfterMs = this.windowMs - (now - oldestValid);
      this.hits.set(identifier, validTimestamps);
      return {
        allowed: false,
        remaining: 0,
        retryAfterMs: Math.max(0, retryAfterMs),
      };
    }

    validTimestamps.push(now);
    this.hits.set(identifier, validTimestamps);

    return {
      allowed: true,
      remaining: this.maxRequests - validTimestamps.length,
    };
  }

  public reset(identifier?: string) {
    if (identifier) {
      this.hits.delete(identifier);
    } else {
      this.hits.clear();
    }
  }
}

export const contactRateLimiter = new SlidingWindowRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  maxRequests: 5,
});
