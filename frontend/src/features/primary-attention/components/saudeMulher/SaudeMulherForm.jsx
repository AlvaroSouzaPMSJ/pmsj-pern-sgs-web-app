// frontend/src/features/primary-attention/components/saudeMulher/SaudeMulherForm.jsx
import { FormField, fieldCls } from "../FormField.jsx";
import { MetricCard } from "../MetricCard.jsx";
import { IndicadoresSection } from "./IndicadoresSection.jsx";
import { useSaudeMulherForm } from "../../hooks/useSaudeMulherForm.js";
import {
  MESES_SM,
  GRUPOS_SAUDE_MULHER,
} from "../../config/saudeMulher.config.js";

export function SaudeMulherForm({ onSuccess }) {
  const { form, handleSubmit, total, errors, isSubmitting } =
    useSaudeMulherForm({ onSuccess });

  const { register, control, reset } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        {/* Identificação */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Identificação</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              label="Mês de Referência"
              error={errors.mes?.message}
              htmlFor="mes"
            >
              <select
                id="mes"
                {...register("mes")}
                className={fieldCls(!!errors.mes)}
              >
                <option value="">Selecione o mês</option>
                {MESES_SM.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* Indicator groups */}
        {GRUPOS_SAUDE_MULHER.map((grupo) => (
          <IndicadoresSection
            key={grupo.key}
            title={grupo.title}
            indicadores={grupo.indicadores}
            control={control}
            errors={errors}
          />
        ))}

        {/* Metrics & actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 border-t border-gray-200 pt-6">
          <div className="w-full sm:w-1/3">
            <MetricCard
              label="Total geral (somatório base)"
              value={String(total)}
              accent
            />
          </div>

          <div className="flex justify-end gap-3 self-center mt-4 sm:mt-0">
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
              Registrar indicadores
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}