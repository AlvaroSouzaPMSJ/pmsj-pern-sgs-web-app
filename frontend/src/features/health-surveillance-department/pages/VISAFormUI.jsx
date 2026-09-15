import { useState, useCallback, useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "../../../app/layouts/Footer";
import GNavbar from "../../../app/layouts/GNavbar";

// CONSTANTS
const MONTHS = [
  { value: 1, label: "Janeiro" },
  { value: 2, label: "Fevereiro" },
  { value: 3, label: "Março" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Maio" },
  { value: 6, label: "Junho" },
  { value: 7, label: "Julho" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" },
  { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" },
  { value: 12, label: "Dezembro" },
];

const TYPE = {
  COUNTING: "counting",
  PROPORTION: "proportion",
  FEE: "fee",
};

const VISA_INDICATORS = {
  "atendimento-de-demandas": {
    label: "Atendimento de Demandas",
    indicators: [
      {
        key: "NLsujVISA",
        label: "Número de Licenciamentos sujeitos a Vigilância Sanitária.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumInspecEstabSujeitVISA",
        label:
          "Número de Inspeção dos estabelecimentos sujeitos a Vigilância Sanitária.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumLaudVistParecAnal",
        label: "Número de Laudos, vistorias, pareceres e análises.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumApreenAnalCorrEncom",
        label: "Número de apreensões e análises - Correios - Encomendas.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumAutIntim",
        label: "Número de Autos de Intimação.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumAutInfra",
        label: "Número de Autos de Infração.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumDesint",
        label: "Número de Desinterdição.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumInclRespTec",
        label: "Número de Inclusões de Responsabilidade Técnica.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumBaixRespTecn",
        label: "Numero de Baixas de Responsabilidade Técnica.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumBaixAlv",
        label: "Número de Baixa de Alvará.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumAltContSoc",
        label: "Número de Alteração do contrato social.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumOutSolicit",
        label:
          "Numero de outras solicitações (baixas de veiculos...certidoes..)",
        type: TYPE.COUNTING,
      },
    ],
  },

  "zoonoses-dibea": {
    label: "Zoonoses Dibea",
    indicators: [
      { key: "NumAver", label: "Número de Averiguações", type: TYPE.COUNTING },
      { key: "NumResg", label: "Número de Resgastes", type: TYPE.COUNTING },
      {
        key: "NumMausTrat",
        label: "Número de Maus Tratos",
        type: TYPE.COUNTING,
      },
      {
        key: "NumLeishViscCan",
        label: "Número de Leishmaniose Visceral Canina",
        type: TYPE.COUNTING,
      },
      { key: "NumRaiv", label: "Número de Raiva", type: TYPE.COUNTING },
      {
        key: "NumAgravSinant",
        label: "Número de Agravos Sinantrópicos",
        type: TYPE.COUNTING,
      },
    ],
  },

  "receitas-issqn-e-taxas": {
    label: "Receitas ISSQN e Taxas",
    indicators: [
      {
        key: "ValArrecTaxVigilSanit",
        label: "Valor arrecadado com Taxa de Vigilância Sanitária.",
        type: TYPE.COUNTING,
      },
      {
        key: "ValArrecAutInfr",
        label: "Valor arrecadado com Auto de Infração.",
        type: TYPE.COUNTING,
      },
      {
        key: "ValArrecRecDiver",
        label: "Valor arrecadado com Receitas Diversas.",
        type: TYPE.COUNTING,
      },
    ],
  },

  "fiscalização-de-obras-e-posturas": {
    label: "Fiscalização de Obras e Posturas",
    indicators: [
      {
        key: "ValArrecHabAnalSanit",
        label: "Valor arrecadado com Habite-se e Análise Sanitário.",
        type: TYPE.COUNTING,
      },
      {
        key: "ValArrecTaxAlvHidSanit",
        label: "Valor arrecadado com Taxa de Alvará Hidro Sanitário.",
        type: TYPE.COUNTING,
      },
      {
        key: "ValArrecHabSanit",
        label: "Valor arrecadado com Habite-se Sanitário - SUSP",
        type: TYPE.COUNTING,
      },
      {
        key: "ValArrecAnalProjHidrossanit",
        label: "Valor arrecadado com Análise de Projeto Hidrossanitários.",
        type: TYPE.COUNTING,
      },
    ],
  },

  "processos-hidrosanitarios": {
    label: "Processos Hidrosanitários",
    indicators: [
      {
        key: "NumAnalProjet",
        label: "Número de Análises de Projetos.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumHabSanit",
        label: "Número de Habite-se Sanitário.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumCertifSanit",
        label: "Número de Certificados Sanitários.",
        type: TYPE.COUNTING,
      },
    ],
  },

  "vigiagua-amostras-analisadas": {
    label: "VIGIÁGUA - Amostras Analisadas",
    indicators: [
      {
        key: "NumAmostAnalColifor",
        label: "Número de Amostras analisadas para Coliformes.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumAmostAnalClorResidLiv",
        label: "Número de Amostras analisadas para Cloro Residual Livre.",
        type: TYPE.COUNTING,
      },
      {
        key: "NumAmostAnalTurb",
        label: "Número de Amostras analisadas para Turbidez.",
        type: TYPE.COUNTING,
      },
    ],
  },
};

const BLOCKS = Object.entries(VISA_INDICATORS).map(([value, { label }]) => ({
  value,
  label,
}));

const CURRENT_YEAR = new Date().getFullYear();

// Derivations from the catalog

function indicatorsOf(block) {
  return VISA_INDICATORS[block]?.indicators ?? [];
}

function zeroedValues(block) {
  return Object.fromEntries(indicatorsOf(block).map(({ key }) => [key, null]));
}

// Schema

const valueSchema = z
  .union([z.coerce.number(), z.literal(""), z.null()])
  .transform((v) => (v === "" || v === null ? null : v))
  .refine((v) => v === null || v >= 0, "Valor não pode ser negativo");

const VISASchema = z.object({
  bloco: z.enum(Object.keys(VISA_INDICATORS)),
  competencia: z.object({
    ano: z.coerce.number().int().min(2000).max(2100),
    mes: z.coerce.number().min(1).max(12),
  }),
  valores: z.record(z.string(), valueSchema),
});

// Utils

function formatValue(value, type) {
  if (value === null || value === undefined || value === "") return "—";
  const n = Number(value);
  if (Number.isNaN(n)) return "—";
  return n.toLocaleString("pt-BR");
}

function buildDocument(values) {
  const catalog = indicatorsOf(values.bloco);
  const indicators = catalog.map(({ key }) => {
    const raw = values.valores?.[key];
    const value =
      raw === "" || raw === undefined || raw === null ? null : Number(raw);
    return { key, value };
  });
  return {
    bloco: values.bloco,
    competencia: { ano: values.competencia.ano, mes: values.competencia.mes },
    indicadores: indicators,
  };
}

// Hook

const DEFAULT_BLOCK = BLOCKS[0].value;

const DEFAULT_VALUES = {
  bloco: DEFAULT_BLOCK,
  competencia: { ano: CURRENT_YEAR, mes: "" },
  valores: zeroedValues(DEFAULT_BLOCK),
};

function useVISAForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(VISASchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const block = useWatch({ control: form.control, name: "bloco" });
  const values = useWatch({ control: form.control, name: "valores" });

  // Re-seed valores on bloco change → prevents cross-bloco data leakage.
  useEffect(() => {
    form.setValue("valores", zeroedValues(block), {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [block, form]);

  const catalog = useMemo(() => indicatorsOf(block), [block]);

  const filled = useMemo(
    () =>
      catalog.reduce((acc, { key }) => {
        const v = values?.[key];
        return acc + (v === "" || v === undefined || v === null ? 0 : 1);
      }, 0),
    [catalog, values],
  );

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(buildDocument(data));
        form.reset({
          ...DEFAULT_VALUES,
          bloco: data.bloco,
          competencia: { ...data.competencia, mes: "" },
          valores: zeroedValues(data.bloco),
        });
      },
      [form, onSuccess],
    ),
  );

  return { form, handleSubmit, block, catalog, filled };
}

// Shared Sub-Components

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

const TYPE_BADGE = {
  [TYPE.COUNTING]: { label: "nº", cls: "bg-gray-100 text-gray-500" },
  [TYPE.PROPORTION]: { label: "%", cls: "bg-blue-100 text-blue-600" },
  [TYPE.FEE]: { label: "R$", cls: "bg-green-100 text-green-600" },
};

// Feature Components

function BlockSelect({ register, error }) {
  return (
    <FormField label="Bloco / Eixo de Vigilância" error={error} htmlFor="bloco">
      <select id="bloco" {...register("bloco")} className={fieldCls(!!error)}>
        {BLOCKS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FormField>
  );
}

function IndicatorGrid({ catalog, control, errors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {catalog.map(({ key, label, type }) => {
        const fieldError = errors.valores?.[key];
        const badge = TYPE_BADGE[type] || TYPE_BADGE[TYPE.COUNTING];
        return (
          <div key={key} className="flex flex-col">
            <label
              htmlFor={`valores.${key}`}
              className="flex items-start gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <span
                className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badge.cls}`}
              >
                {badge.label}
              </span>
              <span className="leading-snug">{label}</span>
            </label>

            <Controller
              name={`valores.${key}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  value={field.value ?? ""}
                  id={`valores.${key}`}
                  type="number"
                  min={0}
                  step={type === TYPE.COUNTING ? 1 : "any"}
                  inputMode={type === TYPE.COUNTING ? "numeric" : "decimal"}
                  placeholder={
                    type === TYPE.PROPORTION
                      ? "% (em branco = não reportado)"
                      : "em branco = não reportado"
                  }
                  className={fieldCls(!!fieldError)}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? null : Number(e.target.value),
                    )
                  }
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

function RegistrosList({ registers }) {
  if (registers.length === 0) return null;

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros da sessão
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Competência", "Bloco", "Preenchidos", "Indicadores"].map(
              (h, i) => (
                <th
                  key={h}
                  className={`text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap ${
                    i >= 2 ? "text-right" : "text-left"
                  }`}
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {registers.map((r, index) => {
            const preenchidos =
              r.indicadores?.filter((i) => i.value !== null).length || 0;
            return (
              <tr
                key={r.id || index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                  {r.competencia.mes}/{r.competencia.ano}
                </td>
                <td className="py-2.5 pr-4 text-gray-800">
                  {VISA_INDICATORS[r.bloco]?.label ?? r.bloco}
                </td>
                <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                  {preenchidos}/{r.indicadores?.length || 0}
                </td>
                <td className="py-2.5 text-right text-gray-500 tabular-nums">
                  {r.indicadores?.length || 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function VISAForm({ onSuccess }) {
  const { form, handleSubmit, catalog, filled } = useVISAForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        {/* ── Competência ────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Competência
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlockSelect register={register} error={errors.bloco?.message} />

            <FormField
              label="Mês de Referência"
              error={errors.competencia?.mes?.message}
              htmlFor="mes"
            >
              <select
                id="mes"
                {...register("competencia.mes")}
                className={fieldCls(!!errors.competencia?.mes)}
              >
                <option value="">Selecione o mês</option>
                {MONTHS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Ano"
              error={errors.competencia?.ano?.message}
              htmlFor="ano"
            >
              <input
                id="ano"
                type="number"
                min={2000}
                max={2100}
                {...register("competencia.ano")}
                className={fieldCls(!!errors.competencia?.ano) + " text-center"}
              />
            </FormField>
          </div>
        </div>

        {/* ── Indicadores ────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Indicadores do Bloco
            </h2>
            <span className="text-sm text-gray-400 tabular-nums">
              {filled}/{catalog.length} preenchidos
            </span>
          </div>

          <IndicatorGrid catalog={catalog} control={control} errors={errors} />

          <div className="grid grid-cols-2 gap-3 mt-8">
            <MetricCard
              label="Indicadores no bloco"
              value={String(catalog.length)}
            />
            <MetricCard label="Preenchidos" value={String(filled)} accent />
          </div>
        </div>

        {/* ── Actions ────────────────────────────────────────── */}
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

// Page

export default function VISAFormUI() {
  const [registers, setRegisters] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((document) => {
    setRegisters((prev) => [{ ...document, id: crypto.randomUUID() }, ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* navbar */}
      <GNavbar />
      {/* page-title-starts */}
      <section className="px-10 py-10">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            VISA — Indicadores mensais
          </p>
        </div>
      </section>
      {/* page-title-ends */}

      {/* form-starts */}
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
            Registro salvo com sucesso!
          </div>
        )}

        <VISAForm onSuccess={handleSuccess} />

        <RegistrosList registers={registers} />
      </section>
      {/* form-ends */}

      {/* footer-starts */}
      <Footer />
      {/* footer-ends */}
    </main>
  );
}
