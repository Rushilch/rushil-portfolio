import { NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/sanitize";
import { contactRateLimiter } from "@/lib/rate-limiter";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor?.split(",")[0].trim() || realIp || "127.0.0.1";

    const rateLimit = contactRateLimiter.check(clientIp);
    if (!rateLimit.allowed) {
      const retryAfterSeconds = Math.ceil((rateLimit.retryAfterMs || 60000) / 1000);
      return NextResponse.json(
        {
          error: "Too many requests. Please wait before submitting another message.",
          retryAfter: retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
          },
        }
      );
    }

    // 2. Parse JSON body
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    if (!rawBody || typeof rawBody !== "object") {
      return NextResponse.json(
        { error: "Request payload must be a JSON object." },
        { status: 400 }
      );
    }

    // 3. Validate and Sanitize with Zod
    const validationResult = ContactFormSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const issues = validationResult.error.issues;
      const firstError = issues[0]?.message || "Validation failed.";
      return NextResponse.json(
        {
          error: firstError,
          details: issues.map((e) => ({
            field: e.path ? e.path.join(".") : "",
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    const { name, email, message, subject, website } = validationResult.data;

    // 4. Honeypot check: If the hidden 'website' field was filled by a bot, silently return success
    if (website && website.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Message received successfully.",
        timestamp: new Date().toISOString(),
      });
    }

    // 5. Secure log (sanitized)
    console.log(
      `[Contact API Dispatch] Clean message from ${name} (${email}): ${
        subject || "No Subject"
      } - ${message.substring(0, 100)}...`
    );

    return NextResponse.json({
      success: true,
      message: "Message received successfully. Thank you for reaching out!",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
