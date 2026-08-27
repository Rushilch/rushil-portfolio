import { describe, it, expect } from "vitest";
import { checkAuthorization } from "@/lib/rbac-logic";

describe("RBAC Authorization Gate", () => {
  it("allows Admin user to access Admin-protected endpoints", () => {
    const result = checkAuthorization("Admin", "Admin");
    expect(result.authorized).toBe(true);
    expect(result.statusCode).toBe(200);
    expect(result.reason).toBeUndefined();
  });

  it("blocks Teacher user from accessing Admin-protected endpoints with 403", () => {
    const result = checkAuthorization("Admin", "Teacher");
    expect(result.authorized).toBe(false);
    expect(result.statusCode).toBe(403);
    expect(result.reason).toContain("Admin");
  });

  it("blocks Student user from accessing Admin-protected endpoints with 403", () => {
    const result = checkAuthorization("Admin", "Student");
    expect(result.authorized).toBe(false);
    expect(result.statusCode).toBe(403);
  });

  it("allows Teacher user to access Teacher endpoints", () => {
    const result = checkAuthorization("Teacher", "Teacher");
    expect(result.authorized).toBe(true);
    expect(result.statusCode).toBe(200);
  });

  it("allows Admin user to access Teacher endpoints (privilege hierarchy)", () => {
    const result = checkAuthorization("Teacher", "Admin");
    expect(result.authorized).toBe(true);
    expect(result.statusCode).toBe(200);
  });

  it("allows all users to access Public endpoints", () => {
    expect(checkAuthorization("Public", "Student").authorized).toBe(true);
    expect(checkAuthorization("Public", "Teacher").authorized).toBe(true);
    expect(checkAuthorization("Public", "Admin").authorized).toBe(true);
  });
});
