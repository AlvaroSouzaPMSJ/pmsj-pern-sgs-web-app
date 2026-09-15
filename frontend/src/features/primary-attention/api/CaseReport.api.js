import { formToDocument } from "../mappers/CaseReport.mappers.js"

export const createCaseReport = async (payload) => {
  const { data } = await httpClient.post(
    "/api/case-reports",
    formToDocument(payload),  // shape transformation happens here
  );
  return data;
};

export const getAllCaseReports = async () => {
  const { data } = await httpClient.get("/api/case-reports");
  return data;
};

export const getCaseReportById = async (id) => {
  const { data } = await httpClient.get(`/api/case-reports/${id}`);
  return data;
};

export const updateCaseReport = async (id, payload) => {
  const { data } = await httpClient.patch(
    `/api/case-reports/${id}`,
    formToDocument(payload),
  );
  return data;
};

export const deleteCaseReport = async (id) => {
  await httpClient.delete(`/api/case-reports/${id}`);
};