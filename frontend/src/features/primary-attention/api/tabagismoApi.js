// frontend/src/features/primary-attention/api/tabagismoApi.js
import { apiClient } from "../../users/api/userApi.js";

export const tabagismoApi = {
  async create(payload) {
    const { data } = await apiClient.post(
      "/primary-attention/tabagismo",
      payload
    );
    return data;
  },
  async list() {
    const { data } = await apiClient.get("/primary-attention/tabagismo");
    return data;
  },
};