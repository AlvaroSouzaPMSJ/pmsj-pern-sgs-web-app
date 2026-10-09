import { useState, useCallback } from "react";
import GNavbar from "../../../app/layouts/GNavbar.jsx";
import Footer from "../../../app/layouts/Footer.jsx";
import { TabagismoForm } from "../components/tabagismo/TabagismoForm.jsx";
import { RegistrosList } from "../components/tabagismo/RegistrosList.jsx";
import { useTabagismoStore } from "../store/tabagismo.store.js";
import { toRegistro } from "../mappers/tabagismo.mapper.js";

export default function TabagismoPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const registros = useTabagismoStore((s) => s.registros);
  const addRegistro = useTabagismoStore((s) => s.addRegistro);

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
            Áreas Estratégicas — Tabagismo
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Formulário de Entrada de Dados
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
            Dados do mês registrados com sucesso.
          </div>
        )}

        <TabagismoForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      <Footer />
    </main>
  );
}