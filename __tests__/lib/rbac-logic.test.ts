import { describe, it, expect } from "vitest";
import { checkAuthorization, UserRole } from "@/lib/rbac-logic";

describe("RBAC Authorization Gate & Role Hierarchy", () => {
  describe("Admin Role Permissions", () => {
    it("allows Admin user to access Admin-protected endpoints", () => {
      const result = checkAuthorization("Admin", "Admin");
      expect(result.authorized).toBe(true);
      expect(result.statusCode).toBe(200);
      expect(result.reason).toBeUndefined();
    });

    it("allows Admin user to access Teacher endpoints (privilege hierarchy)", () => {
      const result = checkAuthorization("Teacher", "Admin");
      expect(result.authorized).toBe(true);
      expect(result.statusCode).toBe(200);
    });

    it("allows Admin user to access Student endpoints", () => {
      const result = checkAuthorization("Student", "Admin");
      expect(result.authorized).toBe(true);
      expect(result.statusCode).toBe(200);
    });
  });

  describe("Teacher Role Permissions", () => {
    it("allows Teacher user to access Teacher endpoints", () => {
      const result = checkAuthorization("Teacher", "Teacher");
      expect(result.authorized).toBe(true);
      expect(result.statusCode).toBe(200);
    });

    it("allows Teacher user to access Student endpoints", () => {
      const result = checkAuthorization("Student", "Teacher");
      expect(result.authorized).toBe(true);
      expect(result.statusCode).toBe(200);
    });

    it("blocks Teacher user from accessing Admin-protected endpoints with 403", () => {
      const result = checkAuthorization("Admin", "Teacher");
      expect(result.authorized).toBe(false);
      expect(result.statusCode).toBe(403);
      expect(result.reason).toContain("Admin");
    });
  });

  describe("Student Role Permissions", () => {
    it("allows Student user to access Student endpoints", () => {
      const result = checkAuthorization("Student", "Student");
      expect(result.authorized).toBe(true);
      expect(result.statusCode).toBe(200);
    });

    it("blocks Student user from accessing Teacher endpoints with 403", () => {
      const result = checkAuthorization("Teacher", "Student");
      expect(result.authorized).toBe(false);
      expect(result.statusCode).toBe(403);
      expect(result.reason).toContain("Teacher");
    });

    it("blocks Student user from accessing Admin-protected endpoints with 403", () => {
      const result = checkAuthorization("Admin", "Student");
      expect(result.authorized).toBe(false);
      expect(result.statusCode).toBe(403);
      expect(result.reason).toContain("Admin");
    });
  });

  describe("Public Endpoints", () => {
    it("allows all authenticated and anonymous roles to access Public endpoints", () => {
      const roles: UserRole[] = ["Public", "Student", "Teacher", "Admin"];
      for (const role of roles) {
        const result = checkAuthorization("Public", role);
        expect(result.authorized).toBe(true);
        expect(result.statusCode).toBe(200);
      }
    });
  });
});
