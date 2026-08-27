import { z } from "zod";

export function stripHtmlTags(input: string): string {
  if (!input) return "";
  return input.replace(/<[^>]*>/g, "").trim();
}

export const ContactFormSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, "Name cannot be empty")
    .max(100, "Name cannot exceed 100 characters")
    .transform(stripHtmlTags),
  email: z
    .string({ message: "Email is required" })
    .email("Please provide a valid email address")
    .max(150, "Email cannot exceed 150 characters")
    .transform((e) => e.trim().toLowerCase()),
  message: z
    .string({ message: "Message is required" })
    .min(1, "Message cannot be empty")
    .max(5000, "Message cannot exceed 5000 characters")
    .transform(stripHtmlTags),
  subject: z
    .string()
    .max(200, "Subject cannot exceed 200 characters")
    .optional()
    .transform((s) => (s ? stripHtmlTags(s) : undefined)),
  website: z.string().optional(), // Honeypot field for bot detection
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
