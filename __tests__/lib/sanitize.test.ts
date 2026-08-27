import { describe, it, expect } from "vitest";
import { stripHtmlTags, ContactFormSchema } from "@/lib/sanitize";

describe("Input Sanitization & Zod Schema Validation", () => {
  describe("stripHtmlTags", () => {
    it("strips malicious script tags from text", () => {
      expect(stripHtmlTags("<script>alert('xss')</script>Hello")).toBe("alert('xss')Hello");
    });

    it("strips nested HTML elements and attributes", () => {
      expect(stripHtmlTags("<b onclick='hack()'>Bold</b> text <img src=x onerror=alert(1) />")).toBe(
        "Bold text"
      );
    });

    it("preserves clean text without modification", () => {
      expect(stripHtmlTags("Hello Rushil, loved your VaaniVerse demo!")).toBe(
        "Hello Rushil, loved your VaaniVerse demo!"
      );
    });

    it("handles empty or falsy strings gracefully", () => {
      expect(stripHtmlTags("")).toBe("");
    });
  });

  describe("ContactFormSchema", () => {
    it("passes on valid contact data and sanitizes HTML", () => {
      const result = ContactFormSchema.safeParse({
        name: "<b>John Doe</b>",
        email: "John.Doe@EXAMPLE.com",
        message: "<i>Great portfolio work!</i>",
        subject: "Collaboration Inquiry",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
        expect(result.data.email).toBe("john.doe@example.com");
        expect(result.data.message).toBe("Great portfolio work!");
        expect(result.data.subject).toBe("Collaboration Inquiry");
      }
    });

    it("fails when required fields are missing", () => {
      const missingName = ContactFormSchema.safeParse({
        email: "john@example.com",
        message: "Hello",
      });
      expect(missingName.success).toBe(false);

      const missingEmail = ContactFormSchema.safeParse({
        name: "John",
        message: "Hello",
      });
      expect(missingEmail.success).toBe(false);

      const missingMessage = ContactFormSchema.safeParse({
        name: "John",
        email: "john@example.com",
      });
      expect(missingMessage.success).toBe(false);
    });

    it("rejects invalid email formats", () => {
      const badEmails = ["notanemail", "test@", "@domain.com", "test@domain", "test..test@domain.com"];
      for (const bad of badEmails) {
        const res = ContactFormSchema.safeParse({
          name: "John",
          email: bad,
          message: "Hello",
        });
        expect(res.success).toBe(false);
      }
    });

    it("enforces max length constraints (name <= 100, message <= 5000)", () => {
      const longName = "A".repeat(101);
      const nameRes = ContactFormSchema.safeParse({
        name: longName,
        email: "john@example.com",
        message: "Hello",
      });
      expect(nameRes.success).toBe(false);

      const longMsg = "M".repeat(5001);
      const msgRes = ContactFormSchema.safeParse({
        name: "John",
        email: "john@example.com",
        message: longMsg,
      });
      expect(msgRes.success).toBe(false);
    });
  });
});
