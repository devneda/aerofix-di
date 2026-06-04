import { NavLink } from "react-router-dom";
import type { AuthUser } from "../types/auth";
import { LogOut, User, LogIn } from "lucide-react";

interface NavigationProps {
  token: string | null;
  user: AuthUser | null;
  onLogout: () => void;
}

export default function Navigation({ token, user, onLogout }: NavigationProps) {
  const isAdmin = user?.role === "admin";

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: "white",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "transparent",
    transition: "background 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  });

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        padding: "12px 24px",
        backgroundColor: "#2c4469",
        fontWeight: 500,
        borderBottom: "1px solid rgba(255,255,255,0.15)",
        flexWrap: "wrap"
      }}
    >
      <NavLink to="/" style={linkStyle}>Inicio</NavLink>

      {token && (
        <>
          {isAdmin && <NavLink to="/dashboard-admin" style={linkStyle}>Admin Dashboard</NavLink>}
          {user?.role === "mecanico" && <NavLink to="/dashboard-mecanico" style={linkStyle}>Mi Trabajo</NavLink>}
          <NavLink to="/aviones" style={linkStyle}>Aviones</NavLink>
          <NavLink to="/mecanicos" style={linkStyle}>Mecánicos</NavLink>
          {isAdmin && <NavLink to="/add-avion" style={linkStyle}>Añadir Avión</NavLink>}
        </>
      )}

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "20px" }}>
        {token ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "white", fontSize: "0.9rem" }}>
              <User size={18} />
              <span>{user?.username || user?.email}</span>
              <span style={{ 
                fontSize: "0.7rem", 
                backgroundColor: "rgba(255,255,255,0.1)", 
                padding: "2px 6px", 
                borderRadius: "4px",
                textTransform: "uppercase"
              }}>
                {user?.role}
              </span>
            </div>
            <button
              onClick={onLogout}
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                color: "#ff8a8a",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontWeight: "bold"
              }}
            >
              <LogOut size={16} /> Salir
            </button>
          </>
        ) : (
          <NavLink to="/login" style={linkStyle}>
            <LogIn size={18} /> Acceder
          </NavLink>
        )}
      </div>
    </nav>
  );
}
