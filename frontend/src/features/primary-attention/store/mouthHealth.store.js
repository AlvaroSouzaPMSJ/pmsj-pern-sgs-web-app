// frontend/src/features/primary-attention/store/saudeBucal.store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSaudeBucalStore = create(
  persist(
    (set) => ({
      registros: [],
      addRegistro: (r) => set((s) => ({ registros: [r, ...s.registros] })),
      removeRegistro: (id) =>
        set((s) => ({ registros: s.registros.filter((r) => r.id !== id) })),
      clear: () => set({ registros: [] }),
    }),
    {
      name: "sgs-saude-bucal",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({ registros: s.registros }),
    }
  )
);