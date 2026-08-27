import { describe, it, expect, beforeEach } from "vitest";
import { POST } from "@/app/api/contact/route";
import { contactRateLimiter } from "@/lib/rate-limiter";

describe("Contact API Route (/api/contact)", () => {
  beforeEach(() => {
    contactRateLimiter.reset();
  });

  it("returns 200 OK on valid message payload", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-real-ip": "192.168.1.100",
      },
      body: JSON.stringify({
        name: "Rushil Chilakamarri",
        email: "rushilchilakamarri@gmail.com",
        message: "Excited about the VaaniVerse pipeline!",
        subject: "Full-Time Opportunity",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.message).toContain("successfully");
    expect(data.timestamp).toBeDefined();
  });

  it("returns 400 Bad Request when required name is missing", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-real-ip": "192.168.1.101",
      },
      body: JSON.stringify({
        email: "test@example.com",
        message: "Hello there!",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it("returns 400 Bad Request when email is invalid", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-real-ip": "192.168.1.102",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "invalid-email-format",
        message: "Hello there!",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toContain("valid email");
  });

  it("returns 400 Bad Request on malformed JSON payload", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-real-ip": "192.168.1.103",
      },
      body: "{ bad json syntax ...",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toContain("Invalid JSON");
  });
});
