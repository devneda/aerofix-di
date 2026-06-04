import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAvionesRequest } from "../api/avionesApi";

// Simulamos el fetch global de JavaScript
global.fetch = vi.fn();

describe("avionesApi - Servicio de Datos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe retornar la lista de aviones cuando la API responde con éxito", async () => {
    const mockAviones = [
      { matricula: "EC-123", modelo: "Boeing 737", enServicio: true },
      { matricula: "EC-456", modelo: "Airbus A320", enServicio: false }
    ];

    // Configuramos el mock para que devuelva éxito (ok: true) y los datos
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockAviones,
    });

    const result = await getAvionesRequest();

    expect(result).toHaveLength(2);
    expect(result[0].matricula).toBe("EC-123");
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/aviones"), expect.any(Object));
  });

  it("debe lanzar un error descriptivo cuando la API falla", async () => {
    // Configuramos el mock para que devuelva un error (ok: false)
    (fetch as any).mockResolvedValue({
      ok: false,
    });

    await expect(getAvionesRequest()).rejects.toThrow("No se pudo cargar la lista de aviones.");
  });
});
