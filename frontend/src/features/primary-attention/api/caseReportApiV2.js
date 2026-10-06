// frontend/src/features/primary-attention/api/caseReportApi.js
import { apiClient } from "../../users/api/userApi.js";

export const caseReportApi = {
  /**
   * POST a new syphilis case report.
   * @param {object} payload — already-mapped API shape
   */
  createSyphilisReport: async (payload) => {
    const { data } = await apiClient.post("/case-reports/syphilis", payload);
    return data;
  },

  /**
   * List reports (for future use)
   */
  list: async (params = {}) => {
    const { data } = await apiClient.get("/case-reports", { params });
    return data;
  },
};