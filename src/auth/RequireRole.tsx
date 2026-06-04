import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { AppRole, AuthUser } from "../types/auth";

export default function RequireRole({
  children,
  token,
  user,
  allowedRoles,
}: {
  children: ReactNode;
  token: string | null;
  user: AuthUser | null;
  allowedRoles: AppRole[];
}) {
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const role = String(user?.role ?? "").toLowerCase() as AppRole | "";
  const isAllowed = allowedRoles.includes(role as AppRole) || role === "admin";

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
