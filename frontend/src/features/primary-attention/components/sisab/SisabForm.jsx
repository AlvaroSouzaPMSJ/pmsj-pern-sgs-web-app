import { FormField, fieldCls } from "../FormField.jsx";
import { MetricCard } from "../MetricCard.jsx";
import { IndicadorGrid } from "./IndicadorGrid.jsx";
import { useSisabForm } from "../../hooks/useSisabForm.js";
import { formatPct } from "../../utils/sisab.utils.js";
import {
  QUADRIMESTRES,
  SISAB_INDICADORES,
  ANO_MIN,
  ANO_MAX,
} from "../../config/sisab.config.js";

export function SisabForm({ onSuccess }) {
  const { form, handleSubmit, valores, indice, atingidas, preench } =
    useSisabForm({ onSuccess });

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Competência</h2>
          <p className="text-gray-500 text-sm mb-6">
            Um registro por ano e quadrimestre. Fonte dos indicadores: SISAB.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
            <FormField label="Ano" error={errors.ano?.message} htmlFor="ano">
              <input
                id="ano"
                type="number"
                min={ANO_MIN}
                max={ANO_MAX}
                {...register("ano")}
                className={fieldCls(!!errors.ano) + " text-center"}
              />
            </FormField>

            <FormField
              label="Quadrimestre"
              error={errors.quadrimestre?.message}
              htmlFor="quadrimestre"
            >
              <select
                id="quadrimestre"
                {...register("quadrimestre")}
                className={fieldCls(!!errors.quadrimestre)}
              >
                <option value="">Selecione o quadrimestre</option>
                {QUADRIMESTRES.map((q) => (
                  <option key={q.key} value={q.key}>{q.label}</option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Indicadores SISAB
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Informe o resultado (%) de cada indicador. Parâmetro, meta e peso
            são de referência e não são editáveis.
          </p>

          <IndicadorGrid control={control} errors={errors} valores={valores} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <MetricCard
              label="Indicadores preenchidos"
              value={`${preench} / ${SISAB_INDICADORES.length}`}
            />
            <MetricCard
              label="Metas atingidas"
              value={`${atingidas} / ${SISAB_INDICADORES.length}`}
            />
            <MetricCard
              label="Índice ponderado"
              value={formatPct(indice)}
              accent
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-150 cursor-pointer"
          >
            Limpar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Registrar competência
          </button>
        </div>
      </div>
    </form>
  );
}