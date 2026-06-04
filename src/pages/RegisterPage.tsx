import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Title from "../components/Title";
import { UserPlus, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({ email, password, username });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear la cuenta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">
      <div className="card" style={{ maxWidth: "450px", margin: "40px auto" }}>
        <Title text="📝 Registro de Técnico" />
        
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre completo"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@aerofix.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          {error && (
            <div style={{ color: "var(--error-color)", fontSize: "0.9rem", padding: "10px", backgroundColor: "rgba(239, 68, 68, 0.1)", borderRadius: "4px" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
          >
            {loading ? <Loader2 className="spinner" size={20} /> : <UserPlus size={20} />}
            {loading ? "Registrando..." : "Crear Cuenta"}
          </button>
        </form>

        <p style={{ marginTop: "20px", textAlign: "center", fontSize: "0.9rem" }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: "var(--primary-color)", fontWeight: "bold" }}>Inicia sesión</Link>
        </p>
      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
