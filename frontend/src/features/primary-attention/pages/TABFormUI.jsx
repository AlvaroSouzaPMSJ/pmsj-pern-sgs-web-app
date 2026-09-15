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

/** Single source of truth for program indicators based on the spreadsheet. */
const INDICADORES = [
  { key: "pessoasIniciaram", label: "Pessoas que iniciaram o tratamento" },
  {
    key: "unidadesSaude",
    label: "Unidades de Saúde que realizaram tratamento (quadrimestre)",
  },
  { key: "pacientesMasculino", label: "Pacientes atendidos - Sexo Masculino" },
  { key: "pacientesFeminino", label: "Pacientes atendidos - Sexo Feminino" },
  {
    key: "usaramMedicamento",
    label: "Pacientes que usaram medicamento para cessar o tabagismo",
  },
  {
    key: "atendimentoIndividual",
    label: "Pacientes em atendimento individual",
  },
  { key: "atendimentoGrupo", label: "Pacientes em atendimento em Grupo" },
  {
    key: "proporcaoUnidades",
    label: "Proporção das unidades que realizam atendimento (%)",
  },
];

const INDICADORES_ZERADOS = Object.fromEntries(
  INDICADORES.map(({ key }) => [key, 0]),
);

// ─── Schema ───────────────────────────────────────────────────────────────────

const indicadorShape = Object.fromEntries(
  INDICADORES.map(({ key }) => [
    key,
    key === "proporcaoUnidades"
      ? z.coerce.number().min(0).max(100)
      : z.coerce.number().int().min(0),
  ]),
);

const tabagismoSchema = z.object({
  mes: z.enum(MESES, { required_error: "Selecione um mês de referência" }),
  ...indicadorShape,
});

// ─── Utils ────────────────────────────────────────────────────────────────────

function totalAtendidos(data) {
  return (data.pacientesMasculino || 0) + (data.pacientesFeminino || 0);
}

function buildTabagismoEntry(values) {
  return {
    ...values,
    id: crypto.randomUUID(),
    totalPacientesAtendidos: totalAtendidos(values),
    criadoEm: new Date().toISOString(),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  mes: "",
  ...INDICADORES_ZERADOS,
};

function useTabagismoForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(tabagismoSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const watchedValues = useWatch({ control: form.control });
  const pacientesMasculino = watchedValues.pacientesMasculino ?? 0;
  const pacientesFeminino = watchedValues.pacientesFeminino ?? 0;
  const totalPacientes = pacientesMasculino + pacientesFeminino;

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        form.reset(DEFAULT_VALUES);
      },
      [form, onSuccess],
    ),
  );

  return { form, handleSubmit, totalPacientes };
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

function IndicadoresGrid({ control, errors }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {INDICADORES.map(({ key, label }) => {
        const fieldError = errors?.[key];
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
                  max={key === "proporcaoUnidades" ? 100 : undefined}
                  step={key === "proporcaoUnidades" ? "0.01" : "1"}
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
        Registros do Programa Tabagismo
      </h2>
      <table className="w-full text-sm min-w-[800px]">
        <thead>
          <tr className="border-b border-gray-200">
            {[
              "Mês",
              "Iniciaram",
              "Unidades",
              "Atendidos (M/F)",
              "Usaram Medicamento",
              "Individual",
              "Grupo",
              "Proporção",
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
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                {r.mes}
              </td>
              <td className="py-2.5 pr-4 text-gray-800 text-center font-medium">
                {r.pessoasIniciaram}
              </td>
              <td className="py-2.5 pr-4 text-gray-800 text-center font-medium">
                {r.unidadesSaude}
              </td>
              <td className="py-2.5 pr-4 text-gray-800 text-center font-medium tabular-nums">
                {r.totalPacientesAtendidos}
              </td>
              <td className="py-2.5 pr-4 text-gray-800 text-center font-medium">
                {r.usaramMedicamento}
              </td>
              <td className="py-2.5 pr-4 text-gray-800 text-center font-medium">
                {r.atendimentoIndividual}
              </td>
              <td className="py-2.5 pr-4 text-gray-800 text-center font-medium">
                {r.atendimentoGrupo}
              </td>
              <td className="py-2.5 text-right tabular-nums">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800`}
                >
                  {r.proporcaoUnidades ? `${r.proporcaoUnidades}%` : "—"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TabagismoForm({ onSuccess }) {
  const { form, handleSubmit, totalPacientes } = useTabagismoForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        {/* ── Identificação ───────────────────────────────────── */}
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
                {MESES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* ── Indicadores ─────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Indicadores de Atendimento
          </h2>
          <p className="text-sm text-gray-500 mb-4 -mt-4">
            Preencha os dados quantitativos referentes ao mês selecionado acima.
          </p>
          <IndicadoresGrid control={control} errors={errors} />

          {/* Metrics Summary */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <MetricCard
              label="Total de pacientes (Masc + Fem)"
              value={String(totalPacientes)}
            />
            <MetricCard
              label="Unidades ativas"
              value={String(form.watch("unidadesSaude") || 0)}
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
            Registrar
          </button>
        </div>
      </div>
    </form>
  );
}

// PAGE

export default function TABFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((data) => {
    setRegistros((prev) => [buildTabagismoEntry(data), ...prev]);
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
            Áreas Estratégicas - Tabagismo
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Formulário de Entrada de Dados
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
            Dados do mês registrados com sucesso.
          </div>
        )}

        <TabagismoForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      {/* footer-ends */}
      <section>
        <Footer />
      </section>
      {/* footer-ends */}
    </main>
  );
}