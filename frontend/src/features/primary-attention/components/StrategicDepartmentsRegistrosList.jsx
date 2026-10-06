// frontend/src/features/primary-attention/components/RegistrosList.jsx
import { BLOCOS, INDICADORES } from "../config/areasEstrategicas.config.js";
import { contarPreenchidos } from "../utils/areasEstrategicas.utils.js";

export function RegistrosList({ registros }) {
  if (registros.length === 0) return null;

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Registros da sessão</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Bloco", "Competência", "Preenchidos", "Registrado em"].map((h, i) => (
              <th
                key={h}
                className={`text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap ${
                  i >= 2 ? "text-right" : "text-left"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => {
            const total = INDICADORES[r.bloco].length;
            const preenchidos = contarPreenchidos(r.valores);
            return (
              <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-2.5 pr-4 text-gray-800 whitespace-nowrap">
                  {BLOCOS.find((b) => b.key === r.bloco)?.label}
                </td>
                <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                  {r.competencia.mes}/{r.competencia.ano}
                </td>
                <td className="py-2.5 pr-4 text-right tabular-nums">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      preenchidos === total
                        ? "bg-green-100 text-green-700"
                        : preenchidos > 0
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {preenchidos}/{total}
                  </span>
                </td>
                <td className="py-2.5 text-right text-gray-500 whitespace-nowrap tabular-nums">
                  {new Date(r.criadoEm).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}