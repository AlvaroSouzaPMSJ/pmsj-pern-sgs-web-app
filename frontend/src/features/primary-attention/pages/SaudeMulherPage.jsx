// frontend/src/features/primary-attention/pages/SaudeMulherPage.jsx
import { useState, useCallback } from "react";
import GNavbar from "../../../app/layouts/GNavbar.jsx";
import Footer from "../../../app/layouts/Footer.jsx";
import { SaudeMulherForm } from "../components/saudeMulher/SaudeMulherForm.jsx";
import { RegistrosList } from "../components/saudeMulher/RegistrosList.jsx";
import { useSaudeMulherStore } from "../store/saudeMulher.store.js";
import { toRegistro } from "../mappers/saudeMulher.mapper.js";

export default function SaudeMulherPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const registros = useSaudeMulherStore((s) => s.registros);
  const addRegistro = useSaudeMulherStore((s) => s.addRegistro);

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
            Formulário de Indicadores Estratégicos
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Programa Saúde da Mulher — Núcleo de Estratégias e Indicadores
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
            Indicadores do mês registrados com sucesso.
          </div>
        )}

        <SaudeMulherForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      <Footer />
    </main>
  );
}