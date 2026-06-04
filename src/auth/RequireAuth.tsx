import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({
  children,
  token,
  loadingSession,
}: {
  children: ReactNode;
  token: string | null;
  loadingSession: boolean;
}) {
  const location = useLocation();

  if (loadingSession) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Cargando sesión...</p>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
