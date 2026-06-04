import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Title from "../components/Title";
import FeedbackState from "../components/FeedbackState";
import CardInfo from "../components/CardInfo";
import type { Avion } from "../types/avion";
import { Plane, Calendar, Clock, Users, ArrowLeft, Wrench, Activity } from "lucide-react";
import { getAvionByMatriculaRequest } from "../api/avionesApi";

export default function AvionDetailPage() {
  const { matricula } = useParams<{ matricula: string }>();
  const [avion, setAvion] = useState<Avion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!matricula) return;
    setLoading(true);
    getAvionByMatriculaRequest(matricula)
      .then((data) => {
        setAvion(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [matricula]);

  useEffect(() => {
    if (avion) {
      console.group(`Lifecycle: AvionDetailPage (${matricula})`);
      console.log("Detalles del avión cargados");
      console.table(avion);
      console.groupEnd();
    }
  }, [avion, matricula]);

  return (
    <div className="page-container">
      <Link to="/aviones" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "24px", color: "var(--primary-color)", fontWeight: "bold" }}>
        <ArrowLeft size={20} /> Volver a Aviones
      </Link>

      <FeedbackState loading={loading} error={error} loadingMessage="Cargando detalles del avión..." />

      {!loading && !error && avion && (
        <div>
          <Title text={`Detalle: ${avion.matricula}`} />
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
            <div>
              <h4 style={{ color: "var(--feedback-text)", marginBottom: "16px", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "1px" }}>Especificaciones</h4>
              <CardInfo label="Modelo" value={avion.modelo} icon={<Plane size={18} />} />
              <CardInfo label="Capacidad" value={`${avion.capacidadPasajeros} pasajeros`} icon={<Users size={18} />} />
              <CardInfo label="Fabricación" value={avion.fechaFabricacion} icon={<Calendar size={18} />} />
            </div>
            
            <div>
              <h4 style={{ color: "var(--feedback-text)", marginBottom: "16px", textTransform: "uppercase", fontSize: "0.9rem", letterSpacing: "1px" }}>Operativa</h4>
              <CardInfo label="Horas de Vuelo" value={`${avion.horasVuelo}h`} icon={<Clock size={18} />} />
              <CardInfo label="Total Vuelos" value={avion.totalVuelos ?? 0} icon={<Activity size={18} />} />
              <CardInfo label="Total Mantenimientos" value={avion.totalMantenimientos ?? 0} icon={<Wrench size={18} />} />
            </div>
          </div>

          <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid var(--border-color)", textAlign: "center" }}>
              <span style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: avion.enServicio ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                color: avion.enServicio ? "#16a34a" : "var(--error-color)"
              }}>
                {avion.enServicio ? "Estado: En Servicio Operativo" : "Estado: En Mantenimiento"}
              </span>
          </div>
        </div>
      )}
    </div>
  );
}
