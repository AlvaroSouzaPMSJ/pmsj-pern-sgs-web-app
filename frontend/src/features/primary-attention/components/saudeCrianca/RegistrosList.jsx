// frontend/src/features/primary-attention/components/saudeCrianca/RegistrosList.jsx
import { useSaudeCriancaStore } from "../../store/saudeCrianca.store.js";
import { totalGeral, totalPoli, preenchidosCount } from "../../utils/saudeCrianca.utils.js";

export function RegistrosList({ registros }) {
  const removeRegistro = useSaudeCriancaStore((s) => s.removeRegistro);

  if (registros.length === 0) return null;

  const headers = ["Mês", "Seq.", "Total Geral", "Total Poli", "Registros", "Ações"];

  return (
    <div className="border border-gray-300 rounded-md p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros da Sessão
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {headers.map((h, i) => (
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
            const totalG = totalGeral(r.indicadores);
            const totalP = totalPoli(r.indicadores);
            const filled = preenchidosCount(r.indicadores);

            return (
              <tr
                key={r.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">{r.mes}</td>
                <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">{r.sequencia}</td>
                <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">{totalG}</td>
                <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">{totalP}</td>
                <td className="py-2.5 pr-4 text-right tabular-nums">
                  <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-medium">
                    {filled} preenchidos
                  </span>
                </td>
                <td className="py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => removeRegistro(r.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium cursor-pointer"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}