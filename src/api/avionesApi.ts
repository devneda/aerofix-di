import type { Avion } from "../types/avion";
import { getToken } from "../auth/authApi";
import { API_BASE_URL, getAuthHeaders } from "./config";

export async function getAvionesRequest(): Promise<Avion[]> {
  const response = await fetch(`${API_BASE_URL}/aviones`, {
    headers: getAuthHeaders(getToken()),
  });

  if (!response.ok) {
    throw new Error("No se pudo cargar la lista de aviones.");
  }

  return await response.json();
}

export async function getAvionByMatriculaRequest(matricula: string): Promise<Avion> {
  const response = await fetch(`${API_BASE_URL}/aviones/${matricula}`, {
    headers: getAuthHeaders(getToken()),
  });

  if (!response.ok) {
    throw new Error("Avión no encontrado.");
  }

  return await response.json();
}

export async function createAvionRequest(avion: Partial<Avion>): Promise<Avion> {
  const response = await fetch(`${API_BASE_URL}/aviones`, {
    method: "POST",
    headers: getAuthHeaders(getToken()),
    body: JSON.stringify(avion),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "No se pudo registrar el avión.");
  }

  return await response.json();
}
