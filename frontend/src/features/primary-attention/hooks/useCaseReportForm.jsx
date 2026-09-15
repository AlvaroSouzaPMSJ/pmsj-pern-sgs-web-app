import { useState } from "react";
import { useCaseReportStore } from "../store/useCaseReportStore";
import { CASE_REPORT_PAGES } from "../config/CaseReportaPage.js";

export const useCaseReportForm = () => {
  const totalSteps = CASE_REPORT_PAGES.length;

  const [step, setStep] = useState(0);

  const { formData, setField, submit, status, reset } = useCaseReportStore();

  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return {
    step,
    totalSteps,
    formData,
    setField,
    next,
    prev,
    submit,
    status,
    reset,
  };
};