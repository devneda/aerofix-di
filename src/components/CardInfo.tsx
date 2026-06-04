import type { ReactNode } from "react";

interface CardInfoProps {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
}

export default function CardInfo({ icon, label, value }: CardInfoProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", color: "var(--feedback-text)" }}>
      {icon && <span>{icon}</span>}
      <span style={{ fontWeight: 600 }}>{label}:</span>
      <span style={{ color: "var(--text-color)" }}>{value}</span>
    </div>
  );
}
