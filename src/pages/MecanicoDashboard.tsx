import { useState, useEffect } from "react";
import Title from "../components/Title";
import WeatherWidget from "../components/WeatherWidget";
import { getAvionesRequest } from "../api/avionesApi";
import type { Avion } from "../types/avion";
import FeedbackState from "../components/FeedbackState";
import { Wrench, CheckCircle2, Clock, AlertTriangle, Search, Filter } from "lucide-react";
import { useAuth } from "../auth/AuthContext";

export default function MecanicoDashboard() {
  const { user } = useAuth();
  const [aviones, setAviones] = useState<Avion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Avion; direction: "asc" | "desc" }>({
    key: "horasVuelo",
    direction: "desc",
  });

  useEffect(() => {
    getAvionesRequest()
      .then((data) => {
        setAviones(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSort = (key: keyof Avion) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredAviones = aviones
    .filter(a => !a.enServicio)
    .filter(a => 
      a.matricula.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.modelo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (typeof valA === "string" && typeof valB === "string") {
        return sortConfig.direction === "asc" 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }
      if (typeof valA === "number" && typeof valB === "number") {
        return sortConfig.direction === "asc" ? valA - valB : valB - valA;
      }
      return 0;
    });

  if (loading) return <FeedbackState loading={true} />;
  if (error) return <FeedbackState error={error} />;

  return (
    <div className="page-container">
      <Title text={`🛠️ Panel de Trabajo: ${user?.username || "Técnico"}`} />

      <WeatherWidget />

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", marginBottom: "32px" }}>
        <div className="card" style={{ borderLeft: "4px solid #ca8a04" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Wrench size={24} color="#ca8a04" />
            <h3 style={{ margin: 0 }}>Tareas Pendientes</h3>
          </div>
          <p style={{ fontSize: "1.5rem", margin: "12px 0", fontWeight: "bold" }}>{filteredAviones.length}</p>
          <p style={{ fontSize: "0.8rem", color: "var(--feedback-text)" }}>Aeronaves en cola de revisión</p>
        </div>
        
        <div className="card" style={{ borderLeft: "4px solid #16a34a" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <CheckCircle2 size={24} color="#16a34a" />
            <h3 style={{ margin: 0 }}>Urgencia Alta</h3>
          </div>
          <p style={{ fontSize: "1.5rem", margin: "12px 0", fontWeight: "bold" }}>
            {filteredAviones.filter(a => (a.horasVuelo || 0) > 1000).length}
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--feedback-text)" }}>Aviones con &gt;1000h</p>
        </div>
      </div>

      <div className="card" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
          <h3 style={{ margin: 0 }}>Listado de Mantenimiento Crítico</h3>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Search size={18} color="#666" />
            <input 
              type="text" 
              placeholder="Buscar por matrícula..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)" }}
            />
          </div>
        </div>

        {filteredAviones.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px", color: "var(--feedback-text)" }}>
            No hay tareas pendientes en este momento.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid var(--border-color)" }}>
                  <th onClick={() => handleSort("matricula")} style={{ cursor: "pointer", padding: "12px" }}>
                    Matrícula {sortConfig.key === "matricula" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("modelo")} style={{ cursor: "pointer", padding: "12px" }}>
                    Modelo {sortConfig.key === "modelo" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th onClick={() => handleSort("horasVuelo")} style={{ cursor: "pointer", padding: "12px" }}>
                    Horas Totales {sortConfig.key === "horasVuelo" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th style={{ padding: "12px" }}>Prioridad</th>
                  <th style={{ padding: "12px" }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredAviones.map(a => (
                  <tr key={a.matricula} style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>{a.matricula}</td>
                    <td style={{ padding: "12px" }}>{a.modelo}</td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={14} /> {a.horasVuelo}h
                      </div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ 
                        padding: "4px 8px", 
                        borderRadius: "4px", 
                        fontSize: "0.7rem", 
                        fontWeight: "bold",
                        backgroundColor: (a.horasVuelo || 0) > 1000 ? "#fee2e2" : "#fef3c7",
                        color: (a.horasVuelo || 0) > 1000 ? "#991b1b" : "#92400e"
                      }}>
                        {(a.horasVuelo || 0) > 1000 ? "CRÍTICA" : "MEDIA"}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <button style={{ 
                        padding: "6px 12px", 
                        backgroundColor: "var(--primary-color)", 
                        color: "white", 
                        border: "none", 
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.85rem"
                      }}>
                        Revisar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
