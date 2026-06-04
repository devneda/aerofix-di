export const API_BASE_URL = "http://localhost:8080/api";

export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
};
