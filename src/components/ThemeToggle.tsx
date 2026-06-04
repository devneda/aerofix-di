import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        border: "none",
        cursor: "pointer",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        borderRadius: "50%",
        transition: "background-color 0.2s"
      }}
      aria-label="Toggle theme"
      title={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
