// frontend/src/features/primary-attention/components/saudeBucalEstrategico/IndicadoresGrid.jsx
import { Controller } from "react-hook-form";
import { fieldCls } from "../FormField.jsx";
import { GRUPOS_SBE } from "../../config/saudeBucalEstrategico.config.js";

export function IndicadoresGrid({ control, errors }) {
  return (
    <>
      {GRUPOS_SBE.map((grupo) => (
        <div
          key={grupo.key}
          className="mt-8 border-t border-gray-200 pt-8 first:border-t-0 first:pt-0"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {grupo.titulo}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grupo.itens.map(({ key, label }) => {
              const fieldError = errors.indicadores?.[key];
              const inputId = `indicadores.${key}`;
              return (
                <div key={key}>
                  <label
                    htmlFor={inputId}
                    className="block text-xs font-medium text-gray-500 mb-1 truncate"
                    title={label}
                  >
                    {label}
                  </label>
                  <Controller
                    name={inputId}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id={inputId}
                        type="number"
                        min={0}
                        step="any"
                        inputMode="decimal"
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
        </div>
      ))}
    </>
  );
}