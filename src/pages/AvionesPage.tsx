import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import FeedbackState from "../components/FeedbackState";
import SearchControl from "../components/SearchControl";
import CardInfo from "../components/CardInfo";
import type { Avion } from "../types/avion";
import { Plane, Calendar, Clock, Users, Activity } from "lucide-react";
import { getApiUrl } from "../api/config";

export default function AvionesPage() {
  const [aviones, setAviones] = useState<Avion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterProperty, setFilterProperty] = useState("todos");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch(getApiUrl("/aviones"))
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar la lista de aviones.");
        return res.json();
      })
      .then((data: Avion[]) => {
        setAviones(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (aviones.length > 0) {
      console.group("Lifecycle: AvionesPage");
      console.log("Aviones cargados exitosamente");
      console.table(aviones);
      console.groupEnd();
    }
  }, [aviones]);

  const filteredAndSorted = aviones
    .filter((a) => {
      const matchSearch = a.modelo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          a.matricula.toLowerCase().includes(searchTerm.toLowerCase());
      const matchFilter = 
        filterProperty === "todos" ? true :
        filterProperty === "enServicio" ? a.enServicio === true :
        filterProperty === "fueraServicio" ? a.enServicio === false : true;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      const cmp = a.modelo.localeCompare(b.modelo);
      return sortOrder === "asc" ? cmp : -cmp;
    });

  return (
    <div className="page-container">
      <Title text="Flota de Aviones" />
      
      <SearchControl
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Buscar por modelo o matrícula..."
        filterProperty={filterProperty}
        onFilterChange={setFilterProperty}
        filterOptions={[
          { label: "Todos los estados", value: "todos" },
          { label: "En Servicio", value: "enServicio" },
          { label: "Fuera de Servicio", value: "fueraServicio" }
        ]}
        sortOrder={sortOrder}
        onSortToggle={() => setSortOrder(p => p === "asc" ? "desc" : "asc")}
        resultsCount={filteredAndSorted.length}
      />

      <FeedbackState loading={loading} error={error} empty={!loading && !error && filteredAndSorted.length === 0} emptyMessage="No hay aviones que coincidan con la búsqueda." />

      {!loading && !error && filteredAndSorted.length > 0 && (
        <div className="grid">
          {filteredAndSorted.map(avion => (
            <Link to={`/aviones/${avion.matricula}`} key={avion.matricula} className="card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
              <h3>{avion.matricula}</h3>
              <CardInfo label="Modelo" value={avion.modelo} icon={<Plane size={16} />} />
              <CardInfo label="Vuelos Realizados" value={avion.totalVuelos ?? 0} icon={<Activity size={16} />} />
              <CardInfo label="Pasajeros" value={avion.capacidadPasajeros} icon={<Users size={16} />} />
              <CardInfo label="Horas de Vuelo" value={`${avion.horasVuelo}h`} icon={<Clock size={16} />} />
              <CardInfo label="Fabricación" value={avion.fechaFabricacion} icon={<Calendar size={16} />} />
              <div style={{ marginTop: "16px" }}>
                <span style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  backgroundColor: avion.enServicio ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
                  color: avion.enServicio ? "#16a34a" : "var(--error-color)"
                }}>
                  {avion.enServicio ? "● En Servicio" : "● Mantenimiento"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
