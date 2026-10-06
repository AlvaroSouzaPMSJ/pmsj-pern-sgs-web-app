// frontend/src/features/primary-attention/hooks/useCaseReportForm.js
import { useCallback } from "react";
import { useCaseReportStore } from "../store/caseReport.store.js";
import { caseReportApi } from "../api/caseReportApi.js";
import { toApiPayload } from "../mappers/caseReportMapper.js";
import { CASE_REPORT_PAGES } from "../config/caseReportPages.js";

/**
 * Validates required fields for the CURRENT step only.
 * Returns array of missing field keys.
 */
const validateStep = (step, formData) => {
  const page = CASE_REPORT_PAGES[step];
  if (!page) return [];

  return page.fields
    .filter((f) => f.required && !formData[f.key])
    .map((f) => f.key);
};

export const useCaseReportForm = () => {
  const step = useCaseReportStore((s) => s.step);
  const totalSteps = useCaseReportStore((s) => s.totalSteps);
  const formData = useCaseReportStore((s) => s.formData);
  const status = useCaseReportStore((s) => s.status);
  const error = useCaseReportStore((s) => s.error);

  const setField = useCaseReportStore((s) => s.setField);
  const next = useCaseReportStore((s) => s.next);
  const prev = useCaseReportStore((s) => s.prev);
  const reset = useCaseReportStore((s) => s.reset);
  const setStatus = useCaseReportStore((s) => s.setStatus);

  const submit = useCallback(async () => {
    // Validate all steps before sending
    for (let i = 0; i < CASE_REPORT_PAGES.length; i++) {
      const missing = validateStep(i, formData);
      if (missing.length > 0) {
        setStatus("error", `Preencha os campos obrigatórios da etapa ${i + 1}`);
        // Jump the user to the first invalid step
        useCaseReportStore.setState({ step: i });
        return false;
      }
    }

    setStatus("loading");
    try {
      const payload = toApiPayload(formData);
      await caseReportApi.createSyphilisReport(payload);
      setStatus("success");
      return true;
    } catch (err) {
      setStatus(
        "error",
        err.response?.data?.message || "Erro ao enviar a notificação."
      );
      return false;
    }
  }, [formData, setStatus]);

  return {
    step,
    totalSteps,
    formData,
    status,
    error,
    setField,
    next,
    prev,
    reset,
    submit,
  };
};