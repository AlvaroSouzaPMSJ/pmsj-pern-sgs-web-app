// frontend/src/features/primary-attention/components/sisab/IndicadorGrid.jsx
import { SISAB_INDICADORES } from "../../config/sisab.config.js";
import { IndicadorRow } from "./IndicadorRow.jsx";

export function IndicadorGrid({ control, errors, valores }) {
  return (
    <div className="space-y-3">
      {SISAB_INDICADORES.map((indicador) => (
        <IndicadorRow
          key={indicador.key}
          indicador={indicador}
          control={control}
          error={errors.valores?.[indicador.key]}
          valorAtual={valores?.[indicador.key]}
        />
      ))}
    </div>
  );
}