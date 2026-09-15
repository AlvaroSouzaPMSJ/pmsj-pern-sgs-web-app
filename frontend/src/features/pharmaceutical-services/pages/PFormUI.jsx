import { useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "../../../../../app/layouts/Footer";
import GNavbar from "../../../../../app/layouts/GNavbar";
import { ROUTES } from "../../../../../app/routing/routes.constants";

// Constants

const MESES = /** @type {const} */ ([
  { valor: 1, label: "Janeiro" },
  { valor: 2, label: "Fevereiro" },
  { valor: 3, label: "Março" },
  { valor: 4, label: "Abril" },
  { valor: 5, label: "Maio" },
  { valor: 6, label: "Junho" },
  { valor: 7, label: "Julho" },
  { valor: 8, label: "Agosto" },
  { valor: 9, label: "Setembro" },
  { valor: 10, label: "Outubro" },
  { valor: 11, label: "Novembro" },
  { valor: 12, label: "Dezembro" },
]);

const ANOS = /** @type {const} */ ([2025, 2026]);

const UNIDADES = [
  { chave: "caps", label: "CAPS" },
  { chave: "cvs", label: "Centro Vigilância em Saúde (CVS)" },
  { chave: "policlinica-barreiros", label: "Policlínica Barreiros" },
  { chave: "policlinica-campinas", label: "Policlínica Campinas" },
  { chave: "policlinica-forquilhinhas", label: "Policlínica Forquilhinhas" },
  { chave: "ubs-areias", label: "UBS Areias" },
  { chave: "ubs-barreiros", label: "UBS Barreiros" },
  { chave: "ubs-bela-vista", label: "UBS Bela Vista" },
  { chave: "ubs-ceniro-martins", label: "UBS Ceniro Martins" },
  { chave: "ubs-colonia-santana", label: "UBS Colônia Santana" },
  { chave: "ubs-fazenda", label: "UBS Fazenda" },
  { chave: "ubs-forquilhas", label: "UBS Forquilhas" },
  { chave: "ubs-forquilhinhas", label: "UBS Forquilhinhas" },
  { chave: "ubs-goiabal", label: "UBS Goiabal" },
  { chave: "ubs-ipiranga", label: "UBS Ipiranga" },
  { chave: "ubs-luar", label: "UBS Luar" },
  { chave: "ubs-morar-bem", label: "UBS Morar Bem" },
  { chave: "ubs-picadas", label: "UBS Picadas" },
  { chave: "ubs-potecas", label: "UBS Potecas" },
  { chave: "ubs-procasa", label: "UBS Procasa" },
  { chave: "ubs-real-parque", label: "UBS Real Parque" },
  { chave: "ubs-rocado", label: "UBS Roçado" },
  { chave: "ubs-santos-saraiva", label: "UBS Santos Saraiva" },
  { chave: "ubs-sao-luiz", label: "UBS São Luiz" },
  { chave: "ubs-sede", label: "UBS Sede" },
  { chave: "ubs-serraria", label: "UBS Serraria" },
  { chave: "ubs-sertao", label: "UBS Sertão" },
  { chave: "ubs-vila-formosa", label: "UBS Vila Formosa" },
  { chave: "ubs-vista-bela", label: "UBS Vista Bela" },
  { chave: "ubs-zanellato", label: "UBS Zanellato" },
];

const UNIDADE_LABEL = Object.fromEntries(
  UNIDADES.map(({ chave, label }) => [chave, label]),
);

const UNIDADE_CHAVES = UNIDADES.map(({ chave }) => chave);

// Schema

const nullableCount = z.preprocess(
  (v) =>
    v === "" || v === null || v === undefined || Number.isNaN(v) ? null : v,
  z.coerce
    .number({ invalid_type_error: "Somente números" })
    .int("Somente números inteiros")
    .min(0, "Não pode ser negativo")
    .nullable(),
);

const dispensacaoSchema = z
  .object({
    unidade: z.enum(UNIDADE_CHAVES, {
      errorMap: () => ({ message: "Selecione a unidade de saúde" }),
    }),
    ano: z.coerce.number().int().min(ANOS[0]).max(ANOS[ANOS.length - 1]),
    mes: z.coerce
      .number({ invalid_type_error: "Selecione o mês" })
      .int()
      .min(1, "Selecione o mês")
      .max(12),
    pacientesAtendidos: nullableCount,
    totalDispensacoes: nullableCount,
    /** Integer centavos, controlled by <CurrencyInput>. */
    financeiroCentavos: z
      .number()
      .int()
      .min(0, "Não pode ser negativo")
      .nullable(),
  })
  .refine(
    (data) =>
      data.pacientesAtendidos !== null ||
      data.totalDispensacoes !== null ||
      data.financeiroCentavos !== null,
    {
      message:
        "Informe ao menos um dos três indicadores — competências sem dados não devem ser registradas",
      path: ["pacientesAtendidos"],
    },
  );

// Utils

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function formatCentavos(centavos) {
  if (centavos === null || centavos === undefined) return "—";
  return BRL.format(centavos / 100);
}

function formatInt(value) {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString("pt-BR");
}

function mesLabel(mes) {
  return MESES.find(({ valor }) => valor === mes)?.label ?? String(mes);
}

/**
 * DTO firewall (OWASP API3:2023). Whitelists the exact persisted shape:
 * { unidade, competencia: { ano, mes }, metricas: { ... } }
 * Nothing else — labels, session ids, and derived totals never cross.
 */
function buildDocumento(values) {
  return {
    unidade: values.unidade,
    competencia: { ano: values.ano, mes: values.mes },
    metricas: {
      pacientesAtendidos: values.pacientesAtendidos,
      totalDispensacoes: values.totalDispensacoes,
      financeiroCentavos: values.financeiroCentavos,
    },
  };
}

/** Session-only view model (id + timestamp are UI concerns, not persisted). */
function buildRegistro(values) {
  return {
    id: crypto.randomUUID(),
    documento: buildDocumento(values),
    criadoEm: new Date().toISOString(),
  };
}

// Hook

const DEFAULT_VALUES = {
  unidade: "",
  ano: 2026,
  mes: "",
  pacientesAtendidos: "",
  totalDispensacoes: "",
  financeiroCentavos: null,
};

function useDispensacaoForm({ onSuccess, isDuplicate }) {
  const form = useForm({
    resolver: zodResolver(dispensacaoSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        // Mirrors the backend compound unique index (unidade, ano, mes).
        if (isDuplicate(data.unidade, data.ano, data.mes)) {
          form.setError("root.duplicado", {
            type: "conflict",
            message: `${UNIDADE_LABEL[data.unidade]} já possui registro em ${mesLabel(data.mes)}/${data.ano} nesta sessão.`,
          });
          return;
        }
        onSuccess(data);
        form.reset(DEFAULT_VALUES);
      },
      [form, onSuccess, isDuplicate],
    ),
  );

  return { form, handleSubmit };
}

// Sub-components

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

/**
 * BRL "cents-as-you-type" masked input. Form state holds integer centavos
 * (Number | null); the float never exists anywhere in the pipeline.
 */
function CurrencyInput({ field, hasError, id }) {
  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    field.onChange(digits === "" ? null : parseInt(digits, 10));
  };

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      placeholder="R$ 0,00"
      value={field.value === null ? "" : BRL.format(field.value / 100)}
      onChange={handleChange}
      onBlur={field.onBlur}
      className={fieldCls(hasError) + " text-right"}
    />
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
              "Unidade de Saúde",
              "Competência",
              "Pacientes Atendidos",
              "Total Dispensações",
              "Financeiro (R$)",
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
          {registros.map(({ id, documento }) => (
            <tr
              key={id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td
                className="py-2.5 pr-4 text-gray-800 max-w-xs truncate"
                title={UNIDADE_LABEL[documento.unidade]}
              >
                {UNIDADE_LABEL[documento.unidade]}
              </td>
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                {mesLabel(documento.competencia.mes)}/
                {documento.competencia.ano}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-500 tabular-nums">
                {formatInt(documento.metricas.pacientesAtendidos)}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-500 tabular-nums">
                {formatInt(documento.metricas.totalDispensacoes)}
              </td>
              <td className="py-2.5 text-right font-medium text-gray-800 tabular-nums whitespace-nowrap">
                {formatCentavos(documento.metricas.financeiroCentavos)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DispensacaoForm({ onSuccess, isDuplicate }) {
  const { form, handleSubmit } = useDispensacaoForm({
    onSuccess,
    isDuplicate,
  });
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
            Identificação do Registro
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              label="Unidade de Saúde"
              error={errors.unidade?.message}
              htmlFor="unidade"
            >
              <select
                id="unidade"
                {...register("unidade")}
                className={fieldCls(!!errors.unidade)}
              >
                <option value="">Selecione a unidade</option>
                {UNIDADES.map(({ chave, label }) => (
                  <option key={chave} value={chave}>
                    {label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Ano" error={errors.ano?.message} htmlFor="ano">
              <select
                id="ano"
                {...register("ano")}
                className={fieldCls(!!errors.ano)}
              >
                {ANOS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Mês de Competência"
              error={errors.mes?.message}
              htmlFor="mes"
            >
              <select
                id="mes"
                {...register("mes")}
                className={fieldCls(!!errors.mes)}
              >
                <option value="">Selecione o mês</option>
                {MESES.map(({ valor, label }) => (
                  <option key={valor} value={valor}>
                    {label}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* Indicadores */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Indicadores do Mês
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Deixe em branco os indicadores sem dados — em branco não é zero.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FormField
              label="Pacientes Atendidos"
              error={errors.pacientesAtendidos?.message}
              htmlFor="pacientesAtendidos"
            >
              <input
                id="pacientesAtendidos"
                type="number"
                min={0}
                placeholder="—"
                inputMode="numeric"
                {...register("pacientesAtendidos")}
                className={fieldCls(!!errors.pacientesAtendidos) + " text-center"}
              />
            </FormField>

            <FormField
              label="Total Dispensações"
              error={errors.totalDispensacoes?.message}
              htmlFor="totalDispensacoes"
            >
              <input
                id="totalDispensacoes"
                type="number"
                min={0}
                placeholder="—"
                inputMode="numeric"
                {...register("totalDispensacoes")}
                className={fieldCls(!!errors.totalDispensacoes) + " text-center"}
              />
            </FormField>

            <FormField
              label="Financeiro (R$)"
              error={errors.financeiroCentavos?.message}
              htmlFor="financeiroCentavos"
            >
              <Controller
                name="financeiroCentavos"
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    id="financeiroCentavos"
                    field={field}
                    hasError={!!errors.financeiroCentavos}
                  />
                )}
              />
            </FormField>
          </div>
        </div>

        {/* Conflict banner (compound unique index mirror) */}
        {errors.root?.duplicado && (
          <div
            role="alert"
            className="rounded-lg bg-red-50 border border-red-200 px-4 py-3
                       text-sm font-medium text-red-700"
          >
            {errors.root.duplicado.message}
          </div>
        )}

        {/* Actions */}
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
            Registrar
          </button>
        </div>
      </div>
    </form>
  );
}

// Page

export default function FFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const isDuplicate = useCallback(
    (unidade, ano, mes) =>
      registros.some(
        ({ documento }) =>
          documento.unidade === unidade &&
          documento.competencia.ano === ano &&
          documento.competencia.mes === mes,
      ),
    [registros],
  );

  const handleSuccess = useCallback((data) => {
    const registro = buildRegistro(data);
    // TODO: wire FARMACIA_ROUTES.CREATE → POST registro.documento
    setRegistros((prev) => [registro, ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  // Session totals — display only, never persisted (null treated as 0 here).
  const totais = registros.reduce(
    (acc, { documento: { metricas } }) => ({
      pacientes: acc.pacientes + (metricas.pacientesAtendidos ?? 0),
      dispensacoes: acc.dispensacoes + (metricas.totalDispensacoes ?? 0),
      centavos: acc.centavos + (metricas.financeiroCentavos ?? 0),
    }),
    { pacientes: 0, dispensacoes: 0, centavos: 0 },
  );

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
            Pacientes atendidos, dispensações e financeiro por unidade de
            saúde — Assistência Farmacêutica
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
            Dispensação registrada com sucesso.
          </div>
        )}

        <DispensacaoForm onSuccess={handleSuccess} isDuplicate={isDuplicate} />

        {registros.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <MetricCard
              label="Pacientes (sessão)"
              value={formatInt(totais.pacientes)}
            />
            <MetricCard
              label="Dispensações (sessão)"
              value={formatInt(totais.dispensacoes)}
            />
            <MetricCard
              label="Financeiro (sessão)"
              value={formatCentavos(totais.centavos)}
              accent
            />
          </div>
        )}

        <RegistrosList registros={registros} />
      </section>
      {/* form-ends */}

      {/* footer-starts */}
      <section>
        <Footer />
      </section>
      {/* footer-ends */}
    </main>
  );
}