import { Controller } from "react-hook-form";
import { INDICADORES_TABAGISMO } from "../../config/tabagismo.config.js";
import { fieldCls } from "../FormField.jsx";

export function IndicadoresGrid({ control, errors }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {INDICADORES_TABAGISMO.map(({ key, label, tipo }) => {
        const fieldError = errors?.[key];
        return (
          <div key={key}>
            <label
              htmlFor={key}
              className="block text-xs font-medium text-gray-500 mb-1 truncate"
              title={label}
            >
              {label}
            </label>
            <Controller
              name={key}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={key}
                  type="number"
                  min={0}
                  max={tipo === "percentual" ? 100 : undefined}
                  step={tipo === "percentual" ? "0.01" : "1"}
                  inputMode={tipo === "percentual" ? "decimal" : "numeric"}
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