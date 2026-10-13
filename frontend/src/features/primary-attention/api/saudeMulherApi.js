// frontend/src/features/primary-attention/api/saudeMulherApi.js
import { apiClient } from "../../users/api/userApi.js";

export const saudeMulherApi = {
  async create(payload) {
    const { data } = await apiClient.post("/primary-attention/saude-mulher", payload);
    return data;
  },
  async list() {
    const { data } = await apiClient.get("/primary-attention/saude-mulher");
    return data;
  },
};