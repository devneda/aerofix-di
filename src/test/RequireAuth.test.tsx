import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RequireAuth from "../auth/RequireAuth";

describe("RequireAuth Component", () => {
  it("debe mostrar el contenido si hay token y no está cargando", () => {
    render(
      <BrowserRouter>
        <RequireAuth token="valid-token" loadingSession={false}>
          <div data-testid="protected">Contenido Protegido</div>
        </RequireAuth>
      </BrowserRouter>
    );

    expect(screen.getByTestId("protected")).toBeInTheDocument();
  });

  it("debe mostrar cargando si loadingSession es true", () => {
    render(
      <BrowserRouter>
        <RequireAuth token={null} loadingSession={true}>
          <div>Contenido</div>
        </RequireAuth>
      </BrowserRouter>
    );

    expect(screen.getByText(/Cargando sesión/i)).toBeInTheDocument();
  });

  it("no debe mostrar el contenido si no hay token", () => {
    render(
      <BrowserRouter>
        <RequireAuth token={null} loadingSession={false}>
          <div data-testid="protected">Contenido Protegido</div>
        </RequireAuth>
      </BrowserRouter>
    );

    expect(screen.queryByTestId("protected")).not.toBeInTheDocument();
  });
});
