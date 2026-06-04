export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "#F1FAEE",
        color: "#1D3557",
        padding: "10px 0",
        textAlign: "center",
        fontSize: "12px",
        borderTop: "1px solid #E0E0E0",
        width: "100%",
        marginTop: "auto"
      }}
    >
      <p style={{ margin: "5px 0" }}>
        &copy; {currentYear} AeroFix - Taller de Aviones. Desarrollo de Interfaces.
      </p>
    </footer>
  );
}
