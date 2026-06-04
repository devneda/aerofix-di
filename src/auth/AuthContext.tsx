import { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from "react";
import type { AuthUser, LoginRequest, RegisterRequest } from "../types/auth";
import {
  clearToken,
  getToken,
  loginRequest,
  meRequest,
  registerRequest,
  saveToken,
} from "./authApi";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  loadingSession: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: { token: string; user: AuthUser } }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SESSION_LOADED"; payload: { user: AuthUser | null } };

const initialState: AuthState = {
  token: getToken(),
  user: null,
  loadingSession: true,
  error: null,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loadingSession: true, error: null };
    case "AUTH_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loadingSession: false,
        error: null,
      };
    case "AUTH_ERROR":
      return { ...state, error: action.payload, loadingSession: false };
    case "LOGOUT":
      return { ...state, token: null, user: null, loadingSession: false };
    case "SESSION_LOADED":
      return { ...state, user: action.payload.user, loadingSession: false };
    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const logout = useCallback(() => {
    clearToken();
    dispatch({ type: "LOGOUT" });
  }, []);

  const login = useCallback(async (payload: LoginRequest) => {
    dispatch({ type: "AUTH_START" });
    try {
      const token = await loginRequest(payload);
      saveToken(token);
      const user = await meRequest(token);
      dispatch({ type: "AUTH_SUCCESS", payload: { token, user } });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al iniciar sesión";
      dispatch({ type: "AUTH_ERROR", payload: message });
      throw err;
    }
  }, []);

  const register = useCallback(async (payload: RegisterRequest) => {
    dispatch({ type: "AUTH_START" });
    try {
      let token: string;
      try {
        token = await registerRequest(payload);
      } catch (err) {
        const message = err instanceof Error ? err.message : "";
        if (message !== "La API no devolvio token.") throw err;
        token = await loginRequest({ email: payload.email, password: payload.password });
      }
      saveToken(token);
      const user = await meRequest(token);
      dispatch({ type: "AUTH_SUCCESS", payload: { token, user } });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al registrarse";
      dispatch({ type: "AUTH_ERROR", payload: message });
      throw err;
    }
  }, []);

  useEffect(() => {
    if (!state.token) {
      dispatch({ type: "SESSION_LOADED", payload: { user: null } });
      return;
    }

    meRequest(state.token)
      .then((user) => {
        dispatch({ type: "SESSION_LOADED", payload: { user } });
      })
      .catch(() => {
        logout();
      });
  }, [logout, state.token]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
