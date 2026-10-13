// frontend/src/features/primary-attention/pages/SaudeBucalEstrategicoPage.jsx
import { useState, useCallback } from "react";
import GNavbar from "../../../app/layouts/GNavbar.jsx";
import Footer from "../../../app/layouts/Footer.jsx";
import { SaudeBucalEstrategicoForm } from "../components/saudeBucalEstrategico/SaudeBucalEstrategicoForm.jsx";
import { RegistrosList } from "../components/saudeBucalEstrategico/RegistrosList.jsx";
import { useSaudeBucalEstrategicoStore } from "../store/saudeBucalEstrategico.store.js";
import { toRegistro } from "../mappers/saudeBucalEstrategico.mapper.js";

export default function SaudeBucalEstrategicoPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const registros = useSaudeBucalEstrategicoStore((s) => s.registros);
  const addRegistro = useSaudeBucalEstrategicoStore((s) => s.addRegistro);

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
            Saúde Bucal — Formulário de Indicadores Estratégicos
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Registro de dados e monitoramento do Programa Saúde Bucal
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
            Período e indicadores registrados com sucesso.
          </div>
        )}

        <SaudeBucalEstrategicoForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      <Footer />
    </main>
  );
}