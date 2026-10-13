// frontend/src/features/primary-attention/api/saudeBucalEstrategicoApi.js
import { apiClient } from "../../users/api/userApi.js";

export const saudeBucalEstrategicoApi = {
  async create(payload) {
    const { data } = await apiClient.post(
      "/primary-attention/saude-bucal-estrategico",
      payload
    );
    return data;
  },
  async list() {
    const { data } = await apiClient.get(
      "/primary-attention/saude-bucal-estrategico"
    );
    return data;
  },
};