// frontend/src/features/primary-attention/components/saudeBucalEstrategico/SaudeBucalEstrategicoForm.jsx
import { FormField, fieldCls } from "../FormField.jsx";
import { IndicadoresGrid } from "./IndicadoresGrid.jsx";
import { useSaudeBucalEstrategicoForm } from "../../hooks/useSaudeBucalEstrategicoForm.js";
import {
  MESES_SBE,
  ANO_MIN_SBE,
  ANO_MAX_SBE,
} from "../../config/saudeBucalEstrategico.config.js";

export function SaudeBucalEstrategicoForm({ onSuccess }) {
  const { form, handleSubmit, errors, isSubmitting } =
    useSaudeBucalEstrategicoForm({ onSuccess });

  const { register, control, reset } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
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
                {MESES_SBE.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Ano" error={errors.ano?.message} htmlFor="ano">
              <input
                id="ano"
                type="number"
                min={ANO_MIN_SBE}
                max={ANO_MAX_SBE}
                {...register("ano")}
                className={fieldCls(!!errors.ano) + " text-center"}
              />
            </FormField>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Indicadores Estratégicos
          </h2>
          <IndicadoresGrid control={control} errors={errors} />
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
            Registrar Período
          </button>
        </div>
      </div>
    </form>
  );
}