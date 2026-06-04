import { describe, it, expect, vi, beforeEach } from "vitest";
import { getAvionesRequest } from "../api/avionesApi";

describe("avionesApi", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("debe retornar una lista de aviones cuando la respuesta es ok", async () => {
    const mockAviones = [{ matricula: "EC-123", modelo: "Boeing 737" }];
    
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockAviones,
    });

    const result = await getAvionesRequest();
    expect(result).toEqual(mockAviones);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/aviones"), expect.any(Object));
  });

  it("debe lanzar un error cuando la respuesta no es ok", async () => {
    (fetch as any).mockResolvedValue({
      ok: false,
    });

    await expect(getAvionesRequest()).rejects.toThrow("No se pudo cargar la lista de aviones.");
  });
});
