import type { Mecanico } from "../types/mecanico";
import { getToken } from "../auth/authApi";
import { API_BASE_URL, getAuthHeaders } from "./config";

export async function getMecanicosRequest(): Promise<Mecanico[]> {
  const response = await fetch(`${API_BASE_URL}/mecanicos`, {
    headers: getAuthHeaders(getToken()),
  });

  if (!response.ok) {
    throw new Error("No se pudo cargar la lista de mecánicos.");
  }

  return await response.json();
}
