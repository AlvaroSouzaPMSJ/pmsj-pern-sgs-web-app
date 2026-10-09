import { apiClient } from "../../users/api/userApi.js";

export const sisabApi = {
  async create(payload) {
    const { data } = await apiClient.post("/primary-attention/sisab", payload);
    return data;
  },
  async list() {
    const { data } = await apiClient.get("/primary-attention/sisab");
    return data;
  },
};