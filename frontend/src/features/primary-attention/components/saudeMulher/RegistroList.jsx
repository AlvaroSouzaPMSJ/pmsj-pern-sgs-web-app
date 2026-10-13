// frontend/src/features/primary-attention/components/saudeMulher/RegistrosList.jsx
import { useSaudeMulherStore } from "../../store/saudeMulher.store.js";

export function RegistrosList({ registros }) {
  const removeRegistro = useSaudeMulherStore((s) => s.removeRegistro);

  if (registros.length === 0) return null;

  const headers = [
    "Mês",
    "Gest. 1º Tri.",
    "DIU",
    "Pré-Natal (Médico)",
    "Mortalidade",
    "Ações",
  ];

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros de Indicadores
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {headers.map((h) => (
              <th
                key={h}
                className="text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap text-left"
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
              <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">{r.mes}</td>
              <td className="py-2.5 pr-4 text-gray-800 tabular-nums">{r.gestantesPrimeiroTrimestre}</td>
              <td className="py-2.5 pr-4 text-gray-800 tabular-nums">{r.mulheres14a49InsercaoDIU}</td>
              <td className="py-2.5 pr-4 text-gray-800 tabular-nums">{r.consultasPreNatalMedicoESF}</td>
              <td className="py-2.5 pr-4 text-gray-800 tabular-nums">{r.razaoMortalidadeMaterna}</td>
              <td className="py-2.5 pr-4 text-right">
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