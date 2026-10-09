import { SISAB_INDICADORES } from "../../config/sisab.config.js";
import { formatPct } from "../../utils/sisab.utils.js";
import { useSisabStore } from "../../store/sisab.store.js";

export function RegistrosList({ registros }) {
  const removeRegistro = useSisabStore((s) => s.removeRegistro);

  if (registros.length === 0) return null;

  const headers = ["Competência", "Indicadores", "Metas atingidas", "Índice ponderado", "Ações"];

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros da sessão
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
          {registros.map((r) => (
            <tr
              key={r.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2.5 pr-4 text-gray-700 whitespace-nowrap font-medium">
                {r.competencia.ano} · {r.competencia.quadrimestre}
              </td>
              <td className="py-2.5 pr-4 text-gray-500 tabular-nums">
                {r.indicadores.length}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-500 tabular-nums">
                {r.metasAtingidas} / {SISAB_INDICADORES.length}
              </td>
              <td className="py-2.5 pr-4 text-right tabular-nums">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.indicePonderado >= 70
                      ? "bg-green-100 text-green-700"
                      : r.indicePonderado >= 40
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-600"
                  }`}
                >
                  {formatPct(r.indicePonderado)}
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
          ))}
        </tbody>
      </table>
    </div>
  );
}