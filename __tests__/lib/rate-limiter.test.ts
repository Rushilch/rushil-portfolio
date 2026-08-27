import { describe, it, expect, beforeEach } from "vitest";
import { SlidingWindowRateLimiter } from "@/lib/rate-limiter";

describe("Sliding Window Rate Limiter", () => {
  let limiter: SlidingWindowRateLimiter;

  beforeEach(() => {
    // Max 3 requests per 1000ms window for fast testing
    limiter = new SlidingWindowRateLimiter({
      windowMs: 1000,
      maxRequests: 3,
    });
  });

  it("allows requests below the limit", () => {
    const t0 = 10000;
    const r1 = limiter.check("ip-1", t0);
    expect(r1.allowed).toBe(true);
    expect(r1.remaining).toBe(2);

    const r2 = limiter.check("ip-1", t0 + 100);
    expect(r2.allowed).toBe(true);
    expect(r2.remaining).toBe(1);

    const r3 = limiter.check("ip-1", t0 + 200);
    expect(r3.allowed).toBe(true);
    expect(r3.remaining).toBe(0);
  });

  it("blocks requests that exceed the max limit within window", () => {
    const t0 = 10000;
    limiter.check("ip-1", t0);
    limiter.check("ip-1", t0 + 100);
    limiter.check("ip-1", t0 + 200);

    // 4th request within 1000ms window
    const r4 = limiter.check("ip-1", t0 + 300);
    expect(r4.allowed).toBe(false);
    expect(r4.remaining).toBe(0);
    expect(r4.retryAfterMs).toBeGreaterThan(0);
  });

  it("allows new requests once the sliding window expires", () => {
    const t0 = 10000;
    limiter.check("ip-1", t0);
    limiter.check("ip-1", t0 + 100);
    limiter.check("ip-1", t0 + 200);

    // After 1001ms (window expired for first hit)
    const rAfter = limiter.check("ip-1", t0 + 1050);
    expect(rAfter.allowed).toBe(true);
  });

  it("isolates rate limits between different IP identifiers", () => {
    const t0 = 10000;
    limiter.check("ip-alice", t0);
    limiter.check("ip-alice", t0 + 10);
    limiter.check("ip-alice", t0 + 20);

    // Alice is now rate-limited
    expect(limiter.check("ip-alice", t0 + 30).allowed).toBe(false);

    // Bob is completely fresh
    const rBob = limiter.check("ip-bob", t0 + 30);
    expect(rBob.allowed).toBe(true);
    expect(rBob.remaining).toBe(2);
  });
});
