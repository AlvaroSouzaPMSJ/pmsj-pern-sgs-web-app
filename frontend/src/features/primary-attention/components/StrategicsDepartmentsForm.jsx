// frontend/src/features/primary-attention/components/AreasEstrategicasForm.jsx
import { useWatch } from "react-hook-form";
import { BLOCOS, MESES, ANOS, INDICADORES } from "../config/areasEstrategicas.config.js";
import { FormField, fieldCls } from "./FormField.jsx";
import { MetricCard } from "./MetricCard.jsx";
import { ErrorBanner } from "./ErrorBanner.jsx";
import { IndicadoresGrid } from "./IndicadoresGrid.jsx";
import { DerivadosGrid } from "./DerivadosGrid.jsx";
import { useAreasEstrategicasForm } from "../hooks/useAreasEstrategicasForm.js";
import { seedValores } from "../utils/areasEstrategicas.utils.js";

const DEFAULT_VALUES = {
  bloco: "consultas",
  mes: "",
  ano: 2026,
  valores: seedValores("consultas"),
};

export function AreasEstrategicasForm({ onSuccess }) {
  const {
    form,
    handleSubmit,
    bloco,
    preenchidos,
    totalIndicadores,
    derivados,
    erroDuplicado,
    erroServidor,
  } = useAreasEstrategicasForm({ onSuccess });

  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const mesValue = useWatch({ control, name: "mes" });
  const anoValue = useWatch({ control, name: "ano" });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Identificação da Competência
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField label="Bloco" error={errors.bloco?.message} htmlFor="bloco">
              <select id="bloco" {...register("bloco")} className={fieldCls(!!errors.bloco)}>
                {BLOCOS.map(({ key, label }) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Mês de Competência" error={errors.mes?.message} htmlFor="mes">
              <select id="mes" {...register("mes")} className={fieldCls(!!errors.mes)}>
                <option value="">Selecione o mês</option>
                {MESES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Ano" error={errors.ano?.message} htmlFor="ano">
              <select id="ano" {...register("ano")} className={fieldCls(!!errors.ano)}>
                {ANOS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {BLOCOS.find((b) => b.key === bloco)?.label}
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Deixe em branco os indicadores sem dado disponível — campo vazio é
            registrado como “sem informação”, não como zero.
          </p>
          <IndicadoresGrid blocoKey={bloco} control={control} errors={errors} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <MetricCard label="Indicadores preenchidos" value={`${preenchidos}/${totalIndicadores}`} />
            <MetricCard label="Competência" value={`${mesValue || "—"} / ${anoValue}`} accent />
          </div>
        </div>

        <DerivadosGrid derivados={derivados} />

        <ErrorBanner message={erroDuplicado} />
        <ErrorBanner message={erroServidor} />

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => form.reset({ ...DEFAULT_VALUES, bloco, valores: seedValores(bloco) })}
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