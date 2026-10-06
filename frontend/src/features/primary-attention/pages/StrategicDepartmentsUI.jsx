// frontend/src/features/primary-attention/pages/AreasEstrategicasPage.jsx
import { useState, useCallback } from "react";
import GNavbar from "../../../app/layouts/GNavbar.jsx";
import Footer from "../../../app/layouts/Footer.jsx";
import { AreasEstrategicasForm } from "../components/AreasEstrategicasForm.jsx";
import { RegistrosList } from "../components/RegistrosList.jsx";
import { useAreasEstrategicasStore } from "../store/areasEstrategicas.store.js";

export default function AreasEstrategicasPage() {
  const registros = useAreasEstrategicasStore((s) => s.registros);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback(() => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      <GNavbar />

      <section className="px-10 py-10">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Consultas e Avaliação Materno Infantil — áreas estratégicas da Atenção Primária
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

        <AreasEstrategicasForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      <Footer />
    </main>
  );
}