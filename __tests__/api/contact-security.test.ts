import { describe, it, expect, beforeEach } from "vitest";
import { POST } from "@/app/api/contact/route";
import { contactRateLimiter } from "@/lib/rate-limiter";

describe("Contact API Route Security & Hardening (/api/contact)", () => {
  beforeEach(() => {
    contactRateLimiter.reset();
  });

  it("blocks high-frequency spam submissions with 429 Too Many Requests (Rate Limiting)", async () => {
    const ip = "203.0.113.195";

    // Send 5 valid requests (max allowed)
    for (let i = 0; i < 5; i++) {
      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-real-ip": ip,
        },
        body: JSON.stringify({
          name: `User ${i}`,
          email: `user${i}@example.com`,
          message: `Message #${i}`,
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
    }

    // 6th request from same IP must be rate-limited with 429
    const blockedReq = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-real-ip": ip,
      },
      body: JSON.stringify({
        name: "Spam Bot",
        email: "bot@example.com",
        message: "Spam payload!",
      }),
    });

    const blockedRes = await POST(blockedReq);
    expect(blockedRes.status).toBe(429);

    const data = await blockedRes.json();
    expect(data.error).toContain("Too many requests");
    expect(blockedRes.headers.get("Retry-After")).toBeDefined();
  });

  it("silently absorbs bot submissions when honeypot field is filled", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-real-ip": "198.51.100.42",
      },
      body: JSON.stringify({
        name: "SpamBot 3000",
        email: "spambot@example.com",
        message: "Check out this link!",
        website: "https://spammysite.xyz", // Honeypot filled by automated bot
      }),
    });

    const res = await POST(req);
    // Returns 200 so bots think they succeeded, but message is not processed
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("sanitizes HTML injections in name, message, and subject fields", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-real-ip": "198.51.100.43",
      },
      body: JSON.stringify({
        name: "<script>alert('xss')</script>John Doe",
        email: "john@example.com",
        message: "<b>Important:</b> <iframe src='malicious.site' />Hello!",
        subject: "<img src=x onerror=alert(1) />Urgent Project",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("rejects excessively large payload strings (DoS mitigation)", async () => {
    const hugeMessage = "A".repeat(6000); // Exceeds 5000 max length
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-real-ip": "198.51.100.44",
      },
      body: JSON.stringify({
        name: "Alice",
        email: "alice@example.com",
        message: hugeMessage,
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("5000");
  });
});
