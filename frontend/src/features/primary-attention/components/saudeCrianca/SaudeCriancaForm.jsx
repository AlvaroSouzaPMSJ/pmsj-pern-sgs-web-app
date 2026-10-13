// frontend/src/features/primary-attention/components/saudeCrianca/SaudeCriancaForm.jsx
import { FormField, fieldCls } from "../FormField.jsx";
import { MetricCard } from "../MetricCard.jsx";
import { IndicadoresGrid } from "./IndicadoresGrid.jsx";
import { useSaudeCriancaForm } from "../../hooks/useSaudeCriancaForm.js";
import {
  MESES_SC,
  INDICADORES_GERAIS,
  INDICADORES_POLI,
} from "../../config/saudeCrianca.config.js";

export function SaudeCriancaForm({ onSuccess }) {
  const { form, handleSubmit, totalGeral, totalPoli, errors, isSubmitting } =
    useSaudeCriancaForm({ onSuccess });

  const { register, control, reset } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-md p-8 bg-white shadow-sm space-y-8">
        {/* Identificação */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Identificação do Período
          </h2>
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
                {MESES_SC.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Nº Sequencial do Mês"
              error={errors.sequencia?.message}
              htmlFor="sequencia"
            >
              <input
                id="sequencia"
                type="number"
                min={1}
                {...register("sequencia")}
                className={fieldCls(!!errors.sequencia) + " text-center"}
              />
            </FormField>
          </div>
        </div>

        {/* Indicadores Gerais */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Indicadores Gerais (Saúde da Criança)
          </h2>
          <IndicadoresGrid
            control={control}
            errors={errors}
            list={INDICADORES_GERAIS}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            <MetricCard
              label="Total Geral do Mês"
              value={String(totalGeral)}
              accent
            />
          </div>
        </div>

        {/* Dados Importados — Poli Forquilhinhas */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Dados Importados (Poli Forquilhinhas)
          </h2>
          <IndicadoresGrid
            control={control}
            errors={errors}
            list={INDICADORES_POLI}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
            <MetricCard
              label="Total Poli Forquilhinhas"
              value={String(totalPoli)}
              accent
            />
          </div>
        </div>

        {/* Actions */}
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
            Registrar Indicadores
          </button>
        </div>
      </div>
    </form>
  );
}