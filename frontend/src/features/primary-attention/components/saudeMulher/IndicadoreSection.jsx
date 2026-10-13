// frontend/src/features/primary-attention/components/saudeMulher/IndicadoresSection.jsx
import { Controller } from "react-hook-form";
import { fieldCls } from "../FormField.jsx";

export function IndicadoresSection({ title, indicadores, control, errors }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {indicadores.map(({ key, label, tipo }) => {
          const fieldError = errors?.[key];
          const step = tipo === "decimal" ? "0.01" : "1";
          const inputMode = tipo === "decimal" ? "decimal" : "numeric";

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
                    step={step}
                    min={0}
                    inputMode={inputMode}
                    placeholder="0"
                    className={fieldCls(!!fieldError) + " text-center"}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : Number(e.target.value)
                      )
                    }
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
    </div>
  );
}