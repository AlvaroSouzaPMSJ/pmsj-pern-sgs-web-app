// frontend/src/features/primary-attention/components/saudeBucal/SaudeBucalForm.jsx
import { FormField, fieldCls } from "../FormField.jsx";
import { MetricCard } from "../MetricCard.jsx";
import { IndicadoresGrid } from "./IndicadoresGrid.jsx";
import { useSaudeBucalForm } from "../../hooks/useSaudeBucalForm.js";
import {
  MESES_SB,
  YEAR_OPTIONS,
  UNIDADES_SAUDE_BUCAL,
} from "../../config/saudeBucal.config.js";

export function SaudeBucalForm({ unit, onUnitChange, onSuccess }) {
  const { form, onSubmit, total, control, errors, isSubmitting, reset } =
    useSaudeBucalForm({ unit, onSuccess });

  const { register } = form;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="border border-gray-300 rounded-md p-8 bg-white shadow-sm space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Indicadores de Saúde Bucal
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FormField label="Selecionar Unidade" htmlFor="select-unit">
              <select
                id="select-unit"
                value={unit}
                onChange={(e) => onUnitChange(e.target.value)}
                className={fieldCls(false)}
              >
                {UNIDADES_SAUDE_BUCAL.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Mês de Referência"
              error={errors.month?.message}
              htmlFor="month"
            >
              <select id="month" {...register("month")} className={fieldCls(!!errors.month)}>
                <option value="">Selecione o mês</option>
                {MESES_SB.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Ano"
              error={errors.currentYear?.message}
              htmlFor="currentYear"
            >
              <select
                id="currentYear"
                {...register("currentYear")}
                className={fieldCls(!!errors.currentYear)}
              >
                <option value="">Selecione o ano</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Procedimentos e Consultas
          </h2>
          <IndicadoresGrid unit={unit} control={control} errors={errors} />

          <div className="grid grid-cols-2 gap-3 mt-6">
            <MetricCard label="Total de indicadores" value={String(total)} />
            <MetricCard label="Unidade" value={unit.split(" ")[0]} accent />
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
            Registrar indicadores
          </button>
        </div>
      </div>
    </form>
  );
}