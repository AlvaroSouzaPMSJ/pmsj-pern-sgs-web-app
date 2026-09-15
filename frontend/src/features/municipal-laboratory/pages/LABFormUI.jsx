import { useState, useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ROUTES } from "../../../app/routing/routes.constants";
import GNavbar from "../../../app/layouts/GNavbar";
import Footer from "../../../app/layouts/Footer";

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const MESES = /** @type {const} */ ([
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]);

const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - 4 + i).toString(),
);

const LABORATORIO_ITEMS = [
  { key: "usuarios_atendidos", label: "Usuários Atendidos" },
  { key: "exames_realizados", label: "Exames Realizados" },
  { key: "hemogramas", label: "Hemogramas realizados" },
  { key: "culturas_baar", label: "Culturas para BAAR" },
  {
    key: "procedimentos_baciloscopia_turberculose",
    label: "Procedimentos de baciloscopia da tuberculose",
  },
  {
    key: "exames_baciloscopia_hanseniase",
    label: "Exames de Baciloscopia da Hanseníase",
  },
  {
    key: "exames_vdrl_realizados_em_gestantes",
    label: "Exames VDRL Realizados em Gestantes",
  },
  {
    key: "exames_parasitológico_fezes",
    label: "Exames de Parasitológico Fezes",
  },
  { key: "exames_confirmatorios_HIV", label: "Exames Confirmatórios HIV" },
  { key: "exames_BHCG", label: "Exames BHCG" },
  { key: "hcv_rapido", label: "HCV Rápido" },
  { key: "hbs_ag_rapido", label: "HBS-AG Rápido" },
  {
    key: "exames_vdri_realizados_populacao_geral",
    label: "Número Absoluto de Exames VDRl Realizados na População em Geral.",
  },
  {
    key: "exames_ppd_prova_tuberculínica",
    label: "Número absoluto de exames PPD - Prova Tuberculínica.",
  },
  {
    key: "exames_hcg_quantitativo",
    label: "Número absoluto de exames HCG quantitativo.",
  },
  {
    key: "coletas_domiciliares",
    label: "Número absoluto de coletas domiciliares.",
  },
  {
    key: "coleta_exame_pcr_covid_19",
    label: "Número absoluto de coleta de exame PCR para COVID-19",
  },
  {
    key: "coleta_exame_pcr_para_dengue",
    label: "Número absoluto de coleta de exame PCR para DENGUE.",
  },
];

// ─── SCHEMA ─────────────────────────────────────────────────────────────────

const labSchema = z.object({
  sequencia: z.coerce.number().int().min(1),
  mes: z.enum(MESES),
  currentYear: z.enum(YEAR_OPTIONS),
  ano: z.coerce.number().int().min(2020), // added numeric year
  usuarios_atendidos: z.coerce.number().int().min(0),
  exames_realizados: z.coerce.number().int().min(0),
  hemogramas: z.coerce.number().int().min(0),
  culturas_baar: z.coerce.number().int().min(0),
  procedimentos_baciloscopia_turberculose: z.coerce.number().int().min(0),
  exames_baciloscopia_hanseniase: z.coerce.number().int().min(0),
  exames_vdrl_realizados_em_gestantes: z.coerce.number().int().min(0),
  exames_parasitológico_fezes: z.coerce.number().int().min(0),
  exames_confirmatorios_HIV: z.coerce.number().int().min(0),
  exames_BHCG: z.coerce.number().int().min(0),
  hcv_rapido: z.coerce.number().int().min(0),
  hbs_ag_rapido: z.coerce.number().int().min(0),
  exames_vdri_realizados_populacao_geral: z.coerce.number().int().min(0),
  exames_ppd_prova_tuberculínica: z.coerce.number().int().min(0),
  exames_hcg_quantitativo: z.coerce.number().int().min(0),
  coletas_domiciliares: z.coerce.number().int().min(0),
  coleta_exame_pcr_covid_19: z.coerce.number().int().min(0),
  coleta_exame_pcr_para_dengue: z.coerce.number().int().min(0),
});

// ─── UTILS ──────────────────────────────────────────────────────────────────

function buildLabRecord(values) {
  return {
    ...values,
    id: crypto.randomUUID(),
    criadoEm: new Date().toISOString(),
  };
}

// ─── HOOK ───────────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  mes: "",
  currentYear: "",
  sequencia: 1, // start at 1 to satisfy min(1)
  ano: new Date().getFullYear(), // added default numeric year
  usuarios_atendidos: 0,
  exames_realizados: 0,
  hemogramas: 0,
  culturas_baar: 0,
  procedimentos_baciloscopia_turberculose: 0,
  exames_baciloscopia_hanseniase: 0,
  exames_vdrl_realizados_em_gestantes: 0,
  exames_parasitológico_fezes: 0,
  exames_confirmatorios_HIV: 0,
  exames_BHCG: 0,
  hcv_rapido: 0,
  hbs_ag_rapido: 0,
  exames_vdri_realizados_populacao_geral: 0,
  exames_ppd_prova_tuberculínica: 0,
  exames_hcg_quantitativo: 0,
  coletas_domiciliares: 0,
  coleta_exame_pcr_covid_19: 0,
  coleta_exame_pcr_para_dengue: 0,
};

function useLabForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(labSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  // Watch only the lab metrics we need for real‑time card calculations
  const usuarios_atendidos = useWatch({
    control: form.control,
    name: "usuarios_atendidos",
  });
  const exames_realizados = useWatch({
    control: form.control,
    name: "exames_realizados",
  });
  const hemogramas = useWatch({ control: form.control, name: "hemogramas" });
  const culturas_baar = useWatch({
    control: form.control,
    name: "culturas_baar",
  });
  const procedimentos_baciloscopia_turberculose = useWatch({
    control: form.control,
    name: "procedimentos_baciloscopia_turberculose",
  });
  const exames_baciloscopia_hanseniase = useWatch({
    control: form.control,
    name: "exames_baciloscopia_hanseniase",
  });
  const exames_vdrl_realizados_em_gestantes = useWatch({
    control: form.control,
    name: "exames_vdrl_realizados_em_gestantes",
  });
  const exames_parasitológico_fezes = useWatch({
    control: form.control,
    name: "exames_parasitológico_fezes",
  });
  const exames_confirmatorios_HIV = useWatch({
    control: form.control,
    name: "exames_confirmatorios_HIV",
  });
  const exames_BHCG = useWatch({ control: form.control, name: "exames_BHCG" });
  const hcv_rapido = useWatch({ control: form.control, name: "hcv_rapido" });
  const hbs_ag_rapido = useWatch({
    control: form.control,
    name: "hbs_ag_rapido",
  });
  const exames_vdri_realizados_populacao_geral = useWatch({
    control: form.control,
    name: "exames_vdri_realizados_populacao_geral",
  });
  const exames_ppd_prova_tuberculínica = useWatch({
    control: form.control,
    name: "exames_ppd_prova_tuberculínica",
  });
  const exames_hcg_quantitativo = useWatch({
    control: form.control,
    name: "exames_hcg_quantitativo",
  });
  const coletas_domiciliares = useWatch({
    control: form.control,
    name: "coletas_domiciliares",
  });
  const coleta_exame_pcr_covid_19 = useWatch({
    control: form.control,
    name: "coleta_exame_pcr_covid_19",
  });
  const coleta_exame_pcr_para_dengue = useWatch({
    control: form.control,
    name: "coleta_exame_pcr_para_dengue",
  });

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        form.reset(DEFAULT_VALUES);
      },
      [form, onSuccess],
    ),
  );

  return {
    form,
    handleSubmit,
    usuarios_atendidos,
    exames_realizados,
    hemogramas,
    culturas_baar,
    procedimentos_baciloscopia_turberculose,
    exames_baciloscopia_hanseniase,
    exames_vdrl_realizados_em_gestantes,
    exames_parasitológico_fezes,
    exames_confirmatorios_HIV,
    exames_BHCG,
    hcv_rapido,
    hbs_ag_rapido,
    exames_vdri_realizados_populacao_geral,
    exames_ppd_prova_tuberculínica,
    exames_hcg_quantitativo,
    coletas_domiciliares,
    coleta_exame_pcr_covid_19,
    coleta_exame_pcr_para_dengue,
  };
}

// ─── SUB‑COMPONENTS ─────────────────────────────────────────────────────────

function FormField({ label, error, children, htmlFor }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function fieldCls(hasError) {
  return [
    "w-full rounded-md border px-3 py-2 text-sm text-gray-900",
    "placeholder:text-gray-400 bg-white",
    "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400",
    "transition-colors duration-150",
    hasError
      ? "border-red-300 focus:ring-red-500/30 focus:border-red-400"
      : "border-gray-300",
  ].join(" ");
}

function MetricCard({ label, value, accent = false }) {
  return (
    <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p
        className={`text-2xl font-semibold tabular-nums ${accent ? "text-blue-600" : "text-gray-800"}`}
      >
        {value}
      </p>
    </div>
  );
}

function MetricsInputGrid({ control, errors }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {LABORATORIO_ITEMS.map(({ key, label }) => {
        const fieldError = errors[key];
        return (
          <div key={key}>
            <label
              htmlFor={`${key}`}
              className="block text-xs font-medium text-gray-500 mb-1 truncate"
              title={label}
            >
              {label}
            </label>
            <Controller
              name={`${key}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={`${key}`}
                  type="number"
                  min={0}
                  inputMode="numeric"
                  className={fieldCls(!!fieldError) + " text-center"}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

function RegistrosList({ registros }) {
  if (registros.length === 0) return null;

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros da sessão
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Ano", "Mês", "Usuários", "Exames", "Hemogramas", "BAAR"].map(
              (h, i) => (
                <th
                  key={h}
                  className={`text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap ${
                    i <= 1 ? "text-left" : "text-right"
                  }`}
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr
              key={r.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                {r.ano}
              </td>
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                {r.mes}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-800 tabular-nums">
                {r.usuarios_atendidos}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-800 tabular-nums">
                {r.exames_realizados}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-800 tabular-nums">
                {r.hemogramas}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-800 tabular-nums">
                {r.culturas_baar}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── FORM COMPONENT ─────────────────────────────────────────────────────────

function LabForm({ onSuccess }) {
  const {
    form,
    handleSubmit,
    usuarios_atendidos,
    exames_realizados,
    hemogramas,
    culturas_baar,
    procedimentos_baciloscopia_turberculose,
    exames_baciloscopia_hanseniase,
    exames_vdrl_realizados_em_gestantes,
    exames_parasitológico_fezes,
    exames_confirmatorios_HIV,
    exames_BHCG,
    hcv_rapido,
    hbs_ag_rapido,
    exames_vdri_realizados_populacao_geral,
    exames_ppd_prova_tuberculínica,
    exames_hcg_quantitativo,
    coletas_domiciliares,
    coleta_exame_pcr_covid_19,
    coleta_exame_pcr_para_dengue,
  } = useLabForm(onSuccess);

  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const totalEspecificos = (hemogramas ?? 0) + (culturas_baar ?? 0);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-md p-8 bg-white shadow-sm space-y-8">
        {/* ── Identificação ───────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Identificação do Registro
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                {MESES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Ano de Referência (texto)"
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
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* ── Indicadores do Laboratório ──────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Indicadores do Laboratório Municipal
          </h2>
          <MetricsInputGrid control={control} errors={errors} />

          <div className="grid grid-cols-2 gap-3 mt-6">
            <MetricCard
              label="Total de Exames Específicos (Hemogramas + BAAR)"
              value={String(totalEspecificos)}
            />
            <MetricCard
              label="Total de Exames Realizados (Informado)"
              value={String(exames_realizados ?? 0)}
              accent
            />
          </div>
        </div>

        {/* ── Actions ──────────────────────────────────────────── */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => form.reset()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5
                       text-sm font-medium text-gray-600
                       hover:bg-gray-50 active:scale-[0.98]
                       focus:outline-none focus:ring-2 focus:ring-gray-300
                       transition-all duration-150 cursor-pointer"
          >
            Limpar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5
                       text-sm font-medium text-white
                       hover:bg-blue-700 active:scale-[0.98]
                       focus:outline-none focus:ring-2 focus:ring-blue-500/40
                       transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Registrar
          </button>
        </div>
      </div>
    </form>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────

export default function LABFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((data) => {
    setRegistros((prev) => [buildLabRecord(data), ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      <GNavbar />

      <section className="px-10 py-8">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Laboratório Municipal - Registro de dados mensais
          </p>
        </div>
      </section>

      <section className="px-10 pb-10 space-y-6">
        {showSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-lg bg-green-50 border border-green-200 px-4 py-3
                       text-sm font-medium text-green-700 flex items-center gap-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="8"
                cy="8"
                r="7.5"
                stroke="currentColor"
                strokeOpacity=".4"
              />
              <path
                d="M4.5 8.5L7 11L11.5 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Dados registrados com sucesso.
          </div>
        )}

        <LabForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      <section>
        <Footer />
      </section>
    </main>
  );
}
