// frontend/src/features/primary-attention/components/IndicadoresGrid.jsx
import { Controller } from "react-hook-form";
import { INDICADORES } from "../config/areasEstrategicas.config.js";
import { fieldCls } from "./FormField.jsx";

export function IndicadoresGrid({ blocoKey, control, errors }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      {INDICADORES[blocoKey].map(({ key, label, tipo }) => {
        const fieldError = errors.valores?.[key];
        const inputId = `valores.${key}`;
        return (
          <div key={key}>
            <label htmlFor={inputId} className="block text-xs font-medium text-gray-500 mb-1">
              {label}
            </label>
            <Controller
              name={`valores.${key}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={inputId}
                  type="number"
                  min={0}
                  step={tipo === "percentual" ? "0.01" : "1"}
                  inputMode={tipo === "percentual" ? "decimal" : "numeric"}
                  placeholder="—"
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(e.target.value === "" ? null : e.target.value)
                  }
                  className={fieldCls(!!fieldError) + " text-center"}
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