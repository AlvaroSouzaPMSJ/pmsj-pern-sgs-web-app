import { useState, useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GNavbar from "../../../app/layouts/GNavbar";
import Footer from "../../../app/layouts/Footer";

// CONSTANTS

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

const ZERO_VALUES = {
  gestantesPrimeiroTrimestre: 0,
  preNatalAltoRisco: 0,
  gestantesCadastradas: 0,
  proporcaoGestantesPrimeiroTrimestre: 0,
  proporcaoVacinaDtpa: 0,
  examesCitopatologicos: 0,
  razaoExamesCitopatologicos: 0,
  mulheres25a64Dividido3: 0,
  consultasPuerperioMedico: 0,
  consultasPuerperioEnfermagem: 0,
  mulheres50a69Dividido2: 0,
  examesMamografiaRastreamento: 0,
  mulheres14a49InsercaoDIU: 0,
  mulheres14a49TesteRapidoGravidez: 0,
  nascimentosMaesMenos14: 0,
  taxaMedicosGinecologistas: 0,
  percentualGestantesRiscoAtendidas: 0,
  razaoMortalidadeMaterna: 0,
  consultasPreNatalMedicoESF: 0,
  consultasPreNatalEnfermeiroESF: 0,
};

// ─── Schema ───────────────────────────────────────────────────────────────────

const indicadoresSchema = z.object({
  mes: z.enum(MESES),
  // Geral (Atenção ao Pré-Natal, Puerpério e Rastreamento)
  gestantesPrimeiroTrimestre: z.coerce.number().min(0),
  preNatalAltoRisco: z.coerce.number().min(0),
  gestantesCadastradas: z.coerce.number().min(0),
  proporcaoGestantesPrimeiroTrimestre: z.coerce.number().min(0),
  proporcaoVacinaDtpa: z.coerce.number().min(0),
  examesCitopatologicos: z.coerce.number().min(0),
  razaoExamesCitopatologicos: z.coerce.number().min(0),
  mulheres25a64Dividido3: z.coerce.number().min(0),
  consultasPuerperioMedico: z.coerce.number().min(0),
  consultasPuerperioEnfermagem: z.coerce.number().min(0),
  mulheres50a69Dividido2: z.coerce.number().min(0),
  examesMamografiaRastreamento: z.coerce.number().min(0),
  // Indicadores conforme Portaria GM/MS nº 715, de 04/04/2022
  mulheres14a49InsercaoDIU: z.coerce.number().min(0),
  mulheres14a49TesteRapidoGravidez: z.coerce.number().min(0),
  nascimentosMaesMenos14: z.coerce.number().min(0),
  // Indicadores conforme Nota Técnica 21/2022 - SAPS/MS
  taxaMedicosGinecologistas: z.coerce.number().min(0),
  percentualGestantesRiscoAtendidas: z.coerce.number().min(0),
  razaoMortalidadeMaterna: z.coerce.number().min(0),
  consultasPreNatalMedicoESF: z.coerce.number().min(0),
  consultasPreNatalEnfermeiroESF: z.coerce.number().min(0),
});

// ─── Utils ────────────────────────────────────────────────────────────────────

function totalGeral(indicadores) {
  // Compute a summary metric, e.g., total of major screenings
  return (
    (indicadores.gestantesPrimeiroTrimestre || 0) +
    (indicadores.examesCitopatologicos || 0) +
    (indicadores.examesMamografiaRastreamento || 0)
  );
}

function buildIndicador(values) {
  const total = totalGeral(values);
  return {
    ...values,
    id: crypto.randomUUID(),
    totalGeral: total,
    criadoEm: new Date().toISOString(),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  mes: "",
  ...ZERO_VALUES,
};

function useIndicadoresForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(indicadoresSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const values = useWatch({
    control: form.control,
  });

  const total = totalGeral(values ?? ZERO_VALUES);

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        form.reset(DEFAULT_VALUES);
      },
      [form, onSuccess],
    ),
  );

  return { form, handleSubmit, total };
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

// ─── Main Form ────────────────────────────────────────────────────────────────

function SaudeMulherForm({ onSuccess }) {
  const { form, handleSubmit, total } = useIndicadoresForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const renderNumberInput = (name, label, step = "1") => (
    <FormField label={label} error={errors[name]?.message} htmlFor={name}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type="number"
            step={step}
            min={0}
            placeholder="0"
            className={fieldCls(!!errors[name]) + " text-center"}
            {...field}
            onChange={(e) =>
              field.onChange(
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
          />
        )}
      />
    </FormField>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">

        {/* ── Identificação ───────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Identificação
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
          </div>
        </div>

        {/* ── Pré-Natal e Puerpério ───────────────────────────── */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Atenção ao Pré-Natal e Puerpério (Dados / Indicadores)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderNumberInput("gestantesPrimeiroTrimestre", "N.º gestantes acompanhadas que iniciaram Pré-natal no 1º trimestre")}
            {renderNumberInput("preNatalAltoRisco", "N.º de Pré-Natal de Alto Risco")}
            {renderNumberInput("gestantesCadastradas", "N.º de gestantes cadastradas")}
            {renderNumberInput("proporcaoGestantesPrimeiroTrimestre", "Proporção de gestantes acompanhadas que iniciaram Pré-natal no 1º trimestre", "0.01")}
            {renderNumberInput("proporcaoVacinaDtpa", "Proporção de gestantes com vacinas Dtpa em dia", "0.01")}
            {renderNumberInput("examesCitopatologicos", "N.º exames citopatológicos de colo do útero (25 a 64 anos)")}
            {renderNumberInput("razaoExamesCitopatologicos", "Razão de exames citopatológicos (25 a 64 anos)", "0.01")}
            {renderNumberInput("mulheres25a64Dividido3", "N.º de mulheres na faixa etária de 25 a 64 anos dividida por 3", "0.01")}
            {renderNumberInput("consultasPuerperioMedico", "N.º consultas médicas de Puerpério (até 42 dias)")}
            {renderNumberInput("consultasPuerperioEnfermagem", "N.º consultas de enfermagem de Puerpério (até 42 dias)")}
            {renderNumberInput("mulheres50a69Dividido2", "N.º de mulheres na faixa etária de 50 a 69 anos, dividida por 2", "0.01")}
            {renderNumberInput("examesMamografiaRastreamento", "N.º de exames de Mamografia de rastreamento")}
          </div>
        </div>

        {/* ── Portaria 715 ────────────────────────────────────── */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Indicadores conforme Portaria GM/MS nº 715, de 04/04/2022
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderNumberInput("mulheres14a49InsercaoDIU", "N.º de mulheres (14 a 49 anos) com inserção de DIU")}
            {renderNumberInput("mulheres14a49TesteRapidoGravidez", "N.º de mulheres (14 a 49 anos) c/ teste rápido de gravidez antes da 12ª semana")}
            {renderNumberInput("nascimentosMaesMenos14", "N.º de nascimentos de mães com idade inferior a 14 anos")}
          </div>
        </div>

        {/* ── Nota Técnica 21 ─────────────────────────────────── */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Indicadores conforme Nota Técnica 21/2022 - SAPS/MS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderNumberInput("taxaMedicosGinecologistas", "Taxa de médicos ginecologistas obstetras na APS (por 10.000 hab.)", "0.01")}
            {renderNumberInput("percentualGestantesRiscoAtendidas", "Percentual de gestantes c/ risco obstétrico atendidas por ginecologista-obstetra", "0.01")}
            {renderNumberInput("razaoMortalidadeMaterna", "Razão de mortalidade materna", "0.01")}
            {renderNumberInput("consultasPreNatalMedicoESF", "N.º de consultas de Pré Natal realizado pelo Médico ESF")}
            {renderNumberInput("consultasPreNatalEnfermeiroESF", "N.º de consultas de Pré Natal realizado pelo Enfermeiro ESF")}
          </div>
        </div>

        {/* ── Metrics & Actions ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 border-t border-gray-200 pt-6">
          <div className="w-full sm:w-1/3">
             <MetricCard label="Total geral (somatório base)" value={String(total)} accent />
          </div>

          <div className="flex justify-end gap-3 self-center mt-4 sm:mt-0">
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
              Registrar indicadores
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

// ─── List Component ──────────────────────────────────────────────────────────

function RegistrosList({ registros }) {
  if (registros.length === 0) return null;

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros de Indicadores
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Mês", "Gest. 1º Tri.", "DIU", "Pré-Natal (Médico)", "Mortalidade"].map((h) => (
              <th
                key={h}
                className="text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap text-left"
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
              <td className="py-2.5 pr-4 text-gray-600 whitespace-nowrap">
                {r.mes}
              </td>
              <td className="py-2.5 pr-4 text-gray-800 tabular-nums">
                {r.gestantesPrimeiroTrimestre}
              </td>
              <td className="py-2.5 pr-4 text-gray-800 tabular-nums">
                {r.mulheres14a49InsercaoDIU}
              </td>
              <td className="py-2.5 pr-4 text-gray-800 tabular-nums">
                {r.consultasPreNatalMedicoESF}
              </td>
              <td className="py-2.5 pr-4 text-gray-800 tabular-nums">
                {r.razaoMortalidadeMaterna}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SDMFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((data) => {
    setRegistros((prev) => [buildIndicador(data), ...prev]);
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
            Formulário de Indicadores Estratégicos
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Programa Saúde da Mulher — Núcleo de Estratégias e Indicadores
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
            Indicadores do mês registrados com sucesso.
          </div>
        )}

        <SaudeMulherForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      {/* footer-starts */}
      <section>
        <Footer />
      </section>
      {/* footer-ends */}
    </main>
  );
}