import { useState, useEffect } from "react";
import Title from "../components/Title";
import FeedbackState from "../components/FeedbackState";
import SearchControl from "../components/SearchControl";
import CardInfo from "../components/CardInfo";
import type { Mecanico } from "../types/mecanico";
import { Wrench, Briefcase, DollarSign, Calendar } from "lucide-react";
import { getApiUrl } from "../api/config";

export default function MecanicosPage() {
  const [mecanicos, setMecanicos] = useState<Mecanico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterProperty, setFilterProperty] = useState("todos");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch(getApiUrl("/mecanicos"))
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar la lista de mecánicos.");
        return res.json();
      })
      .then((data: Mecanico[]) => {
        setMecanicos(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (mecanicos.length > 0) {
      console.group("Lifecycle: MecanicosPage");
      console.log("Mecánicos cargados exitosamente");
      console.table(mecanicos);
      console.groupEnd();
    }
  }, [mecanicos]);

  const filteredAndSorted = mecanicos
    .filter((m) => {
      const matchSearch = m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.licenciaId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchFilter = 
        filterProperty === "todos" ? true :
        filterProperty === "disponible" ? m.disponible === true :
        filterProperty === "ocupado" ? m.disponible === false : true;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      const cmp = a.nivelExperiencia - b.nivelExperiencia;
      return sortOrder === "asc" ? cmp : -cmp;
    });

  return (
    <div className="page-container">
      <Title text="Equipo de Mecánicos" />
      
      <SearchControl
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Buscar por nombre o licencia..."
        filterProperty={filterProperty}
        onFilterChange={setFilterProperty}
        filterOptions={[
          { label: "Todos los estados", value: "todos" },
          { label: "Disponibles", value: "disponible" },
          { label: "Ocupados", value: "ocupado" }
        ]}
        sortOrder={sortOrder}
        onSortToggle={() => setSortOrder(p => p === "asc" ? "desc" : "asc")}
        resultsCount={filteredAndSorted.length}
      />

      <FeedbackState loading={loading} error={error} empty={!loading && !error && filteredAndSorted.length === 0} emptyMessage="No hay mecánicos que coincidan con la búsqueda." />

      {!loading && !error && filteredAndSorted.length > 0 && (
        <div className="grid">
          {filteredAndSorted.map(mecanico => (
            <div key={mecanico.id} className="card">
              <h3>{mecanico.nombre}</h3>
              <p style={{ color: "var(--feedback-text)", marginBottom: "16px", fontSize: "0.9rem" }}>Licencia: {mecanico.licenciaId}</p>
              
              <CardInfo label="Nivel Experiencia" value={`${mecanico.nivelExperiencia}/5`} icon={<Briefcase size={16} />} />
              <CardInfo label="Salario" value={`${mecanico.salarioHora}€ / h`} icon={<DollarSign size={16} />} />
              <CardInfo 
                label="Contratación" 
                value={
                  mecanico.fechaContratacion 
                    ? (typeof mecanico.fechaContratacion === 'string' 
                        ? mecanico.fechaContratacion.split('T')[0] 
                        : new Date(mecanico.fechaContratacion).toLocaleDateString())
                    : "N/A"
                } 
                icon={<Calendar size={16} />} 
              />
              
              <div style={{ marginTop: "16px" }}>
                <span style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  backgroundColor: mecanico.disponible ? "rgba(34, 197, 94, 0.1)" : "rgba(234, 179, 8, 0.1)",
                  color: mecanico.disponible ? "#16a34a" : "#ca8a04"
                }}>
                  {mecanico.disponible ? "● Disponible" : "● En Asignación"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
