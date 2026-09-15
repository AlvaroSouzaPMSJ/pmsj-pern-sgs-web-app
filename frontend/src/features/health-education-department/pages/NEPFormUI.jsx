import { useState, useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "../../../../../app/layouts/Footer";
import GNavbar from "../../../../../app/layouts/GNavbar";
import { ROUTES } from "../../../../../app/routing/routes.constants";

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

const MODALIDADES = /** @type {const} */ ([
  "Presencial",
  "Online / EAD",
  "Híbrido",
  "Curso externo",
]);

/** Single source of truth for professional categories. */
const CATEGORIAS_PROFISSIONAIS = [
  { key: "medicos", label: "Médicos" },
  { key: "enfermeiros", label: "Enfermeiros" },
  { key: "tecnicosAuxEnf", label: "Técnicos / Aux. Enf." },
  { key: "odontologos", label: "Odontólogos" },
  { key: "psicologos", label: "Psicólogos" },
  { key: "agentesAdministrativos", label: "Ag. Administrativos" },
  { key: "acs", label: "ACS" },
  { key: "agentesEndemias", label: "Ag. Endemias" },
  { key: "terapeutasOcup", label: "Terapeuta Ocup." },
  { key: "fisioterapeutas", label: "Fisioterapeutas" },
  { key: "fonoaudiologos", label: "Fonoaudiólogos" },
  { key: "educadoresFisicos", label: "Educador Físico" },
  { key: "assistentesSociais", label: "Assistente Social" },
  { key: "nutricionistas", label: "Nutricionistas" },
  { key: "farmaceuticos", label: "Farmacêuticos" },
  { key: "outros", label: "Outros" },
];

const PARTICIPANTES_ZERADOS = Object.fromEntries(
  CATEGORIAS_PROFISSIONAIS.map(({ key }) => [key, 0]),
);

// ─── Schema ───────────────────────────────────────────────────────────────────

const participanteShape = Object.fromEntries(
  CATEGORIAS_PROFISSIONAIS.map(({ key }) => [
    key,
    z.coerce.number().int().min(0),
  ]),
);

const capacitacaoSchema = z.object({
  mes: z.enum(MESES),
  sequencia: z.coerce.number().int().min(1),
  nome: z.string().min(3, "Nome deve ter ao menos 3 caracteres").max(300),
  cargaHoraria: z.string().min(1, "Informe a carga horária"),
  publicoAlvoEsperado: z.coerce.number().int().min(0),
  modalidade: z.enum(MODALIDADES),
  participantes: z.object(participanteShape),
});

// ─── Utils ────────────────────────────────────────────────────────────────────

function totalCapacitados(participantes) {
  return Object.values(participantes).reduce((acc, v) => acc + v, 0);
}

function percentualCapacitados(total, publicoAlvoEsperado) {
  if (publicoAlvoEsperado === 0) return null;
  return Math.round((total / publicoAlvoEsperado) * 10000) / 100;
}

function formatPct(value) {
  if (value === null) return "—";
  return (
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%"
  );
}

function buildCapacitacao(values) {
  const total = totalCapacitados(values.participantes);
  return {
    ...values,
    id: crypto.randomUUID(),
    totalCapacitados: total,
    percentualCapacitados: percentualCapacitados(
      total,
      values.publicoAlvoEsperado,
    ),
    criadoEm: new Date().toISOString(),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  mes: "",
  sequencia: 1,
  nome: "",
  cargaHoraria: "",
  publicoAlvoEsperado: 0,
  modalidade: "",
  participantes: { ...PARTICIPANTES_ZERADOS },
};

function useCapacitacaoForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(capacitacaoSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const participantes = useWatch({
    control: form.control,
    name: "participantes",
  });
  const publicoAlvo = useWatch({
    control: form.control,
    name: "publicoAlvoEsperado",
  });

  const total = totalCapacitados(participantes ?? PARTICIPANTES_ZERADOS);
  const pct = percentualCapacitados(total, publicoAlvo ?? 0);

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        form.reset(DEFAULT_VALUES);
      },
      [form, onSuccess],
    ),
  );

  return { form, handleSubmit, total, pct };
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

function ParticipantesGrid({ control, errors }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {CATEGORIAS_PROFISSIONAIS.map(({ key, label }) => {
        const fieldError = errors.participantes?.[key];
        return (
          <div key={key}>
            <label
              htmlFor={`participantes.${key}`}
              className="block text-xs font-medium text-gray-500 mb-1 truncate"
              title={label}
            >
              {label}
            </label>
            <Controller
              name={`participantes.${key}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={`participantes.${key}`}
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
            {["Mês", "Capacitação", "Carga", "Público alvo", "Total", "%"].map(
              (h, i) => (
                <th
                  key={h}
                  className={`text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap ${
                    i >= 3 ? "text-right" : "text-left"
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
                {r.mes}
              </td>
              <td
                className="py-2.5 pr-4 text-gray-800 max-w-xs truncate"
                title={r.nome}
              >
                {r.nome}
              </td>
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                {r.cargaHoraria}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-500 tabular-nums">
                {r.publicoAlvoEsperado}
              </td>
              <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                {r.totalCapacitados}
              </td>
              <td className="py-2.5 text-right tabular-nums">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.percentualCapacitados === null
                      ? "bg-gray-100 text-gray-400"
                      : r.percentualCapacitados >= 80
                        ? "bg-green-100 text-green-700"
                        : r.percentualCapacitados >= 50
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-600"
                  }`}
                >
                  {formatPct(r.percentualCapacitados)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CapacitacaoForm({ onSuccess }) {
  const { form, handleSubmit, total, pct } = useCapacitacaoForm(onSuccess);
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
            Identificação da Capacitação
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

            <FormField
              label="Nome da Capacitação"
              error={errors.nome?.message}
              htmlFor="nome"
            >
              <input
                id="nome"
                type="text"
                placeholder="Título completo da capacitação ou curso"
                {...register("nome")}
                className={fieldCls(!!errors.nome)}
              />
            </FormField>

            <FormField
              label="Carga Horária"
              error={errors.cargaHoraria?.message}
              htmlFor="cargaHoraria"
            >
              <input
                id="cargaHoraria"
                type="text"
                placeholder="ex: 4h, 1h30min, -"
                {...register("cargaHoraria")}
                className={fieldCls(!!errors.cargaHoraria)}
              />
            </FormField>

            <FormField
              label="Público Alvo Esperado"
              error={errors.publicoAlvoEsperado?.message}
              htmlFor="publicoAlvoEsperado"
            >
              <input
                id="publicoAlvoEsperado"
                type="number"
                min={0}
                placeholder="0"
                {...register("publicoAlvoEsperado")}
                className={
                  fieldCls(!!errors.publicoAlvoEsperado) + " text-center"
                }
              />
            </FormField>

            <FormField
              label="Modalidade"
              error={errors.modalidade?.message}
              htmlFor="modalidade"
            >
              <select
                id="modalidade"
                {...register("modalidade")}
                className={fieldCls(!!errors.modalidade)}
              >
                <option value="">Escolha a modalidade...</option>
                {MODALIDADES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* ── Participantes ───────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Participantes por Categoria Profissional
          </h2>
          <ParticipantesGrid control={control} errors={errors} />

          <div className="grid grid-cols-2 gap-3 mt-6">
            <MetricCard label="Total capacitados" value={String(total)} />
            <MetricCard
              label="% público atingido"
              value={formatPct(pct)}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NEPFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((data) => {
    setRegistros((prev) => [buildCapacitacao(data), ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* navbar */}
      <GNavbar />

      {/* breadcrumb
      <div className="px-10 pt-4">
        <Breadcrumb
          crumbs={[
            { label: "home", path: ROUTES.HEALTH_EDUCATION_SUPERINTENDENCY_HOME_UI, },
            { label: "painel de controle", path: ROUTES.NEP_HOME },
            { label: "formulário", path: ROUTES.NEP_FORMMM },
          ]}
        />
      </div>
      */}

      {/* page-title-starts */}
      <section className="px-10 py-10">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Registro de capacitações — Núcleo de Educação Permanente (NEP)
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
            Capacitação registrada com sucesso.
          </div>
        )}

        <CapacitacaoForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      {/* footer-ends */}

      {/* footer-starts */}
      <section>
        <Footer />
      </section>
      {/* footer-ends */}
    </main>
  );
}