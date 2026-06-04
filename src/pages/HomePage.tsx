import Title from "../components/Title";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="page-container" style={{ textAlign: "center" }}>
      <Title text="✈️ Bienvenido a AeroFix" />
      <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "600px", margin: "0 auto 40px" }}>
        Sistema integral para la gestión del mantenimiento de aviones.
      </p>

      <div className="grid">
        <Link to="/aviones" className="card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
          <h3>Flota de Aviones</h3>
          <p style={{ color: "#666" }}>Gestiona la flota de aviones, horas de vuelo y estado de servicio.</p>
        </Link>
        <Link to="/mecanicos" className="card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
          <h3>Equipo de Mecánicos</h3>
          <p style={{ color: "#666" }}>Directorio de mecánicos expertos disponibles en el taller.</p>
        </Link>
      </div>
    </div>
  );
}
