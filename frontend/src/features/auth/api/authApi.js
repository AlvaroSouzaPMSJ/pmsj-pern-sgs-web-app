import httpClient from "../../../app/api/httpClient";

export const authApi = {
  login: async (credentials) => {
    const response = await httpClient.post("/auth/login", credentials);
    return response.data;
  }
};