export type AppRole = "admin" | "mecanico" | "user";

export interface AuthUser {
  id?: number | string;
  email?: string;
  username?: string;
  role?: AppRole | string;
  [key: string]: unknown;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username?: string;
}
