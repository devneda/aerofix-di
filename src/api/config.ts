export const API_BASE_URL = "http://localhost:8080/api";

export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
};

export const getAuthHeaders = (token: string | null) => {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
