import { Loader2, AlertCircle, Info } from "lucide-react";

interface FeedbackStateProps {
  loading?: boolean;
  error?: string | null;
  empty?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
}

export default function FeedbackState({
  loading,
  error,
  empty,
  emptyMessage = "No se encontraron resultados.",
  loadingMessage = "Cargando..."
}: FeedbackStateProps) {
  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", color: "var(--feedback-text)" }}>
        <Loader2 className="spinner" size={40} style={{ animation: "spin 1s linear infinite", marginBottom: "16px", color: "var(--primary-color)" }} />
        <p>{loadingMessage}</p>
        <style>{`
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", color: "var(--error-color)" }}>
        <AlertCircle size={40} style={{ marginBottom: "16px" }} />
        <p>{error}</p>
      </div>
    );
  }

  if (empty) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px", color: "var(--feedback-text)" }}>
        <Info size={40} style={{ marginBottom: "16px" }} />
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return null;
}
