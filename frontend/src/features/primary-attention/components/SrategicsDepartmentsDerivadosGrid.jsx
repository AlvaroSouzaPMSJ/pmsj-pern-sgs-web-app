// frontend/src/features/primary-attention/components/DerivadosGrid.jsx
import { MetricCard } from "./MetricCard.jsx";
import { formatPct, formatRazao } from "../utils/format.js";

export function DerivadosGrid({ derivados }) {
  if (derivados.length === 0) return null;
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Indicadores calculados
      </h2>
      <p className="text-xs text-gray-400 mb-6">
        Calculados automaticamente a partir dos valores informados — não são
        persistidos e serão recomputados nas análises.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {derivados.map(({ key, label, valor, formato }) => (
          <MetricCard
            key={key}
            label={label}
            value={formato === "percentual" ? formatPct(valor) : formatRazao(valor)}
            accent
          />
        ))}
      </div>
    </div>
  );
}