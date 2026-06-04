import { Link } from "react-router-dom";
import Title from "../components/Title";
import { AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div style={{ padding: "60px 0", textAlign: "center" }}>
      <Title text="404 - Página No Encontrada" icon={<AlertCircle size={36} />} />
      <p style={{ color: "var(--feedback-text)", marginBottom: "24px" }}>
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link to="/" style={{
        display: "inline-block",
        padding: "12px 24px",
        backgroundColor: "var(--primary-color)",
        color: "white",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold"
      }}>
        Volver al Inicio
      </Link>
    </div>
  );
}
