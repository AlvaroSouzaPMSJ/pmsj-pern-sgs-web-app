// frontend/src/features/primary-attention/api/saudeBucalApi.js
import { apiClient } from "../../users/api/userApi.js";

export const saudeBucalApi = {
  async create(payload) {
    const { data } = await apiClient.post(
      "/primary-attention/saude-bucal",
      payload
    );
    return data;
  },
  async list() {
    const { data } = await apiClient.get("/primary-attention/saude-bucal");
    return data;
  },
};