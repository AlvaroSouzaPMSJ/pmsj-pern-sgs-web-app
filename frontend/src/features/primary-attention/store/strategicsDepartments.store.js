// frontend/src/features/primary-attention/store/areasEstrategicas.store.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAreasEstrategicasStore = create(
  persist(
    (set, get) => ({
      registros: [],

      addRegistro: (doc) =>
        set((state) => ({ registros: [doc, ...state.registros] })),

      clearRegistros: () => set({ registros: [] }),

      /** Mirror of the backend composite unique index. */
      isDuplicado: (bloco, mes, ano) =>
        get().registros.some(
          (r) =>
            r.bloco === bloco &&
            r.competencia.mes === mes &&
            r.competencia.ano === Number(ano)
        ),
    }),
    {
      name: "sgs-areas-estrategicas",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ registros: state.registros }),
    }
  )
);