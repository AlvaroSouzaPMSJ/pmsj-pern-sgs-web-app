import { useState, useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "../../../app/layouts/Footer";
import GNavbar from "../../../app/layouts/GNavbar";

// ─── Constants ────────────────────────────────────────────────────────────────

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

/** Indicadores Gerais - Saúde da Criança (Top section of sheet) */
const INDICADORES_GERAIS = [
  {
    key: "baixoPeso",
    label: "Proporção de nascidos vivos com baixo peso ao nascer",
  },
  {
    key: "menores6Sisvan",
    label: "Nº crianças < 6 anos com estado nutricional (SISVAN)",
  },
  { key: "menores6Sus", label: "Nº crianças < 6 anos cadastradas no SUS" },
  {
    key: "proporcaoSisvan",
    label: "Proporção de crianças < 6 anos cadastradas no SISVAN",
  },
  { key: "formulaLactea", label: "Nº crianças que receberam fórmula láctea" },
  {
    key: "formulaEspecial",
    label: "Nº crianças que receberam fórmula especial",
  },
  {
    key: "consultasPediatria",
    label: "Nº consultas pediátricas (méd.) - Prog. São José",
  },
  {
    key: "consultasPuerperio",
    label: "Nº consultas de puerpério (enf.) - Prog. São José",
  },
  {
    key: "atendimentosSaoJose",
    label: "Nº atendimentos - Prog. São José Criança",
  },
  {
    key: "vacinasSaoJose",
    label: "Nº vacinas aplicadas - Prog. São José Criança",
  },
  {
    key: "coberturaCondicionalidades",
    label: "Cobertura de acompanhamento (condicionalidades)",
  },
];

/** Indicadores Importados - Poli Forquilhinhas (Bottom section of sheet) */
const INDICADORES_POLI = [
  { key: "poliCriancasAtendidas", label: "Nº absoluto de crianças atendidas" },
  { key: "poliConsultaPediatria", label: "Consultas em Pediatria" },
  {
    key: "poliConsultaEndocrino",
    label: "Consultas em Endocrinologia infantil",
  },
  { key: "poliConsultaNeonato", label: "Consultas em Neonatologia" },
  { key: "poliConsultaOrtopedia", label: "Consultas em Ortopedia Pediátrica" },
  {
    key: "poliConsultaGastro",
    label: "Consultas em Gastroenterologia infantil",
  },
  { key: "poliConsultaFono", label: "Consultas em Fonoaudiologia infantil" },
  { key: "poliConsultaNutricao", label: "Consultas em Nutrição infantil" },
  { key: "poliConsultaNeuro", label: "Consultas em Neurologia infantil" },
  {
    key: "poliCadastroFormulaInf",
    label: "Nº crianças cadastradas para recebimento de fórmula infantil",
  },
  {
    key: "poliCadastroFormulaEsp",
    label: "Nº crianças cadastradas para recebimento de fórmula especial",
  },
  {
    key: "poliDispensaFormulaInf",
    label: "Fórmula infantil dispensada no mês",
  },
  {
    key: "poliDispensaFormulaEsp",
    label: "Fórmula especial dispensada no mês",
  },
];

const ALL_INDICADORES = [...INDICADORES_GERAIS, ...INDICADORES_POLI];

const INDICADORES_ZERADOS = Object.fromEntries(
  ALL_INDICADORES.map(({ key }) => [key, 0]),
);

// ─── Schema ───────────────────────────────────────────────────────────────────

const indicadorShape = Object.fromEntries(
  ALL_INDICADORES.map(({ key }) => [
    key,
    z.coerce.number().min(0, "Insira um valor numérico válido"),
  ]),
);

const saudeCriancaSchema = z.object({
  mes: z.enum(MESES, { required_error: "Selecione um mês" }),
  sequencia: z.coerce.number().int().min(1, "Sequência deve ser maior que 0"),
  indicadores: z.object(indicadorShape),
});

// ─── Utils ────────────────────────────────────────────────────────────────────

function sumIndicadores(indicadores, keys) {
  return Object.keys(indicadores)
    .filter((k) => keys.includes(k))
    .reduce((acc, key) => acc + (indicadores[key] || 0), 0);
}

function buildSaudeCriancaData(values) {
  return {
    ...values,
    id: crypto.randomUUID(),
    criadoEm: new Date().toISOString(),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  mes: "",
  sequencia: 1,
  indicadores: { ...INDICADORES_ZERADOS },
};

function useSaudeCriancaForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(saudeCriancaSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const indicadores = useWatch({
    control: form.control,
    name: "indicadores",
  });

  const totalGeral = sumIndicadores(
    indicadores ?? INDICADORES_ZERADOS,
    INDICADORES_GERAIS.map((g) => g.key),
  );
  const totalPoli = sumIndicadores(
    indicadores ?? INDICADORES_ZERADOS,
    INDICADORES_POLI.map((p) => p.key),
  );

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        form.reset(DEFAULT_VALUES);
      },
      [form, onSuccess],
    ),
  );

  return { form, handleSubmit, totalGeral, totalPoli };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

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
    <div className="rounded-md bg-gray-50 border border-gray-200 p-4">
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

function IndicadoresGrid({ control, errors, list, sectionName }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {list.map(({ key, label }) => {
        const fieldError = errors.indicadores?.[key];
        return (
          <div key={key}>
            <label
              htmlFor={`indicadores.${key}`}
              className="block text-xs font-medium text-gray-500 mb-1 truncate"
              title={label}
            >
              {label}
            </label>
            <Controller
              name={`indicadores.${key}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={`indicadores.${key}`}
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
    <div className="border border-gray-300 rounded-md p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros da Sessão
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Mês", "Seq.", "Total Geral", "Total Poli", "Registros"].map(
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
          {registros.map((r) => {
            const totalG = sumIndicadores(
              r.indicadores,
              INDICADORES_GERAIS.map((g) => g.key),
            );
            const totalP = sumIndicadores(
              r.indicadores,
              INDICADORES_POLI.map((p) => p.key),
            );
            const filledCount = Object.values(r.indicadores).filter(
              (v) => v > 0,
            ).length;

            return (
              <tr
                key={r.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">
                  {r.mes}
                </td>
                <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">
                  {r.sequencia}
                </td>
                <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                  {totalG}
                </td>
                <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                  {totalP}
                </td>
                <td className="py-2.5 text-right tabular-nums">
                  <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-medium">
                    {filledCount} preenchidos
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SaudeCriancaForm({ onSuccess }) {
  const { form, handleSubmit, totalGeral, totalPoli } =
    useSaudeCriancaForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-md p-8 bg-white shadow-sm space-y-8">
        {/* ── Identificação ───────────────────────────────────── */}
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
                {MESES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
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

        {/* ── Indicadores Gerais ────────────────────────────── */}
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

        {/* ── Dados Importados (Poli Forquilhinhas) ──────────── */}
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

        {/* ── Actions ─────────────────────────────────────────── */}
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
            Registrar Indicadores
          </button>
        </div>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SdCFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((data) => {
    setRegistros((prev) => [buildSaudeCriancaData(data), ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* navbar */}
      <GNavbar />

      {/* page-title-starts */}
      <section className="px-10 py-8">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Áreas Estratégicas - Saúde da Criança
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Formulário de Entrada de Dados - Secretaria Municipal de Saúde -
            2026
          </p>
        </div>
      </section>

      {/* form-ends */}
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
            Indicadores registrados com sucesso.
          </div>
        )}

        <SaudeCriancaForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      {/* footer-ends */}
      <section>
        <Footer />
      </section>
    </main>
  );
}
