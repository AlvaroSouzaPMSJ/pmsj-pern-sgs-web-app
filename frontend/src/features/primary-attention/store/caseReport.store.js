// frontend/src/features/primary-attention/store/caseReport.store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TOTAL_CASE_REPORT_STEPS } from "../config/caseReportPages.js";

const initialState = {
  step: 0,
  totalSteps: TOTAL_CASE_REPORT_STEPS,
  formData: {},
  status: "idle", // idle | loading | success | error
  error: null,
};

export const useCaseReportStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setField: (key, value) =>
        set((state) => ({
          formData: { ...state.formData, [key]: value },
        })),

      next: () => {
        const { step, totalSteps } = get();
        if (step < totalSteps - 1) set({ step: step + 1 });
      },

      prev: () => {
        const { step } = get();
        if (step > 0) set({ step: step - 1 });
      },

      setStatus: (status, error = null) => set({ status, error }),

      reset: () => set({ ...initialState }),
    }),
    {
      name: "sgs-syphilis-report",
      storage: createJSONStorage(() => sessionStorage),
      // Don't persist the submission status — only the form draft
      partialize: (state) => ({
        step: state.step,
        formData: state.formData,
      }),
    }
  )
);