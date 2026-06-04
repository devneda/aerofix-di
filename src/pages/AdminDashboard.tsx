import { useState, useEffect } from "react";
import Title from "../components/Title";
import WeatherWidget from "../components/WeatherWidget";
import { getAvionesRequest } from "../api/avionesApi";
import { getMecanicosRequest } from "../api/mecanicosApi";
import type { Avion } from "../types/avion";
import type { Mecanico } from "../types/mecanico";
import FeedbackState from "../components/FeedbackState";
import { Plane, Users, Activity, BarChart3, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  const [aviones, setAviones] = useState<Avion[]>([]);
  const [mecanicos, setMecanicos] = useState<Mecanico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{ key: keyof Avion; direction: "asc" | "desc" }>({
    key: "matricula",
    direction: "asc",
  });

  useEffect(() => {
    Promise.all([getAvionesRequest(), getMecanicosRequest()])
      .then(([avionesData, mecanicosData]) => {
        setAviones(avionesData);
        setMecanicos(mecanicosData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const years = ["all", ...new Set(aviones.map(a => a.fechaFabricacion?.split("-")[0]).filter(Boolean))].sort();

  const stats = {
    totalAviones: aviones.length,
    enServicio: aviones.filter(a => a.enServicio).length,
    totalMecanicos: mecanicos.length,
    disponibles: mecanicos.filter(m => m.disponible).length,
  };

  const handleSort = (key: keyof Avion) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredAviones = aviones
    .filter(a => 
      (a.matricula.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.modelo.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (yearFilter === "all" || a.fechaFabricacion?.startsWith(yearFilter))
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
        return sortConfig.direction === "asc" ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      }
      return 0;
    });

  if (loading) return <FeedbackState loading={true} />;
  if (error) return <FeedbackState error={error} />;

  return (
    <div className="page-container">
      <Title text="📊 Panel de Administración" />

      <WeatherWidget />

      {/* Widgets de Resumen */}
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "32px" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <Plane size={32} color="var(--primary-color)" style={{ marginBottom: "8px" }} />
          <h2 style={{ fontSize: "2rem", margin: "8px 0" }}>{stats.totalAviones}</h2>
          <p style={{ color: "var(--feedback-text)", fontWeight: "bold" }}>Total Aeronaves</p>
          <span style={{ fontSize: "0.8rem", color: "#16a34a" }}><ArrowUpRight size={14} /> {stats.enServicio} en servicio</span>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <Users size={32} color="#8b5cf6" style={{ marginBottom: "8px" }} />
          <h2 style={{ fontSize: "2rem", margin: "8px 0" }}>{stats.totalMecanicos}</h2>
          <p style={{ color: "var(--feedback-text)", fontWeight: "bold" }}>Staff Técnico</p>
          <span style={{ fontSize: "0.8rem", color: "#ca8a04" }}><Activity size={14} /> {stats.disponibles} disponibles</span>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <BarChart3 size={32} color="#f59e0b" style={{ marginBottom: "8px" }} />
          <h2 style={{ fontSize: "2rem", margin: "8px 0" }}>{aviones.reduce((acc, a) => acc + (a.horasVuelo || 0), 0)}h</h2>
          <p style={{ color: "var(--feedback-text)", fontWeight: "bold" }}>Horas Totales</p>
          <span style={{ fontSize: "0.8rem", color: "#666" }}>Acumulado flota</span>
        </div>
      </div>

      <div className="card" style={{ padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
          <h3 style={{ margin: 0 }}>Listado Crítico de Flota</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <select 
              value={yearFilter} 
              onChange={(e) => setYearFilter(e.target.value)}
              style={{ padding: "8px", borderRadius: "6px", border: "1px solid var(--border-color)", backgroundColor: "var(--input-bg)", color: "var(--text-color)" }}
            >
              <option value="all">Todos los años</option>
              {years.filter(y => y !== "all").map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="Filtrar por matrícula o modelo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid var(--border-color)" }}>
                <th onClick={() => handleSort("matricula")} style={{ cursor: "pointer", padding: "12px" }}>Matrícula {sortConfig.key === "matricula" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                <th onClick={() => handleSort("modelo")} style={{ cursor: "pointer", padding: "12px" }}>Modelo {sortConfig.key === "modelo" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                <th onClick={() => handleSort("fechaFabricacion")} style={{ cursor: "pointer", padding: "12px" }}>Fabricación {sortConfig.key === "fechaFabricacion" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                <th onClick={() => handleSort("horasVuelo")} style={{ cursor: "pointer", padding: "12px" }}>Horas {sortConfig.key === "horasVuelo" && (sortConfig.direction === "asc" ? "↑" : "↓")}</th>
                <th style={{ padding: "12px" }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredAviones.map(a => (
                <tr key={a.matricula} style={{ borderBottom: "1px solid var(--border-color)" }}>
                  <td style={{ padding: "12px", fontWeight: "bold" }}>{a.matricula}</td>
                  <td style={{ padding: "12px" }}>{a.modelo}</td>
                  <td style={{ padding: "12px" }}>{a.fechaFabricacion}</td>
                  <td style={{ padding: "12px" }}>{a.horasVuelo}h</td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ 
                      padding: "4px 8px", 
                      borderRadius: "4px", 
                      fontSize: "0.75rem", 
                      backgroundColor: a.enServicio ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                      color: a.enServicio ? "#16a34a" : "var(--error-color)"
                    }}>
                      {a.enServicio ? "OPERATIVO" : "MANTENIMIENTO"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
