// frontend/src/features/primary-attention/api/areasEstrategicasApi.js
import { apiClient } from "../../users/api/userApi.js";

export const areasEstrategicasApi = {
  /**
   * @param {{ bloco: string, mes: string, ano: number }} q
   * @returns {Promise<{ duplicado: boolean }>}
   */
  async checkDuplicate({ bloco, mes, ano }) {
    const { data } = await apiClient.get("/primary-attention/areas-estrategicas/check", {
      params: { bloco, mes, ano },
    });
    return data;
  },

  async create(payload) {
    const { data } = await apiClient.post("/primary-attention/areas-estrategicas", payload);
    return data;
  },

  async list() {
    const { data } = await apiClient.get("/primary-attention/areas-estrategicas");
    return data;
  },
};