import type { AuthUser, LoginRequest, RegisterRequest } from "../types/auth";
import { API_BASE_URL } from "../api/config";

const TOKEN_STORAGE_KEY = "auth_token";

type LoginResponse = {
  token?: string;
  access_token?: string;
  jwt?: string;
};

function extractToken(data: LoginResponse): string {
  const token = data.token ?? data.access_token ?? data.jwt;

  if (!token) {
    throw new Error("La API no devolvio token.");
  }

  return token;
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

const getMockUser = (email: string): AuthUser => {
  const isAdmin = email.includes("admin");
  return {
    id: "mock-1",
    email,
    username: email.split("@")[0],
    role: isAdmin ? "admin" : "mecanico"
  };
};

export async function loginRequest(payload: LoginRequest): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 404) throw new Error("MOCK_REQUIRED");

    if (!response.ok) {
      throw new Error("Credenciales incorrectas.");
    }

    const data = (await response.json()) as LoginResponse;
    return extractToken(data);
  } catch (err) {
    if (err instanceof Error && (err.message === "MOCK_REQUIRED" || err.message.includes("Failed to fetch"))) {
      console.warn("Usando MODO MOCK para autenticación. La API no responde en /auth/login");
      return "mock-jwt-token-" + btoa(payload.email);
    }
    throw err;
  }
}

export async function registerRequest(payload: RegisterRequest): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.status === 404) throw new Error("MOCK_REQUIRED");

    if (!response.ok) {
      throw new Error("No se pudo registrar el usuario.");
    }

    const data = (await response.json()) as LoginResponse;
    return extractToken(data);
  } catch (err) {
    if (err instanceof Error && (err.message === "MOCK_REQUIRED" || err.message.includes("Failed to fetch"))) {
      console.warn("Usando MODO MOCK para registro.");
      return "mock-jwt-token-" + btoa(payload.email);
    }
    throw err;
  }
}

export async function meRequest(token: string): Promise<AuthUser> {
  if (token.startsWith("mock-jwt-token-")) {
    const email = atob(token.replace("mock-jwt-token-", ""));
    return getMockUser(email);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Token invalido o caducado.");
    }

    return (await response.json()) as AuthUser;
  } catch (err) {
    if (token.startsWith("mock-jwt-token-")) {
       const email = atob(token.replace("mock-jwt-token-", ""));
       return getMockUser(email);
    }
    throw err;
  }
}
