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

const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - 4 + i).toString(),
);

const TIPOS_VINCULO = /** @type {const} */ ([
  "Estatutário",
  "Celetistas",
  "ACT",
  "Terceirizados",
  "Organização Social (OS)",
]);

const CARGOS = [
  { key: "agenteAdministrativo", label: "Agente Administrativo" },
  { key: "agenteEndemias", label: "Agente de Combate às Endemias" },
  { key: "agenteOperacional", label: "Agente Operacional" },
  { key: "agenteComunitario", label: "Agente Comunitário de Saúde" },
  { key: "servicosGerais", label: "Agente de Serviços Gerais" },
  { key: "analistaJuridico", label: "Analista Jurídico" },
  { key: "arquiteto", label: "Arquiteto" },
  { key: "assistenteSocial", label: "Assistente Social" },
  { key: "assessorContabil", label: "Assessor Contábil" },
  { key: "atendentePublico", label: "Atendente de Saúde Pública" },
  { key: "auxiliarEnfermagem", label: "Auxiliar de Enfermagem" },
  { key: "contador", label: "Contador" },
  { key: "cirurgiaoDentista", label: "Cirurgião Dentista" },
  { key: "diretorGeral", label: "Diretor Geral de Saúde CCM" },
  { key: "diretorClinica", label: "Diretor Clínica CCM" },
  { key: "vigilanciaSanitaria", label: "Diretor de Vigilância em Saúde CCM" },
  { key: "vigilanciaSUS", label: "Diretor de Vigilância Sanitária CCM" },
  { key: "educadorFisico", label: "Educador Físico" },
  { key: "engenheiro", label: "Engenheiro" },
];

const CARGO_KEYS = CARGOS.map((c) => c.key);

const CARGOS_ZERADOS = Object.fromEntries(CARGOS.map(({ key }) => [key, 0]));

// ─── Schema ───────────────────────────────────────────────────────────────────

// Nested object for each cargo mapping to work hours (20, 30, 40)
const cargoShape = Object.fromEntries(
  CARGOS.map(({ key }) => [
    key,
    z.object({
      20: z.coerce.number().int().min(0).default(0),
      30: z.coerce.number().int().min(0).default(0),
      40: z.coerce.number().int().min(0).default(0),
    }),
  ]),
);

const registroSchema = z.object({
  mes: z.enum(MESES),
  currentYear: z.enum(YEAR_OPTIONS),
  cargo: z.enum(CARGO_KEYS),
  vinculo: z.enum(TIPOS_VINCULO),
  // Store hours matrix (20, 30, 40) as numbers
  horas: z.object({
    20: z.coerce.number().int().min(0),
    30: z.coerce.number().int().min(0),
    40: z.coerce.number().int().min(0),
  }),
});

// ─── Utils ────────────────────────────────────────────────────────────────────

function totalFuncionarios(horas) {
  return Object.values(horas).reduce((acc, v) => acc + (v || 0), 0);
}

function buildRegistro(values) {
  const total = totalFuncionarios(values.horas);
  return {
    ...values,
    id: crypto.randomUUID(),
    totalFuncionarios: total,
    criadoEm: new Date().toISOString(),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  mes: "",
  cargo: "",
  vinculo: "",
  horas: { 20: 0, 30: 0, 40: 0 },
};

function useRHForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(registroSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const horas = useWatch({
    control: form.control,
    name: "horas",
  });

  const total = totalFuncionarios(horas ?? { 20: 0, 30: 0, 40: 0 });

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

function RegistrosList({ registros }) {
  if (registros.length === 0) return null;

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros de Servidores
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Mês", "Cargo", "Vínculo", "20h", "30h", "40h", "Total"].map(
              (h, i) => (
                <th
                  key={h}
                  className={`text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap ${
                    i >= 3 ? "text-center" : "text-left"
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
            const cargoLabel = CARGOS.find((c) => c.key === r.cargo)?.label;
            return (
              <tr
                key={r.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                  {r.mes}
                </td>
                <td
                  className="py-2.5 pr-4 text-gray-800 max-w-xs truncate"
                  title={cargoLabel}
                >
                  {cargoLabel}
                </td>
                <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                  {r.vinculo}
                </td>
                <td className="py-2.5 pr-4 text-center text-gray-500 tabular-nums">
                  {r.horas["20"]}
                </td>
                <td className="py-2.5 pr-4 text-center text-gray-500 tabular-nums">
                  {r.horas["30"]}
                </td>
                <td className="py-2.5 pr-4 text-center text-gray-500 tabular-nums">
                  {r.horas["40"]}
                </td>
                <td className="py-2.5 pr-4 text-center font-medium text-gray-800 tabular-nums">
                  {r.totalFuncionarios}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RHForm({ onSuccess }) {
  const { form, handleSubmit, total } = useRHForm(onSuccess);
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
            Registro de Quadro de Servidores
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            <FormField
              label="Tipo de Vínculo"
              error={errors.vinculo?.message}
              htmlFor="vinculo"
            >
              <select
                id="vinculo"
                {...register("vinculo")}
                className={fieldCls(!!errors.vinculo)}
              >
                <option value="">Selecione o vínculo</option>
                {TIPOS_VINCULO.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
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
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <div className="mt-6">
            <FormField
              label="Cargo"
              error={errors.cargo?.message}
              htmlFor="cargo"
            >
              <select
                id="cargo"
                {...register("cargo")}
                className={fieldCls(!!errors.cargo)}
              >
                <option value="">Selecione o cargo</option>
                {CARGOS.map(({ key, label }) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* ── Carga Horária Matrix (20, 30, 40) ────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Quantitativo por Carga Horária
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["20", "30", "40"].map((hours) => (
              <div key={hours}>
                <FormField
                  label={`${hours}h Semanais`}
                  error={errors.horas?.[hours]?.message}
                  htmlFor={`horas.${hours}`}
                >
                  <input
                    id={`horas.${hours}`}
                    type="number"
                    min={0}
                    placeholder="0"
                    {...register(`horas.${hours}`)}
                    className={
                      fieldCls(!!errors.horas?.[hours]) + " text-center"
                    }
                  />
                </FormField>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <MetricCard label="Total Servidores" value={String(total)} accent />
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RHFormUI() {
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

      {/* page-title-starts */}
      <section className="px-10 py-8">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
           Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
           RH - Quadro de servidores por vínculo, cargo e carga horária
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
            Lotação registrada com sucesso.
          </div>
        )}

        <RHForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      {/* footer-ends */}
      <section>
        <Footer />
      </section>
    </main>
  );
}