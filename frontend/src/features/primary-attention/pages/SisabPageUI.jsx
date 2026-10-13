// frontend/src/features/primary-attention/pages/SisabPage.jsx
import { useState, useCallback } from "react";
import GNavbar from "../../../app/layouts/GNavbar.jsx";
import Footer from "../../../app/layouts/Footer.jsx";
import { SisabForm } from "../components/sisab/SisabForm.jsx";
import { RegistrosList } from "../components/sisab/RegistrosList.jsx";
import { useSisabStore } from "../store/sisab.store.js";
import { toRegistro } from "../mappers/sisab.mapper.js";

export default function SisabPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const registros = useSisabStore((s) => s.registros);
  const addRegistro = useSisabStore((s) => s.addRegistro);

  const handleSuccess = useCallback(
    (data) => {
      addRegistro(toRegistro(data));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    [addRegistro]
  );

  return (
    <main className="bg-gray-100 min-h-screen">
      <GNavbar />

      <section className="px-10 py-8">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Indicadores quadrimestrais SISAB — Atenção Primária à Saúde (APS)
          </p>
        </div>
      </section>

      <section className="px-10 pb-10 space-y-6">
        {showSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm font-medium text-green-700"
          >
            Competência registrada com sucesso.
          </div>
        )}

        <SisabForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      <Footer />
    </main>
  );
}