// frontend/src/features/primary-attention/pages/SaudeBucalPage.jsx
import { useState, useCallback } from "react";
import GNavbar from "../../../app/layouts/GNavbar.jsx";
import Footer from "../../../app/layouts/Footer.jsx";
import { SaudeBucalForm } from "../components/saudeBucal/SaudeBucalForm.jsx";
import { RegistrosList } from "../components/saudeBucal/RegistrosList.jsx";
import { useSaudeBucalStore } from "../store/saudeBucal.store.js";
import { toRegistro } from "../mappers/saudeBucal.mapper.js";
import { DEFAULT_UNIDADE } from "../config/saudeBucal.config.js";

export default function SaudeBucalPage() {
  const [unit, setUnit] = useState(DEFAULT_UNIDADE);
  const [showSuccess, setShowSuccess] = useState(false);

  const registros = useSaudeBucalStore((s) => s.registros);
  const addRegistro = useSaudeBucalStore((s) => s.addRegistro);

  const handleSuccess = useCallback(
    (data) => {
      addRegistro(toRegistro(data, unit));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    [addRegistro, unit]
  );

  return (
    <main className="bg-gray-100 min-h-screen">
      <GNavbar />

      <section className="px-8 py-6">
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-3xl font-bold text-gray-900 mt-8">
            Saúde Bucal CEOs — Formulário de Entrada de Dados
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Registro mensal de indicadores por unidade de saúde bucal
          </p>
        </div>
      </section>

      <section className="px-8 pb-10 space-y-6">
        {showSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm font-medium text-green-700"
          >
            Indicadores registrados com sucesso.
          </div>
        )}

        <SaudeBucalForm
          key={unit}
          unit={unit}
          onUnitChange={setUnit}
          onSuccess={handleSuccess}
        />
        <RegistrosList registros={registros} />
      </section>

      <Footer />
    </main>
  );
}