import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import RequireRole from "../auth/RequireRole";

describe("RequireRole", () => {
  it("debe mostrar el contenido si el usuario tiene el rol permitido", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route path="/admin" element={
            <RequireRole token="valid-token" user={{ role: "admin" } as any} allowedRoles={["admin"]}>
              <div>Admin Content</div>
            </RequireRole>
          } />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Admin Content")).toBeDefined();
  });

  it("debe permitir acceso a admin aunque no esté en la lista explícita (superusuario)", () => {
    render(
      <MemoryRouter initialEntries={["/mecanico"]}>
        <Routes>
          <Route path="/mecanico" element={
            <RequireRole token="valid-token" user={{ role: "admin" } as any} allowedRoles={["mecanico"]}>
              <div>Mecanico Content for Admin</div>
            </RequireRole>
          } />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Mecanico Content for Admin")).toBeDefined();
  });

  it("debe redirigir al inicio si el usuario no tiene el rol permitido", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route path="/admin" element={
            <RequireRole token="valid-token" user={{ role: "mecanico" } as any} allowedRoles={["admin"]}>
              <div>Admin Content</div>
            </RequireRole>
          } />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText("Admin Content")).toBeNull();
    expect(screen.getByText("Home Page")).toBeDefined();
  });
});
