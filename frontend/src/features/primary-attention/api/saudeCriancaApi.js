// frontend/src/features/primary-attention/api/saudeCriancaApi.js
import { apiClient } from "../../users/api/userApi.js";

export const saudeCriancaApi = {
  async create(payload) {
    const { data } = await apiClient.post(
      "/primary-attention/saude-crianca",
      payload
    );
    return data;
  },
  async list() {
    const { data } = await apiClient.get("/primary-attention/saude-crianca");
    return data;
  },
};