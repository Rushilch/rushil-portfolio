import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, subject } = body;

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // In a production server, this could forward to Resend/SendGrid/SMTP or log securely.
    // For now we log and return 200 OK.
    console.log(`[Contact API Dispatch] Message from ${name} (${email}): ${subject || "No Subject"} - ${message}`);

    return NextResponse.json({
      success: true,
      message: "Message received successfully. Thank you for reaching out!",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your message." },
      { status: 500 }
    );
  }
}
