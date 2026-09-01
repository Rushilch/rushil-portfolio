export type UserRole = "Admin" | "Teacher" | "Student" | "Public";

export interface AuthorizationResult {
  authorized: boolean;
  statusCode: 200 | 403;
  reason?: string;
}

const ROLE_HIERARCHY: Record<UserRole, number> = {
  Admin: 3,
  Teacher: 2,
  Student: 1,
  Public: 0,
};

export function checkAuthorization(
  endpointRequiredRole: UserRole,
  activeUserRole: UserRole
): AuthorizationResult {
  if (endpointRequiredRole === "Public") {
    return { authorized: true, statusCode: 200 };
  }

  const requiredLevel = ROLE_HIERARCHY[endpointRequiredRole] ?? 0;
  const userLevel = ROLE_HIERARCHY[activeUserRole] ?? 0;

  if (userLevel < requiredLevel) {
    return {
      authorized: false,
      statusCode: 403,
      reason: `Identity role '${endpointRequiredRole}' or higher required for this endpoint.`,
    };
  }

  return { authorized: true, statusCode: 200 };
}
