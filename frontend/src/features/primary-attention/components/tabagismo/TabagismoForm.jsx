import { FormField, fieldCls } from "../FormField.jsx";
import { MetricCard } from "../MetricCard.jsx";
import { IndicadoresGrid } from "./IndicadoresGrid.jsx";
import { useTabagismoForm } from "../../hooks/useTabagismoForm.js";
import { MESES_TABAGISMO } from "../../config/tabagismo.config.js";

export function TabagismoForm({ onSuccess }) {
  //
  const { form, handleSubmit, totalPacientes, errors, isSubmitting } = useTabagismoForm({ onSuccess });
  const { register, control, watch } = form;
  const unidadesAtivas = watch("unidadesSaude") || 0;
  //
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Dados Mensais do Programa Tabagismo
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
                {MESES_TABAGISMO.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Indicadores de Atendimento
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Preencha os dados quantitativos referentes ao mês selecionado acima.
          </p>
          <IndicadoresGrid control={control} errors={errors} />

          <div className="grid grid-cols-2 gap-3 mt-6">
            <MetricCard
              label="Total de pacientes (Masc + Fem)"
              value={String(totalPacientes)}
            />
            <MetricCard
              label="Unidades ativas"
              value={String(unidadesAtivas)}
              accent
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => form.reset()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-150 cursor-pointer"
          >
            Limpar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Registrar
          </button>
        </div>
      </div>
    </form>
  );
}