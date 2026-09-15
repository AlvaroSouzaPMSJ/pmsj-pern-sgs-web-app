import { create } from "zustand";
import * as api from "../api/CaseReport.api.js";

export const SubmissionStatus = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const INITIAL_FORM_DATA = {};

export const useCaseReportStore = create((set, get) => ({
  formData: INITIAL_FORM_DATA,
  status: SubmissionStatus.IDLE,

  setField: (key, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [key]: value,
      },
    })),

  reset: () =>
    set({
      formData: INITIAL_FORM_DATA,
      status: SubmissionStatus.IDLE,
    }),

  submit: async () => {
    set({ status: SubmissionStatus.LOADING });
    try {
      await api.createCaseReport(get().formData);
      set({ status: SubmissionStatus.SUCCESS });
      return true;
    } catch {
      set({ status: SubmissionStatus.ERROR });
      return false;
    }
  },
}));