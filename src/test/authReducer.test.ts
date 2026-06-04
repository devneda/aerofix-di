import { describe, it, expect } from "vitest";

import { authReducer } from "../auth/AuthContext";

describe("authReducer", () => {
  const initialState = {
    token: null,
    user: null,
    loadingSession: false,
    error: null,
  };

  it("debe manejar AUTH_START", () => {
    const action = { type: "AUTH_START" } as any;
    const newState = authReducer(initialState, action);
    expect(newState.loadingSession).toBe(true);
    expect(newState.error).toBeNull();
  });

  it("debe manejar AUTH_SUCCESS", () => {
    const user = { email: "test@test.com", role: "admin" };
    const action = { type: "AUTH_SUCCESS", payload: { token: "123", user } } as any;
    const newState = authReducer(initialState, action);
    expect(newState.token).toBe("123");
    expect(newState.user).toEqual(user);
    expect(newState.loadingSession).toBe(false);
  });

  it("debe manejar AUTH_ERROR", () => {
    const action = { type: "AUTH_ERROR", payload: "Error de login" } as any;
    const newState = authReducer(initialState, action);
    expect(newState.error).toBe("Error de login");
    expect(newState.loadingSession).toBe(false);
  });

  it("debe manejar LOGOUT", () => {
    const loggedInState = { token: "123", user: { email: "a@a.com" }, loadingSession: false, error: null };
    const action = { type: "LOGOUT" } as any;
    const newState = authReducer(loggedInState, action);
    expect(newState.token).toBeNull();
    expect(newState.user).toBeNull();
  });
});
