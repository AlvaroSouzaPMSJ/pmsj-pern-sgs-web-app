// frontend/src/features/primary-attention/components/saudeBucal/RegistrosList.jsx
import { useSaudeBucalStore } from "../../store/saudeBucal.store.js";

export function RegistrosList({ registros }) {
  const removeRegistro = useSaudeBucalStore((s) => s.removeRegistro);

  if (registros.length === 0) return null;

  // Dynamic columns from union of all indicator keys across records
  const allKeys = [];
  const seen = new Set();
  for (const r of registros) {
    for (const k of Object.keys(r.indicators || {})) {
      if (!seen.has(k)) {
        seen.add(k);
        allKeys.push(k);
      }
    }
  }

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros da sessão
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap">Unidade</th>
            <th className="text-left text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap">Mês</th>
            <th className="text-left text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap">Ano</th>
            {allKeys.map((k) => (
              <th
                key={k}
                className="text-left text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap"
                title={k}
              >
                {k.replace(/_/g, " ")}
              </th>
            ))}
            <th className="text-right text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap">Total</th>
            <th className="text-right text-xs font-medium text-gray-400 py-2 whitespace-nowrap">Ações</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr
              key={r.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2.5 pr-4 text-gray-700 whitespace-nowrap font-medium">
                {r.unit}
              </td>
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">{r.month}</td>
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">{r.currentYear}</td>
              {allKeys.map((k) => (
                <td key={k} className="py-2.5 pr-4 text-gray-600 tabular-nums">
                  {r.indicators?.[k] ?? 0}
                </td>
              ))}
              <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                {r.total}
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
          ))}
        </tbody>
      </table>
    </div>
  );
}