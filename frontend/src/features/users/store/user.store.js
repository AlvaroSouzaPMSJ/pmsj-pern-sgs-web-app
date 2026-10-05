// frontend/src/features/users/store/user.store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (user, token) => set({ user, token }),
      clearAuth: () => set({ user: null, token: null }),

      // Convenience selector — used by route guards
      isAuthenticated: () => !!get()?.token,
    }),
    {
      name: "sgs-auth", // key in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);