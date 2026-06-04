import { Search, ArrowUpDown } from "lucide-react";

interface SearchControlProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterProperty?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: { label: string; value: string }[];
  sortOrder: "asc" | "desc";
  onSortToggle: () => void;
  resultsCount: number;
}

export default function SearchControl({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  filterProperty,
  onFilterChange,
  filterOptions,
  sortOrder,
  onSortToggle,
  resultsCount
}: SearchControlProps) {
  return (
    <div style={{
      backgroundColor: "var(--card-bg)",
      padding: "16px",
      borderRadius: "12px",
      border: "1px solid var(--border-color)",
      marginBottom: "24px",
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
      alignItems: "center",
      justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", flex: 1, gap: "16px", minWidth: "250px" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--feedback-text)" }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            style={{
              width: "100%",
              padding: "10px 10px 10px 40px",
              borderRadius: "8px",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
              outline: "none",
              fontSize: "1rem"
            }}
          />
        </div>
        {filterOptions && onFilterChange && filterProperty !== undefined && (
          <select
            value={filterProperty}
            onChange={(e) => onFilterChange(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-color)",
              color: "var(--text-color)",
              outline: "none",
              fontSize: "1rem",
              cursor: "pointer"
            }}
          >
            {filterOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ fontSize: "0.9rem", color: "var(--feedback-text)", fontWeight: 500 }}>
          {resultsCount} {resultsCount === 1 ? "resultado" : "resultados"}
        </span>
        <button
          onClick={onSortToggle}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-color)",
            color: "var(--text-color)",
            cursor: "pointer",
            fontWeight: 500,
            transition: "background-color 0.2s"
          }}
          title="Cambiar orden"
        >
          <ArrowUpDown size={16} />
          {sortOrder === "asc" ? "Ascendente" : "Descendente"}
        </button>
      </div>
    </div>
  );
}
