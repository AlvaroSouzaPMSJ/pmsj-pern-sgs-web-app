// frontend/src/features/primary-attention/components/saudeCrianca/IndicadoresGrid.jsx
import { Controller } from "react-hook-form";
import { fieldCls } from "../FormField.jsx";

export function IndicadoresGrid({ control, errors, list }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {list.map(({ key, label }) => {
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