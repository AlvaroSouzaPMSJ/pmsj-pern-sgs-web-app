import { create } from "zustand";
import { authApi } from "../api/authApi.js";


export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  setAuth: (user, token) => {
    if (token) localStorage.setItem("accessToken", token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, token: null });
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login({ email, password });
      const { token, user } = response;
      localStorage.setItem("accessToken", token);
      set({ user, token, isLoading: false });
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || "Erro no login";
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },




}));