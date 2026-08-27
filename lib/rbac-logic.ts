export type UserRole = "Admin" | "Teacher" | "Student" | "Public";

export interface AuthorizationResult {
  authorized: boolean;
  statusCode: 200 | 403;
  reason?: string;
}

export function checkAuthorization(
  endpointRequiredRole: UserRole,
  activeUserRole: UserRole
): AuthorizationResult {
  if (endpointRequiredRole === "Public") {
    return { authorized: true, statusCode: 200 };
  }

  if (endpointRequiredRole === "Admin" && activeUserRole !== "Admin") {
    return {
      authorized: false,
      statusCode: 403,
      reason: "Identity role 'Admin' required for this endpoint.",
    };
  }

  return { authorized: true, statusCode: 200 };
}
