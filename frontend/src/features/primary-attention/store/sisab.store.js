
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSisabStore = create(
  persist(
    (set) => ({
      registros: [],
      addRegistro: (r) => set((s) => ({ registros: [r, ...s.registros] })),
      removeRegistro: (id) =>
        set((s) => ({ registros: s.registros.filter((r) => r.id !== id) })),
      clear: () => set({ registros: [] }),
    }),
    {
      name: "sgs-sisab",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({ registros: s.registros }),
    }
  )
);