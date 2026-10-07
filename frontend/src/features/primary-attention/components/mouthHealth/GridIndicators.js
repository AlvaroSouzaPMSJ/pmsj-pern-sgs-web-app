// frontend/src/features/primary-attention/components/saudeBucal/IndicadoresGrid.jsx
import { Controller } from "react-hook-form";
import { INDICADORES_POR_UNIDADE } from "../../config/saudeBucal.config.js";
import { fieldCls } from "../FormField.jsx";

export function IndicadoresGrid({ unit, control, errors }) {
  const indicators = INDICADORES_POR_UNIDADE[unit] || [];

  if (!indicators.length) {
    return (
      <p className="text-sm text-gray-400 italic">
        Nenhum indicador cadastrado para esta unidade.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {indicators.map(({ key, label }) => {
        const fieldError = errors.indicators?.[key];
        return (
          <div key={key}>
            <label
              htmlFor={`indicators.${key}`}
              className="block text-xs font-medium text-gray-500 mb-1 truncate"
              title={label}
            >
              {label}
            </label>
            <Controller
              name={`indicators.${key}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={`indicators.${key}`}
                  type="number"
                  min={0}
                  inputMode="numeric"
                  className={fieldCls(!!fieldError) + " text-center"}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
            {fieldError && (
              <p className="text-xs text-red-500 mt-1">{fieldError.message}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}