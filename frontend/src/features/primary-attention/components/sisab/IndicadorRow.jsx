import { Controller } from "react-hook-form";
import { fieldCls } from "../FormField.jsx";
import { ReferenceChip } from "./ReferenceChip.jsx";
import { SituacaoBadge } from "./SituacaoBadge.jsx";
import { avaliaAlvo, toNumberOrNull, formatAlvo } from "../../utils/sisab.utils.js";

export function IndicadorRow({ indicador, control, error, valorAtual }) {
  const { key, numero, label, parametro, meta, peso } = indicador;
  const situacao = avaliaAlvo(toNumberOrNull(valorAtual), meta);

  return (
    <div className="border border-gray-200 rounded-lg p-4 sm:flex sm:items-start sm:gap-6">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800">
          <span className="font-semibold text-gray-400 mr-1.5 tabular-nums">
            {numero}.
          </span>
          {label}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <ReferenceChip label="Parâmetro" value={formatAlvo(parametro)} />
          <ReferenceChip label="Meta" value={formatAlvo(meta)} />
          <ReferenceChip label="Peso" value={String(peso)} />
        </div>
      </div>

      <div className="mt-4 sm:mt-0 sm:w-40 shrink-0">
        <label
          htmlFor={`valores.${key}`}
          className="block text-xs font-medium text-gray-500 mb-1"
        >
          Resultado (%)
        </label>
        <Controller
          name={`valores.${key}`}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id={`valores.${key}`}
              type="number"
              min={0}
              max={100}
              step="0.01"
              inputMode="decimal"
              placeholder="0,00"
              aria-invalid={!!error}
              className={fieldCls(!!error) + " text-center"}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        <div className="mt-2">
          <SituacaoBadge situacao={situacao} />
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error.message}</p>}
      </div>
    </div>
  );
}