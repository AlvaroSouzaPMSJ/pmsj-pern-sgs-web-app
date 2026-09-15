import { useCallback } from "react";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GNavbar from "../../../app/layouts/GNavbar";
import Footer from "../../../app/layouts/Footer";

// CONSTANTS

/** Quadrimestres SISAB. key persists; label is UI-only. */
const QUADRIMESTRES = /** @type {const} */ ([
  { key: "Q1", label: "Q1 — Janeiro a Abril" },
  { key: "Q2", label: "Q2 — Maio a Agosto" },
  { key: "Q3", label: "Q3 — Setembro a Dezembro" },
]);

const QUADRIMESTRE_KEYS = QUADRIMESTRES.map((q) => q.key);

const ANO_MIN = 2020;
const ANO_MAX = 2100;

/**
 * Single source of truth for SISAB indicators.
 * Adding an indicator = editing only this array; the Zod schema, default values,
 * and grid are all derived from it (never duplicated manually).
 *
 * `meta` / `parametro`: { operador: '>=' | '<=' | '=', valor: Number } — constants-only.
 * `peso`: compliance weight (constants-only).
 */
const SISAB_INDICADORES = [
  {
    key: "preNatal6Consultas",
    numero: 1,
    label:
      "Proporção de gestantes com pelo menos seis consultas pré-natal realizadas, sendo a 1ª até a 12ª semana de gestação",
    parametro: { operador: "=", valor: 100 },
    meta: { operador: ">=", valor: 45 },
    peso: 1,
  },
  {
    key: "gestantesSifilisHiv",
    numero: 2,
    label: "Proporção de gestantes com realização de exames para sífilis e HIV",
    parametro: { operador: "=", valor: 100 },
    meta: { operador: ">=", valor: 60 },
    peso: 1,
  },
  {
    key: "gestantesOdonto",
    numero: 3,
    label: "Proporção de gestantes com atendimento odontológico realizado",
    parametro: { operador: "=", valor: 100 },
    meta: { operador: ">=", valor: 60 },
    peso: 2,
  },
  {
    key: "citopatologico",
    numero: 4,
    label: "Proporção de mulheres com coleta de citopatológico na APS",
    parametro: { operador: ">=", valor: 80 },
    meta: { operador: ">=", valor: 40 },
    peso: 1,
  },
  {
    key: "vacinacaoCriancas",
    numero: 5,
    label:
      "Proporção de crianças de um ano de idade vacinadas na APS contra difteria, tétano, coqueluche, hepatite B, infecções por Haemophilus influenzae tipo B e poliomielite inativada",
    parametro: { operador: ">=", valor: 95 },
    meta: { operador: ">=", valor: 95 },
    peso: 2,
  },
  {
    key: "hipertensaoPa",
    numero: 6,
    label:
      "Proporção de pessoas com hipertensão, com consulta e pressão arterial aferida no semestre",
    parametro: { operador: "=", valor: 100 },
    meta: { operador: ">=", valor: 50 },
    peso: 2,
  },
  {
    key: "diabetesHbglicada",
    numero: 7,
    label:
      "Proporção de pessoas com diabetes, com consulta e hemoglobina glicada solicitada no semestre",
    parametro: { operador: "=", valor: 100 },
    meta: { operador: ">=", valor: 50 },
    peso: 1,
  },
];

const PESO_TOTAL = SISAB_INDICADORES.reduce((acc, i) => acc + i.peso, 0);

// ─── Schema ───────────────────────────────────────────────────────────────────

/**
 * Per-indicator value: percentage 0–100, required.
 * Empty string is normalized to undefined so a blank field fails `required`
 * instead of silently coercing to 0.
 *
 * TODO (nullable extension): to allow recording a non-reported indicator ("-"),
 * wrap with `.nullable()` and add a per-row "não informado" toggle that sets the
 * value to null; the meta-compliance mapper already returns null for null input.
 */
const valorIndicadorSchema = z.preprocess(
  (v) => (v === "" || v === null || v === undefined ? undefined : v),
  z.coerce
    .number({
      required_error: "Informe o percentual",
      invalid_type_error: "Percentual inválido",
    })
    .min(0, "Mínimo 0%")
    .max(100, "Máximo 100%"),
);

/** valores shape built dynamically from the catalog — never hand-duplicated. */
const valoresShape = Object.fromEntries(
  SISAB_INDICADORES.map(({ key }) => [key, valorIndicadorSchema]),
);

const sisabSchema = z.object({
  ano: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z.coerce
      .number({
        required_error: "Informe o ano",
        invalid_type_error: "Ano inválido",
      })
      .int()
      .min(ANO_MIN, `Ano mínimo ${ANO_MIN}`)
      .max(ANO_MAX, `Ano máximo ${ANO_MAX}`),
  ),
  quadrimestre: z.enum(QUADRIMESTRE_KEYS, {
    errorMap: () => ({ message: "Selecione o quadrimestre" }),
  }),
  valores: z.object(valoresShape),
});

// ─── Mappers (api boundary) ─────────────────────────────────────────────────

/**
 * formToDocument — flat RHF state → API body.
 * Contract mirrors the SGS indicator model: indicadores stored as
 * [{ chave, valor: Number }]; one document per (ano, quadrimestre).
 * meta/parametro/peso are intentionally omitted (constants-only).
 *
 * TODO (backend wiring): POST to SISAB_ROUTES.CREATE; the backend DTO
 * `toDocument` whitelists exactly { competencia, indicadores } (OWASP API3:2023).
 */
function formToDocument(values) {
  return {
    competencia: { ano: values.ano, quadrimestre: values.quadrimestre },
    indicadores: SISAB_INDICADORES.map(({ key }) => ({
      chave: key,
      valor: values.valores[key],
    })),
  };
}

/**
 * documentToForm — API response → RHF defaultValues for edit.
 * TODO (edit flow): call when loading an existing competência.
 */
// eslint-disable-next-line no-unused-vars
function documentToForm(doc) {
  const valores = Object.fromEntries(
    SISAB_INDICADORES.map(({ key }) => {
      const found = doc.indicadores?.find((i) => i.chave === key);
      return [key, found ? found.valor : ""];
    }),
  );
  return {
    ano: doc.competencia.ano,
    quadrimestre: doc.competencia.quadrimestre,
    valores,
  };
}

// ─── Utils (compliance — analytics mappers) ─────────────────────────────────

/** Evaluate a value against a { operador, valor } target. null = no value yet. */
function avaliaAlvo(valor, alvo) {
  if (valor === null || valor === undefined || Number.isNaN(valor)) return null;
  switch (alvo.operador) {
    case ">=":
      return valor >= alvo.valor;
    case "<=":
      return valor <= alvo.valor;
    case "=":
      return valor === alvo.valor;
    default:
      return null;
  }
}

/** Weighted compliance index (%): peso of metas atingidas / peso total. */
function indicePonderado(valores) {
  if (PESO_TOTAL === 0) return null;
  let pesoAtingido = 0;
  for (const ind of SISAB_INDICADORES) {
    if (avaliaAlvo(toNumberOrNull(valores?.[ind.key]), ind.meta) === true) {
      pesoAtingido += ind.peso;
    }
  }
  return Math.round((pesoAtingido / PESO_TOTAL) * 10000) / 100;
}

function metasAtingidas(valores) {
  return SISAB_INDICADORES.filter(
    (ind) => avaliaAlvo(toNumberOrNull(valores?.[ind.key]), ind.meta) === true,
  ).length;
}

function preenchidos(valores) {
  return SISAB_INDICADORES.filter(
    (ind) => toNumberOrNull(valores?.[ind.key]) !== null,
  ).length;
}

function toNumberOrNull(v) {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

function formatAlvo({ operador, valor }) {
  const op = operador === ">=" ? "≥ " : operador === "<=" ? "≤ " : "";
  return `${op}${valor}%`;
}

function formatPct(value) {
  if (value === null || value === undefined) return "—";
  return (
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%"
  );
}

function buildRegistro(values) {
  return {
    ...formToDocument(values),
    id: crypto.randomUUID(),
    indicePonderado: indicePonderado(values.valores),
    metasAtingidas: metasAtingidas(values.valores),
    criadoEm: new Date().toISOString(),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const VALORES_VAZIOS = Object.fromEntries(
  SISAB_INDICADORES.map(({ key }) => [key, ""]),
);

const DEFAULT_VALUES = {
  ano: new Date().getFullYear(),
  quadrimestre: "",
  valores: { ...VALORES_VAZIOS },
};

function useSisabForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(sisabSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const valores = useWatch({ control: form.control, name: "valores" });
  const valoresSeguro = valores ?? VALORES_VAZIOS;

  const indice = indicePonderado(valoresSeguro);
  const atingidas = metasAtingidas(valoresSeguro);
  const preench = preenchidos(valoresSeguro);

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
    valores: valoresSeguro,
    indice,
    atingidas,
    preench,
  };
}

// ─── Shared sub-components ────────────────────────────────────────────────────

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

// ─── Feature components ───────────────────────────────────────────────────────

function ReferenceChip({ label, value }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 border border-gray-200 px-2 py-0.5 text-xs text-gray-600 whitespace-nowrap">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-gray-700 tabular-nums">{value}</span>
    </span>
  );
}

function SituacaoBadge({ situacao }) {
  const map = {
    true: { cls: "bg-green-100 text-green-700", txt: "Meta atingida" },
    false: { cls: "bg-red-100 text-red-600", txt: "Abaixo da meta" },
    null: { cls: "bg-gray-100 text-gray-400", txt: "Aguardando" },
  };
  const { cls, txt } = map[String(situacao)];
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}
    >
      {txt}
    </span>
  );
}

function IndicadorRow({ indicador, control, error, valorAtual }) {
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

function IndicadorGrid({ control, errors, valores }) {
  return (
    <div className="space-y-3">
      {SISAB_INDICADORES.map((indicador) => (
        <IndicadorRow
          key={indicador.key}
          indicador={indicador}
          control={control}
          error={errors.valores?.[indicador.key]}
          valorAtual={valores?.[indicador.key]}
        />
      ))}
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
            {[
              "Competência",
              "Indicadores",
              "Metas atingidas",
              "Índice ponderado",
            ].map((h, i) => (
              <th
                key={h}
                className={`text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap ${
                  i >= 2 ? "text-right" : "text-left"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr
              key={r.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2.5 pr-4 text-gray-700 whitespace-nowrap font-medium">
                {r.competencia.ano} · {r.competencia.quadrimestre}
              </td>
              <td className="py-2.5 pr-4 text-gray-500 tabular-nums">
                {r.indicadores.length}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-500 tabular-nums">
                {r.metasAtingidas} / {SISAB_INDICADORES.length}
              </td>
              <td className="py-2.5 text-right tabular-nums">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.indicePonderado >= 70
                      ? "bg-green-100 text-green-700"
                      : r.indicePonderado >= 40
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-600"
                  }`}
                >
                  {formatPct(r.indicePonderado)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SisabForm({ onSuccess }) {
  const { form, handleSubmit, valores, indice, atingidas, preench } =
    useSisabForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        {/* ── Competência ─────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Competência
          </h2>
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
                  <option key={q.key} value={q.key}>
                    {q.label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* ── Indicadores ─────────────────────────────────────── */}
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

        {/* ── Actions ─────────────────────────────────────────── */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => form.reset(DEFAULT_VALUES)}
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
            Registrar competência
          </button>
        </div>
      </div>
    </form>
  );
}

// PAGE

export default function SISABFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((data) => {
    setRegistros((prev) => [buildRegistro(data), ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* navbar */}
      <GNavbar />

      {/* hero-starts */}
      <div className="w-full relative">
        <div className="w-full h-20 object-cover"></div>
        <h1 className="absolute top-10 bottom-4 left-10 text-3xl text-black font-bold drop-shadow">
          <span className="font-normal mr-1"></span>Atenção Primária
        </h1>
      </div>

      {/* page-title-starts */}
      <section className="px-10 py-8">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Indicadores quadrimestrais SISAB — Atenção Primária à Saúde (APS)
          </p>
        </div>
      </section>

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
            Competência registrada com sucesso.
          </div>
        )}

        <SisabForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      {/* footer-starts */}
      <section>
        <Footer />
      </section>
    </main>
  );
}