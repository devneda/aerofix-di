import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "var(--primary-color)",
        color: "white",
        padding: "15px 20px",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
      }}
    >
      <div style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)" }}>
        <ThemeToggle />
      </div>
      <h1 style={{ margin: 0, fontSize: "24px" }}>
        AeroFix - Gestión Aeronáutica
      </h1>
      <p style={{ margin: "5px 0 0", fontSize: "14px" }}>
        Taller de Aviones
      </p>
    </header>
  );
}
